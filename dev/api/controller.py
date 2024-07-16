import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import json
import os
from PIL import Image

from PIL import Image
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array


# Path to the model file
# model_path = '../../training/dd/densenet_with_augmentation.keras'

# model_path = '/home/noa/Next/plantify/app/plantify-app/training/densenet_with_augmentation.keras'


# model_path = 'bot_model.keras'


# Load the model

# model_path = '../../training/densenet_with_augmentation.keras'

# from tensorflow import keras

# import os
# filepath = "densenet_with_augmentation.keras"
# if not os.path.exists(filepath):
#     print("File does not exist.")
# else:
#     print("File found.")

# # filepath = "densenet_with_augmentation.keras"
# try:
#     model = keras.models.load_model(filepath)
#     print("Model loaded successfully.")
# except Exception as e:
#     print(f"Failed to load model. Error: {e}")
#     exit()


# import zipfile

# model_path = "/home/noa/Next/plantify/densenet_with_augmentation.keras"

model_path = "/home/noa/Next/plantify/densenet_with_augmentation_newer.keras"


# if zipfile.is_zipfile(filepath):
#     with zipfile.ZipFile(filepath, 'r') as zip_ref:
#         zip_ref.printdir()
#         print("The .keras file is a valid zip archive.")
# else:
#     print("The .keras file is not a valid zip archive.")




# import os
# from tensorflow import keras
# # from tf import keras

# print(tf.__version__)

# Define the file path
# filepath = os.path.abspath("densenet_with_augmentation.keras")
# print(f"Trying to load model from: {filepath}")



# try:
#     # Load the model
#     model = tf.keras.models.load_model(filepath)  # Include custom_objects if necessary
#     print("Model loaded this model successfully.")
# except Exception as e:
#     print(f"Failed to load this model. Error: {e}")

# # Check if the file exists
# if not os.path.exists(filepath):
#     print("File does not exist.")
# else:
#     print("File exists.")
#     # Check if the file is readable
#     if os.access(filepath, os.R_OK):
#         print("File is readable.")
#         try:
#             # Try loading the model
#             model = keras.models.load_model(filepath)
#             # model = keras.models.load_model(filepath, custom_objects={})

#             print("Model loaded successfully.")
#         except Exception as e:
#             print(f"Failed to load model again. Error: {e}")
#             exit()
#     else:
#         print("File is not readable. Check file permissions.")
#         exit()






try:
    model = load_model(model_path)
    print("*******************Model loaded successfully*****************")
except Exception as e:
    print(f"Failed to load model. Error: {str(e)}")
    exit()

# Load class names from the JSON file
json_path = 'species.json'
with open(json_path, 'r') as file:
    species_dict = json.load(file)




# def identify_leaf(image_path):
#     print(f"Image path: {image_path}")

#     try:
#         # Load and preprocess the image
#         image = Image.open(image_path).convert("RGB")
#         image = image.resize((180, 180))
#         image_array = img_to_array(image)
#         image_array = image_array / 255.0
#         image_array = np.expand_dims(image_array, axis=0)

#         print(f"Image array shape: {image_array.shape}")
#         print(f"Image array sample: {image_array[0, 0, 0, :]}")  # Print a sample of the preprocessed image

#         # Perform prediction
#         predictions = model.predict(image_array)
#         print(f"Predictions: {predictions}")

#         # Get top 3 predictions
#         top_3_indices = np.argsort(predictions[0])[-3:][::-1]
#         top_3_probs = predictions[0][top_3_indices]
#         print(f"Top 3 indices: {top_3_indices}")
#         print(f"Top 3 probabilities: {top_3_probs}")

#         species_list = list(species_dict.items())

#         # Get the corresponding species for the top 3 predictions
#         top_3_species = [(species_list[i][0], species_list[i][1], top_3_probs[idx]) for idx, i in enumerate(top_3_indices)]
        
#         for species in top_3_species:
#             print(f"Predicted species: Key = {species[0]}, Value = {species[1]}, Probability = {species[2]}")

#         return top_3_species

#     except Exception as e:
#         print(f"Error: {e}")
#         return "Error processing image"









def identify_leaf(image_path):
    print(f"Image path: {image_path}")

    try:
        # Load and preprocess the image
        image = Image.open(image_path).convert("RGB")
        image = image.resize((180, 180))
        # image_array = img_to_array(image)
        # image_array = image_array / 255.0
        image_array = np.expand_dims(image, axis=0)

        print(f"Image array shape: {image_array.shape}")
        print(f"Image array sample: {image_array[0, 0, 0, :]}")  # Print a sample of the preprocessed image

        # Perform prediction
        predictions = model.predict(image_array)
        print(f"Predictions: {predictions}")

        predicted_class_id = str(np.argmax(predictions))
        print(f"Predicted class ID: {predicted_class_id}")

        # Find the highest value in the matrix
        # highest_value = np.argmax(predictions[0])

        # print(f"Highest value in the matrix: {highest_value}")

        species_list = list(species_dict.items())

        # Function to get the item based on the predicted class ID
        def get_item(species_list, index):
            if len(species_list) > index:
                return species_list[index]
            else:
                return None

        # Example usage
        item = get_item(species_list, int(predicted_class_id))
        if item:
            key, value = item
            print(f"Predicted species: Key = {key}, Value = {value}")
            return item
        else:
            print("The list does not have enough items.")
            return "Unknown Species"

    except Exception as e:
        print(f"Error: {e}")
        return "Error processing image"
    



















# def identify_leaf(image_path):
#     print(f"image_path image_path {image_path}")

#     try:
#         # Load and preprocess the image
#         image = Image.open(image_path).convert("RGB")
#         image = image.resize((180, 180)) 
#         image_array = img_to_array(image)
#         image_array = image_array / 255.0
#         image_array = np.expand_dims(image_array, axis=0)

#         print(f"image_path image_path image_array {image_array}")

#         # Perform prediction
#         predictions = model.predict(image_array)


#         print(f"Index {predictions}")



#         predicted_class_id = str(np.argmax(predictions))

#         # print(f"Index {type(predicted_class_id)}")

#         print(f"Index {predicted_class_id}")


#         species_list = list(species_dict.items())
#         # print(f"Index {species_list}")

#         # Function to get the 204th item
#         def get_204th_item(species_list):
#             index = int(predicted_class_id) - 1  # 204th item is at index 203
#             if len(species_list) > index:
#                 return species_list[index]
#             else:
#                 return None

#         # Example usage
#         item_204 = get_204th_item(species_list)

#         if item_204:
#             key, value = item_204
#             print(f"The 204th item: Key = {key}, Value = {value}")
#             return item_204
#         else:
#             print("The list does not have 204 items.")
#             return "Unknown Specie"

    
#        # Function to get key-value pair by index
#         # def get_key_value_by_index(index):
#         #     if 0 <= index < len(species_list):
#         #         return species_list[index]
#         #     else:
#         #         return None


#         # key_value_pair = get_key_value_by_index(predicted_class_id)

#         # print(f"Index key_value_pair {key_value_pair}")


#         # if key_value_pair:
#         #     key, value = key_value_pair
#         #     print(f"Index {predicted_class_id}: Key = {key}, Value = {value}")
#         # else:
#         #     print(f"Index {predicted_class_id} is out of range")


#         # predicted_species = species_dict.get(int(predicted_class_id), "Unknown Species")

#         # print(f"The prediction. predicted_species: {predictions}")

#         # print(f"The prediction. predicted_class_id: {predicted_class_id}")


#         # print(f"The prediction. predicted_species: {str(predicted_species)}")



#         # return predicted_species
#     except Exception as e:
#         print(f"Error in prediction: {str(e)}")
#         return None
