
import json
import time

# import google.generativeai as genai
from groq import Groq

from django.conf import settings



# genai.configure(
#     api_key=settings.GROQ_API_KEY
# )


# model = genai.GenerativeModel(
#     "gemini-3.5-flash"
# )

# generation_config = genai.GenerationConfig(
#     temperature=0,
#     max_output_tokens=800
# )


client = Groq(
    api_key=settings.GROQ_API_KEY
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


        # response = model.generate_content(
        #     prompt
        # )

        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",   # or another Groq model
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0,
            response_format={"type":"json_object"},
            max_completion_tokens=2500,
        )

        text = (
            response.choices[0].message.content
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        print(
            f"GROQ API: {time.perf_counter()-start:.2f}s"
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