const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_name: {
        type: String,
        required: true
    },
    course_profs: [{type: Schema.Types.ObjectId, ref: 'profs'}],
    course_specialisation: {
        type: String,
        enum: ['NC', 'AIML', 'VLSI', 'DT', 'TSCD', 'GEN']
    }
});

const CourseModel = mongoose.model('courses', courseSchema);
module.exports = CourseModel;