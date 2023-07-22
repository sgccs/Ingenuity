# Stage 1: Base image with necessary language runtimes
FROM node:18 AS base

# Install Python and essential packages
RUN apt-get update && apt-get install -y python3

# Stage 2: C++ compiler
FROM base AS cpp
RUN apt-get install -y g++

# Stage 3: Java
FROM base AS java
RUN apt-get install -y default-jdk

# Stage 4: JavaScript
# (We can use the base image directly as Node.js is already installed)

# Create a shared volume to store code and input
VOLUME /usersubmissions
WORKDIR /usersubmissions

# Set environment variable to indicate the language
ENV LANG=""
ENV FILENAME=""
ENV PROBLEMID=""

# Default command to run the appropriate script based on the LANG environment variable
CMD ["bash", "-c", "case $LANG in \
                     cpp) g++ -std=c++17 -o output ${FILENAME}.cpp && ./output < ${PROBLEMID}_input.txt ;; \
                     python) python3 ${FILENAME}.py < ${PROBLEMID}_input.txt ;; \
                     java) javac ${FILENAME}.java && java Main < ${PROBLEMID}_input.txt ;; \
                     javascript) node ${FILENAME}.js < ${PROBLEMID}_input.txt;; \
                     *) echo 'Invalid or missing LANG environment variable. Set LANG to one of: cpp, python, java, javascript' ;; \
                   esac"]
