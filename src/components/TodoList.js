
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UseFetch from "./UseFetch";

const TodoList = () => {
    const { data: todos } = UseFetch('http://localhost:5000/todos');
    const history = useHistory();

    const handleDelete = (id) => { 
        axios.delete(`http://localhost:5000/todos/${id}`)
            .then(res => {
                alert('Todo Deleted Successfully');
                history.push('/id');
            })
            .catch(error => {
                console.error('Error deleting todo:', error);
                alert('Failed to delete todo. Please try again.');
            });
    }

    const handleClick = (e, id) => {
        e.preventDefault();
        handleDelete(id);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString(); // Format the date as per your requirement
    };

    return (
        <div className='todoList'>
            {todos && todos.map((todo) => (
                <div className="preview" key={todo.id}>
                    <span className="created-at">Created at: {formatDate(todo.date)}</span>
                    <h3>{todo.title} 
                        <button onClick={(e) => handleClick(e, todo.id)}> 
                            <i className="fa fa-trash" aria-hidden="true"></i> 
                        </button>
                    </h3>
                </div>
            ))}
        </div>
    )
}

export default TodoList;
