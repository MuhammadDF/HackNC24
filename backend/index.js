let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dotenv = require('dotenv').config()
const app = express();
const Event = require('./Event');

app.use(cors({allowedHeaders: '*'}));

// Express Route

// Connecting mongoDB Database

const db = process.env.MONGODB_URI.toString()

mongoose
  .connect(db)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err)
  })

  app.get("/api/events", async(req, res) => {
    try{
      const events = await Event.find();
      req.send(events);
    } catch(err){
      res.status(500).json({message: "Get users failed!"});
    }
  })

  app.post("/api/events", async(req, res) => {
    try{
      const name = req.body.name;
      const description = req.body.description;
      const duration = req.body.duration;
      const location = req.body.location;
      const cap = req.body.cap;
      const course = req.body.course;
      const attendees = req.body.attendees;
      const event = new Event({
        name: name,
        description: description,
        duration: duration,
        location: location,
        cap: cap,
        course: course,
        attendees: attendees
    });
    const result = await event.save();
    console.log(result);
    } catch(err){
      res.status(500).json({message: "Post users failed!"});
    }
  })


