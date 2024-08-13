import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
import json
import os
from PIL import Image
import io
from pydantic import BaseModel

# Paths to identification models
I_MODEL_PATHS = [
    '/home/noa/Next/plantify/app/venv/plantify-app/models/vanilla.h5',
    '/home/noa/Next/plantify/app/venv/plantify-app/models/vgg16_vanilla.h5',
    '/home/noa/Next/plantify/app/venv/plantify-app/models/inception.h5'
]
# I_MODEL_PATHS = [
#     '/app/models/vanilla.h5',
#     '/app/models/vgg16_vanilla.h5',
#     '/app/models/inception.h5'
# ]

# Paths to disease models
# D_MODEL_PATHS = [
#     '/home/noa/Next/plantify/app/venv/plantify-app/models/plant-disease-vanilla.h5',
   
# ]

D_MODEL_PATHS = [
    '/home/noa/Next/plantify/app/venv/plantify-app/models/disease-vanilla.h5',
    '/home/noa/Next/plantify/app/venv/plantify-app/models/disease-vgg16.h5',
    '/home/noa/Next/plantify/app/venv/plantify-app/models/disease-inception.h5',

   
]

# D_MODEL_PATHS = [
#     '/app/models/disease-vanilla.h5',
#     '/app/models/disease-vgg16.h5',
#     '/app/models/disease-inception.h5',

# ]


POSITION_WEIGHTS = [5, 3, 1]  # Example weights: 1st place gets 5 points, 2nd gets 3, 3rd gets 1

# Global variable for models
i_models = []
all_loaded_successfully = False

def load_identification_models():
    global i_models, all_i_loaded_successfully
    all_i_loaded_successfully = True
    for model_path in I_MODEL_PATHS:
        try:
            i_models.append(load_model(model_path))
            print(f"****Model loaded successfully from {model_path}")
        except Exception as e:
            print(f"Failed to load model from {model_path}. Error: {str(e)}")
            all_i_loaded_successfully = False

# Global variable for models
d_models = []
all_d_loaded_successfully = False

def load_disease_models():
    global d_models, all_d_loaded_successfully
    all_d_loaded_successfully = True
    for model_path in D_MODEL_PATHS:
        try:
            d_models.append(load_model(model_path))
            print(f"Model loaded successfully from {model_path}")
        except Exception as e:
            print(f"Failed to load model from {model_path}. Error: {str(e)}")
            all_d_loaded_successfully = False



# def load_species_dict(classes_path):
#     with open(classes_path, 'r') as f:
#         species_dict = json.load(f)
#     # Convert keys to integers
#     species_dict = {int(k): v for k, v in species_dict.items()}
#     return species_dict



def load_image(img_path):
    with open(img_path, 'rb') as file:
        img_bytes = file.read()
    return Image.open(io.BytesIO(img_bytes))

def load_identification_classes():
    classes = []
    with open('species.txt', 'r') as file:
        for line in file:
            classes.append(line.strip())
    return classes

def load_disease_classes():
    classes = []
    with open('disease_species.txt', 'r') as file:
        for line in file:
            classes.append(line.strip())
    return classes





def predict_identification(position_weights, image):
    if image is not None:
        img = image.resize((150, 150))  # Ensure it is (150, 150, 3)
        img_array = img_to_array(img)  # This should ensure it has 3 channels
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        img_array = img_array / 255.0  # Normalize to 0-1 range

        class_labels = load_identification_classes()
        num_classes = len(class_labels)
        aggregated_scores = np.zeros(num_classes)

        for model in i_models:
            predictions = model.predict(img_array)[0]  # Get predictions for the single image
            sorted_indices = np.argsort(predictions)[::-1]  # Sort indices by prediction value

            print(predictions);

            for position, weight in enumerate(position_weights):
                if position < len(sorted_indices):
                    aggregated_scores[sorted_indices[position]] += weight

        # Normalize scores to percentages
        total_score = np.sum(aggregated_scores)
        percentage_confidences = (aggregated_scores / total_score) * 100

        return percentage_confidences
    else:
        return []





def identify_leaf(image_path):
    if not all_i_loaded_successfully:
        print("Not all models loaded successfully.")
        return None

    image = load_image(image_path)

    results = []
    try:
        predictions = predict_identification(POSITION_WEIGHTS, image)
        class_labels = load_identification_classes()
        top_3_indices = np.argsort(predictions)[-3:][::-1]
        for i in top_3_indices:
            print(f"Class: {class_labels[i]}, Confidence: {predictions[i]:.2f}%")
            # results.append(f"Class: {class_labels[i]}, Confidence: {predictions[i]:.2f}%")
            results.append(f"{class_labels[i]} - {predictions[i]:.2f}%")

    except Exception as e:
        print(f"Error: {e}")
        return None

    print(results)
    return results






def predict_diagnosis(position_weights, image):
    if image is not None:
        img = image.resize((150, 150))  # Ensure it is (150, 150, 3)
        img_array = img_to_array(img)  # This should ensure it has 3 channels
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        img_array = img_array / 255.0  # Normalize to 0-1 range

        class_labels = load_identification_classes()
        num_classes = len(class_labels)
        aggregated_scores = np.zeros(num_classes)

        for model in i_models:
            predictions = model.predict(img_array)[0]  # Get predictions for the single image
            sorted_indices = np.argsort(predictions)[::-1]  # Sort indices by prediction value

            print(predictions);

            for position, weight in enumerate(position_weights):
                if position < len(sorted_indices):
                    aggregated_scores[sorted_indices[position]] += weight

        # Normalize scores to percentages
        total_score = np.sum(aggregated_scores)
        percentage_confidences = (aggregated_scores / total_score) * 100

        return percentage_confidences
    else:
        return []


def diagnose_leaf(image_path):
    if not all_d_loaded_successfully:
        print("Not all models loaded successfully.")
        return None

    image = load_image(image_path)

    results = []
    try:
        predictions = predict_diagnosis(POSITION_WEIGHTS, image)
        class_labels = load_disease_classes()
        top_3_indices = np.argsort(predictions)[-3:][::-1]
        for i in top_3_indices:
            result = {
                'class': class_labels[i],
                'confidence': f"{predictions[i]:.2f}%"
            }
            print(f"Class: {result['class']}, Confidence: {result['confidence']}")
            results.append(result)
    except Exception as e:
        print(f"Error: {e}")
        return None

    print(results)
    return results

# Load models once when the script is executed
load_identification_models()
load_disease_models()
