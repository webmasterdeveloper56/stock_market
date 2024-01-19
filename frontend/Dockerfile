# Use an official Node runtime as a parent image
FROM node:18

# Set environment variables
ENV NODE_ENV=production

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run on container start
CMD ["npm", "start"]
