# Use a Node.js base image for building Vue
FROM node:18 AS build-stage

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the client files
COPY . .

# Build the Vue app
RUN npm run build

# Use Nginx to serve the built static files
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose Nginx default port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
