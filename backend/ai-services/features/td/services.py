import numpy as np
from PIL import ImageDraw
from features.td.model import td_detector

class TextDetectionService:
    def __init__(self):
        self.td_model = td_detector

    def text_detection_handle(self, original, image, layout_items):
        print("\n==================== ĐANG THỰC HIỆN TEXT DETECTION ====================")
        height, width = original.shape[:2]
        detection_image = image.copy()
        draw_detection = ImageDraw.Draw(detection_image)
        detected_lines = []

        for layout in layout_items:
            layout_id = layout["id"]
            x1, y1, x2, y2 = layout["bbox"]

            # Cắt vùng bố cục từ ảnh gốc
            region_crop = original[y1:y2, x1:x2]
            if region_crop.size == 0:
                continue

            # Chạy Text Detection trên vùng đã cắt
            detection_data = self.td_model.predict(region_crop)
            polygons = detection_data.get("dt_polys", [])
            scores = detection_data.get("dt_scores", [])

            for index, polygon in enumerate(polygons):
                polygon = np.array(polygon, dtype=np.float32)

                # Quy đổi tọa độ từ ảnh crop về ảnh gốc
                polygon[:, 0] += x1
                polygon[:, 1] += y1

                # Tính Bounding Box bao ngoài và giới hạn trong khung ảnh
                px_min = max(0, int(np.min(polygon[:, 0])))
                py_min = max(0, int(np.min(polygon[:, 1])))
                px_max = min(width, int(np.max(polygon[:, 0])))
                py_max = min(height, int(np.max(polygon[:, 1])))

                if px_max <= px_min or py_max <= py_min:
                    continue

                detected_lines.append({
                    "layout_id": layout_id,
                    "poly": polygon.astype(int).tolist(),
                    "bbox": [px_min, py_min, px_max, py_max],
                    "det_score": float(scores[index]) if index < len(scores) else 0.0
                })

        # Sắp xếp các dòng chữ theo khối layout mẹ trước, sau đó từ trên xuống dưới, trái qua phải
        detected_lines.sort(
            key=lambda item: (
                item["layout_id"],
                np.mean([p[1] for p in item["poly"]]),
                np.mean([p[0] for p in item["poly"]])
            )
        )

        # Vẽ polygon màu xanh lá lên ảnh detection
        for item in detected_lines:
            polygon_points = [(int(p[0]), int(p[1])) for p in item["poly"]]
            draw_detection.polygon(polygon_points, outline="lime", width=3)

        print(f"Tổng số vùng chữ phát hiện: {len(detected_lines)}")
        return detected_lines, detection_image

td_service = TextDetectionService()