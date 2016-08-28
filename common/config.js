"use strict"; //eslint-disable-line
const ENV = process.env.ENV || 'dev';

const LOCALHOST = process.env.LOCALHOST_IP || '0.0.0.0';

const config = {};

// env     = full name of the environment
// host    = where the server is served
// apphost = where client is served
// api     = where the api is served
// minify  = where to minify everything and create single bundle (or keep two separate, non-minified bundles)
// www     = cordova web folder

switch (ENV) {

  case 't':
  case 'test':
    config.env = 'test';
    config.host = 'http://' + LOCALHOST + ':3001/';
    config.apphost = 'http://' + LOCALHOST + ':8080/';
    config.minify = false;
    break;

  case 'd':
  case 'dev':
  case 'development':
    config.env = 'development';
    config.host = 'http://' + LOCALHOST + ':3000/';
    config.apphost = 'http://' + LOCALHOST + ':8080/';
    config.minify = false;
    config.debugAnalytics = false; // <- verbose, only in dev
    config.showDiffsInLogs = false; // <- slow, only in dev
    break;

  default:
    throw Error('Invalid environment (ENV): ' + ENV);

}

config.api = config.host + 'api';

export default config;
