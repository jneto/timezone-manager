var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

require('dotenv').config();

var userRoutes = require('./app/routes/user');
var authRoutes = require('./app/routes/auth');
var timezoneRoutes = require('./app/routes/timezone');
var authMiddleware = require('./app/middleware/auth');

var app = express();

var port = process.env.PORT || 3000;
mongoose.connect(process.env.DATABASE);
app.set('secret', process.env.SECRET);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist'));

app.use(authMiddleware.setAuthenticatedUser);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes.unauthenticatedRoutes);

// authenticated routes
app.use('/api/users', userRoutes.authenticatedRoutes);
app.use('/api/timezones', timezoneRoutes);

// send all requests to index.html so browserHistory works
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(port);
console.log('Listening on port: ' + port);
