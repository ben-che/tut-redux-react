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
        this.props.addToDo({ newToDo, id })  // dispatching payload!
        this.setState({
            input : ''
        })
    }

    render() {
        return (
            <div class="row">
            <form class="col s12" onSubmit={(e)=>{this.handleSubmit(e)}}>
              <div class="row">
                <div class="input-field col s8">
                  <input id="item" type="text" value={this.state.input} onChange={(e)=>{this.handleInput(e)}}required />
                  <label for="Add Item">Add Item</label>
                </div>
                <div class="input-field col s4">
                  <input id="item" type="submit" />
                </div>
              </div>
            </form>
          </div>
        )   
    }
}

const Form = connect(null, mapDispatchToProps)(reduxForm);

export default Form;
