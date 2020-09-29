from google.cloud import vision
import io
from google.cloud import storage
import yolo_opencv
import cv2
import os


def detect_text(path):
    """Detects text in the file."""
    client = vision.ImageAnnotatorClient.from_service_account_json("ml_models/vehicle_tagging/Helium-c8113683cf45.json")

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    print('Texts:')

    for text in texts:
        print('\n"{}"'.format(text.description))

        vertices = (['({},{})'.format(vertex.x, vertex.y)
                    for vertex in text.bounding_poly.vertices])

        print('bounds: {}'.format(','.join(vertices)))

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
    
    try:
        return texts[0].description
    except:
        return None

def explicit():
    from google.cloud import storage

    # Explicitly use service account credentials by specifying the private key
    # file.
    storage_client = storage.Client.from_service_account_json(
        'ml_models/vehicle_tagging/Helium-c8113683cf45.json')

    # Make an authenticated API request
    buckets = list(storage_client.list_buckets())
    print(buckets)


def main(img_path):
    explicit()
    cropped_image, image = yolo_opencv.main(img_path)
    cv2.imwrite("final_image_ocr.jpg", cropped_image)
    number_plate  = detect_text("final_image_ocr.jpg")
    os.remove("final_image_ocr.jpg")
    return number_plate