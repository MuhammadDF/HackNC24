const mongoose = require("mongoose");
const {Schema} = mongoose;
const courseSchema = require("./Course");

const userSchema = new Schema({
    fName: String,
    lName: String,
    email: String,
    phoneNumber: String,
    courses: [courseSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = { User, userSchema };