var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');
var userRoutes = require('./app/routes/user');
var authRoutes = require('./app/routes/auth');
var timezoneRoutes = require('./app/routes/timezone');
var authMiddleware = require('./app/middleware/auth');

var app = express();

var port = process.env.PORT || 3000;
mongoose.connect(config.database);
app.set('secret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(authMiddleware.setAuthenticatedUser);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes.unauthenticatedRoutes);

app.use(authMiddleware.blockUnauthenticatedUser);

// authenticated routes
app.use('/api/users', userRoutes.authenticatedRoutes);
app.use('/api/timezones', timezoneRoutes);

app.listen(port);
console.log('Listening on port: ' + port);
