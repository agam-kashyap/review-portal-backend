/*
* For Password Authentication: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
*/
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;