const express = require('express');
const router = express.Router();
let Users = require('../models/user.model');
const bcrypt = require('bcryptjs');
const cors = require("cors");
const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "../config.env" });

// Return all the users as a list
router.get('/', async (req, res)=>{
    Users.find({},(err, result)=>{
        if(err){
        res.status(400).json(err);
        }
        else {
        res.status(200).json(result);
        }
    });
});

var corsOptions = {
  origin: '52.158.131.5',
  optionsSuccessStatus: 200
}

router.post("/register", async (req, res)=>{
    // Our register logic starts here
    try {
        // Get user input
        const { username, name, email, password } = req.body;

        // Validate user input
        if (!(email && password && username && name)) {
        res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await Users.find({ 'email' : email });

        if (oldUser.length) {
        return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await Users({
            username : username,
            name : name,
            email : email.toLowerCase(),
            password: encryptedPassword
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;
        await user.save();
        // return new user
        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
// Our register logic ends here
});

router.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await Users.find({ 'email': email });
        
        if (user.length && (await bcrypt.compare(password, user[0].password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          // user.token = token;
          var newUser = await Users.findByIdAndUpdate(user[0]._id, {token: token});
          // user
          return res.status(200).json(newUser);
        }
        return res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
});
module.exports = router;