import React from 'react';

const TodoItem = props => {
    return (
        <li className="collection-item avatar">
            <span className="title">Title</span>
            <p>{props.todo.name}
            </p>
            <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
        </li>
    )
}
export default TodoItem;