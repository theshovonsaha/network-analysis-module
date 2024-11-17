#!/bin/bash

# GitHub repository details
REPO_NAME="network-analysis-module"
DESCRIPTION="Advanced Network Diagnostics System with AI Analysis"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Create a new repository on GitHub using the GitHub CLI
echo -e "${BLUE}Creating GitHub repository...${NC}"
gh repo create $REPO_NAME --public --description "$DESCRIPTION"

# Initialize git if not already initialized
if [ ! -d .git ]; then
    git init
fi

# Create .gitignore
cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# python
__pycache__/
*.py[cod]
venv/
EOL

# Create separate backend repository
mkdir -p ../network-analysis-backend
cp -r backend/* ../network-analysis-backend/
rm -rf backend

# Initialize the main repository
git add .
git commit -m "Initial commit: Frontend application setup"
git branch -M main
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
git push -u origin main

# Setup backend repository
cd ../network-analysis-backend
git init

# Create requirements.txt for backend
cat > requirements.txt << EOL
fastapi
uvicorn
python-dotenv
speedtest-cli
mistralai
google-generativeai
anthropic
openai
psutil
netifaces
scapy
python-multipart
EOL

# Create render.yaml
cat > render.yaml << EOL
services:
  - type: web
    name: network-analysis-api
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port \$PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.10.0
EOL

# Initialize backend repository
gh repo create $REPO_NAME-backend --public --description "Backend API for Network Analysis Module"
git add .
git commit -m "Initial commit: Backend API setup"
git branch -M main
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME-backend.git
git push -u origin main

echo -e "${GREEN}Successfully created and pushed both repositories!${NC}"
echo -e "${BLUE}Frontend: https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo -e "${BLUE}Backend: https://github.com/$GITHUB_USERNAME/$REPO_NAME-backend${NC}"