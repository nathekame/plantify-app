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








from controller import verify_image


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

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["GET", "POST"],
#     allow_headers=["*"],
# )

# # Enable CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Update with your frontend URL
#     allow_credentials=True,
#     allow_methods=["POST"],
#     allow_headers=["*"],
# )

    # allow_origins=["http://localhost:3000", "http://10.144.121.247:3000"],  # Update with your Next.js application's origin
    # allow_origins=["*"],  # Update with your Next.js application's origin
    # allow_origins=["http://localhost:3000"],  # Update with your Next.js application's origin


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

# # http://localhost:8000/outputs/detect/predict7/img_20240416_163433.jpg

# http://localhost:8000/outputs/detect/predict/img_20240416_163433.jpg
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )



# @app.post("/upload/")
# async def upload_files(image_data: List[UploadFile] = File(...)):
# # async def upload_image(image_data: UploadFile = File(...)):


#     results = []
#     for file in files:
#         print('THE FILE NAME TYPE ==> ', type(file.filename))

#         try:
#             # Save the uploaded file to a temporary location
#             save_directory = "/uploads"
#             with open(os.path.join(save_directory, file.filename), "wb") as buffer:
#                 shutil.copyfileobj(file.file, buffer)

#             print(type(file.filename))
            
#             # Pass the path of the temporary file to the ML processing function
#             # result = verify_image(file.filename)
#             # results.append(result)
            
#             # Clean up the temporary file after processing
#             # os.remove(temp_file_path)
#         except Exception as e:
#             raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")

#     return JSONResponse(content={"message": "Files uploaded and processed successfully", "results": results})



# @app.post("/upload/")
# async def upload_files(files: List[UploadFile] = File(...)):
#     results = []
#     for file in files:
#         try:
#             # Save the uploaded file permanently
#             with open(file.filename, "wb") as buffer:
#                 shutil.copyfileobj(file.file, buffer)
            
#             # Pass the path of the saved file to the ML processing function
#             result = verify_image(file.filename)
#             results.append(result)
            
#         except Exception as e:
#             raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")

#     return JSONResponse(content={"message": "Files uploaded and processed successfully", "results": results})


#working code

class ImageData(BaseModel):
    image_data: str

@app.post("/upload/")
# async def upload_image(image_data: ImageData):
async def upload_image(request: Request, image_data: UploadFile = File(...)):

    # Decode the Base64 image data
    # base64_image = image_data.image.split(",")[1]  # Remove the data URL prefix
    # image_bytes = base64.b64decode(base64_image)

    # with open(image_data.filename, "wb") as buffer:
    #     buffer.write(await image_data.read())

    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    new_filename = f"img_{current_time}{os.path.splitext(image_data.filename)[1]}"



    img_data = await image_data.read()
    
    save_directory = "uploads"
    # with open(os.path.join(save_directory, image_data.filename), "wb") as buffer:
    #     to_buffer = buffer.write(img_data)
    #     print('to buddfer -<> ', image_data.filename)

    # Save the uploaded file to disk with the new filename
    file_path = os.path.join(save_directory, new_filename)
    with open(file_path, "wb") as buffer:
        buffer.write(img_data)

    # Construct the direct URL path of the saved file
    file_url = f"{request.base_url}{file_path}"

    print('THE URL => ' , file_url)
    print('THE URL file_path => ' , file_path)



    # print(type(image_data.filename))

    # # print('the image bytes ==> ' , image_bytes)
    # print('the image bytes raw image_data from request ==> ' , type(image_data))

    # Read the image file
    # contents = await image_bytes.read()

    # contents = await image_data.read()


    # print('the image bytes ==> ' , contents)
    # print('the image bytes ==> ' , type(contents))

    
    # Decode the Base64 image data
    # base64_image = base64.b64encode(img_data).decode("utf-8")

    # print('the image bytes base 64 ==> ' , base64_image)
    # print('the image bytes base 64 ==> ' , type(base64_image))

    # Convert bytes to PIL Image
    # image_D = Image.open(BytesIO(img_data))

    # Process the image (replace this with your actual image processing code)
    processed_image = verify_image(file_path)

    resp_obj = {
        'input_image': file_path,
        'output_image': processed_image['output_img'],
        'msg': processed_image['msg'],
        'pred_message_code': processed_image['pred_message_code']
  
    }


    # print('THE VERIFY IMAGE FUNCTION RESPONSE ===> ',processed_image)

    # print('THE VERIFY IMAGE FUNCTION RESPONSE Resp_obj ===> ',resp_obj)

    
    # Save or return the processed image (replace this with your actual response)
    return resp_obj





# Define endpoint to receive questions and return answers
# @app.post("/upload")
# async def upload(image: Image):
#     # Process the question (you may need to preprocess it based on your chatbot's requirements)
#     # processed_question = preprocess_question(question.question)
    
#     # # Make predictions
#     # prediction = model.predict(processed_question)
    
#     # # Post-process the prediction (e.g., convert it to text)
#     # answer = postprocess_prediction(prediction)

#     print('the quesion ', image.image)

#     get_response =  verify_image(image.image)

#     print('the quesion ', get_response)
    
#     return {"answer": get_response}
#     # return True


# # Add support for OPTIONS method
# @app.options("/ask")
# async def options_ask():
#     return {"Allow": "POST"}  # Return allowed methods for the endpoint



def postprocess_prediction(prediction):
    # Add postprocessing steps here
    return "answer"


# uvicorn.run(app, host=["localhost", "10.144.121.247"], port=8000)


if __name__=="__main__":
    uvicorn.run(app)


# uvicorn app:app --host 10.144.121.247 --port 8000  # Binds to all interfaces
