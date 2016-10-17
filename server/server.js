import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import config from './config';
import userModel from './models/users';
import userTypesModel from './models/userTypes';

const app = express();
const router = express.Router();

// override deprecated module
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

mongoose.connect(config.host + config.database, function(err) {
  if (err) {
    throw err;
  }
});

/**
 *  Use JWT
 */

if(config.jwt){

  const expressJwt = require('express-jwt');

  /**
   *  Require a token from all paths or pass in a array of paths that do not
   *  require a authentication.
   */

  app.use(expressJwt({ secret: config.secret }).unless({path: ['/api/v1/login']}));

  /**
   *  Login:
   *
   *  Creates and returns JWT along with user information.
   *  Use the provided token in request header: Key: Authorization Value: Bearer <returned key>
   *
   *  select contains a list of the fields that you would like to return at the time of authentication.
   */

  app.post('/api/v1/login', function (req, res) {
    userModel.findOne({'username': req.body.username, 'password': req.body.password}).select("+password username firstName lastName password email permissions").exec().then(r=> {
      if (!r) {
        return res.sendStatus(403);
      } else {
        let token = jwt.sign( { user: req.body.user }, config.secret );
        let response = {"token": token, "user": r };
        res.json(response);
      }
    })
  });

  /**
   *  Invalid token error handler
   */

  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });

  /**
   *  byPassJWT
   *
   *  Middleware method that can be used to insert desired actions prior to JWT check.
   *  @param req
   *  @param res
   *  @param next
   */

  function byPassJWT(req, res, next) {
    // example: allow all get requests
    // if(req.method === 'GET') {
    //   return next();
    // }
    return expressJwt({ secret: config.secret })(req, res, next);
  };

  /**
   *  Serve Models
   */

  restify.serve(router, userModel, {preMiddleware: byPassJWT});
  restify.serve(router, userTypesModel, {preMiddleware: byPassJWT});

} else {

  /**
   *  Serve Models
   *
   *  Without JWT, no middleware is needed to validate token.
   */

  restify.serve(router, userModel);
  restify.serve(router, userTypesModel);

}

app.use(router);

app.listen(config.port, () => {
  console.log('Express API server listening on port ' + config.port);
});
