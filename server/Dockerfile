# Use Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files from the server directory
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the server source code
COPY . .

# The port your server listens on (based on your index.js)
EXPOSE 3000

# Command to run the server
CMD ["node", "server.js"]