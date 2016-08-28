import {resolve, reject} from 'redux-optimist-promise';
import warning from 'warning';
import invariant from 'invariant';

const mapper = {
  reducer(actionType) { return actionType; },
  resolve,
  reject,
};

function Duck(duckName, initialState = {}) {
  warning(typeof duckName === 'string',
  'Fist argument to Duck should be a string (name of the Duck)');

  const reducers = {};

  return {
    defineAction(actionType, actionDef) {
      const {
        creator,
        ...reducerCases,
      } = actionDef;
      trackReducers(actionType, reducerCases, reducers);
      return function(...args) {
        const actionObject = creator(...args);
        actionObject.type = actionType;
        return actionObject;
      };
    },
    // additional reducer rules (to match actions from other ducks)
    addReducerCase(actionType, reducerCases) {
      checkActionTypeName(actionType);
      trackReducers(mapper, actionType, reducerCases, reducers);
    },
    // combined reducer for the duck
    reducer(state = initialState, action = {}) {
      const transformedState = reducers['*'] ?
                                reducers['*'](state, action) :
                                state;
      return reducers[action.type] ?
             reducers[action.type](transformedState, action) :
             transformedState;
    },
  };
}

function trackReducers(actionType, reducerCases, reducers) {
  if (typeof reducerCases === 'function') { // only one reducer
    warning(!reducers[actionType], `Duplicate reducer case for ${actionType}`);
    reducers[actionType] = reducerCases; // eslint-disable-line no-not-accumulator-reassign/no-not-accumulator-reassign
  } else {
    Object.keys(reducerCases).forEach(reducerType => {
      const mapping = mapper[reducerType];
      warning(mapping, 'Unknown reducer mapping "%s"', reducerType);
      const t = mapping(actionType);
      warning(!reducers[t], 'Duplicate case for "%s"', t);
      reducers[t] = reducerCases[reducerType]; // eslint-disable-line no-not-accumulator-reassign/no-not-accumulator-reassign
    });
  }
}

function checkActionTypeName(actionType, duckName) {
  invariant(typeof actionType === 'string',
    'Action Type: Expected a string. Got %s instead', actionType);
  warning(!duckName || actionType.split('.')[0] === duckName,
    `Action Type: Expected a string prefixed by '${duckName}'. ` +
    `Got '${actionType}' instead`);
}

export default Duck;
