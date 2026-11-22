from paddleocr import LayoutDetection
from shared.result_handle import get_result_data

class DLAModel:
    def __init__(self, model_name="PP-DocLayout_plus-L", model_dir=None, device="cpu"):
        print(f"Đang khởi tạo mô hình DLA ({model_name})...")

        options = {
            "model_name": model_name,
            "device": device,
            "enable_mkldnn": False,
        }

        if model_dir is not None:
            options["model_dir"] = str(model_dir)

        self.model = LayoutDetection(**options)
        print("Khởi tạo mô hình DLA thành công!")

    def predict(self, image_input):
        """Dự đoán các khối bố cục trên ảnh và trả về dict đã chuẩn hóa."""
        results = self.model.predict(image_input, batch_size=1)
        if not results:
            return {}
        return get_result_data(results[0])

dla_detector = DLAModel()
