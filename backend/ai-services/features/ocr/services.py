from features.ocr.model import vietocr_detector
from PIL import Image

class OCRService:
    def __init__(self):
        self.model = vietocr_detector

    def text_recognition_handle(self, original, detected_lines):
        print("\n==================== ĐANG THỰC HIỆN TEXT RECOGNITION ====================")
        text_regions = []
        recognition_gallery = []

        height, width = original.shape[:2]

        for index, line_data in enumerate(detected_lines):
            layout_id = line_data.get("layout_id")

            # Lấy ra vị trí dòng có chữ và giới hạn an toàn trong khung ảnh
            px_min, py_min, px_max, py_max = line_data["bbox"]
            px_min = max(0, int(px_min))
            py_min = max(0, int(py_min))
            px_max = min(width, int(px_max))
            py_max = min(height, int(py_max))

            # Kiểm tra độ hợp lý của các góc tọa độ
            if px_max <= px_min or py_max <= py_min:
                continue

            # Cắt ảnh dựa trên 4 tọa độ
            line_crop = original[py_min:py_max, px_min:px_max]
            if line_crop.size == 0:
                continue

            line_image = Image.fromarray(line_crop)

            # Gọi thông qua self.model thay vì biến toàn cục
            recognized_text = self.model.predict(line_image).strip()

            # Lưu toàn bộ thông tin Detection + OCR
            region = {
                "id": index,
                "layout_id": layout_id,
                "poly": line_data["poly"],
                "bbox": [px_min, py_min, px_max, py_max],
                "det_score": line_data["det_score"],
                "text": recognized_text
            }

            text_regions.append(region)
            recognition_gallery.append(
                (line_image, f"Line {index + 1}: {recognized_text}")
            )

        return text_regions, recognition_gallery

ocr_service = OCRService()