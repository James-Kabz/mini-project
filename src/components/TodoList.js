

// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import UseFetch from "./UseFetch";
// import { useState } from "react";

// const TodoList = () => {
//     const { data: todos } = UseFetch('http://localhost:5000/todos');
//     const history = useHistory();
//     const [editId, setEditId] = useState(null);

//      const handleClick = (e, id) => {
//         e.preventDefault();
//         handleDelete(id);
//     }

//       const handleEditClick = (e, id) => {
//         e.preventDefault();
//         setEditId(id);
//     }

//      const handleUpdate = (id, updatedTitle) => {
//         axios.put(`http://localhost:5000/todos/${id}`, { title: updatedTitle })
//             .then(res => {
//                 alert('Todo Updated Successfully');
//                 setEditId(null);
//                 history.push('/');
//             })
//             .catch(error => {
//                 console.error('Error updating todo:', error);
//                 alert('Failed to update todo. Please try again.');
//             });
//     }

//     const handleDelete = (id) => {
//         window.location.reload()
//         axios.delete(`http://localhost:5000/todos/${id}`)
//             .then(res => {
//                 alert('Todo Deleted Successfully');
//                 history.push('/');
//             })
//             .catch(error => {
//                 console.error('Error deleting todo:', error);
//                 alert('Failed to delete todo. Please try again.');
//             });
//     }




//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleString();
//     };

//     return (
//         <div className='todoList'>
//             {todos && todos.map((todo) => (
//                 <div className="preview" key={todo.id}>
                
//                     {/* <h3>{todo.title}
//                         <button><i class="fa fa-edit" aria-hidden="true"></i></button>
//                         <button onClick={(e) => handleClick(e, todo.id)}>
//                          <i class="fa fa-check" aria-hidden="true"></i>
//                         </button>
//                         <h6 className="created-at">Created at  {formatDate(todo.date)}</h6>
//                     </h3> */}

//                      <h3>
//                         {editId === todo.id ? (
//                             <input
//                                 type="text"
//                                 value={todo.title}
//                                 onChange={(e) => handleUpdate(todo.id, e.target.value)}
//                             />
//                         ) : (
//                             <>
//                                 {todo.title}
//                                 <button onClick={(e) => handleEditClick(e, todo.id)}>
//                                     <i className="fa fa-edit" aria-hidden="true"></i>
//                                 </button>
//                                 <button onClick={(e) => handleClick(e, todo.id)}>
//                                     <i className="fa fa-check" aria-hidden="true"></i>
//                                 </button>
//                             </>
//                         )}
//                         <h6 className="created-at">Created at  {formatDate(todo.date)}</h6>
//                     </h3>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default TodoList;

import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UseFetch from "./UseFetch";

const TodoList = () => {
    const { data: todos } = UseFetch('http://localhost:5000/todos');
    const history = useHistory();
    const [editId, setEditId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');

    const handleEditClick = (id) => {
        setEditId(id);
    }

    const handleUpdate = (id) => {
        window.location.reload();
        axios.put(`http://localhost:5000/todos/${id}`, { title: updatedTitle })
            .then(res => {
                alert('Todo Updated Successfully');
                setEditId(null);
                setUpdatedTitle('');
                history.push('/');

            })
            .catch(error => {
                console.error('Error updating todo:', error);
                alert('Failed to update todo. Please try again.');
            });
    }

    const handleDelete = (id) => {
        window.location.reload();
        axios.delete(`http://localhost:5000/todos/${id}`)
            .then(res => {
                alert('Todo Deleted Successfully');
                history.push('/');
            })
            .catch(error => {
                console.error('Error deleting todo:', error);
                alert('Failed to delete todo. Please try again.');
            });
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); 
    };

    return (
        <div className='todoList'>
            {todos && todos.map((todo) => (
                <div className="preview" key={todo.id}>
                    <h3>
                        {editId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedTitle}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                />
                                <button onClick={() => handleUpdate(todo.id)}><i class="fa fa-edit" aria-hidden="true"></i></button>
                            </>
                        ) : (
                            <>
                                {todo.title}
                                <button onClick={() => handleEditClick(todo.id)}>
                                    <i class="fa fa-edit" aria-hidden="true"></i>
                                </button>
                                <button onClick={() => handleDelete(todo.id)}> 
                                     <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            </>
                        )}
                        <h6 className="created-at">Created at  {formatDate(todo.date)}</h6>
                    </h3>
                </div>
            ))}
        </div>
    )
}

export default TodoList;
