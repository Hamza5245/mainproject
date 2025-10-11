FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency files and install them
COPY package*.json ./
RUN npm install

# Copy the CRITICAL Firebase service account key file
# We are copying it into the 'auth' folder inside the container, 
# as the error log suggests it is needed by 'auth/sendCustomNotification.js'
# Copy the rest of your application code
COPY . .

# The port your app listens on
EXPOSE 8000

# Command to start the application
CMD ["node", "server.js"]
