# CVWO Assignment
To run the docker container, first download [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/).

Once downloaded, check your docker machine's ip by running:
```
docker-machine ip
```

And use that ip to change the dockermachineip args in docker-compose.yml

Then use the following commands (in order) in the root directory of this repo:
```
docker-compose build
docker-compose run backend rake db:create
docker-compose run backend rake db:migrate
docker-compose up
```

The app will then be running on **http://{dockermachineip}:3000**.

# Troubleshooting
1. Try stopping and pruning all images and containers in docker.
```
docker container stop {containerids}
docker system prune -a
```
Then restart docker.

2. Try disabling autocrlf if you are not on windows
```
git config --global core.autocrlf false
```
