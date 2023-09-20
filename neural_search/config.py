import os
import logging
from qdrant_client import QdrantClient

CODE_DIR = os.path.dirname(__file__)
ROOT_DIR = os.path.dirname(CODE_DIR)
DATA_DIR = os.path.join(ROOT_DIR, 'data')

# QDRANT_CLIENT = QdrantClient(":memory:")
QDRANT_HOST = os.environ.get("QDRANT_HOST", "localhost")
QDRANT_PORT = os.environ.get("QDRANT_PORT", 6333)
QDRANT_CLIENT = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)

COLLECTION_NAME = "activity"

LM_MODEL = 'all-MiniLM-L6-v2'
BATCH_SIZE = 256

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


