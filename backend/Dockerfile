# Use official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port
EXPOSE 5000

# Start the app
CMD ["npm", "run", "dev"]