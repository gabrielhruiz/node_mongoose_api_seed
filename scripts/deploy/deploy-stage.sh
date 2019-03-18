docker rm -f module-api
docker build -t dummy/module-api .
clear
docker run -d -p 8085:8085 --name module-api --restart on-failure -e "NODE_ENV=staging" dummy/module-api