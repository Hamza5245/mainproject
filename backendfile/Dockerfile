FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency files and install them
COPY package*.json ./
RUN npm install

# --- REMOVING YOUR PREVIOUS EXPLICIT COPY ---
# We will rely on the comprehensive 'COPY . .' line below.
# If you kept the previous line, it would be an unnecessary duplicate,
# but it wouldn't cause the crash. The crash means the file is MISSING 
# from the build context.

# Copy the rest of your application code
# This copies your local 'auth/almumtaz-f445e-firebase-adminsdk-fbsvc-5d9604f4f6.json'
# to the container path '/usr/src/app/auth/almumtaz-f445e-firebase-adminsdk-fbsvc-5d9604f4f6.json'
COPY . .

# The port your app listens on
EXPOSE 8000

# Command to start the application
CMD ["node", "server.js"]
