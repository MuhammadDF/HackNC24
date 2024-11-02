let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dotenv = require('dotenv').config()
const app = express();

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


/*
app.route('/').get((req, res, next) => {
  res.json('hello')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//app.use(userRoute);
*/