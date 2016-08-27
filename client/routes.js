const React = require('react');
const {Route, IndexRoute} = require('react-router');

const Home = require('./views/Home.jsx');

const routes = (
  <Route path="/" component={Home}>
  </Route>
);

export default routes;
