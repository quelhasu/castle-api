 <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/105/european-castle_1f3f0.png" align="right" width="100">

# Castle API
> Express API for Castle project

This tool allow accessing firebase database hotels in order to use it in the client interface.

[Express](https://expressjs.com/fr/) for API management.  
[Firebase](https://firebase.google.com/) for database management.

This project is a micro-service of _Castle_ project including [castle-client](https://github.com/quelhasu/castle-client) and [castle-cron-job](https://github.com/quelhasu/castle-cron-job).


## How to use it 
- [Docker Usage](#docker)
- [Routes](#routes)

### <a id="docker"></a> Docker Usage

First, build the Dockerfile:
```bash
$ docker build -t castle-api .
```

Now run this image previously built:
```bash
$  docker run --rm -p 4000:4000 castle-api
```

### <a id="routes"></a> Routes

#### /hotel/:destination
Returns the hotels of the destination specified in the parameter.
Ex: http://localhost:4000/hotel/france

#### /hotel/:destination/:id
Returns the hotel of the destination / id specified in the parameters.
Ex: http://localhost:4000/hotel/france/ed1834392