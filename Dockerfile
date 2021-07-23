###########################################################
#
# DUMMY API MODULE
#
###########################################################

# Setting the base to nodejs 6.11.1
FROM node:6.11.1-slim

# Maintainer
MAINTAINER Gabriel<gabrielhruiz@gmail.com>

#### Begin setup ####

# Change working directory
WORKDIR /app

COPY package.json .

# Install dependencies
RUN npm install --production

# Bundle app source
COPY . /app

# Expose port
EXPOSE 8080

# Startup
ENTRYPOINT node server.js