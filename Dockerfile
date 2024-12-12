# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Serve the built React app using Nginx
FROM nginx:1.23-alpine

# Copy the React build output to Nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to serve the application
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
