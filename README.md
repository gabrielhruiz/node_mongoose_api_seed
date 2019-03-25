# node_mongodb_api_seed
An optimized API REST project seed connecting with mongodb and is securized and dockerized.

# Content
 - Default REST controller & service
 - Default auth controller & service (login, signup and JWT verification)
 - Mongoose connection examples
 - Logger system
 - Module dockerized
 - Scripts .sh to deploy api on develop, staging and production with Docker
 - Swagger API specification
 - Default environment variables, depending on the environment
 - Default JWT authorization into controllers
 - Airbnb ESlint code style

# Get started
Add into project root a dot env file with the next lines:

 - PORT=8080
 - API_VERSION=v1
 - JWT_SECRET=my_jwt_secret
 - JWT_EXPIRATION=1d
 - DB_NAME=database
 - MONGO_URI=mongodb://localhost:27017/database