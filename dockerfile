# Base image for Node.js environment
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --production  # Or yarn install --production

# Copy the rest of the application code
COPY . .

# Expose port (adjust if your app uses a different port)
EXPOSE 5173

# Start the development server (replace with your command if different)
CMD [ "npm", "run", "dev" ]  # Or yarn dev
