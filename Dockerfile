FROM python:3.11-slim

WORKDIR /code

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /code/app
COPY ./knowledge_base /code/knowledge_base

EXPOSE 7860

CMD ["sh", "-c", "python app/ingest.py && uvicorn app.main:app --host 0.0.0.0 --port 7860"]