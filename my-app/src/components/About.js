import React,{useState} from 'react'

export default function About(props) {
  let myStyle={
    color:props.mode==='dark'?'white':'black',
    backgroundColor:props.mode ==='dark'?'black':'white'
  }
    // const [myStyle,setmyStyle]=useState({
    //     color:'white',
    //     backgroundColor:'black'
    // })
    // const [btntext, setBtnText] = useState("enable dark mode")
    // // const toggleStyle=()=>{
    //     if(myStyle.color ==='black'){
    //     setmyStyle({
    //         color:'white',
    //         backgroundColor:'black',
    //         border:'2px solid white'
    //     })
    //     setBtnText("enable light mode")}
    //     else{setmyStyle({
    //         color:'black',
    //         backgroundColor:'white'
    //     })
    //     setBtnText("enable dark mode")}
    // }
  return (
    <>
    <div id="container" style={myStyle}>
    <div className="accordion" id="accordionExample"  style={myStyle}>
        <h2>about us</h2>
  <div className="accordion-item" style={myStyle}>
    <h2 className="accordion-header" id="headingOne" style={myStyle}>
      <button className="accordion-button" style={myStyle}type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" style={myStyle} className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body" style={myStyle}>
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div className="accordion-item" style={myStyle}>
    <h2 className="accordion-header" id="headingTwo" style={myStyle}>
      <button className="accordion-button collapsed"style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" style={myStyle} className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div className="accordion-item" style={myStyle}>
    <h2 className="accordion-header" id="headingThree" style={myStyle}>
      <button className="accordion-button collapsed" type="button"style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" style={myStyle} className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body" style={myStyle}>
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
    
    {/* <div className="container">
        <button  type="button" onClick={toggleStyle} className="btn btn-primary">{btntext}</button>

    </div> */}
    </div>
    </>
  )
}