# Use an official Node.js runtime as a parent image
FROM node:20.14.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY src/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY src .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
