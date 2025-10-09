# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency files and install them
COPY package*.json ./
RUN npm install

# Copy your application code
COPY . .

# The port your app listens on
EXPOSE 8000

# Command to start the application
CMD ["node", "server.js"]
