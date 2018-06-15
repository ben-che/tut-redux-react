import React from 'react';
import { connect } from 'react-redux';

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
