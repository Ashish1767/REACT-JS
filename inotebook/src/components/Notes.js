import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react';
import NoteItem from './Noteitem';
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';



const Notes = (props) => {
  const context = useContext(noteContext);
  
  
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const { notes, getnote, editnote } = context;
   // eslint-disable-next-line
  let navigate = useNavigate();//const { addnote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')) {
      getnote();
      
    }
    else {
      navigate('/login')
    }
    // eslint-disable-next-line
    }, [])

  const ref = useRef(null)
  const refclose = useRef(null)
  


  const handleClick = (e) => {
    console.log("updating the note", note)
    editnote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click()
    e.preventDefault();
    props.showAlert("Updated Succesfully", "success")

    //addnote(note.title,note.description,note.tag);
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }
 
  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }

  return (
    <>
      <Addnote showAlert={props.showAlert} />


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" name="etitle" id="etitle" onChange={onChange} value={note.etitle} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} minLength={5} required />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>


      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className='container'>
          {notes.length === 0 && "no notes to display"}</div>
        {notes.map((note) => {
          return <NoteItem showAlert={props.showAlert} key={note._id} updatenote={updatenote} note={note} />;
        })}
      </div>
    </>
  )
}

export default Notes
