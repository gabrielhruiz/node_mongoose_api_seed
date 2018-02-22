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

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Expose port
EXPOSE 8081

# Startup
ENTRYPOINT node server.js