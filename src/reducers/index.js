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