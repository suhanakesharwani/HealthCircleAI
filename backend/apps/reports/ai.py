
# # import json
# # import time

# # # import google.generativeai as genai
# # from groq import Groq

# # from django.conf import settings



# # # genai.configure(
# # #     api_key=settings.GROQ_API_KEY
# # # )


# # # model = genai.GenerativeModel(
# # #     "gemini-3.5-flash"
# # # )

# # # generation_config = genai.GenerationConfig(
# # #     temperature=0,
# # #     max_output_tokens=800
# # # )


# # client = Groq(
# #     api_key=settings.GROQ_API_KEY
# # )


# # class AIReportService:


# #     def analyze_report(
# #         self,
# #         ocr_text
# #     ):


# #         prompt = f"""
# #         You are an expert medical report parser and interpreter.

# #         The following text comes from OCR and may contain:
# #         - spelling mistakes
# #         - broken tables
# #         - missing formatting

# #         Your job is to reconstruct the report as accurately as possible.

# #         Extract ALL available information.

# #         Use ONLY these report types:

# #         CBC
# #         LFT
# #         KFT
# #         Lipid Profile
# #         HbA1c
# #         Vitamin D
# #         Vitamin B12
# #         Thyroid Profile
# #         Urine Routine
# #         MRI
# #         CT Scan
# #         X-Ray
# #         Prescription
# #         Discharge Summary
# #         ECG
# #         ECHO
# #         Ultrasound
# #         Other

# #         For every laboratory test extract:

# #         - name
# #         - numeric value
# #         - unit
# #         - reference range
# #         - status

# #         Status must be ONLY one of

# #         NORMAL
# #         HIGH
# #         LOW
# #         BORDERLINE

# #         If information is unavailable use null.

# #         Return ONLY valid JSON.

# #         {{
# #             "summary": "",

# #             "key_findings": [],

# #             "abnormal_values":[],

# #             "recommendations": [],

# #             "structured_report": {{

# #                 "report_type": "",

# #                 "lab_name": "",

# #                 "doctor": "",

# #                 "collection_date": "",

# #                 "patient": {{

# #                     "name": "",

# #                     "age": "",

# #                     "gender": ""

# #                 }},

# #                 "tests": [

# #                     {{

# #                         "name": "",

# #                         "value": null,

# #                         "unit": "",

# #                         "reference_range": "",

# #                         "status": ""

# #                     }}

# #                 ]

# #             }}

# #         }}

# # OCR TEXT:

# # {ocr_text}


# # """


# #         start = time.perf_counter()


# #         # response = model.generate_content(
# #         #     prompt
# #         # )

# #         response = client.chat.completions.create(
# #             model="llama-3.3-70b-versatile",   # or another Groq model
# #             messages=[
# #                 {
# #                     "role": "user",
# #                     "content": prompt,
# #                 }
# #             ],
# #             temperature=0,
# #             response_format={"type":"json_object"},
# #             max_completion_tokens=2000,
# #         )

# #         text = (
# #             response.choices[0].message.content
# #             .replace("```json", "")
# #             .replace("```", "")
# #             .strip()
# #         )

# #         print(
# #             f"GROQ API: {time.perf_counter()-start:.2f}s"
# #         )


# #         try:

# #             analysis = json.loads(text)

# #             analysis.setdefault("summary", "")
# #             analysis.setdefault("key_findings", [])
# #             analysis.setdefault("abnormal_values", [])
# #             analysis.setdefault("recommendations", [])
# #             analysis.setdefault("structured_report", {})

# #             return analysis
        
# #         except json.JSONDecodeError:

# #             print(
# #                 "Invalid Gemini JSON:"
# #             )

# #             print(text)

# #             raise
        

# #     def summarize_chunks(self, chunk_results):

# #         prompt = f"""
# #         Below are JSON outputs extracted from different chunks
# #         of the SAME medical report.

# #         Merge them into ONE valid JSON.

# #         Requirements:

# #         - Remove duplicate tests.
# #         - Keep the most complete patient information.
# #         - Combine all laboratory tests.
# #         - Generate ONE summary.
# #         - Generate ONE recommendation list.
# #         - Generate abnormal_values.

# #         Return ONLY JSON.

# #         Chunk Results:

# #         {json.dumps(chunk_results, indent=2)}
# #         """

# #         print(f"Merge prompt length: {len(prompt)} chars (~{len(prompt)//4} tokens)")

# #         response = client.chat.completions.create(
# #             model="llama-3.3-70b-versatile",
# #             messages=[
# #                 {
# #                     "role": "user",
# #                     "content": prompt,
# #                 }
# #             ],
# #             response_format={"type": "json_object"},
# #             temperature=0,
# #             max_completion_tokens=1800,
# #         )

# #         text = (
# #             response.choices[0].message.content
# #             .replace("```json", "")
# #             .replace("```", "")
# #             .strip()
# #         )

# #         return json.loads(text)


# #         # except json.JSONDecodeError:

# #         #     print(
# #         #         "Invalid Gemini JSON:"
# #         #     )

# #         #     print(text)

# #         #     raise

# import json
# import time
# from collections import deque

# from groq import Groq

# from django.conf import settings


# client = Groq(
#     api_key=settings.GROQ_API_KEY
# )


# # -------------------------------------------------------------------
# # Token-aware TPM rate limiter
# # llama-3.3-70b-versatile free tier = 12,000 TPM (rolling 60s window)
# # Leave a safety margin below the hard cap so we don't get 429/413s.
# # -------------------------------------------------------------------
# TPM_LIMIT = 12000
# TPM_SAFETY_MARGIN = 1500  # keep ~1500 tokens of headroom
# _usage_log = deque()  # list of (timestamp, tokens_used)


# def _wait_for_tpm_budget(estimated_tokens):
#     """Block until there's room under the rolling 60s TPM budget."""
#     effective_limit = TPM_LIMIT - TPM_SAFETY_MARGIN

#     while True:
#         now = time.time()

#         # drop entries older than 60s
#         while _usage_log and now - _usage_log[0][0] > 60:
#             _usage_log.popleft()

#         used = sum(t for _, t in _usage_log)

#         if used + estimated_tokens <= effective_limit:
#             return

#         # wait until the oldest entry falls out of the 60s window
#         wait = 60 - (now - _usage_log[0][0]) + 0.5
#         wait = max(wait, 1)
#         print(f"⏳ TPM budget full ({used}/{effective_limit}), waiting {wait:.1f}s")
#         time.sleep(wait)


# class AIReportService:

#     def analyze_report(self, ocr_text):

#         prompt = f"""You are an expert medical report parser and interpreter.

# The following text comes from OCR and may contain spelling mistakes, broken tables, or missing formatting. Reconstruct the report as accurately as possible and extract ALL available information.

# Use ONLY these report types: CBC, LFT, KFT, Lipid Profile, HbA1c, Vitamin D, Vitamin B12, Thyroid Profile, Urine Routine, MRI, CT Scan, X-Ray, Prescription, Discharge Summary, ECG, ECHO, Ultrasound, Other.

# For every laboratory test extract: name, numeric value, unit, reference_range, status.
# Status must be ONLY one of: NORMAL, HIGH, LOW, BORDERLINE.
# If information is unavailable use null.

# Return ONLY valid JSON in this exact schema:
# {{"summary": "", "key_findings": [], "abnormal_values": [], "recommendations": [], "structured_report": {{"report_type": "", "lab_name": "", "doctor": "", "collection_date": "", "patient": {{"name": "", "age": "", "gender": ""}}, "tests": [{{"name": "", "value": null, "unit": "", "reference_range": "", "status": ""}}]}}}}

# OCR TEXT:

# {ocr_text}
# """

#         max_completion_tokens = 2500
#         estimated_input_tokens = len(prompt) // 4
#         estimated_total = estimated_input_tokens + max_completion_tokens

#         _wait_for_tpm_budget(estimated_total)

#         start = time.perf_counter()

#         response = client.chat.completions.create(
#             model="llama-3.3-70b-versatile",
#             messages=[
#                 {
#                     "role": "user",
#                     "content": prompt,
#                 }
#             ],
#             temperature=0,
#             response_format={"type": "json_object"},
#             max_completion_tokens=max_completion_tokens,
#         )

#         actual_tokens = response.usage.total_tokens
#         _usage_log.append((time.time(), actual_tokens))

#         text = (
#             response.choices[0].message.content
#             .replace("```json", "")
#             .replace("```", "")
#             .strip()
#         )

#         print(
#             f"GROQ API: {time.perf_counter()-start:.2f}s "
#             f"(tokens used: {actual_tokens})"
#         )

#         try:
#             analysis = json.loads(text)

#             analysis.setdefault("summary", "")
#             analysis.setdefault("key_findings", [])
#             analysis.setdefault("abnormal_values", [])
#             analysis.setdefault("recommendations", [])
#             analysis.setdefault("structured_report", {})

#             return analysis

#         except json.JSONDecodeError:
#             print("Invalid JSON:")
#             print(text)
#             raise

#     def summarize_chunks(self, chunk_results):

#         prompt = f"""Below are JSON outputs extracted from different chunks of the SAME medical report.

# Merge them into ONE valid JSON.

# Requirements:
# - Remove duplicate tests.
# - Keep the most complete patient information.
# - Combine all laboratory tests.
# - Generate ONE summary.
# - Generate ONE recommendation list.
# - Generate abnormal_values.

# Return ONLY JSON.

# Chunk Results:

# {json.dumps(chunk_results)}
# """

#         print(f"Merge prompt length: {len(prompt)} chars (~{len(prompt)//4} tokens)")

#         max_completion_tokens = 2000
#         estimated_input_tokens = len(prompt) // 4
#         estimated_total = estimated_input_tokens + max_completion_tokens

#         _wait_for_tpm_budget(estimated_total)

#         start = time.perf_counter()

#         response = client.chat.completions.create(
#             model="llama-3.3-70b-versatile",
#             messages=[
#                 {
#                     "role": "user",
#                     "content": prompt,
#                 }
#             ],
#             response_format={"type": "json_object"},
#             temperature=0,
#             max_completion_tokens=max_completion_tokens,
#         )

#         actual_tokens = response.usage.total_tokens
#         _usage_log.append((time.time(), actual_tokens))

#         print(
#             f"GROQ API (merge): {time.perf_counter()-start:.2f}s "
#             f"(tokens used: {actual_tokens})"
#         )

#         text = (
#             response.choices[0].message.content
#             .replace("```json", "")
#             .replace("```", "")
#             .strip()
#         )

#         return json.loads(text)

import json
import time
from collections import deque

from groq import Groq

from django.conf import settings


client = Groq(
    api_key=settings.GROQ_API_KEY
)


# -------------------------------------------------------------------
# Token-aware TPM rate limiter
# llama-3.3-70b-versatile free tier = 12,000 TPM (rolling 60s window)
# Leave a safety margin below the hard cap so we don't get 429/413s.
# -------------------------------------------------------------------
TPM_LIMIT = 12000
TPM_SAFETY_MARGIN = 1500  # keep ~1500 tokens of headroom
_usage_log = deque()  # list of (timestamp, tokens_used)


def _wait_for_tpm_budget(estimated_tokens):
    """Block until there's room under the rolling 60s TPM budget."""
    effective_limit = TPM_LIMIT - TPM_SAFETY_MARGIN

    while True:
        now = time.time()

        # drop entries older than 60s
        while _usage_log and now - _usage_log[0][0] > 60:
            _usage_log.popleft()

        used = sum(t for _, t in _usage_log)

        if used + estimated_tokens <= effective_limit:
            return

        # wait until the oldest entry falls out of the 60s window
        wait = 60 - (now - _usage_log[0][0]) + 0.5
        wait = max(wait, 1)
        print(f"⏳ TPM budget full ({used}/{effective_limit}), waiting {wait:.1f}s")
        time.sleep(wait)


class AIReportService:

    def analyze_report(self, ocr_text):

        prompt = f"""You are an expert medical report parser and interpreter.

The following text comes from OCR and may contain spelling mistakes, broken tables, or missing formatting. Reconstruct the report as accurately as possible and extract ALL available information.

Use ONLY these report types: CBC, LFT, KFT, Lipid Profile, HbA1c, Vitamin D, Vitamin B12, Thyroid Profile, Urine Routine, MRI, CT Scan, X-Ray, Prescription, Discharge Summary, ECG, ECHO, Ultrasound, Other.

For every laboratory test extract: name, numeric value, unit, reference_range, status.
Status must be ONLY one of: NORMAL, HIGH, LOW, BORDERLINE.
If information is unavailable use null.

Return ONLY valid JSON in this exact schema:
{{"summary": "", "key_findings": [], "recommendations": [], "structured_report": {{"report_type": "", "lab_name": "", "doctor": "", "collection_date": "", "patient": {{"name": "", "age": "", "gender": ""}}, "tests": [{{"name": "", "value": null, "unit": "", "reference_range": "", "status": ""}}]}}}}

OCR TEXT:

{ocr_text}
"""

        max_completion_tokens = 2500
        estimated_input_tokens = len(prompt) // 4
        estimated_total = estimated_input_tokens + max_completion_tokens

        _wait_for_tpm_budget(estimated_total)

        start = time.perf_counter()

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0,
            response_format={"type": "json_object"},
            max_completion_tokens=max_completion_tokens,
        )

        actual_tokens = response.usage.total_tokens
        _usage_log.append((time.time(), actual_tokens))

        text = (
            response.choices[0].message.content
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        print(
            f"GROQ API: {time.perf_counter()-start:.2f}s "
            f"(tokens used: {actual_tokens})"
        )

        try:
            analysis = json.loads(text)

            analysis.setdefault("summary", "")
            analysis.setdefault("key_findings", [])
            analysis.setdefault("recommendations", [])
            analysis.setdefault("structured_report", {})

            return analysis

        except json.JSONDecodeError:
            print("Invalid JSON:")
            print(text)
            raise

    def summarize_chunks(self, chunk_results):

        prompt = f"""Below are JSON outputs extracted from different chunks of the SAME medical report.

Merge them into ONE valid JSON.

Requirements:
- Remove duplicate tests.
- Keep the most complete patient information.
- Combine all laboratory tests.
- Generate ONE summary.
- Generate ONE recommendation list.

Return ONLY JSON.

Chunk Results:

{json.dumps(chunk_results)}
"""

        print(f"Merge prompt length: {len(prompt)} chars (~{len(prompt)//4} tokens)")

        max_completion_tokens = 2000
        estimated_input_tokens = len(prompt) // 4
        estimated_total = estimated_input_tokens + max_completion_tokens

        _wait_for_tpm_budget(estimated_total)

        start = time.perf_counter()

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            response_format={"type": "json_object"},
            temperature=0,
            max_completion_tokens=max_completion_tokens,
        )

        actual_tokens = response.usage.total_tokens
        _usage_log.append((time.time(), actual_tokens))

        print(
            f"GROQ API (merge): {time.perf_counter()-start:.2f}s "
            f"(tokens used: {actual_tokens})"
        )

        text = (
            response.choices[0].message.content
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(text)