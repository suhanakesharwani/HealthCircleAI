import io

import easyocr
import fitz
import numpy as np
from pdf2image import convert_from_bytes
from PIL import Image, ImageOps
import time
from .models import MedicalReport


reader = easyocr.Reader(
    ["en"],
    gpu=False,
)


class OCRService:
    MIN_TEXT_LENGTH = 50

    def extract_text(self, file_bytes, file_type):
        start = time.perf_counter()

        if file_type == MedicalReport.FileType.PDF:
            text = self.extract_pdf(file_bytes)
        else:
            text = self.extract_image(file_bytes)

        print(f"OCRService total: {time.perf_counter() - start:.2f}s")

        return text

    def extract_pdf(self, file_bytes):
        print("========== PDF PROCESSING START ==========")

        

        # Try native PDF text extraction
        doc = fitz.open(stream=file_bytes, filetype="pdf")

        extracted = []

        for i, page in enumerate(doc):
            # print(page.get_text("dict"))
            page_text = page.get_text().strip()

            print(f"Page {i + 1}: {len(page_text)} characters")

            if page_text:
                print(page_text[:300])

            extracted.append(page_text)

        doc.close()

        text = "\n".join(extracted).strip()

        print(f"Total extracted characters: {len(text)}")

        if len(text) >= self.MIN_TEXT_LENGTH:
            print("✅ Native PDF extraction succeeded. OCR skipped.")
            return text

        print("⚠️ Native extraction failed. Falling back to OCR...")

        # OCR fallback
        pages = convert_from_bytes(
            file_bytes,
            dpi=100,
            thread_count=2,
            fmt="jpeg",
        )

        all_text = []

        for i, page in enumerate(pages):
            page.thumbnail((1000, 1400))
            print(f"OCR page {i + 1}/{len(pages)}")

            page = self.preprocess(page)

            print(page.size)
            
            start = time.perf_counter()


            result = reader.readtext(
                np.array(page),
                detail=0,
                paragraph=True,
            )
            print(f"Page {i+1} OCR: {time.perf_counter() - start:.2f}s")


            all_text.extend(result)

        print("✅ OCR completed.")

        return "\n".join(all_text)

    def extract_image(self, file_bytes):
        print("Processing image with OCR...")

        image = Image.open(io.BytesIO(file_bytes))

        image = self.preprocess(image)

        result = reader.readtext(
            np.array(image),
            detail=0,
            paragraph=True,
        )

        return "\n".join(result).strip()

    def preprocess(self, image):
        image = ImageOps.exif_transpose(image)
        image = image.convert("L")
        image = ImageOps.autocontrast(image)

        return image