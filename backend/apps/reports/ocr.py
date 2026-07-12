# class OCRService:

#     def extract_text(self,file_bytes,file_type):
#                     if file_type=="pdf":
#                             return self.extract_pdf(file_bytes)
#                     return self.extract_image(file_bytes)

import io

import numpy as np

import easyocr

from PIL import Image

from pdf2image import convert_from_bytes

from .models import MedicalReport


class OCRService:

    def __init__(self):

        self.reader = easyocr.Reader(
            ["en"],
            gpu=False,
        )

    def extract_text(
        self,
        file_bytes,
        file_type,
    ):

        if file_type == MedicalReport.FileType.PDF:

            return self.extract_pdf(file_bytes)

        return self.extract_image(file_bytes)

    def extract_image(
        self,
        file_bytes,
    ):

        image = Image.open(
            io.BytesIO(file_bytes)
        )

        image = np.array(image)

        result = self.reader.readtext(
            image,
            detail=0,
        )

        return "\n".join(result)

    def extract_pdf(
        self,
        file_bytes,
    ):

        pages = convert_from_bytes(
            file_bytes
        )

        all_text = []

        for page in pages:

            image = np.array(page)

            result = self.reader.readtext(
                image,
                detail=0,
            )

            all_text.extend(result)

        return "\n".join(all_text)