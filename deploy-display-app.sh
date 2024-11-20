#!/bin/bash

# Variables
IMAGE_NAME="badi1298/display-app"
TAG="latest" # or use `$(git rev-parse --short HEAD)` for dynamic tags
DEPLOYMENT_NAME="display-app-deploy"
DOCKERFILE_PATH="dockerfiles/display-app/Dockerfile"
CONTEXT="display-app/"
NAMESPACE="default" # Change if not using default namespace

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME:$TAG -f $DOCKERFILE_PATH $CONTEXT

# Push the Docker image to the registry
echo "Pushing Docker image to the registry..."
docker push $IMAGE_NAME:$TAG

# Update the Kubernetes deployment
echo "Updating Kubernetes deployment..."
kubectl set image deployment/$DEPLOYMENT_NAME $DEPLOYMENT_NAME=$IMAGE_NAME:$TAG -n $NAMESPACE

echo "Deployment updated successfully!"
