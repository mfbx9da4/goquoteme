import React, {PropTypes} from 'react';
import JobCreator from '../components/JobCreator';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {addJob} from '../ducks/jobs';
import Job from '../components/Job.jsx';


const Home = React.createClass({
  propTypes: {
    jobs: PropTypes.array,
    addJob: PropTypes.func,
  },

  getInitialState() {
    return {
      submitActive: false,
    };
  },

  renderJobs() {
    const {jobs} = this.props;
    return (<div className="jobs-container">
      {(jobs || []).map((job, i) => {
        return (<Job job={job} key={i} />);
      })}
    </div>);
  },

  render() {
    return (
      <div>
        <div className="header">
          <h1><b>Go</b>QuoteMe</h1>
        </div>
        <div className="container">
          <JobCreator />
          {this.renderJobs()}
        </div>
      </div>
    );
  },
});

function mapStateToProps(state) {
  return {
    jobs: state.jobs.items,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
