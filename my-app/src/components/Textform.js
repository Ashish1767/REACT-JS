import React,{useState} from 'react'

 
export default function TextforNamem(props) {
    const handleUpClick=()=>{
        console.log("uppercase was clicked"+ text);
        let newText =text.toUpperCase();
        setText(newText)
        props.showAlert("converted to uppercase","success")
    }
    const handleLowClick=()=>{
      console.log("lowercase was clicked"+ text);
      let newText =text.toLowerCase();
      setText(newText)
      props.showAlert("converted to Lowercase","success")
  }
    const handleOnChange=(event)=>{
        console.log("on change");
        setText(event.target.value)
    }
    const [text, setText]= useState("");
  return (
    <>
    <div>
<div className="mb-3" style={{color:props.mode==='dark'?'white':'#042743'}}>
    <h1>{props.heading}</h1>
  
  <textarea className="form-control"  onChange={handleOnChange}  style={{backgroundColor:props.mode==='dark'?'grey':'white'}}value={text} id="mybox" rows="8"></textarea>
  <button className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>convert to uppercase</button>
  <button className="btn btn-primary" onClick={handleLowClick}>convert to lowercase </button>
    </div>
    </div>
    <div className="conatiner my-3"style={{color:props.mode==='dark'?'white':'#042743'}}>
      <h3>
       <p> your text summary</p>
         <p> {text.length} characters  and {text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words</p>
        <p>it would take near about{0.008*text.split(" ").filter((element)=>{return element.length!==0}).length} minutes to read these words</p>
        <p>preview of text in box</p>
        <p>{text.length>0?text:"enter something to preview here"}</p>
        
      </h3>
    </div>
    </>

  )
}
