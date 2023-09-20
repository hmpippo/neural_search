from fastapi import FastAPI

from neural_search.config import COLLECTION_NAME
from neural_search.neural_searcher import NeuralSearcher
from neural_search.neural_uploader import NeuralUploader
from typing import List
from neural_search.item import Item

app = FastAPI()

neural_searcher = NeuralSearcher(collection_name=COLLECTION_NAME)
neural_uploader = NeuralUploader(collection_name=COLLECTION_NAME)

@app.get("/api/search")
async def read_item(q: str, topK: int = 3):
    return {"result": neural_searcher.search(text=q, top=topK)}

@app.post("/api/upload")
async def upload_item(payload: List[Item]):
    neural_uploader.upload(payload)
    return {"message": "Items created successfully"}


if __name__ == "__main__":
    neural_uploader.check_collection()
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
