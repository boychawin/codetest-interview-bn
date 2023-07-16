# Use a Node.js base image with the desired version
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application code
COPY . .

# Expose the desired port (adjust if necessary)
EXPOSE 8000

# Start the application
CMD ["yarn", "start"]
