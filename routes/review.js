const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
let ReviewModel = require('../models/review.model');
let Courses = require('../models/course.model');

// Return all the ReviewModel as a list
// Pass in filter: "specialisation_name"
router.get('/', async (req, res)=>{
  if(req.body.filter!=null)
  {
    // Find the courseIDs belonging to filter
    Courses.find({
      'course_specialisation' : req.body.filter
    }, 
    (err, result)=>{
      if(err) res.json(err);
      console.log(result);
      let courseIDs = [];
      for(e in result){
        courseIDs.push(result[e]._id);
      }
      console.log(courseIDs);
      
      ReviewModel.find({
        'review_course': {
          '$in': courseIDs
        }
      }, (err, result)=>{
        if(err){
          res.json(err);
        }
        else {
          res.json(result);
        }
      })
    })
    
  }
  else 
  {
      ReviewModel.find({},(err, result)=>{
        if(err){
        res.json(err);
        }
        else {
        res.json(result);
        }
    });
  }
});

// add a single prof: the request must contain all the field elements in key-value pairs
router.post('/add', async (req, res)=>{
    const review = req.body; //sent from the frontend
    const newReview = new ReviewModel(review);
    await newReview.save();

    res.json(review);
});

/*
// Assuming we pass in all the values in the req, this code will be simplified a lot
app.post("/addReview", async (req, res)=>{
    // Assumption currently, we pass in the username and the course_name. If ID is passed we can
    // directly create the review entry
    Courses.find({course_name: 'CS606'}, (err, result)=>{
      if(err){
        res.json(err);
      }
      else {
        // res.json(result);
        // result will be of type [{ object }]
        let courseId = result[0]._id;
        Users.find({username: 'IMT2018004'}, (err, result)=>{
          if(err){
            res.json(err);
          }
          else{
            let userId = result[0]._id;
  
            var review = {
              review_user: userId,
              review_course: courseId,
              upvote: 10,
              downvote: 2,
              date: new Date(),
              prof_rate: 5,
              takeAgain: true,
              quality: 7,
              difficulty: 9,
              grading: "strict",
              attendance: true,
              project: true,
              tags: ["awesome", "wow", "great"],
              content: "Hey THis is Lorem ipsum which is not Lorem nor ipsum"
            };
  
            const newReview = new ReviewModel(review);
            newReview.save();
  
            res.json(result);
          }
        })
      }
    })
  });
*/
// get all reviews belonging to a certain specialisation


module.exports = router;


// EXAMPLE QUERY
/*

The userID we'll be able to get from the currently logged in user's info
The courseID is what we'll be able to retrieve from the selected course
{
  "review_user": "626a936f2d650e8911e4a066",
  "review_course": "626ba2233ade701a4bfcb04d",
  "upvote": 10,
  "downvote": 2,
  "date": "2022-05-05T16:40:22.234+00:00",
  "prof_rate": 6,
  "takeAgain": true,
  "quality": 6,
  "difficulty": 6,
  "grading": "strict",
  "attendance": true,
  "project": true,
  "tags": ["awesome", "wow", "great"],
  "content": "Hey THis  ipsum whichem nor ipsum"
}
*/