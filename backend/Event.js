const mongoose = require("mongoose");
const {Schema} = mongoose;
const courseSchema = require("./Course");

const eventSchema = new Schema({
    name: String,
    description: String,
    duration: Number,
    location: String,
    cap: Number,
    course: courseSchema,
    attendees: [String]
});

module.exports = mongoose.model("Event", eventSchema);