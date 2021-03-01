import React,{useState,useRef,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import './login.css';
const Register = props => {
    const [user,setUser] = useState({username : "",password : "",role : ""});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);
    const onChange = e => {
        setUser({...user,[e.target.name] : e.target.value})
    }
    
    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const {message} = data;
            setMessage(message);
            resetForm();
            if(!message.msgError)
                timerID = setTimeout(()=>{
                    props.history.push('/login');
                },2000)
        });
    }
    const resetForm = ()=>{
        setUser({username : "",password : "",role : ""});
    }
    return (
        
        <div className="login-div">
        <div className="row center-align" >
                <div >
                    <img className="logo " src="" alt=""/>
                </div>
        </div>
        <div className="row center-align">
                <h5>Sign up</h5>
                <h6>Use your VMedico Account</h6>
        </div>
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="input-field col s12">
                    <input type="text" 
                           value={user.username}
                           name="username" 
                           onChange={onChange} 
                           className="validate" />
                    <label htmlFor="username">Username</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input type="password"
                            value={user.password}
                           className="validate"
                           name="password"
                           onChange={onChange}/>
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="input-field col s12">
                    <input type="text" 
                           name="role" 
                           value={user.role}
                           onChange={onChange} 
                           className="validate" />
                    <label htmlFor="role">role</label>
                </div>
            <div className="row">
                <div className="col s12">Not your computer? Use a Private window to sign in. <a href="#"><b>Learn more</b></a></div>
            </div>
            <div className="row"></div>
            <div className="row">
                <div className="col s6 right-align"><button type="submit" class="waves-effect waves-light btn indigo">Register</button></div>
            </div>
        </form>
             {message ? <Message message={message}></Message> : null}
        </div>
    );
}

export default Register;