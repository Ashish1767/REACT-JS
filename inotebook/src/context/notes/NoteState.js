
import NoteContext from "./noteContext"
import { useState } from "react";



const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = []

    // {
    //   "_id": "63f7abd5a047a2470296f4126",
    //   "user": "63ecf1ee74d5b0a9fe0cc8bc",
    //   "title": "ashi new note",
    //   "description": "please make new note",
    //   "tag": "personal",
    //   "date": "2023-02-23T18:09:25.332Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "63f7abeca046a2470296f414b",
    //   "user": "63ecf1ee74d5b0a9fe0cc8bc",
    //   "title": "ashi new note",
    //   "description": "please make new note",
    //   "tag": "personal",
    //   "date": "2023-02-23T18:09:48.146Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "63f7abeca04a2470296f414d",
    //   "user": "63ecf1ee74d5b0a9fe0cc8bc",
    //   "title": "ashi new note",
    //   "description": "please make new note",
    //   "tag": "personal",
    //   "date": "2023-02-23T18:09:48.332Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "63f7abe8ca04a2470296f414f",
    //   "user": "63ecf1ee74d5b0a9fe0cc8bc",
    //   "title": "ashi new note",
    //   "description": "please make new note",
    //   "tag": "personal",
    //   "date": "2023-02-23T18:09:48.485Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "63f76abeca04a2470296f4151",
    //   "user": "63ecf1ee74d5b0a9fe0cc8bc",
    //   "title": "ashi new note",
    //   "description": "please make new note",
    //   "tag": "personal",
    //   "date": "2023-02-23T18:09:48.702Z",
    //   "__v": 0
    // }
    

  //get a note
  const getnote = async() => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
     
    });
   
const json=await response.json()
   // console.log(json)
    setNotes(json)
    
  }
 
  const [notes, setNotes] = useState(notesinitial)
  // const s1={
  //     "name":"harry",
  //     "value":"a1"
  // }
  // const [state, setState] = useState(s1);
  // const update=()=>{
  //     setTimeout(()=>{
  //     setState({
  //         "name":"larry",
  //         "value":"b1"
  //     })
  //     },1000);
  // }



  //Add a note
  const addnote = async(title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/addnote`,{   
         method: 'POST',
         headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },               
      body: JSON.stringify({title,description,tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note))



   
  }

  //Delete a note
  const deletenote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
       });
    const json = await response.json();
    console.log(json);

    console.log("deleting the note with id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  //Edit a note
  const editnote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
       "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json)
let newNotes=JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      
      }
    }
setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={/*{state, update}*/{ notes, setNotes, addnote,deletenote,editnote,getnote }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;