// course.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
    courseName: String,
    professor: String,
    section: Number,
});

module.exports = courseSchema;