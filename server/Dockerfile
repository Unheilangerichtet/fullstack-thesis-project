# Use a Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the server files
COPY . .

# Expose the port your server listens on
EXPOSE 8081

# Start the server
CMD ["node", "src/app.js"]
