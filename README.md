
# Neural search 
## FrontEnd: Electron(see details in README.md under directory electron-app)
## BackEnd: Qdrant + BERT + FastAPI

## Requirements

You will also need [Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/)

## Quick Start

To launch service locally, use

```
docker build -t neural_search .
docker-compose -f docker-compose-local.yaml up
```

After a successful launch, neural search API will be available at [http://localhost:8000/docs](http://localhost:8000/docs) 
