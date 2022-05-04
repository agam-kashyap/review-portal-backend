/*
* Mongoose Tutorial with Schema information: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#mongoose_primer
* Many To Many: https://www.bezkoder.com/mongodb-many-to-many-mongoose/
*/
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

//-----Models--------------------------------
const Users = require("./models/user.model");
const Profs = require("./models/prof.model");
const Courses = require("./models/course.model");
const ReviewModel = require("./models/review.model");


require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;

//-----MIDDLEWARE-----
app.use(cors());
app.use(express.json());

// get driver connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


app.get("/getUsers", (req, res)=>{
  Users.find({},(err, result)=>{
    if(err){
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
});

app.post("/addUsers", async (req, res)=>{
  const user = req.body; //sent from the frontend
  const newUser = new Users(user);
  await newUser.save();

  res.json(user);
});

app.post("/addProfs", async (req, res)=>{
  const prof = req.body; //sent from the frontend
  const newProf = new Profs(prof);
  await newProf.save();

  res.json(prof);
});

app.get("/getProfs", async (req, res)=>{
  Profs.find({},(err, result)=>{
    if(err){
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
});


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//--------------Many to Many between Courses and Profs-----

// const createCourse = function(course){
//   return Courses.create(course).then(courseRet =>{
//     console.log("\n>> Created Course\n", courseRet);
//     return courseRet;
//   });
// };
// const createProf = function(prof){
//   return Profs.create(prof).then(profRet =>{
//     console.log("\n>> Created Course\n", profRet);
//     return profRet;
//   });
// };

// const createReview = function(review){
//   return ReviewModel.create(review).then(revRet =>{
//     console.log("review Created\n", revRet);
//     return revRet;
//   });
// };

// const addCourseToProf = function(profID, course){
//   return Profs.findByIdAndUpdate(
//     profID,
//     { $push: { prof_courses: course._id}},
//     {new : true, useFindAndModify: false}
//   );
// };

// const addProfToCourse = function(courseID, prof){
//   return Courses.findByIdAndUpdate(
//     courseID,
//     { $push: { course_profs: prof._id}},
//     {new : true, useFindAndModify: false}
//   );
// };

// const run = async function() {
//   var course1 = await createCourse({
//     course_name: "CS606",
//     course_specialisation: "TSCD",
//   });

//   var prof1 = await createProf({
//     prof_name: "Jaya Nair",
//     prof_diff: 5.0,
//     prof_qual: 5.0,
//     prof_takeAgain: 90,
//     prof_tags: ["awesome", "helpful", "good Listener"]
//   });

//   var c = await addCourseToProf(prof1._id, course1);
//   var p = await addProfToCourse(course1._id, prof1);
//   console.log("done 1");

  
//   var query = Users.find({});
//   var user1 = query.exec(function(err, users){
//     if(err) return handleError(err);
//     console.log(users);
//     return users;
//   });


//   var review = await createReview({
//     review_user: user1._id,
//     review_course: course1._id,
//     upvote: 10,
//     downvote: 2,
//     date: new Date(),
//     prof_rate: 5,
//     takeAgain: true,
//     quality: 7,
//     difficulty: 9,
//     grading: "strict",
//     attendance: true,
//     project: true,
//     tags: ["awesome", "wow", "great"],
//     content: "Hey THis is Lorem ipsum which is not Lorem nor ipsum"
//   });
// };
// // run();

// var query = Users.find({}, function(err, users){
//   if(err) return handleError(err);
//   console.log(users);
//   return users});

//   console.log(query);