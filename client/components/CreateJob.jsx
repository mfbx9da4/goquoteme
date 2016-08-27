import React, {PropTypes} from 'react';

const CreateJob = React.createClass({
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
});

export default CreateJob;
