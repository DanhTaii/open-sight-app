from io import BytesIO

from fastapi import FastAPI, File, HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError
from starlette.concurrency import run_in_threadpool

app = FastAPI()

def _run_document_pipeline(image: Image.Image, filename: str):
    from app.services import process_document_pipeline

    return process_document_pipeline(image, filename=filename)


@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        image = Image.open(BytesIO(contents))
        image.load()
    except (UnidentifiedImageError, OSError, ValueError) as exc:
        raise HTTPException(
            status_code=400,
            detail="File upload không phải ảnh hợp lệ.",
        ) from exc

    filename = file.filename or "uploaded_image"
    return await run_in_threadpool(_run_document_pipeline, image, filename)
