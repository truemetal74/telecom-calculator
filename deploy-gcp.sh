#!/bin/bash

# Deploy Telecom Calculator to Google Cloud Run

# Configuration
PROJECT_ID=${GCP_PROJECT_ID:-"your-project-id"}
SERVICE_NAME="telecom-calculator"
REGION=${GCP_REGION:-"us-central1"}
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_message() {
    echo -e "${2}${1}${NC}"
}

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    print_message "Error: gcloud CLI is not installed. Please install it first." "$RED"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_message "Error: Docker is not installed. Please install it first." "$RED"
    exit 1
fi

# Check if PROJECT_ID is set
if [ "$PROJECT_ID" = "your-project-id" ]; then
    print_message "Error: Please set GCP_PROJECT_ID environment variable or update PROJECT_ID in this script." "$RED"
    exit 1
fi

print_message "Starting deployment to Google Cloud Run..." "$GREEN"
print_message "Project ID: ${PROJECT_ID}" "$YELLOW"
print_message "Service Name: ${SERVICE_NAME}" "$YELLOW"
print_message "Region: ${REGION}" "$YELLOW"

# Configure gcloud
print_message "\nConfiguring gcloud..." "$GREEN"
gcloud config set project ${PROJECT_ID}

# Enable required APIs
print_message "\nEnabling required APIs..." "$GREEN"
gcloud services enable cloudbuild.googleapis.com containerregistry.googleapis.com run.googleapis.com

# Build Docker image
print_message "\nBuilding Docker image..." "$GREEN"
docker build -t ${IMAGE_NAME} .

# Configure Docker to use gcloud as a credential helper
print_message "\nConfiguring Docker authentication..." "$GREEN"
gcloud auth configure-docker

# Push image to Google Container Registry
print_message "\nPushing image to Google Container Registry..." "$GREEN"
docker push ${IMAGE_NAME}

# Deploy to Cloud Run
print_message "\nDeploying to Cloud Run..." "$GREEN"
gcloud run deploy ${SERVICE_NAME} \
    --image ${IMAGE_NAME} \
    --platform managed \
    --region ${REGION} \
    --allow-unauthenticated \
    --port 80 \
    --memory 256Mi \
    --cpu 1

# Get the service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region=${REGION} --format='value(status.url)')

print_message "\n✅ Deployment completed successfully!" "$GREEN"
print_message "Service URL: ${SERVICE_URL}" "$YELLOW"
print_message "\nTo update the deployment, simply run this script again." "$GREEN"