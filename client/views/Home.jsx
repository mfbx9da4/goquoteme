import React, {PropTypes} from 'react';
import CreateJob from '../components/CreateJob.jsx';
import Job from '../components/Job.jsx';

const Home = React.createClass({
  propTypes: {
    jobs: PropTypes.array,
  },

  getInitialState() {
    return {
      submitActive: false,
    };
  },

  getJobs() {
    return [];
  },

  renderJobs() {
    return (<div className="jobs-container">
      {(this.props.jobs || []).map((job, i) => {
        return (<Job job={job} key={i} />);
      })}
    </div>);
  },

  render() {
    const {submitActive} = this.state;
    return (
      <div>
        <div className="header">
          <h1><b>Go</b>QuoteMe</h1>
        </div>
        <div className="container">
          <CreateJob />
          {this.renderJobs()}
        </div>
      </div>
    );
  },

  handleCreateJob(e) {
    e.preventDefault();
    const job = {
      title: e.target[0].value,
      description: e.target[1].value,
      bids: [],
    };
    if (!job.title || job.title.length < 3) {
      return;
    }
    // Jobs.insert(job);

    this._jobTitle.value = '';
    this._jobDesc.value = '';
  },

  handleTitleChange(e) {
    e.preventDefault();
    if (e.target.value && e.target.value.length >= 3) {
      this.setState({submitActive: true});
    } else {
      this.setState({submitActive: false});
    }
  },
});

module.exports = Home;
