let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dotenv = require('dotenv').config()
const app = express();
const Event = require('./Event');
const User = require("./User");

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Express Route

// Connecting mongoDB Database

const db = process.env.MONGODB_URI.toString()

// Connects to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err)
  })

// Get User Route
app.get("/api/user", async(req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(404).send("Failed to find user!");
    } else {
      res.json(user);
    }
  } catch(err) {
    res.status(500).send("Error fetching user.");
  }
});

// Register User Route
app.post("http://localhost:5000/api/usera", async(req, res) => {
  try {
    const { name, email, password, phoneNumber, courses, attendingEvents } = req.body;
    const user = new User({
      name,
      email,
      password,
      phoneNumber,
      courses,
      attendingEvents: attendingEvents || [],
    });
    const result = await user.save();
    res.json(result); // Return saved user
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to add user!");
  }
});

// Get Events Route
app.get("/api/events", async(req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send("Get events failed!");
  }
});

// Post Event Route
app.post("/api/events", async(req, res) => {
  try {
    const { name, description, duration, location, cap, course, attendees } = req.body;
    const event = new Event({
      name,
      description,
      duration,
      location,
      cap,
      course,
      attendees,
    });
    const result = await event.save();
    res.json(result);
  } catch (err) {
    res.status(500).send("Post event failed!");
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Backend is up on port 5000!");
});