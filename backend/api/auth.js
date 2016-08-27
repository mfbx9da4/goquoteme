import express from 'express';
import passport from 'passport';

import User from '../models/user';
import {coW} from '../helpers';

const router = express.Router();

function* signup(req, res) {
  const {password, username, email} = req.body;
  const account = yield new Promise((resolve, reject) => {
    User.register(new User({username, email}), password,
      (err, result) => {
        if (err) {
          console.error(err);
          err.status = 400; // eslint-disable-line
          return reject({...err, status: 400});
        }
        return resolve(result);
      });
  });

  return res.json({account});
}

function login(req, res) {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return res.status(500).json(err); }
    if (!user) { return res.status(401).json({message: info}); }
    req.login(user, (error) => {
      if (error) { return res.status(500).json(error); }
      return res.json({user});
    });
  })(req, res);
}

router.post('/signup', coW(signup));
router.post('/login', login);


module.exports = router;
