import React, {useState,useContext,useEffect} from 'react';
import TodoItem from './TodoItem';
import TodoService from '../Services/TodoService';
import {AuthContext} from '../Context/AuthContext';
import Message from '../Components/Message';
import M from "materialize-css";
const Todos = props =>{
    const [todo,setTodo] = useState({name : ""});
    const [todos,setTodos] = useState([]);
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(()=>{
        TodoService.getTodos().then(data => {
            setTodos(data.todos);
        });
        M.AutoInit();
    },[]);

    const onSubmit = e => {
        e.preventDefault();
        TodoService.postTodo(todo).then(data => {
            const {message} = data;
            resetForm();
            if(!message.msgError){
                TodoService.getTodos().then(getData => {
                    setTodos(getData.todos);
                    setMessage(message);
                    
                });
            }
            else if(message.msgBody ==="unAuthorized"){
                setMessage(message);
                authContext.setUser({username : "",role : ""});
                authContext.setIsAuthenticated(false);
            }
            else{
                setMessage(message);
            }
        });
    }
    
    const onChange = e => {
        setTodo({name : e.target.value});
    }

    const resetForm = ()=>{
        setTodo({name : ""});
    }
    return (
        <div>
             <ul className="collection">
                {/* <li className="collection-item avatar">
                    <span className="title">Title</span>
                    <p>First Line <br/>
                        Second Line
                    </p>
                    <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                </li> */
                todos.map(todo => {
                    return <TodoItem key = {todo._id} todo = {todo}/>
                })
                
                }
            </ul>
            <br/>
            <form onSubmit = {onSubmit}>
                <div className="input-field col s12">
                    <input type="text" 
                           name="todo" 
                           value={todo.name}
                           onChange={onChange} 
                           className="validate" />
                    <label htmlFor="username">Todo</label>
                </div>
                <button type="submit" class="waves-effect waves-light btn indigo">Submit</button>

            </form>
            {message ? <Message message={message}></Message> : null}
        </div>
    )
}
export default Todos;