import os
import google_ocr_license
from firebase_admin import credentials, initialize_app, storage, db

cred = credentials.Certificate("firebase_intergration/firebase_auth.json")
initialize_app(
    cred, 
    {   'storageBucket': 'functions-801a7.appspot.com',
        'databaseURL': "https://functions-801a7.firebaseio.com",
    },
)

IMG_PATH = "ml_models/vehicle_tagging/Test_images"

for image in os.listdir(IMG_PATH):
    try :
        single_image_path = os.path.join(IMG_PATH, image)

        bucket = storage.bucket()
        blob = bucket.blob(single_image_path)
        blob.upload_from_filename(single_image_path)
        blob.make_public()
        file_url = str(blob.public_url)

        data = {
            'deviated' : False,
            'link' : file_url,
            'overspeed' : False,
            'path' : 'A',
            'speed' : 50
        }

        key = google_ocr_license.main(single_image_path)
        ref = db.reference('speed').child(key[:len(key) - 1])

        ref.push(data)  
    except:
        continue


