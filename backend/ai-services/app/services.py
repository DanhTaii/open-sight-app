import numpy as np
from PIL import Image

from features.dla.services import dla_service
from features.ocr.services import ocr_service
from features.td.services import td_service


def _mean_score(items, score_key):
    scores = [float(item[score_key]) for item in items if item.get(score_key) is not None]
    return round(sum(scores) / len(scores), 4) if scores else None


def process_document_pipeline(pil_image: Image.Image, filename: str = "uploaded_image"):
    image = pil_image.convert("RGB")
    original = np.array(image)

    # Bước 1: Phân tích bố cục (DLA)
    layout_items, _layout_image = dla_service.dla_handle(original, image)

    # Bước 2: Phát hiện từng dòng chữ trong các khối bố cục (Text Detection)
    detected_lines, _detection_image = td_service.text_detection_handle(
        original, image, layout_items
    )

    # Bước 3: Nhận diện tiếng Việt trên từng dòng chữ (Text Recognition - VietOCR)
    text_regions, _recognition_gallery = ocr_service.text_recognition_handle(
        original, detected_lines
    )

    # Ghép các dòng OCR về đúng khối layout để client có thể hiển thị theo cấu trúc.
    text_by_layout = {}
    for region in text_regions:
        text = region.get("text", "").strip()
        if text:
            text_by_layout.setdefault(region["layout_id"], []).append(text)

    layout = [
        {
            "id": item["id"],
            "type": item["type"],
            "bbox": item["bbox"],
            "score": item["score"],
            "order": order,
            "text": "\n".join(text_by_layout.get(item["id"], [])),
        }
        for order, item in enumerate(layout_items)
    ]

    width, height = image.size
    return {
        "image": {
            "filename": filename,
            "width": width,
            "height": height,
        },
        "metrics": {
            "1_layout_confidence": _mean_score(layout_items, "score"),
            "2_text_detection_confidence": _mean_score(detected_lines, "det_score"),
            # VietOCR hiện chỉ trả text
            "3_text_recognition_confidence": None,
            "total_detected_lines": len(detected_lines),
        },
        "doc_type": None,
        "full_text": "\n".join(
            region["text"] for region in text_regions if region.get("text", "").strip()
        ),
        "layout": layout,
        "text_regions": text_regions,
    }
