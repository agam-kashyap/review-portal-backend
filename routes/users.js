const express = require('express');
const router = express.Router();
let Users = require('../models/user.model');


// Return all the users as a list
router.get('/', async (req, res)=>{
    Users.find({},(err, result)=>{
        if(err){
        res.json(err);
        }
        else {
        res.json(result);
        }
    });
});


// add a user: the request must contain all the field elements in key-value pairs
router.post('/add', async (req, res)=>{
    const user = req.body; //sent from the frontend
    const newUser = new Users(user);
    await newUser.save();
  
    res.json(user);
});

module.exports = router;