# Use Node.js 14 as the base image
FROM node:23

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package*.json files into the container at /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose port 3000 (your app's port)
EXPOSE 5173

# Run your command to start the development server
CMD ["npm", "run", "dev"]