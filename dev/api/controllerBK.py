from fastapi import File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import io
from PIL import Image

from keras.models import Sequential


import os

import json



# model_path = os.path.join(os.path.dirname(__file__), '../../training/densenet_with_augmentation.keras')

# model_path = os.path.join(os.path.dirname(__file__), '../../training/densenet_with_augmentation.keras')
# model_path = os.path.join(os.path.dirname(__file__), '../../training/densenet_with_augmentation.keras')

# model_path = '/home/noa/Next/plantify/app/plantify-app/training/densenet_with_augmentation.keras'

model_path = "/home/noa/Next/plantify/densenet_with_augmentation_newer.keras"



# Ensure the model file exists
if not os.path.isfile(model_path):
    raise RuntimeError(f"Model file not found at {model_path}. Please ensure the file exists.")



model = load_model(model_path)

# model = Sequential()


# try:
#     # model = load_model(model_path)
#     model.load(model_path)

# except Exception as e:
#     raise RuntimeError(f"Failed to load model. Ensure the model file exists at {model_path}. Error: {str(e)}")


try:
    model = load_model(model_path)
    print("*******************Model loaded successfully*****************")
except Exception as e:
    print(f"Failed to load model. Error: {str(e)}")
    exit()

# model = load_model('../../training/trained_model.h5')


# Load class names from the JSON file
with open('species.json', 'r') as file:
    species_dict = json.load(file)



def find_prediction_image(directory, filename):
    # Walk through the directory and find the file with the given filename
    for root, dirs, files in os.walk(directory):
        if filename in files:
            return os.path.join(root, filename)
    return None  # File not found

async def identify_leaf(file: UploadFile = File(...)):
    print('i got here to verify the image', file)

    try:
        # Read the file and convert it to an image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Resize the image to the input size of your model
        image = image.resize((180, 180))  # Assuming your model expects 224x224 input size

        # Convert the image to a numpy array
        image_array = img_to_array(image)
        
        # Scale the image pixels to [0, 1]
        image_array = image_array / 255.0
        
        # Expand dimensions to match the model input shape
        image_array = np.expand_dims(image_array, axis=0)


                # results = model.predict(input_data)[0]

        
               # Perform prediction
        predictions = model.predict(image_array)
        
        # Get the predicted class ID
        predicted_class_id = str(np.argmax(predictions))
        
        # Map the predicted class ID to the species name
        predicted_species = species_dict.get(predicted_class_id, "Unknown Species")
        
        return JSONResponse(content={"prediction": predicted_species})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))








































def verify_image(img):
    print('i got here to verify the image', img)
    # print('i got here to verify the image type ', type(img))


    class_names = ['person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',  'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors',  'teddy bear', 'hair drier', 'toothbrush']

    DETECT_DIR = "runs/detect"

    results = model([img], save=True)  # return a list of Results objects

    # results = model([img], save_dir='predictions_dir')  # return a list of Results objects

    prediction_path = results[0]
    print('the pathhh...', prediction_path);


    # Process results list
    for result in results:
        boxes = result.boxes  # Boxes object for bounding box outputs
        masks = result.masks  # Masks object for segmentation masks outputs
        keypoints = result.keypoints  # Keypoints object for pose outputs
        probs = result.probs  # Probs object for classification outputs
        cls = boxes.cls.tolist()
        #result.show()  # display to screen
        # result.save(filename='result.jpg')  # save to disk

    
    new_filename= img[len("uploads/"):]

    prediction_file_path = find_prediction_image(DETECT_DIR, new_filename)
    print('the file path for the predicted => ', prediction_file_path)


    # print(len(cls))
    d_persons = []
    other_objects = []

    if len(cls) > 0:

        for class_index in cls:
            class_name = class_names[int(class_index)]
            # print('class:', class_name)

            if class_name == 'person':
                d_persons.append(class_name)
            else:
                other_objects.append(class_name)
            

        if len(d_persons) == 1 and len(other_objects) == 0:
            print('THE IMAGE PASSED VALIDATION')
            resp_obj = {
               'output_img': prediction_file_path,
               'msg': 'VALIDATION PASSED',
               'pred_message_code': 1    
            }
            return resp_obj
        else:

            print('THE IMAGE FAILED VALIDATION, MULTIPLE FACES DETECTED')
            resp_obj = {
               'input_img': '',
               'output_img': prediction_file_path,
               'msg': 'VALIDATION FAILED, ONLY IMAGES WITH A SINGLE FACE ON A PLAIN BACKGROUND CAN BE UPLOADED', 
               'pred_message_code': 0      
            }
            return resp_obj
            
        
    else:
        
        print('THE IMAGE IS BLANK')
        resp_obj = {
            'input_img': '',
            'output_img': prediction_file_path,
            'msg': 'VALIDATION FAILED, ONLY IMAGES WITH A PLAIN BACKGROUND CAN BE UPLOADED', 
            'pred_message_code': 0      
        }
        return resp_obj

