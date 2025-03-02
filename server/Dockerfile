# Use Node.js 14 as the base image
FROM node:23-slim AS base

RUN apt-get update -y && apt-get install -y openssl

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package*.json files into the container at /app
COPY package*.json ./

# Copy the rest of your application code into the container
COPY . .

# Install dependencies
RUN npm install

# Build the NestJS application
RUN npm run build

# Expose port 3000 (your app's port)
EXPOSE 3000

# Run your command to start the NestJS server
CMD ["npm", "run", "start:prod"]