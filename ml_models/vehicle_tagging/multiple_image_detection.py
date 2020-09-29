import google_ocr_license
import os

IMG_PATH = "ml_models/vehicle_tagging/Test_images"

for image_name in os.listdir(IMG_PATH):
    print(google_ocr_license.main(os.path.join(IMG_PATH, image_name)))