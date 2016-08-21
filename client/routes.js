const React = require('react');
const {Route, IndexRoute} = require('react-router');

const Home = require('./views/Home.jsx');

module.exports = (
  <Route path="/" component={Home}>
  </Route>
);
