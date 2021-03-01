import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import {AuthContext} from '../Context/AuthContext';


const Navbar = props =>{
    const {user,setUser,isAuthenticated,setIsAuthenticated} = useContext(AuthContext);
    const onClickLogoutHandler = () =>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }
    const unauthenticatedNavbar = ()=> {
        return (
            <>
                
                    <li><Link to="/">Home</Link></li>
                
                
                    <li><Link to="/login">Login</Link></li>
                
                
                    <li><Link to="/register">register</Link></li>
                
            </>
        )
    }
    const authenticatedNavbar = ()=> {
        return (
            <>
                
                    <li><Link to="/">Home</Link></li>
                
                
                    <li><Link to="/todos">Todos</Link></li>
                
               {
                   user.role === "admin" ? 
                   
                    <li><Link to="/admin">Admin</Link></li>
                 : null
               }

               <button type = "button" className = "waves-effect waves-light btn" onClick = {onClickLogoutHandler}>Logout</button>
            </>
        )
    }


    return (
            <nav class="nav-wrapper">
                <Link to="/">
                    <div className = "brand-logo">Sscam</div>
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                   { !isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
                </ul>
    
            </nav>
    );
}

export default Navbar;