let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dotenv = require('dotenv').config()
const app = express();
let User = require('./User');
let Event = require('./Event');
let Course = require('./Course');



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


app.route('/api/signup/create-user').post((req, res, next) => {
  User.User.create(req.body)
  .then((result) =>{
    res.send(result)
  })
  .catch((err) =>{
    console.log(err);
  })
})

app.route('/api/login/is-user').post((req, res, next) => {
  const user_password = req.body.password; 
  User.User.find({email:req.email, password: user_password})
  .then((result) =>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.route('/api/settings/update').put((req,res) =>{
  User.User.findOneAndUpdate({
    name: req.body.name.toString(),
    password: req.body.password.toString()
  },
req.body).then((result) =>{
  res.send(result1)
}).catch((err) =>{
  console.log(err);

})
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