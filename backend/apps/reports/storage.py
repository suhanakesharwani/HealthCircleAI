# from supabase import create_client
# from django.conf import settings

# supabase = create_client(
#     settings.SUPABASE_URL,
#     settings.SUPABASE_SERVICE_KEY,
# )

import uuid

from django.conf import settings

from supabase import create_client


supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_KEY,
)


def upload_report(file):

    extension = file.name.split(".")[-1].lower()

    filename = f"{uuid.uuid4()}.{extension}"

    path = f"reports/{filename}"

    file.seek(0)

    supabase.storage.from_(
        settings.SUPABASE_BUCKET
    ).upload(
        path=path,
        file=file.read(),
        file_options={
            "content-type": file.content_type,
        },
    )

    return path


def get_signed_url(file_path):

    response = (
        supabase.storage
        .from_(settings.SUPABASE_BUCKET)
        .create_signed_url(
            file_path,
            60,   # expires in 60 seconds
        )
    )

    return response["signedURL"]



def delete_report(file_path):

    supabase = create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_SERVICE_KEY
    )

    response = (
        supabase.storage
        .from_("medical-reports")   #bucket name
        .remove([file_path])
    )

    return response

def download_report(file_path):
    response=(
        supabase.storage
        .from_("medical-reports")
        .download(file_path)
    )
    return response