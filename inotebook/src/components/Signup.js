import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",confpassword:""})
    let navigate=useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
             // eslint-disable-next-line
       const  {name,email,password,confpassword}=credentials;

        const response =   await fetch("http://localhost:5000/api/auth/createuser", {
           method: 'POST',
            headers: {
              'Content-Type': 'application/json',
                },
                body:JSON.stringify({name,email,password})
            }); 
           const json= await response.json()
           console.log(json);
        if(json.success){
            // save the authtoken a nd redirect
            localStorage.setItem('token',json.authtoken); 
            navigate("/") ;
            props.showAlert("Account created suoccessfully","success")
            
        }
        else{
            props.showAlert("invalid credentials","danger")
        }
                }
                
              const onChange = (e) => {
                setCredentials({...credentials, [e.target.name]: e.target.value })
              }
    return (
        <div className='container mt-2'>
     
            <h2> Create an accont to use  Ashish's inotebook</h2>
            

            <form onSubmit={handlesubmit} >
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={credentials.name} name="name" className="form-control" onChange={onChange} id="name" aria-describedby="emailHelp"  minLength={5}  required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" value={credentials.email} name="email" className="form-control" onChange={onChange} id="email" aria-describedby="emailHelp"  minLength={5}  required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} name="password" id="password" className="form-control" minLength={5}  required />
                </div>
                <div className="form-group">
                    <label htmlFor="confpassword"> Confirm Password</label>
                    <input type="password" value={credentials.confpassword} onChange={onChange} name="confpassword" id="confpassword" className="form-control"  minLength={5}  required/>
                </div>

                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Signup
