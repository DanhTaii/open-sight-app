import numpy as np
from PIL import ImageDraw
from features.dla.model import dla_detector

# Tập các nhãn bố cục có chứa văn bản cần bóc tách
TEXT_LABELS = {
    "text", "title", "doc_title", "paragraph_title",
    "header", "footer", "table", "list", "abstract",
    "reference", "para", "sec_1", "sec_2", "sec_3", "cap"
}


class DLAService:
    def __init__(self):
        self.dla_model = dla_detector

    def dla_handle(self, original, image):
        print("\n==================== ĐANG THỰC HIỆN DOCUMENT LAYOUT ANALYSIS ====================")
        height, width = original.shape[:2]
        layout_image = image.copy()
        draw_layout = ImageDraw.Draw(layout_image)

        # Chạy dự đoán bố cục
        layout_data = self.dla_model.predict(original)
        boxes = layout_data.get("boxes", [])

        layout_items = []
        for idx, item in enumerate(boxes):
            label = str(item.get("label", "")).lower()
            score = float(item.get("score", 0.0))
            x1, y1, x2, y2 = item.get("coordinate", [0, 0, 0, 0])

            # Giới hạn tọa độ an toàn trong khung ảnh
            x1 = max(0, int(x1))
            y1 = max(0, int(y1))
            x2 = min(width, int(x2))
            y2 = min(height, int(y2))

            if x2 <= x1 or y2 <= y1:
                continue

            # Chỉ giữ lại các vùng chứa văn bản
            if label in TEXT_LABELS:
                layout_items.append({
                    "id": idx,
                    "type": label,
                    "bbox": [x1, y1, x2, y2],
                    "score": score
                })

                # Vẽ khung bố cục màu đỏ lên ảnh minh họa
                draw_layout.rectangle([x1, y1, x2, y2], outline="red", width=3)
                draw_layout.text((x1, max(0, y1 - 15)), f"{label} ({score:.2f})", fill="red")

        # Sắp xếp thứ tự đọc của các khối bố cục (trên xuống dưới, trái qua phải)
        layout_items.sort(key=lambda item: (item["bbox"][1], item["bbox"][0]))

        # Đánh lại ID theo đúng thứ tự đọc mới
        for new_id, item in enumerate(layout_items):
            item["id"] = new_id

        print(f"Tổng số khối văn bản phát hiện: {len(layout_items)}")
        return layout_items, layout_image

dla_service = DLAService()