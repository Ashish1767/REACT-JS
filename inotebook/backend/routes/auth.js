const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET='ashishisagoodboy';
const fetchuser=require('../middleware/fetchuser');
//Route1:create a user using: POST"/api/auth/createuser". Doesn't require Auth
router.post('/createUser', [
    body('email', 'enter a valid email ').isEmail(),
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    // if there are error return bad requests and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        //check whether the user with this email exists already
        let user = await User.findOne({ success,email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: 'sorry a user with this email already exists' })
        }
        const salt=await bcrypt.genSalt(10);
         const secPass= await bcrypt.hash(req.body.password,salt)
        //create a new user
        user = await User.create({
            name: req.body.name,
            password: /*req.body.password*/secPass,
            email: req.body.email,
        });
        // .then(user => res.json(user))
        // .catch(err=>{console.log(err),
        //     res.json({error:"please enter a unique value for email",message:err.message})})
       const data={
        user:{
            is:user.id
        }
       }
        const authtoken=jwt.sign(data,JWT_SECRET);
      success=true;  
        res.json({success,authtoken});
        //res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error occured');
    }
})
//Route 2:authentacate an  user using: POST"/api/auth/createuser". Doesn't require Auth
router.post('/login', [
    body('email', 'enter a valid email ').isEmail(),
    body('password', 'password cannot be blank ').exists(),
], async (req, res) => {
     // if there are error retien bad requests and the error
     let success=false;
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     } 
     const {email,password}=req.body;
try {
    let user= await User.findOne({email});
    if(!user){
        success=false;
        return res.status(400).json({success,error:"please try to login with correct credentials"})
    }
    const passwordcompare= await bcrypt.compare(password,user.password);
if(!passwordcompare){
    success=false;
    return res.status(400).json({success,error:"please try to login with correct credentials"})
}
const payload={
    user:{
        id:user.id
    }
} 
const authtoken=jwt.sign(payload,JWT_SECRET);
success=true;
res.json({success,authtoken});
} catch (error) {
    console.error(error.message);
    res.status(500).send('internal server error occured');
}
});
//Route 3:get logged in user details using: POST"/api/auth/createuser". Doesn't require Auth

router.get('/getuser', fetchuser, async (req, res) => {
     
    try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send('internal server error occured');

}})
module.exports = router;