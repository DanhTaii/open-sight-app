from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg
from huggingface_hub import hf_hub_download
import torch

class VietOCRModel:
    def __init__(self):
        print("Đang khởi tạo mô hình VietOCR...")
        config = Cfg.load_config_from_name('vgg_transformer')

        # Tải trọng số từ Hugging Face
        # weight_path = hf_hub_download(
        #     repo_id="ten-tai-khoan-cua-ban/vietocr-handwriting-custom",
        #     filename="transformerocr.pth"
        # )
        # config['weights'] = weight_path
        
        config['cnn']['pretrained'] = False

        # Tự động nhận diện GPU nếu có, không thì chạy CPU
        config['device'] = 'cuda:0' if torch.cuda.is_available() else 'cpu'
        config['predictor']['beamsearch'] = False

        self.predictor = Predictor(config)
        print(f"Khởi tạo VietOCR thành công trên {config['device']}!")

    def predict(self, pil_image) -> str:
        return self.predictor.predict(pil_image)

# Khởi tạo singleton instance duy nhất để dùng chung cho toàn bộ service
vietocr_detector = VietOCRModel()