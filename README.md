# CVWO Assignment
To run the docker container, first download [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/), then use the following commands (in order) in the root directory of this repo:
```
docker-compose build
docker-compose run backend rake db:create
docker-compose run backend rake db:migrate
docker-compose up
```
