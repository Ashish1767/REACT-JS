import React from 'react'
// import { useEffect } from 'react';
import { Link, useLocation,useNavigate } from "react-router-dom";

//import { useNavigate } from 'react-router-dom';




const Navbar = () => {
    let navigate=useNavigate();
    const HandleLogout=()=>{
        
        localStorage.removeItem('token');
        navigate("/Login");
    }
    let location = useLocation();
    // React.useEffect(()=>{
    //     console.log(location.pathname);
    //   },[location]);
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="#">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home <span className="sr-only"></span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                    </li>

                </ul>
                {!localStorage.getItem('token')?<form className="d-flex">
                    <div id="as">
                        <Link className="btn btn-primary mx-1 " to="/Login" role="button">Log in</Link>
                        <Link className="btn btn-primary mx-1" to="/Signup" role="button">Sign Up</Link>

                    </div>

                </form>:<button className="btn.btn-primary"onClick={HandleLogout}>Log out</button>}

            </div>
        </nav>

    )
}

export default Navbar
