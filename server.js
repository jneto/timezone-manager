var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var config = require('./config');

var port = process.env.PORT || 3000;
mongoose.connect(config.database);
app.set('secret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var apiRoutes = express.Router();

apiRoutes.get('/', function(req, res) {
    res.json({message: 'Welcome to the API.'});
});

app.use('/api', apiRoutes);

app.listen(port);
console.log('Listening on port: ' + port);
