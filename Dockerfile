# Use Node.js 20 as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Build the project
RUN npm run build

# Install serve to host the application
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]