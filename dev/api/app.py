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

# import logging


# logging.basicConfig(level=logging.DEBUG)





from controller import identify_leaf, diagnose_leaf
from utility import save_image



from dotenv import load_dotenv


app = FastAPI()

# CORS settings to enable remote access to localhost
# origins = [
#     os.getenv('BACKEND_URL'),
#     "http://localhost:8080",
#     "http://localhost:3000",
#     "http://127.0.0.1:8080",
#     "http://127.0.0.1:3000",
#     "http://127.0.0.1",
# ]


load_dotenv()

base_url = os.getenv('BASE_URL')
backend_port = os.getenv('BACKEND_PORT')
frontend_port = os.getenv('FRONTEND_PORT')



if base_url is not None and backend_port is not None and frontend_port is not None:
    frontend_url = base_url + ':' + frontend_port
    backend_url = base_url + ':' + backend_port

    origins = [frontend_url, backend_url]
else:
    raise ValueError("One or both environment variables 'BACKEND_URL' or 'BACKEND_PORT' are not set.")



# Configure CORS settings to allow requests from the frontend Next.js application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="images")
app.mount("/runs", StaticFiles(directory="runs"), name="images")



class ImageData(BaseModel):
    image_data: str


@app.post("/identify-plant/")
async def id_plant(request: Request, image_data: UploadFile = File(...)):


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


    if process_image is None:
        raise HTTPException(status_code=500, detail="Prediction failed")


    print('Output of process image => ' , process_image)

    return process_image


@app.post("/diagnose-plant/")
async def diagnose_plant(request: Request, image_data: UploadFile = File(...)):


    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    new_filename = f"img_{current_time}{os.path.splitext(image_data.filename)[1]}"


    img_data = await image_data.read()
    
    save_directory = "uploads"

    # Save the uploaded file to disk with the new filename
    file_path = os.path.join(save_directory, new_filename)
    with open(file_path, "wb") as buffer:
        buffer.write(img_data)


    # Process the image (replace this with your actual image processing code)
    process_image = diagnose_leaf(file_path)


    if process_image is None:
        raise HTTPException(status_code=500, detail="Prediction failed")


    return process_image



@app.post("/treat-plant/")
async def treat_plant(request: Request, image_data: UploadFile = File(...)):



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



@app.get("/test/")
async def test_plant(request: Request):
    print('this is test endpoint')
    return True

if __name__=="__main__":
    uvicorn.run(app)

# uvicorn app:app --host 10.144.121.247 --port 8000  # Binds to all interfaces
