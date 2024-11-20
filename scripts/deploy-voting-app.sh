#!/bin/bash

# Variables
IMAGE_NAME="badi1298/voting-app"
TAG="latest" 
DEPLOYMENT_NAME="voting-app"
DEPLOYMENT_FILE="../kubernetes/voting-app-deploy.yaml"
CONTAINER_NAME="voting-container"
DOCKERFILE_PATH="../dockerfiles/voting-app/Dockerfile"
CONTEXT="../voting-app/"
NAMESPACE="default"

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME:$TAG -f $DOCKERFILE_PATH $CONTEXT

# Push the Docker image to the registry
echo "Pushing Docker image to the registry..."
docker push $IMAGE_NAME:$TAG

# Delete the Kubernetes deployment
echo "Deleting Kubernetes deployment..."
kubectl delete -f=$DEPLOYMENT_FILE

# Apply the Kubernetes deployment
echo "Applying Kubernetes deployment..."
kubectl apply -f=$DEPLOYMENT_FILE

echo "Deployment updated successfully!"
