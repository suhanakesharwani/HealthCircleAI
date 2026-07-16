import re
REPORT_TYPES = {

    "complete blood count": "CBC",

    "blood count": "CBC",

    "cbc": "CBC",

    "cbc test": "CBC",

    "liver function test": "LFT",

    "renal function test": "KFT",

    "kidney function test": "KFT",

    "thyroid": "Thyroid Profile",

}

def normalize_report_type(report_type):

    if not report_type:
        return "Other"

    report_type = report_type.lower()

    return REPORT_TYPES.get(
        report_type,
        report_type.title()
    )
TEST_NAME_MAP = {
    # Hemoglobin
    "hb": "hemoglobin",
    "hgb": "hemoglobin",
    "hemoglobin": "hemoglobin",

    # WBC
    "wbc": "wbc",
    "wbc count": "wbc",
    "white blood cell": "wbc",
    "white blood cell count": "wbc",
    "total wbc count": "wbc",

    # RBC
    "rbc": "rbc",
    "rbc count": "rbc",
    "red blood cell count": "rbc",
    "total rbc count": "rbc",

    # Platelets
    "platelet count": "platelets",
    "platelets": "platelets",

    # Hematocrit
    "hematocrit": "hematocrit",
    "packed cell volume": "hematocrit",
    "pcv": "hematocrit",

    # MCV
    "mcv": "mcv",
    "mean corpuscular volume": "mcv",

    # MCH
    "mch": "mch",

    # MCHC
    "mchc": "mchc",

    # RDW
    "rdw": "rdw",
    "rdw cv": "rdw",
    "red cell distribution width": "rdw",
}
def normalize_test_name(name):
    if not name:
        return ""

    name = name.lower()

    # remove brackets
    name = re.sub(r"\(.*?\)", "", name)

    # remove punctuation
    name = re.sub(r"[^a-z0-9 ]", " ", name)

    # remove extra spaces
    name = " ".join(name.split())

    return TEST_NAME_MAP.get(name, name)
def chunk_text(text, chunk_size=8000, overlap=500):
    """
    Split OCR text into overlapping chunks.

    overlap prevents splitting lab tables in half.
    """

    text = text.strip()

    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])

        if end >= len(text):
            break

        start = end - overlap

    return chunks