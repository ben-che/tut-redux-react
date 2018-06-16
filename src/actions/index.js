export const addToDo = toDo => ({
    type: "ADD_TODO", 
    payload: toDo 
});

export const deleteToDo = toDo => ({
    type: "DELETE_TODO",
    payload:toDo
})