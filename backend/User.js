const mongoose = require("mongoose");
const {Schema} = mongoose;
const courseSchema = require("./Course");

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    courses: [courseSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = { User, userSchema };