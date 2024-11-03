// Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./User");
const Event = require("./Event");

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware to parse JSON data
app.use(cors());  // Add this line to enable CORS
app.use(express.json());

// Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

// Getting Users
app.post("/login",  (req, res) => {
  
  const params = {
    email: req.body.email,
    password: req.body.password
  }
  
      const user = User.findOne(params)
      .then((result)=>{
        res.json(result)
      })
      .catch((error) => {
        res.status(400).json({ message: error.message }); 
      })
   
});

// Create User
app.post("/users",  (req, res) => {
  console.log(req.body)
  const { name, email, password, phoneNumber, courses, attendingEvents } = req.body;
  const newUser = new User({
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      courses: courses,
      attendingEvents: attendingEvents,
  });
  try {
      const savedUser = newUser.save();
      res.json(savedUser);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// Geting Events
app.get("/events", async (req, res) => {
  try {
      const events = await Event.find();
      res.json(events);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Create Event
app.post("/events", async (req, res) => {
  const { name, description, duration, location, cap, course, attendees } = req.body;
  const newEvent = new Event({
      name: name,
      description: description,
      duration: duration,
      location: location,
      cap: cap,
      course: course,
      attendees: attendees,
  });
  try {
      const savedEvent = await newEvent.save();
      res.json(savedEvent);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

app.post("/events/:eventId/register", async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  try {
    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if user is already registered
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: "User already registered for this event" });
    }

    // Check if event capacity is full
    if (event.attendees.length >= event.cap) {
      return res.status(400).json({ message: "Event is at full capacity" });
    }

    // Add user to event's attendee list
    event.attendees.push(userId);
    await event.save();

    // Update user's attendingEvents
    await User.findByIdAndUpdate(userId, { $push: { attendingEvents: eventId } });

    res.json({ message: "User registered for event successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});