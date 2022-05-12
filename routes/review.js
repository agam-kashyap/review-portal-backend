const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
let ReviewModel = require('../models/review.model');
let Courses = require('../models/course.model');
const ProfModel = require('../models/prof.model');

// Return all the ReviewModel as a list
router.get('/', async (req, res)=>{
    ReviewModel.find({},(err, result)=>{
      if(err){
      res.json(err);
      }
      else {
      res.status(200).json(result);
      }
  });
});

// Get all reviews corresponding to a course
router.get('/course/:course_name', async (req, res)=>{
  Courses.find({
    'course_name': req.params.course_name
  }, 
  (err, result)=>{
    if(err) res.json(err);
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
        res.status(200).json(result);
      }
    })
  })
});

router.get('/prof/:profID', async (req, res)=>{
  ProfModel.findById(req.params.profID, (err, result)=>{
    if(err){
      res.json(err);
    }
    else{
      let courseIDs = [];
      console.log(result);
      for(e in result.prof_courses){
        courseIDs.push(result.prof_courses[e]);
      }
      ReviewModel.find({
        'review_course': {
          '$in': courseIDs
        }
      }, (err, result)=>{
        if(err){
          res.status(400).json(err);
        }
        else {
          res.status(201).json(result);
        }
      })
    }
  })
})

router.post('/add', async (req, res)=>{
    const review = req.body; //sent from the frontend
    const newReview = new ReviewModel(review, (err, result)=>{
      if(err) return res.status(400).send("Invalid Request");
    });
    await newReview.save();

    res.status(201).json(review);
});

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