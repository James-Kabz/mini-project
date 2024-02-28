
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TodoForm = () => {
    const [data, setTodos] = useState({
        title: '',
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodos((prev) => {
            return { ...prev, [name]: value}
        })
    }

    const addTodo = () => {
        return new Date().toLocaleString(); // Return current date and time
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.title.length === 0) {
            toast.error('Please enter a title', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            })
        } else {
            const newTodo = { title: data.title, date: addTodo() };
            window.location.reload()
            axios.post('http://localhost:5000/todos', newTodo)
                .then(res => {
                    toast.success('New todo has been created successfully',
                       {
                        position: toast.POSITION.TOP_RIGHT,
                           autoClose: 3000,
                        
                    })
                    history.push("/")
                })
                .catch(err => {
                    toast.error('Something went wrong when creating todo list', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    })
                })
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form">
                <h2 className="created-at">{addTodo()}</h2>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={data.title}
                    onChange={handleChange}
                    placeholder="Add New Task" />
                <button type="submit"><i class="fa fa-plus-square" aria-hidden="true"></i></button>
            </div>
            <ToastContainer/>
        </form>
    )
}

export default TodoForm;
