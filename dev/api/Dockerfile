# backend/Dockerfile
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

WORKDIR /api

COPY requirements.txt ./

COPY models /app/models

# Upgrade pip to the latest version
RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
