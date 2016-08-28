import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';

import routes from './routes';
import store, {loadFromStorage} from './redux/store';

const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => {
  console.log('LOCATION', location.pathname, location);
});
function loadReact() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>,
    document.getElementById('app')
  );
}

loadFromStorage(store).then(loadReact).catch((err) => {
  console.error(err || new Error('Failed to load previous state'));
  loadReact(); // load React anyway
});
