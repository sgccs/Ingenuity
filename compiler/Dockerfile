# Stage 1: Base image with necessary language runtimes
FROM node:18 AS base

# Install Python and essential packages
RUN apt-get update && apt-get install -y python3

# Stage 2: C++ compiler and Java
FROM base AS compilers
RUN apt-get update && apt-get install -y g++ default-jdk bc

# Create a shared volume to store code and input
VOLUME /usersubmissions
WORKDIR /usersubmissions

# Copy the run_code.sh script to the container
COPY run_code.sh .

# Set environment variables
ENV LANG=""
ENV CODE=""
ENV INPUT=""
ENV EXPECTED_OUTPUT=""
ENV TIMELIMIT=""
ENV FILENAME=""

# Set the default command to run the run_code.sh script
CMD ["./run_code.sh"]
