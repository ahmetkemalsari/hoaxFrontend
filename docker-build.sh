#!/bin/bash

VM_NEXUS_REPOSITORY="aksari"

echo -e "Image name: (example: jenkinsbuildformyapp, default: jenkinsbuildformyapp)"
read IMAGE_NAME
if [ -z "$IMAGE_NAME" ]; then
  IMAGE_NAME="jenkinsbuildformyapp"
fi

echo -e "Tag name: (example: v1.1.1, default: latest)"
read IMAGE_TAG
if [ -z "$IMAGE_TAG" ]; then
  IMAGE_TAG="latest"
fi

echo -e "Do you want push the image to $VM_NEXUS_REPOSITORY repository? (y:n default)"
read -n1 PUSH
if [ "$PUSH" == "y" ]; then
  IMAGE=$VM_NEXUS_REPOSITORY/$IMAGE_NAME:$IMAGE_TAG
  PUSH_ENABLED=true
else
  IMAGE=$IMAGE_NAME:$IMAGE_TAG
  PUSH_ENABLED=false
fi

echo -e "Do you want to build? (y:n default)"
read -n1 BUILD
if [ "$BUILD" == "y" ]; then
  BUILD_ENABLED=true
else
  BUILD_ENABLED=false
fi

echo -e ""
echo -e "PUSH_ENABLED: $PUSH_ENABLED"
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
docker build . -t $IMAGE
echo -e 'Docker image builded.'

if [ "$PUSH_ENABLED" = true ]; then
  docker push $IMAGE
  echo -e 'Image pushed.'
fi
