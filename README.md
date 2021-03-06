## Quick MongoDB RESTful API Server

A quick and very simple RESTful API Server that uses MongoDB and comes with sample data. You can be up and running in a few minutes. 
This will work well for people who need a RESTful API locally for development and do not always have access 
to bandwidth. More information can be found [here](http://bradjnewman.com/rest,/node,/javascript,/api,/mongodb/2016/09/29/quick-server-mongodb-express.html).

## Packages

[Express Restify Mongoose](https://github.com/florianholzapfel/express-restify-mongoose)

[Babel](https://babeljs.io/)

## Table of Contents  

[Quick Start](#running) - Assuming you have MongoDB installed.

[Installing MongoDB](#installing-mongodb)

[Adding Your Own Schema](#adding-your-own-schema)  

[Available Endpoints](#available-endpoints)  

[Importing Sample Data](#importing-sample-data)  

[Interaction](#interaction)  

[Add JWT](#add-jwt)  

## Installing MongoDB

If you have not already installed Mongo. You can find installs here: 

[MongoDB Site](https://www.mongoDB.com/download-center#community)

#### Windows - After Install
If you are running Windows assure that you have the following environment variable:
 ```PATH=%PATH%;C:/Program Files/MongoDB/Server/3.2/bin/```
 
**Note:** The path may vary depending on the current Mongo version.
 
#### Mac - After Install
You will need to set a Path variable in you .bash_profile in order to start Mongo from the command line.

1. From the command line it is easier to locate your Mongo path for copy paste. Type: ```find / -name 'mongod'```.
2. Look for the path that ends with ```bin/mongod```.
3. Replace the path here with the path you just copied: 
```
echo "PATH=/your/path/here/bin/:$PATH" >> ~/.bash_profile
. ~/.bash_profile
```


## Adding Your Own Schema

Below I will show a brief example of how to add additional models to your schema.
I have created an example schema for users. Feel free to skip to step 3 if you are not looking to add anything else.

### Step 1

Create a mongoose model and schema in the ```server/models``` folder to represent the JSON structure you want to interact with.

Example Usage ```users.js```:

```
import mongoose from 'mongoose';

const userModel = mongoose.model('user', new mongoose.Schema({
  email: { type: String, index: true },
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  permissions: {
    admin: { type: Boolean }
  }
}));

export default userModel
```

#### Step 2 

Import your model into ```server/server.js``` and onto step 3.
 
 
#### Step 3

Serve the model in the ```server/server.js``` file.

```
restify.serve(router, userModel);
```

#### Step 4

Modify the config file here: ```server/config.js```

```
const config = {
    'database': 'test', // Whatever you would like to name your database.
    'port': 3000,
    'host': 'mongoDB://localhost:27017/'
};
```

## Running

Don't forget to install packages:

```
npm install
```

Starting MongoDB and the Server: 

```
Mac: npm run start-mac
Windows: npm run start-win
```

## Available Endpoints

```
 GET http://localhost/api/v1/user/count
 GET http://localhost/api/v1/user
 POST http://localhost/api/v1/user
 DELETE http://localhost/api/v1/user

 GET http://localhost/api/v1/user/:id
 GET http://localhost/api/v1/user/:id/shallow
 PUT http://localhost/api/v1/user/:id
 POST http://localhost/api/v1/user/:id
 PATCH http://localhost/api/v1/user/:id
 DELETE http://localhost/api/v1/user/:id
```

## Importing Sample Data

If you would like to import sample data. 

#### Step 1
Assure that MongoDB is running, or you have run the ```npm run mongo-mac``` in another terminal window.
 
#### Step 2
From the command line run the following:

```
mongoimport --db test --collection users --drop --file sampleData.json --jsonArray
```

**Note:** replace the word ```test``` in the string above with whatever you have named your database.

## Add JWT

To turn on JWT set ```jwt``` in the config file to ```true```.

After JWT is turned on, you will need to get a token by authenticating via the post route: ```/api/v1/login```. When a valid
username and password string is sent the JSON object that is returned will contain the authentication token. To use this token to call
other end-points you will need to pass the following information in the header.

````Authorization: Bearer <Token returned during authentication.>````

## Interaction

Need help building or interacting with your API? I highly suggest looking at [Postman](https://www.getpostman.com/) 

