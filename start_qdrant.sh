
docker run -p 6333:6333 \
    -v $(pwd)/data/qdrant_storage:/qdrant/storage:z \
    qdrant/qdrant:v1.2.2


