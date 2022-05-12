const express = require('express');
const router = express.Router();
let Courses = require('../models/course.model');


// Return all the users as a list
router.get('/', async (req, res)=>{
    Courses.find({},(err, result)=>{
        if(err){
        res.json(err);
        }
        else {
        res.status(200).json(result);
        }
    });
});

router.post('/add', async (req, res)=>{
    const course = req.body; //sent from the frontend
    const newcourse = new Courses(course);
    await newcourse.save();

    res.status(200).json(course);
});

router.get('/:courseID',async (req, res)=>{
    const course = await Courses.findById(req.params.courseID);
    res.status(200).json(course);
})


// Add prof to course
router.post('/:courseID/update', async (req, res)=>{
    const profID = req.body.profID;
    const courseID = req.params.courseID;

    var course = await Courses.findByIdAndUpdate(
        courseID,
        { $push: { course_profs: profID}},
        {new : true, useFindAndModify: false}
    )

    res.status(200).json(course);
})
module.exports = router;