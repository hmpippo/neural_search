FROM python:3.9

ENV PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 

# Copy only requirements to cache them in docker layer
WORKDIR /code
COPY . /code

# Project initialization:
RUN pip install .

CMD python -m neural_search.service

