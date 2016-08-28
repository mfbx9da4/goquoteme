import {combineReducers} from 'redux';
import optimist from 'redux-optimist';
import {routerReducer as routing} from 'react-router-redux';
import jobs from '../ducks/jobs';
// import me from '../ducks/me';
//
// const rest = () => {
//   // debugger;
//   console.log(routing);
//   return optimist(combineReducers({
//     routing,
//     jobs,
//     // me,
//   }));
//
// }
// console.log(rest);
// export default rest();

export default optimist(combineReducers({
  routing,
  jobs,
  // me,
}));
