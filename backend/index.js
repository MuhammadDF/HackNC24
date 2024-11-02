let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
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



app.route('/').get((req, res, next) => {
  res.json('hello')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//app.use(userRoute);




// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})



// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
}); 

