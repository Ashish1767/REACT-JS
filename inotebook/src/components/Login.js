import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("logged in successfully", "success")
            navigate("/");
        }
        else {
            props.showAlert("invalid details", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }



    return (
        <div className='mt-2'>
            <h2>Log in  to continue to Ashish's inotebook</h2>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" value={credentials.email} name="email" className="form-control" onChange={onChange} id="email" aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} name="password" id="password" className="form-control" required />
                </div>

                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Login
