import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import {Router, browserHistory} from 'react-router';

import logger from '../common/logger';

const node = document.getElementById('app');

browserHistory.listen(location => {
  console.log('LOCATION', location.pathname, location);
});

ReactDOM.render(
  <Router history={browserHistory}>
    {routes}
  </Router>, node);
