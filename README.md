# CVWO Assignment

## Write-ups and Manual

Refer to the files "Mid-assignment write-up.pdf" and "Final submission write-up.pdf" for the write-ups.


Refer to the file "Manual.pdf" for the Manual of the Todo Application.

## Heroku link

Please visit https://test-cvwo-assignment.herokuapp.com/ for a live version of the application. The website is automatically deployed from the master branch of this repo.

## Running on Docker
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

The app will then be running on **http://{yourdockermachineip}:3000**. It may take a while to load so be patient.

### Troubleshooting
1. Try stopping and pruning all images and containers in docker.
```
docker container stop {containerids}
docker system prune -a
```
Then restart docker.

2. Try disabling autocrlf and re-cloning the repo.
```
git config --global core.autocrlf false
```

## Running locally (not preferred)

In the root directory, run:
```
yarn --cwd frontend install
sudo service postgresql start
```

If running on WSL, comment out lines 76 and 77 of frontend/node_modules/index.js (Refer to this [issue](https://github.com/sindresorhus/open/issues/154#issuecomment-562509596))

Then run:
```
heroku local -f Profile.dev
```

### Warning

Postgresql may need some additional configurations for this to work properly. If possible, run on Docker instead (see above).
