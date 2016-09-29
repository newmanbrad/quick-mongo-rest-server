## Quick Mongodb REST Server

A quick and very simple REST server that uses Mongodb. You can be up and running in a minute or two. 
This works will work well for people who need a RESTFUL service locally for development and do not 
always have access to bandwidth.

### Packages

[Express Restify Mongoose](https://github.com/florianholzapfel/express-restify-mongoose)

[Babel](https://babeljs.io/)

### Installing Mongodb

If you have not already installed Mongo. You can find installs here: 

[Mongodb Site](https://www.mongodb.com/download-center#community)

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


### Up and Running

I have created an example schema called users. Feel free to skip to step 3 if you are not looking to add anything else.

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
    'host': 'mongodb://localhost:27017/'
};
```

#### Step 5

Starting Mongodb: 

```
Mac: npm run mongo-mac
Windows: npm run mongo-win
```

Run the server:

In a new terminal window.

```
npm run start-server 
```

### Available interactions:

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


### Interacting

Need help building or interacting with your API? I highly suggest looking at [Postman](https://www.getpostman.com/) 

