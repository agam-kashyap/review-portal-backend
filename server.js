/*
* Mongoose Tutorial with Schema information: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#mongoose_primer
* Many To Many: https://www.bezkoder.com/mongodb-many-to-many-mongoose/
*/
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');


//-----Models--------------------------------
const Users = require("./models/user.model");
const Profs = require("./models/prof.model");
const Courses = require("./models/course.model");
const ReviewModel = require("./models/review.model");


require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;

//-----MIDDLEWARE-----
let corsOptions = {
  origin: "52.158.131.5"
}
app.use(cors(corsOptions));
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



const profsRouter = require('./routes/profs');
const reviewRouter = require('./routes/review');
const usersRouter = require('./routes/users');
const courseRouter = require('./routes/courses');

app.use('/profs', profsRouter);
app.use('/review', reviewRouter);
app.use('/users', usersRouter);
app.use('/courses', courseRouter);

module.exports = app;