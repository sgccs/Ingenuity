# Stage 1: Base image with Node.js and Python
FROM node:14 AS base
RUN apt-get update && apt-get install -y python3

# Stage 2: Install necessary language runtimes and compiler tools
FROM base AS compilers
RUN apt-get update && apt-get install -y g++ default-jdk bc

# Stage 3: Create a shared volume to store code and input
VOLUME /usersubmissions
WORKDIR /usersubmissions

# Copy the run_code.sh script to the container
COPY run_code.sh .
RUN chmod +x run_code.sh  # Give execute permission

# Set environment variables
ENV LANG=""
ENV CODE=""
ENV INPUT=""
ENV EXPECTED_OUTPUT=""
ENV TIMELIMIT=""
ENV FILENAME=""

# Stage 4: Build the Express server image
FROM node:14 AS server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]
