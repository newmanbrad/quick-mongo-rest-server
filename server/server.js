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
  const secret = 'big secret';

  app.use(expressJwt({ secret: secret }).unless({path: ['/api/v1/login']}));

  /**
   *  Login:
   *
   *  Creates and returns JWT along with user information.
   *  Use the provided token in request header: Key: Authorization Value: Bearer <returned key>
   */

  app.post('/api/v1/login', function (req, res) {
    userModel.findOne({'username': req.body.username, 'password': req.body.password}).select("+password username firstName lastName password email permissions").exec().then(r=> {
      if (!r) {
        return res.sendStatus(403);
      } else {
        let token = jwt.sign( { user: req.body.user }, secret );
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

  function byPassJWT(req, res, next) {
    // example: allow all get requests
    // if(req.method === 'GET') {
    //   return next();
    // }
    return expressJwt({ secret: secret })(req, res, next);
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
