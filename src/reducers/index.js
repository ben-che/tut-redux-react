const emptyState = {
  toDos: [{
    item: "Sample to do",
    key: 1,
    id: 1
  }]
};

// updating our reducer:

const rootReducer = (state = emptyState, action) => {
  switch(action.type) {
    case "ADD_TODO":
      let newState = Object.assign({...state, toDos: [...state.toDos, action.payload] })
      return newState;
    case "DELETE_TODO":
      let deletedToDos = state.toDos.filter(todo => todo.key !== action.payload.key)
      return {toDos: deletedToDos};
    default:
      console.log("Default case hit, state has not changed");
      return state;
  }
};

export default rootReducer;