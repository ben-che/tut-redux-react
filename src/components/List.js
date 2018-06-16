import React from 'react';
import { connect } from 'react-redux';
import { deleteToDo } from './../actions/index'

const mapStateToProps = state => {
    return { toDos: state.toDos };  
};

const mapDispatchToProps = dispatch => {
    return {
        deleteToDo: toDo => dispatch(deleteToDo(toDo))
      };
}

class reduxList extends React.Component {
    deleteToDo = (key) => {
        this.props.deleteToDo({key})
    }

    render() {
        // console.log(this.props)
        let reduxListJSX = this.props.toDos.map(todo => {
            return (<div className="container" key={todo.key}>
                        <div className="col s12">
                            <div className="card blue darken-2">
                            <div className="card-content white-text">
                                <span className="card-title">{todo.key? `Item ${todo.key}` : "To Do Items"}</span>
                                <p>{todo.item}</p>
                                {todo.key? <a className="waves-effect waves-light btn-small red" onClick = { () => this.deleteToDo(todo.key) }>Delete</a> : ""}
                            </div>
                            </div>
                        </div>
                    </div>)
        })

        return ( 
            <div>
                {reduxListJSX}
            </div>
         )
    }
}


// const reduxList = ({toDos}) => toDos.map(todo => {
//     return (<div className="container" key={todo.key}>
//                 <div className="col s12">
//                     <div className="card blue darken-2">
//                     <div className="card-content white-text">
//                         <span className="card-title">{todo.key? `Item ${todo.key}` : "To Do Items"}</span>
//                         <p>{todo.item}</p>
//                         {todo.key? <a class="waves-effect waves-light btn-small red" onClick = {this.props.deleteToDo(todo.key)}>Delete</a> : ""}
//                     </div>
//                     </div>
//                 </div>
//             </div>)
// })

const List = connect(mapStateToProps, mapDispatchToProps)(reduxList)

export default List;
