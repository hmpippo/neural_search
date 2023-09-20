from typing import List

from qdrant_client.http.models.models import Filter
from sentence_transformers import SentenceTransformer

from neural_search.config import LM_MODEL, QDRANT_CLIENT


class NeuralSearcher:

    def __init__(self, collection_name: str):
        self.collection_name = collection_name
        self.encoder = SentenceTransformer(LM_MODEL, device='cpu')
        self.qdrant_client = QDRANT_CLIENT

    def search(self, text: str, filter_: dict = None, top: int = 3) -> List[dict]:
        vector = self.encoder.encode(text).tolist()
        hits = self.qdrant_client.search(
            collection_name=self.collection_name,
            query_vector=vector,
            query_filter=Filter(**filter_) if filter_ else None,
            limit=top
        )
        return [hit.payload for hit in hits]
