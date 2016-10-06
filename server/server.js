import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import cors from 'cors';

import config from './config';
import userModel from './models/users';

const app = express();
const router = express.Router();

// override deprecated module
mongoose.Promise = global.Promise;

/**
 *  Created with restify-mongoose: https://florianholzapfel.github.io/express-restify-mongoose/
 *
 *  GET http://localhost/api/v1/user/count
 *  GET http://localhost/api/v1/user
 *  POST http://localhost/api/v1/user
 *  DELETE http://localhost/api/v1/user
 *
 *  GET http://localhost/api/v1/user/:id
 *  GET http://localhost/api/v1/user/:id/shallow
 *  PUT http://localhost/api/v1/user/:id
 *  POST http://localhost/api/v1/user/:id
 *  PATCH http://localhost/api/v1/user/:id
 *  DELETE http://localhost/api/v1/user/:id
 */

app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

mongoose.connect(config.host + config.database, function(err) {
  if (err) {
    throw err;
  }
});

// serve models
restify.serve(router, userModel);

app.use(router);

app.listen(config.port, () => {
  console.log('Express API server listening on port ' + config.port);
});
