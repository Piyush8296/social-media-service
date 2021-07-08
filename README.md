# social-media-service
A NodeJS service which uses MongoDB to store user comments posted on the user's wall.


## Techincal Specifications
* The Backend is a REST API built in ExpressJS and NodeJS.
* MongoDB is used as the NoSQL Database.
* Server port is 9000 and MongoDB port is 27017


## Installation

# Approach 1 (with dockers)
# Prerequisites
* Docker installation on host machine

# Approach 2 (without dockers)
# Prerequisites
* NodeJS 10.0.0+ installation on host machine
* MongoDB 4.0.0+ installation on host machine


## Project Execution
* Clone this repo on your local machine

# Approach 1 (with dockers)
* Change working directory to this cloned repo directory 
```
	docker build . -t <IMAGE_NAME>:<IMAGE_TAG>
```
  Above command will create a docker image locally on your machine.

* After successful creation of image,use that image and launch a container using following command and we are done.
```
	docker run -p 9000:9000 <IMAGE_NAME>:<IMAGE_TAG>
```

Note:- if we need to edit port 9000, then edit in "package.json" and expose the same in Dockerfile and use the same while launching the container.

# Approach 2 (without dockers)
* Change working directory to this cloned repo directory 
```
	npm install
	npm start
```

Note:- if we need to edit port 9000, then edit in "package.json".