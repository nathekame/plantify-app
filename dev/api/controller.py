
from ultralytics import YOLO

from PIL import Image

import os


model = YOLO('yolov8n.pt')  # pretrained YOLOv8n model


def find_prediction_image(directory, filename):
    # Walk through the directory and find the file with the given filename
    for root, dirs, files in os.walk(directory):
        if filename in files:
            return os.path.join(root, filename)
    return None  # File not found


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

