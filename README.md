## Plant Guard

Plant Guard is a Plant Identification, disease diagnosis, and treatment recommendation system to assist farmers, gardeners, and agricultural experts in quickly and accurately identifying diseases affecting their crops. By leveraging advanced image recognition technology and machine learning algorithms, this system provides users with timely diagnoses, helping them take proactive measures to mitigate the spread of diseases and protect crop yields.

This project consists of a frontend built with [NextJS](https://nextjs.org/) and a RESTful API built with Python's [FastAPI](https://fastapi.tiangolo.com/).

 - clone this repo
 - download the trained model file
 - copy the downloaded model file into the training folder inside the cloned repo


### Project Dependencies


- NodeJS - [Install](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
- Python - [Download Python](https://www.python.org/downloads/)
- Python Virtual Environment - [Create A Python VE](https://docs.python.org/3/library/venv.html)
- Install VE dependencies using `pip install requirements.txt`

### Running the Project

To run this project after cloning this repository, you must start up the NextJS app and FastAPI servers separately.

#### Starting NextJS Server

1. Navigate to the `app` folder:

    ```sh
    cd /plantify-app/dev/app
    ```

2. Run the following commands:

    ```sh
    npm install
    npm run dev    # for development mode
    npm run build && npm start    # for production mode
    ```

#### Starting the FastAPI Server

1. Navigate to the `api` folder:

    ```sh
    cd /plantify-app/dev/api
    ```

2. Run the following command:

    ```sh
    uvicorn app:app --reload
    ```

After completing the steps above, open your favorite browser and access the Plant Guard app at [http://localhost:3000](http://localhost:3000).






