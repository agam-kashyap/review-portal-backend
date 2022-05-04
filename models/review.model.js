const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review_user: {type: Schema.Types.ObjectId, ref: 'users'},
    review_course: {type: Schema.Types.ObjectId, ref: 'courses'},
    upvote: Number,
    downvote: Number,
    date: Schema.Types.Date,
    prof_rate: { type: Schema.Types.Decimal128, min: 0.0, max:10.0},
    takeAgain: {type: Schema.Types.Boolean},
    quality: { type: Schema.Types.Decimal128, min: 0.0, max:10.0},
    difficulty: { type: Schema.Types.Decimal128, min: 0.0, max:10.0},
    grading: {type: String, enum:["lenient", "moderate", "strict"]} ,
    attendance: {type: Schema.Types.Boolean},
    project: Schema.Types.Boolean,
    tags: [String],
    content: String
});

const ReviewModel = mongoose.model('reviews', reviewSchema);
module.exports = ReviewModel;