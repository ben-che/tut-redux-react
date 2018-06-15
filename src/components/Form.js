import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToDo } from './../actions/index'

const mapDispatchToProps = dispatch => {
    return {
        addToDo: toDo => dispatch(addToDo(toDo))
      };
}

class reduxForm extends Component {
    constructor() {
        super();
        this.state = {
            input: ''
        }
    }

    handleInput = (e) => {
        console.log(e.target.value)
        this.setState({
            input: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let newToDo = this.state.input;
        let id = Date.now()
        this.props.addToDo({ item:newToDo, id })  // dispatching payload!
        this.setState({
            input : ''
        })
    }

    render() {
        return (
            <div className="container">
            <form className="col s12" onSubmit={(e)=>{this.handleSubmit(e)}}>
              <div className="row">
              <div className="col s1" />
              <div className="input-field col s2">
                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                </div>
                <div className="input-field col s9">
                  <input id="item" type="text" value={this.state.input} onChange={(e)=>{this.handleInput(e)}}required />
                  <label for="Add Item">Add Item</label>
                </div>
              </div>
            </form>
          </div>
        )   
    }
}

const Form = connect(null, mapDispatchToProps)(reduxForm);

export default Form;
