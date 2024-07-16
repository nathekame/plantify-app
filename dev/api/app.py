from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from pydantic import BaseModel
import uvicorn

from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import JSONResponse
from typing import List
import shutil
import os

import base64
from io import BytesIO
from PIL import Image
from datetime import datetime

from fastapi.staticfiles import StaticFiles




from controller import identify_leaf
from utility import save_image


import pickle

app = FastAPI()

# CORS settings to enable remote access to localhost
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:3000",
    "http://127.0.0.1",
]

# allow_origins=origins,


# # Configure CORS settings to allow requests from your Next.js application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your Next.js application's origin
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="images")
app.mount("/runs", StaticFiles(directory="runs"), name="images")




class ImageData(BaseModel):
    image_data: str

@app.post("/identify-plant/")
async def upload_image(request: Request, image_data: UploadFile = File(...)):



    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    new_filename = f"img_{current_time}{os.path.splitext(image_data.filename)[1]}"



    img_data = await image_data.read()
    
    save_directory = "uploads"

    # Save the uploaded file to disk with the new filename
    file_path = os.path.join(save_directory, new_filename)
    with open(file_path, "wb") as buffer:
        buffer.write(img_data)

    # Construct the direct URL path of the saved file
    file_url = f"{request.base_url}{file_path}"

    # print('THE URL => ' , file_url)
    # print('THE URL file_path => ' , file_path)



    # print(type(image_data.filename))

    # print('the image bytes ==> ' , image_bytes)
    # print('path to identify ==> ' , file_path)

    # Process the image (replace this with your actual image processing code)
    process_image = identify_leaf(file_path)


    key, value = process_image

    resp_obj = {
        'input_image': file_path,
        # 'output_image': process_image['output_img'],
        'class_id': key,
        'specie': value

    }


    return resp_obj



# def postprocess_prediction(prediction):
#     # Add postprocessing steps here
#     return "answer"



@app.post("/diagnose-plant/")
async def upload_image(request: Request, image_data: UploadFile = File(...)):



    # current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    # new_filename = f"img_{current_time}{os.path.splitext(image_data.filename)[1]}"



    # img_data = await image_data.read()
    
    # save_directory = "uploads"

    # # Save the uploaded file to disk with the new filename
    # file_path = os.path.join(save_directory, new_filename)
    # with open(file_path, "wb") as buffer:
    #     buffer.write(img_data)

    # # Construct the direct URL path of the saved file
    # file_url = f"{request.base_url}{file_path}"

    get_file_path = save_image(image_data)
    print('the image bytes for diagnsis ==> ' , get_file_path)



  
    process_image = identify_leaf(get_file_path)


    key, value = process_image

    resp_obj = {
        'input_image': get_file_path,
        # 'output_image': process_image['output_img'],
        'class_id': key,
        'specie': value

    }


    return resp_obj



@app.post("/treat-plant/")
async def upload_image(request: Request, image_data: UploadFile = File(...)):



    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    new_filename = f"img_{current_time}{os.path.splitext(image_data.filename)[1]}"



    img_data = await image_data.read()
    
    save_directory = "uploads"

    # Save the uploaded file to disk with the new filename
    file_path = os.path.join(save_directory, new_filename)
    with open(file_path, "wb") as buffer:
        buffer.write(img_data)

    # Construct the direct URL path of the saved file
    file_url = f"{request.base_url}{file_path}"

 
    process_image = identify_leaf(file_path)


    key, value = process_image

    resp_obj = {
        'input_image': file_path,
        # 'output_image': process_image['output_img'],
        'class_id': key,
        'specie': value

    }


    return resp_obj







# uvicorn.run(app, host=["localhost", "10.144.121.247"], port=8000)

if __name__=="__main__":
    uvicorn.run(app)

# uvicorn app:app --host 10.144.121.247 --port 8000  # Binds to all interfaces
