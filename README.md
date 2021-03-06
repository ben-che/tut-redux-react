# Redux with React
Before diving into things, it's important to clarify that although Redux is a way to manage state within apps, it can be used outside of the Reat ecosystem, even with other libraries such as Angular or Vue.

State, as a concept, exists outside of React - think about the case of a modal - it can have two states; open or closed. Traditionally, we may have accomplished this by adding an event listener on a button, and then either appending a new element on the DOM, or adding a class to show/hide a pre-existing element. In either case, this modal has a state that can be modeled with:
```
  state: {
    modalOpen : true || false
  }
```

That being said, the reason that Redux and React are used in conjunction so often is because up until recently (read: the experiemental [Context API](https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b)), React had a poor time managing state the more complex the React application was. Redux, at its core, is a way to manage states - with updating and passing states simplified.

We can quickly learn Redux in an hour - let's spin up a React App with create-react-app:
```
create-react-app redux-tutorial
```
and bring Redux into our Node project by:
```
npm install redux --save
```

## Parts of Redux
### Store
This is where the state of the app lives. Similar to the brain of the human body, the store contains all the information and moving parts of the app.

Create a directory for our store within `/src/store/index.js` .
```
import { createStore } from "redux";
import rootReducer from "../reducers/index";
const store = createStore(rootReducer);
export default store;
```

Current folder structure:
```
.
├── node_modules
├── public
│   └── index.html
├── src
│   ├── store
│   │   └── index.js  // where our store lives
│   ├── App.js      // The mama component that is rendered in index.js
│   └── index.js    // The file that appends app on the "root" div
└── package.json
```

### Reducers
Responsible for updating the state in the store, reducers are pure functions that take the current state and and _Action_.

Create a directory for our reducers within `/src/reducers/index.js`
```
// our initial state will be empty
const emptyState = {
  toDos: []
};

// pass the empty state to rootReducer as a default parameter - meaning if rootReducer doesn't recieve an argument for state, it will default to the empty state const above
// the second argument the reducer takes is an action
// finally, because we haven't specified any actions yet, we'll just return the state so errors aren't thrown

const rootReducer = (state = emptyState, action) => state;
export default rootReducer;
```

Current folder structure:
```
.
├── node_modules
├── public
│   └── index.html
├── src
│   ├── reducers
│   │   └── index.js  
│   ├── store
│   │   └── index.js  
│   ├── App.js     
│   └── index.js    
└── package.json
```

### Actions
The last piece of the Redux trifecta - Actions are Javascript objects that are _dispatched_ to the reducer that will then trigger an update in state in the global Redux store.

Create a directory for our actions within `/src/actions/index.js`
```
// lets create an action that will add a to do item to our list

export const addToDo = toDo => ({ 
  type: "ADD_TODO", 
  payload: toDo
});

// and a sample toDo item may look like:
{
  type: "ADD_TODO",
  payload: {
    item: "Walk the doge",
    id: 1
  }
}
```

Breaking down the code above - the action type is a string that the reducer,  eventually composed of a switch statement with a number of cases, will use to identify which action to take. The payload is the updated state value that has to be brought into the store.

Current folder structure:
```
.
├── node_modules
├── public
│   └── index.html
├── src
│   ├── actions
│   │   └── index.js    // a number of different actions lives here
│   ├── reducers
│   │   └── index.js  
│   ├── store
│   │   └── index.js  
│   ├── App.js     
│   └── index.js    
└── package.json
```

## Piecing together the parts
As mentioned above, the reducer will be composed of a switch statement with a number of cases that match up with corresponding actions. The default case, however, in the case (haha) of a typo, would be to simply return the original state, with an optional console.log explaining that state has not changed.

Going inside `/src/reducers/index.js` :
```
const emptyState = {
  toDos: []
};

// updating our reducer:

const rootReducer = (state = emptyState, action) => {
  switch(action.type) {
    case "ADD_TODO":
      let newState = Object.assign( {...state, toDos: [...state.toDos, action.payload] } )
      return newState;
    default:
      console.log("Default case hit, state has not changed");
      return state;
  }
};

export default rootReducer;
```

## Rendering Redux State on React
Let's begin by installing the Redux package built for React:
```
npm install react-redux --save
```
This package grants us access to the react-redux `connect` method, the `mapStateToProps` function (think passing state down as a prop in vanilla React), which connects Redux store state to various React component props, regardless of how deeply nested the component is, and the `mapDispatchToProps` function (think event listeners / handlers), which connects Redux actions to React component props.

First, we have to wrap the entire app in a `<Provider></Provider>` tag, enabling the store to be accessible as a prop.

Within `/src/index.js` :
```
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./components/App";
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

```

Now, let's begin building a to do list within `App.js`:

Within `/src/App.js` :

```
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

```
* Note - I'm using classes from Materialize, but you can feel free to replace these with your own

Next, we have to create a List component - let's make sure our code is organized and create a components folder.

Current folder structure:
```
.
├── node_modules
├── public
│   └── index.html
├── src
│   ├── actions
│   │   └── index.js
│   ├── components
│   │   └── List.js        // *List now lives here
│   ├── reducers
│   │   └── index.js  
│   ├── store
│   │   └── index.js  
│   ├── App.js     
│   └── index.js    
└── package.json
```

Within `List.js` :

```
import React from 'react';
import { connect } from 'react-redux';

// Here, we grab the state from the store and pass it to reduxList to map over.

const mapStateToProps = state => {
    return { toDos: state.toDos };  
};

const reduxList = ({toDos}) => toDos.map(todo => {
    return (<div className="container" key={todo.id}>
                <div className="col s12">
                    <div className="card blue darken-2">
                    <div className="card-content white-text">
                        <span className="card-title">Item {todo.id}</span>
                        <p>{todo.item}</p>
                    </div>
                    </div>
                </div>
            </div>)
})

const List = connect(mapStateToProps)(reduxList)

export default List;
```

## Updating Redux State from React
Let's create a small form to handle additions in our list. Create a new component called Form.js within `/src/components/` :

Current folder structure:
```
.
├── node_modules
├── public
│   └── index.html
├── src
│   ├── actions
│   │   └── index.js
│   ├── components
│   │   ├── Form.js       // Ding ding ding
│   │   └── List.js        
│   ├── reducers
│   │   └── index.js  
│   ├── store
│   │   └── index.js  
│   ├── App.js     
│   └── index.js    
└── package.json
```

Within `Form.js` :

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToDo } from './../actions/index';

// Here, we make disptach available to our props so that we can send an action to our reducer in the submit form handler

const mapDispatchToProps = dispatch => {
    return {
        addToDo: toDo => dispatch(addToDo(toDo))
      };
}

// We create a stateful controlled form - this doesn't have to be done through Redux because we don't need this state to be accessed by other components

class reduxForm extends Component {

  // state:
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

    // here, we grab the new item from this component's state, and call the addToDo method we defined earlier and made accessible through mapDispatchToProps, and pass it a payload of the item name and a unique ID
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

// here, we actually pass the dispatch to the redux form component
const Form = connect(null, mapDispatchToProps)(reduxForm);

export default Form;
```

Try and see if you can add a way to delete individual to do items! My solution will be in the sample code.
