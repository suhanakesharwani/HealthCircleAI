# import json
# import time

# import google.generativeai as genai
# from django.conf import settings


# genai.configure(
#     api_key=settings.GEMINI_API_KEY
# )

# model = genai.GenerativeModel(
#     "gemini-3.5-flash"
# )


# class AIReportService:

# #     def extract_structured_data(
# #         self,
        
# #         ocr_text,
# #     ):

# #         prompt = f"""
# # You are an expert medical laboratory report parser.

# # The text below comes from OCR.
# # It may contain spelling mistakes, formatting errors and broken tables.

# # Your task is to reconstruct the report.

# # Return ONLY valid JSON.

# # Schema:

# # {{
# #     "patient": {{
# #         "name": "",
# #         "age": "",
# #         "gender": ""
# #     }},

# #     "report_type": "",

# #     "tests": [
# #         {{
# #             "name": "",
# #             "value": "",
# #             "unit": "",
# #             "reference_range": "",
# #             "status": "NORMAL/HIGH/LOW/BORDERLINE"
# #         }}
# #     ]
# # }}

# # OCR TEXT:

# # {ocr_text}

# # Remember:

# # Return ONLY JSON.

# # Do NOT explain anything.
# # """

# #         start = time.perf_counter()

# #         response = model.generate_content(prompt)

# #         print(f"Gemini API: {time.perf_counter() - start:.2f}s")

# #         text = (
# #             response.text
# #             .replace("```json", "")
# #             .replace("```", "")
# #             .strip()
# #         )

# #         return json.loads(text)

    
#     def ai_analysis(
#         self,
        
#         ocr_text,
#     ):

#         prompt = f"""
#     You are an experienced physician and medical report interpreter.

#     The following text comes from OCR and may contain formatting mistakes.

#     Your tasks:

#     1. Extract structured data.
#     2. Explain the report in simple English.
#     3. Identify abnormal values.
#     4. Summarize the report in 3–5 sentences.
#     5. Give general health recommendations.

#     Never diagnose diseases.
#     Never prescribe medication.
#     Recommend consulting a healthcare professional when appropriate.

#     Return ONLY valid JSON.

#     {
#         "summary": "...",

#         "key_findings":[
#             "...",
#             "..."
#         ],

#         "abnormal_values":[
#             {
#                 "test":"",
#                 "value":"",
#                 "unit":"",
#                 "reference_range":"",
#                 "status":"HIGH"
#             }
#         ],

#         "recommendations":[
#             "...",
#             "..."
#         ],

#         "structured_report":{
#             ...
#         }
#     }
# """

#         start = time.perf_counter()

#         response = model.generate_content(prompt)

#         print(f"Gemini API: {time.perf_counter() - start:.2f}s")

#         text = (
#             response.text
#             .replace("```json", "")
#             .replace("```", "")
#             .strip()
#         )

#         return json.loads(text)

import json
import time

import google.generativeai as genai

from django.conf import settings



genai.configure(
    api_key=settings.GEMINI_API_KEY
)


model = genai.GenerativeModel(
    "gemini-3.5-flash"
)



class AIReportService:


    def analyze_report(
        self,
        ocr_text
    ):


        prompt = f"""
You are an expert medical report parser and interpreter.

The following text comes from OCR and may contain:
- spelling mistakes
- broken tables
- missing formatting

Your job is to reconstruct the report as accurately as possible.

Extract ALL available information.

Use ONLY these report types:

CBC
LFT
KFT
Lipid Profile
HbA1c
Vitamin D
Vitamin B12
Thyroid Profile
Urine Routine
MRI
CT Scan
X-Ray
Prescription
Discharge Summary
ECG
ECHO
Ultrasound
Other

For every laboratory test extract:

- name
- numeric value
- unit
- reference range
- status

Status must be ONLY one of

NORMAL
HIGH
LOW
BORDERLINE

If information is unavailable use null.

Return ONLY valid JSON.

{{
    "summary": "",

    "key_findings": [],

    "abnormal_values":[],

    "recommendations": [],

    "structured_report": {{

        "report_type": "",

        "lab_name": "",

        "doctor": "",

        "collection_date": "",

        "patient": {{

            "name": "",

            "age": "",

            "gender": ""

        }},

        "tests": [

            {{

                "name": "",

                "value": null,

                "unit": "",

                "reference_range": "",

                "status": ""

            }}

        ]

    }}

}}

OCR TEXT:

{ocr_text}


"""


        start = time.perf_counter()


        response = model.generate_content(
            prompt
        )


        print(
            f"Gemini API: {time.perf_counter()-start:.2f}s"
        )


        text = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )


        try:

            analysis = json.loads(text)

            analysis.setdefault("summary", "")
            analysis.setdefault("key_findings", [])
            analysis.setdefault("abnormal_values", [])
            analysis.setdefault("recommendations", [])
            analysis.setdefault("structured_report", {})

            return analysis


        except json.JSONDecodeError:

            print(
                "Invalid Gemini JSON:"
            )

            print(text)

            raise