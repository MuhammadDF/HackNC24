const mongoose = require("mongoose");
const {Schema} = mongoose;
const courseSchema = require("./Course");
const userSchema = require("./User");


const eventSchema = new Schema({
    fName: String,
    lName: String,
    description: String,
    duration: Number,
    location: String,
    cap: Number,
    course: courseSchema,
    attendees: [userSchema]
});

module.exports = mongoose.model("Event", eventSchema);