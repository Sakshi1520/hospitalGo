const express = require('express');
const routes = require('./routes/api');
const mongoose = require('mongoose');

// const bodyParser = require('body-parser');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/hospitalbeds');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(express.json());

//initialize routes 
app.use('/api',routes);

//error handling middleware
app.use(function(err,req,res,next){
    // console.log(err);
    res.status(422).send({error:err.message});
});

//listen for requests
app.listen(process.env.port || 3000, function(){
    console.log('app is listening for requests');
});