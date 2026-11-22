from paddleocr import TextDetection
from shared.result_handle import get_result_data

class PaddleTextDetectionModel:
    def __init__(self, model_name="PP-OCRv5_server_det", model_dir=None, device="cpu"):
        print(f"Đang khởi tạo mô hình Text Detection ({model_name})...")

        options = {
            "model_name": model_name,
            "device": device,
            "enable_mkldnn": False,
        }

        if model_dir is not None:
            options["model_dir"] = str(model_dir)

        self.model = TextDetection(**options)
        print("Khởi tạo mô hình Text Detection thành công!")

    def predict(self, image_input):
        """Dự đoán tọa độ các dòng chữ trên ảnh cắt từ DLA."""
        results = self.model.predict(image_input, batch_size=1)

        if not results:
            return {}

        return get_result_data(results[0])

td_detector = PaddleTextDetectionModel()
