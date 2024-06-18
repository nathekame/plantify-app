https://github.com/asyaf/fun_mini_projects/blob/master/streamlit_examples/resnet_pretrained.py
# https://towardsdatascience.com/demo-your-model-with-streamlit-a76011467dfb

import io
from PIL import Image
import streamlit as st
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from keras.preprocessing.image import img_to_array

# Set the path to your model
MODEL_PATH = 'C:/Users/Owner/Desktop/AIML/FoundationMachineLearningFramework/streamlit-examples/models/finetune-vgg16.keras'

def load_image():
    uploaded_file = st.file_uploader(label='Upload a whole mount slide image')
    if uploaded_file is not None:
        image_data = uploaded_file.getvalue()
        st.image(image_data)
        return Image.open(io.BytesIO(image_data))
    else:
        return None

def load_classes():
    #return classes from disease.txt folder
    classes = []
    
    with open('C:/Users/Owner/Desktop/AIML/FoundationMachineLearningFramework/streamlit-examples/idc_classes.txt', 'r') as file:
        for line in file:
            classes.append(line.strip())
    return classes

def load_custom_model():
    model = load_model(MODEL_PATH)
    return model

def predict(model, image, classes):
    if image is not None:
        # Resize the image to match the input shape of the model
        img = image.resize((180, 180))  # Adjust size based on your model's input
        img_array = img_to_array(img)  # Convert the image to a numpy array
        img_array = np.expand_dims(img_array, axis=0)  # Add a batch dimension
        print(img_array)
        # Custom preprocessing
        # Normalize the image data to 0-1 range if your model expects that
        img_array = img_array / 255.0

        # Make prediction
        predictions = model.predict(img_array)
        
        # Get top 2 predictions
        top2 = np.argsort(predictions[0])[-2:][::-1]  # Reversed to get top predictions in descending order

        for i in range(2):
            st.write(f"{classes[top2[i]]} ({predictions[0][top2[i]] * 100:.2f}%)")
    