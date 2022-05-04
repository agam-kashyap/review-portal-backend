/* 
* Not needed: 
* Ensure the ID is unique: https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js
* We can also exactly specify the available options for tags from which to choose
*/
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profSchema = new Schema({
    prof_name: {
        type: String,
        required: true
    },
    prof_diff: { type: Schema.Types.Decimal128, min: 0.0, max:10.0},
    prof_qual: { type: Schema.Types.Decimal128, min: 0.0, max:10.0},
    prof_takeAgain: {type: Schema.Types.Number, min: 0, max: 100},
    prof_tags: [String],
    prof_courses: [{type: Schema.Types.ObjectId, ref: 'courses'}]
});

const ProfModel = mongoose.model('profs', profSchema);
module.exports = ProfModel;