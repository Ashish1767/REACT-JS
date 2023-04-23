const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route 1:getall notes using: POST"/api/auth/createuser". Doesn't require Auth
router.get('/fetchallnotes', fetchuser, async(req, res) => {
    try {

    
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)
    }
   catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error occured');
    }
})

//Route 2:add a new notes using: POST"/api/auth/addnote". Doesn't require Auth
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error occured');
    }
})
//Route 3:update an existing notes using: PUT"/api/auth/updatenote". Doesn't require Auth
router.put('/updatenote/:id', fetchuser,async (req, res) => {
const{title,description,tag}=req.body;
try {
   
//create a new node
const newNote={};
if(title){newNote.title=title};
if(description){newNote.description=description};
if(tag){newNote.tag=tag };

//Find the note to be updated and update it
let note= await Note.findById(req.params.id);
if(!note){
     return res.status(404).send("not found")} 
if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed");
}
note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note});
 
} catch (error) {
    console.error(error.message);
        res.status(500).send('internal server error occured'); 
}

}
)
 //Route 4:Delete an existing notes using: DELETE"/api/auth/updatenote". Doesn't require Auth 
    router.delete('/deletenote/:id', fetchuser,async (req, res) => {   
   
    try{
    //find the note to be delete and delete it
    let note= await Note.findById(req.params.id);
    if(!note){ return res.status(404).send("not found")} 
   //Allow deletion only if user owns this note 
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("not allowed");
    }
    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"success":"note has been deleted",note:note});
     
} catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error occured'); 
}
    })
    
module.exports = router;