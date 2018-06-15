import React, { Component } from 'react';

class List extends Component {
  render() {
    return (
        <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">To Do 1</span>
              <p>Walk the Dog</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
