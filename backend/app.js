import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import cors from 'cors';
const LocalStrategy = require('passport-local').Strategy;

import User from './models/user';
import {getConnectOptions} from '../common/config'; //eslint-disable-line

const app = express();
app.set('port', process.env.PORT || 3000);

const dbOptions = getConnectOptions();
mongoose.connect(dbOptions.connectString, dbOptions.options);
mongoose.connection.on('error', () => {
  console.error(
    'MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use cors everywhere
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from goquoteme server!');
});
app.get('/api/test-auth', (req, res) => {
  const spyro = new User({
    username: 'spypsycho',
    password: 'password',
    admin: true,
  });
  spyro.save((err) => {
    if (err) {
      return console.error(err);
    }

    console.log('\nUser saved successfully\n');
    res.status(200).send();
  });
});
app.use('/api/auth', require('./api/auth'));
app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
});


module.exports = app;
