from .utils import normalize_report_type


def normalize_status(status):

    if not status:
        return "NORMAL"

    status = status.upper()

    if "HIGH" in status:
        return "HIGH"

    if "LOW" in status:
        return "LOW"

    if "BORDERLINE" in status:
        return "BORDERLINE"

    return "NORMAL"


def parse_number(value):

    if value is None:
        return None

    try:
        return float(str(value).replace(",", ""))
    except:
        return None


def validate_structured_report(data):

    structured = data.get("structured_report", {})

    normalized = {

        "report_type": normalize_report_type(
            structured.get("report_type")
        ),

        "patient": structured.get(
            "patient",
            structured.get("patient_details", {})
        ),

        "lab_name": structured.get(
            "lab_name",
            ""
        ),

        "doctor": structured.get(
            "doctor",
            structured.get("sample_details", {}).get(
                "referred_by",
                ""
            )
        ),

        "collection_date": structured.get(
            "collection_date",
            structured.get("sample_details", {}).get(
                "collection_date",
                ""
            )
        ),

        "tests": []
    }

    #
    # CASE 1
    #
    if "tests" in structured:

        for test in structured["tests"]:

            normalized["tests"].append({

                "name": test.get("name"),

                "value": parse_number(
                    test.get("value")
                ),

                "unit": test.get("unit"),

                "reference_range": test.get(
                    "reference_range"
                ),

                "status": normalize_status(
                    test.get("status")
                )

            })

    #
    # CASE 2
    #
    elif "cbc_results" in structured:

        for name, values in structured["cbc_results"].items():

            normalized["tests"].append({

                "name": name.replace("_", " ").title(),

                "value": parse_number(
                    values.get("value")
                ),

                "unit": values.get("unit"),

                "reference_range": values.get(
                    "reference_range"
                ),

                "status": normalize_status(
                    values.get("status")
                )

            })

    data["structured_report"] = normalized

    return data