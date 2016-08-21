import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

const Job = React.createClass({
  propTypes: {
    job: PropTypes.object,
  },

  render() {
    const {job} = this.props;
    return (<div className="job">
      <div className="delete-job" onClick={this.deleteJob}>✕</div>
      <div className="job-desc">
        <h2>{job.title}</h2>
        <p> {job.description} </p>
      </div>
      <ul className="job-bids">
        {job.bids.map((bid, j) => {
          return (<li key={j}>
            <strong>{bid.description}</strong> {bid.price}£
          </li>);
        })}
      </ul>
      <form key={'form'} className="new-bid" onSubmit={this.handleBid}>
        Enter your bid here:
        <div className="bid-price">
          <input type="number" ref={(bp) => this._bidPrice = bp} />
          <span className="currency">£</span>
        </div>
        <textarea type="text" ref={(bd) => this._bidDesc = bd} rows="5"
          placeholder="Type info about your bid..." />
        <input type="submit" value="Submit" />
      </form>
    </div>);
  },

  handleBid(e) {
    e.preventDefault();

    const bid = {
      description: e.target[0].value,
      price: e.target[1].value,
      createdAt: new Date(),
    };
  },

  deleteJob() {
    if (window.confirm('Sure you wanna delete that?')) {
      // Jobs.remove(this.props.job._id);
    }
  },
});

export default Job;
