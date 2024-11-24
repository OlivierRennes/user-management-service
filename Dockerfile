# Use the official Node.js image as a base

FROM node:18


# Set the working directory in the container

WORKDIR /usr/src/app


# Copy package.json and package-lock.json to the working directory

COPY package*.json ./


# Install application dependencies

RUN npm install


# Copy the rest of the application code to the container

COPY . .


# Expose the port the app runs on

EXPOSE 5000


# Command to run the application

CMD ["node", "src/server.js"]