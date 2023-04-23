import './App.css';

import About from './components/About';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import React, {useState} from 'react';
// import About from './components/About';
 import Alert from './components/Alert';
 import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null)
   const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
  setTimeout(() => {
    setAlert(null);
  }, 1500);

   }

const removeBodyClasses=()=>{
  document.body.classList.remove('bg-light')
  document.body.classList.remove('bg-dark')
  document.body.classList.remove('bg-primary')
  document.body.classList.remove('bg-danger')
  document.body.classList.remove('bg-success')
  document.body.classList.remove('bg-warning')
}

   const toggleMode=(cls)=>{
    removeBodyClasses()
    console.log(cls)
    document.body.classList.add('bg-'+cls)
    if(mode ==='light'){
      setMode('dark');
      document.body.style.backgroundColor="#042743";
    showAlert("dark mode has been enabled","success")
    document.title='textutils-Dark mode';
      }
    else{
      setMode('light');
      document.body.style.backgroundColor="white";
      showAlert("light mode has been enabled","success")
      document.title='textutils-Light mode';
    
    }
  }
  return (
    <>
    <Router>
    <Navbar title="textutils"  mode={mode}  toggleMode={toggleMode} />
    <Alert alert={alert}/>
    
        
   
        <div className="container">
         <Routes>
             <Route path="/about" element={<About />}/>
          
             <Route path="/" element={<Textform heading="Enter text to analyze"  mode={mode} showAlert={showAlert} />}/>
            
           </Routes>
         
         </div> 
        </Router>
     
          
  </>

  );
      }

export default App;

