import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import json
import os
from PIL import Image



# model_path = "/home/noa/Next/plantify/app/venv/plantify-app/training/densenet_with_augmentation.keras"

model_path = "../../training/densenet_with_augmentation.keras"


try:
    model = load_model(model_path)
    print("*****************Model loaded successfully***************")
except Exception as e:
    print(f"Failed to load model. Error: {str(e)}")
    exit()

# Load class names from the JSON file
json_path = 'species.json'
with open(json_path, 'r') as file:
    species_dict = json.load(file)


def identify_leaf(image_path):
    # print(f"image_path image_path {image_path}")

    try:
        # Load and preprocess the image
        image = Image.open(image_path).convert("RGB")
        image = image.resize((180, 180)) 
        image_array = img_to_array(image)
        image_array = image_array / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        # print(f"image_path image_path image_array {image_array}")

        # Perform prediction
        predictions = model.predict(image_array)
        predicted_class_id = str(np.argmax(predictions))

        # print(f"Index {type(predicted_class_id)}")

        print(f"Index {predicted_class_id}")


        species_list = list(species_dict.items())
        # print(f"Index {species_list}")

        # Function to get the 204th item
        def get_204th_item(species_list):

            index = int(predicted_class_id) - 1 
            if len(species_list) > index:
                return species_list[index]
            else:
                return None

        # Example usage
        item_204 = get_204th_item(species_list)

        if item_204:
            key, value = item_204
            # print(f"The 204th item: Key = {key}, Value = {value}")
            return item_204
        else:
            # print("The list does not have 204 items.")
            return "Unknown Specie"


    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return None
