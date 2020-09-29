import yolo_opencv
import cv2 
from firebase_admin import credentials, initialize_app, storage, db
from datetime import datetime
import os

cred = credentials.Certificate("firebase_intergration/firebase_auth.json")
initialize_app(
    cred, 
    {   'storageBucket': 'functions-801a7.appspot.com',
        'databaseURL': "https://functions-801a7.firebaseio.com",
    },
)

IMG_PATH = "ml_models/animal_tagging/Test_images"
counter = 0

for image in os.listdir(IMG_PATH):
    single_image_path = os.path.join(IMG_PATH, image)

    curr_time = str(datetime.now())
    cropped, image, animal_name = yolo_opencv.main(single_image_path)

    temp_image_path = 'temp' + str(counter) + '.jpg'
    cv2.imwrite(temp_image_path, image)

    bucket = storage.bucket()
    blob = bucket.blob(temp_image_path)
    blob.upload_from_filename(temp_image_path)
    blob.make_public()
    file_url = str(blob.public_url)
    
    os.remove(temp_image_path)

    data = {
        'animal' : animal_name,
        'link' : file_url,
        'location' : 'A',
        'time' : curr_time[:19]
    }

    ref = db.reference('animalTagging')
    ref.push(data)
    counter += 1