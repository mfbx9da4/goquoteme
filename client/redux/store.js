import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import optimistPromiseMiddleware from 'redux-optimist-promise';
import objectToPromise from 'redux-object-to-promise';
import createHashHistory from 'history/lib/createHashHistory';
// import filterDecorator from 'redux-storage-decorator-filter';
import {save, load} from 'redux-localstorage-simple';

import redirector from './middleware/redirect';
import reducer from './reducers';
import config from '../../common/config';

export const history = createHashHistory({
  queryKey: false,
});

// combine reducers into one
const storageReducer = storage.reducer(reducer);

// create storage engine wrapping reducers
const engine = createEngine('goquoteme');
// const myDucks = ['jobs'];
// engine = filterDecorator(engine, myDucks);

const storageMiddleware = storage.createMiddleware(engine);

const logger = createLogger({collapsed: true});
// debugger;
const middlewares = [
  // reduxRouterMiddleware,
  save({namespace: 'goquoteme'}),
  redirector,
  logger,
  storageMiddleware,
  objectToPromise({baseURL: config.api, timeout: 10000},
    {key: 'gq_token'}),
  optimistPromiseMiddleware(),
];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(
  storageReducer,
  load({namespace: 'goquoteme'})
);

export const loadFromStorage = storage.createLoader(engine);

export default store;
