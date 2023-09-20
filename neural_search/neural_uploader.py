from sentence_transformers import SentenceTransformer
from typing import List
from neural_search.item import Item
import logging

from qdrant_client import models
from neural_search.config import COLLECTION_NAME, BATCH_SIZE, LM_MODEL, QDRANT_CLIENT


class NeuralUploader:

    def __init__(self, collection_name: str):
        self.collection_name = collection_name
        self.encoder = SentenceTransformer(LM_MODEL, device='cpu')
        self.qdrant_client = QDRANT_CLIENT

    def check_collection(self):
        logging.info('check the collection')
        resp = list(map(lambda x: x.name, self.qdrant_client.get_collections().collections))
        logging.info(resp)
        if self.collection_name in resp:
            return
        logging.info('initialize the collection')
        self.qdrant_client.create_collection(
            collection_name=self.collection_name,
            vectors_config=models.VectorParams(
                size=self.encoder.get_sentence_embedding_dimension(),
                distance=models.Distance.COSINE
            )
        )

    def upload(self, payload: List[Item]):
        vectors = self.encoder.encode([
            item.cleaned_text for item in payload
        ], show_progress_bar=True)

        self.qdrant_client.upload_collection(
            collection_name=COLLECTION_NAME,
            vectors=vectors,
            payload=[vars(item) for item in payload],
            ids=None,
            batch_size=BATCH_SIZE,
            parallel=2
        )
