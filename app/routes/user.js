var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = require('../models/user');
var constants = require('../const');

var userRoutes = express.Router();

userRoutes.route('/')
    .post(function(req, res) {
        var user = new User();
        user.username = req.body.username;
        user.role = req.body.role;

        bcrypt.hash(req.body.password, 10, function(err, hash) {
            if (err) {
                res.send(err);
            } else {
                user.hashedPassword = hash;

                user.save(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({message: 'User created successfuly.'});
                    }
                });
            }
        });
    })

    .get(function(req, res) {
        User.find({}, function(err, users) {
            if (err) {
                res.send(err);
            } else {
                users.forEach(function(user) {
                    delete user.hashedPassword;
                });
                res.json(users);
            }
        });
    });

userRoutes.route('/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    })

    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) {
                res.send(err);
            } else {
                user.role = req.body.role;

                user.save(function(err) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.json({message: 'User updated successfuly.'});
                    }
                });
            }
        });
    })

    .delete(function(req, res) {
        User.remove({_id: req.params.user_id}, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({message: 'User deleted successfuly.'});
            }
        });
    });

module.exports = userRoutes;
