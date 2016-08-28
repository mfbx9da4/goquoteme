import React, {PropTypes} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addJob} from '../ducks/jobs';

const JobCreator = React.createClass({
  propTypes: {
    addJob: PropTypes.func,
  },

  getInitialState() {
    return {
      submitActive: false,
    };
  },

  render() {
    const {submitActive} = this.state;
    return (
      <div className="job-create">
        <h2>Create a job:</h2>
        <form className="new-job"
          onSubmit={this.handleCreateJob}>
          <input type="text" ref={(jt) => this._jobTitle = jt}
            placeholder="Name your job"
            onChange={this.handleTitleChange} />
          <textarea type="text" ref={(jd) => this._jobDesc = jd}
            className="desc"placeholder="Describe your job" rows="8" />
          <button type="submit" value="Submit"
            className={'submit ' + (submitActive ? 'active' : 'disabled')}>
            Submit
          </button>
        </form>
      </div>
    );
  },

  handleCreateJob(e) {
    e.preventDefault();
    if (!this.state.submitActive) {
      return;
    }
    const job = {
      title: e.target[0].value,
      description: e.target[1].value,
      // bids: [],
    };
    if (!job.title || job.title.length < 3) {
      return;
    }
    this.props.addJob(job);

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

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addJob,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCreator);
// export default CreateJob;
