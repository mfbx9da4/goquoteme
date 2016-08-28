const React = require('react');
const {Route} = require('react-router');

// const Home = require('./views/Home.jsx');
import Home from './views/Home';
const routes = (
  <Route path="/" component={Home}>
  </Route>
);

export default routes;
