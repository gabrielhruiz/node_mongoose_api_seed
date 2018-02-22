# node_mongodb_api_seed
An optimized API REST project seed connecting with mongodb and is securized and dockerized.

# Content
 - Default REST controller & service
 - Default cron task service example
 - Default auth controller & service (login, signup and JWT verification)
 - MongoDB connection examples
 - Logger system
 - Module dockerized
 - Scripts .sh to deploy api on develop, staging and production with Docker
 - Swagger API specification
 - Default environment variables, depending on the environment
 - Default JWT authorization into controllers
 - Multithreading mode on production environment

# Next releases
 - Error manager system
 - Messages internationalization
 - Test plan implementation

# Get started
Add into project root a dot env file with the next lines:

 - NEWS_API_APIKEY=<your_api_key>      -> Is necessary for good cron work
 - JWT_SECRET=<your_secret>
 - JWT_EXPIRATION=1d
 - DB_NAME=<your_db_name>