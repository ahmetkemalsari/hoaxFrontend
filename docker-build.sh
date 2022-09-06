#!/bin/bash

  BUILD_ENABLED=true

IMAGE_NAME="hoaxfrontend"
IMAGE_TAG="latest"
IMAGE=$IMAGE_NAME:$IMAGE_TAG
echo -e "IMAGE: $IMAGE"

echo -e 'Old image delete started!'
docker rmi $IMAGE
echo -e 'Old image deleted!'

if [ "$BUILD_ENABLED" = true ]; then
  echo -e 'Project build started!'
  yarn install
  yarn build
  echo -e 'Project builded!'
fi

echo -e 'Docker image build started!'
docker build ./ -f Dockerfile -t $IMAGE
echo -e 'Docker image builded.'

