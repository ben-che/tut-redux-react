import React, { Component } from 'react';
import List from "./components/List"

class App extends Component {
  render() {
    return (
      <div className="container">
        <h2 style={{"textAlign":"center"}}>To Do List</h2>
          <List />
      </div>
    );
  }
}

export default App;
