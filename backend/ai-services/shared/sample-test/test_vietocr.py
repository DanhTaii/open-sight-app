from PIL import Image
from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg

# 1. Load cấu hình model
config = Cfg.load_config_from_name("vgg_transformer")

# 2. Chạy bằng CPU
config["device"] = "cpu"

# 3. Khởi tạo model
model = Predictor(config)

# 4. Đọc ảnh
image = Image.open("dla-sample-small-3.png").convert("RGB")

# 5. Inference
result = model.predict(image)

print("OCR Result:")
print(result)