const mongoose = require("mongoose");
const {Schema} = mongoose;
const courseSchema = require("./Course");

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    courses: [courseSchema],
    attendingEvents: [String]
});

module.exports = mongoose.model("User", userSchema);