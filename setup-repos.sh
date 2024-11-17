#!/bin/bash

# GitHub repository details
REPO_NAME="network-analysis-module"
DESCRIPTION="Advanced Network Diagnostics System with AI Analysis"

# Get GitHub username
GITHUB_USERNAME="theshovonsaha"
if [ -z "$GITHUB_USERNAME" ]; then
    echo "Error: Could not get GitHub username. Please make sure you're logged in with 'gh auth login'"
    exit 1
fi

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Create and push frontend repository
echo -e "${BLUE}Creating frontend repository...${NC}"
gh repo create $REPO_NAME --public --description "$DESCRIPTION"

git init
git add .
git commit -m "Initial commit: Frontend application setup"
git branch -M main
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
git push -u origin main

# Create and push backend repository
echo -e "${BLUE}Creating backend repository...${NC}"
gh repo create "$REPO_NAME-backend" --public --description "Backend API for Network Analysis Module"

cd backend
git init
git add .
git commit -m "Initial commit: Backend API setup"
git branch -M main
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME-backend.git"
git push -u origin main

echo -e "${GREEN}Successfully created and pushed both repositories!${NC}"
echo -e "${BLUE}Frontend: https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo -e "${BLUE}Backend: https://github.com/$GITHUB_USERNAME/$REPO_NAME-backend${NC}"