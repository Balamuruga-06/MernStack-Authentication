import React,{useState,useContext} from 'react';
import AuthService from '../Services/AuthService';
import {AuthContext} from '../Context/AuthContext';
import Message from '../Components/Message';
import './login.css';
const Login = props => {
    const [user,setUser] = useState({username : "",password : ""});
    const [message,setMessage] = useState(null);
    
    const authContext = useContext(AuthContext);
    const onChange = e => {
        setUser({...user,[e.target.name] : e.target.value})
    }
    
    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            const {isAuthenticated,user,message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/todos');
            }
            else{
                setMessage(message);
            }
        });
    }
    return (
        
        <div className="login-div">
        <div className="row center-align" >
                <div >
                    <img className="logo " src="" alt=""/>
                </div>
        </div>
        <div className="row center-align">
                <h5>Sign in</h5>
                <h6>Use your VMedico Account</h6>
        </div>
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="input-field col s12">
                    <input type="text" 
                           name="username" 
                           onChange={onChange} 
                           className="validate" />
                    <label htmlFor="username">Username</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input type="password"
                           className="validate"
                           name="password"
                           onChange={onChange}/>
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="row">
                <div className="col s12">Not your computer? Use a Private window to sign in. <a href="#"><b>Learn more</b></a></div>
            </div>
            <div className="row"></div>
            <div className="row">
                <div className="col s6 right-align"><button type="submit" class="waves-effect waves-light btn indigo">Login</button></div>
            </div>
        </form>
             {message ? <Message message={message}></Message> : null}
        </div>
    );
}

export default Login;