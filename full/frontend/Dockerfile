# Stage 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all project files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve app with NGINX
FROM nginx:1.24-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
