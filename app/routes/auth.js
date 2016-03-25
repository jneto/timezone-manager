var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var config = require('../../config');

var authRoutes = express.Router();

authRoutes.post('/', function(req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else {
                bcrypt.compare(req.body.password, user.hashedPassword, function(err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        if (!result) {
                            res.json({success: false, message: 'Authentication failed. Wrong password.'});
                        } else {
                            delete user.hashedPassword;

                            var token = jwt.sign(user, config.secret, {expiresInMinutes: 1440});

                            res.json({
                                success: true,
                                message: 'Authentication succeeded.',
                                token: token
                            });
                        }
                    }
                });
            }
        }
    });
});

module.exports = authRoutes;
