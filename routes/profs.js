const express = require('express');
const router = express.Router();
const Profs = require('../models/prof.model');
const Reviews = require('../models/review.model');


// Return all the profs as a list
router.get('/', async (req, res)=>{
    Profs.find({},(err, result)=>{
        if(err){
        res.json(err);
        }
        else {
        res.status(200).json(result);
        }
    });
});


// add a single prof: the request must contain all the field elements in key-value pairs
router.post('/add', async (req, res)=>{
    const prof = req.body; //sent from the frontend
    const newProf = new Profs(prof, (err, result)=>{
        if(err) return res.status(400).send("invalid Input");
    });
    await newProf.save();

    res.status(201).json(prof);
});


// get a single prof from id
router.get('/:profID',async (req, res)=>{
    const prof = await Profs.findById(req.params.profID);
    res.status(200).json(prof);
})


// IMP: This is required to be called after EVERY NEW REVIEW is added
// IMP: This is called to update the courses of a prof too
router.post('/:profID/update', async (req, res)=>{
    // Adds a course to a prof
    // If we don't have any new course to add just don't include the courseID tag in the query. 
    // It will skip that part of code
    var profId = req.params.profID;
    var courseId = req.body.courseId;
    if(courseId!=null)
    {
        await Profs.findByIdAndUpdate(
            profId,
            { $push: { prof_courses: courseId}},
            {new : true, useFindAndModify: false}
        );
    }

    // Calculates the average values, for now just the rating and quality
    // What is it doing?
    // It is looking up all the courses that a prof teaches and then
    // It is filtering out all the reviews for all those courses
    // Then calculating the average for those
    Profs.findById(req.params.profID, function(err, result){
        if(err) return err;
        
        const pipeline = [
            {
                '$match': {
                    'review_course': {
                        "$in": result.prof_courses
                    }
                }
            },
            {
                '$group': {
                    "_id": null, 
                    "ratingAvg": {"$avg": '$prof_rate'},
                    "qualityAvg": {"$avg": '$quality'}
                }
            }
        ]

        Reviews.aggregate(pipeline,function(err, result){
            res.status(201).json(result);
        });
    })
})
module.exports = router;