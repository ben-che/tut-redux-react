import React, { Component } from 'react';
import List from "./components/List";
import Form from "./components/Form"

class App extends Component {
  render() {
    return (
      <div className="container">
        <h2 style={{"textAlign":"center"}}>To Do List</h2>
          <List />
          <Form />
      </div>
    );
  }
}

export default App;
