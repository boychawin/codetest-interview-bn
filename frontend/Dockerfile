# Use a Node.js base image with the desired version
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the desired port (adjust if necessary)
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]