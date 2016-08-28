import Duck from '../redux/duck';
import {
  ADD_JOB,
  FETCH_JOBS,
} from '../redux/actions';

const initialState = {
  items: [],
};

const duck = new Duck('jobs', initialState);

export const addJob = duck.defineAction(ADD_JOB, {
  creator({title, description, bids = []}) {
    return {
      payload: {
        title, description, bids,
      },
    };
  },
  reducer(state, {payload}) {
    const {title, description, bids} = payload;
    return {
      ...state,
      items: state.items.concat({title, description, bids}),
    };
  },
});

export const fetchJobs = duck.defineAction(FETCH_JOBS, {
  creator() {

  },
  reducer() {

  },
});

export default duck.reducer;
