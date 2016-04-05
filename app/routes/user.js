var express = require('express');
var bcrypt = require('bcrypt');

var User = require('../models/user');
var roles = require('../roles');

var unauthenticatedRoutes = express.Router();

function hashPasswordAndSaveUser(password, user, res, message) {
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            res.send(err);
        } else {
            user.hashedPassword = hash;

            user.save(function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({success: true, message: message});
                }
            });
        }
    });
}

unauthenticatedRoutes.post('/', function(req, res) {
    var user = new User();
    user.username = req.body.username;
    if (req.user) {
        // authenticated user
        if (req.user.role == roles.ADMIN) {
            // admin
            if (req.body.role == roles.ADMIN || req.body.role == roles.REGULAR) {
                // valid role
                user.role = req.body.role;
                hashPasswordAndSaveUser(req.body.password, user, res, 'User created successfuly.');
            } else {
                // invalid role
                res.json({success: false, message: 'User role must be: REGULAR or ADMIN.'});
            }
        } else {
            // regular user
            res.status(403).send({success: false, message: 'Your role do not grant access to this.'});
        }
    } else {
        // unauthenticated user
        user.role =  roles.REGULAR;
        hashPasswordAndSaveUser(req.body.password, user, res, 'User created successfuly.');
    }
});

var authenticatedRoutes = express.Router();

authenticatedRoutes.get('/', function(req, res) {
    if (!req.user) {
        res.status(403).send({success: false, message: 'An authentication token is required.'});
    } else {
        if (req.user.role == roles.ADMIN) {
            User.find({}, function(err, users) {
                if (err) {
                    res.send(err);
                } else {
                    users.forEach(function(user) {
                        user.hashedPassword = undefined;
                    });
                    res.json({success: true, users: users});
                }
            });
        } else {
            res.status(403).send({success: false, message: 'Your role do not grant access to this.'});
        }
    }
});

authenticatedRoutes.route('/:user_id')
    .get(function(req, res) {
        if (!req.user) {
            res.status(403).send({success: false, message: 'An authentication token is required.'});
        } else {
            if (req.user.role == roles.ADMIN) {
                User.findById(req.params.user_id, function(err, user) {
                    if (err) {
                        res.send(err);
                    } else {
                        user.hashedPassword = undefined;
                        res.json({success: true, user: user});
                    }
                });
            } else {
                res.status(403).send({success: false, message: 'Your role do not grant access to this.'});
            }
        }
    })

    .put(function(req, res) {
        if (!req.user) {
            res.status(403).send({success: false, message: 'An authentication token is required.'});
        } else {
            if (req.user.role == roles.ADMIN) {
                User.findById(req.params.user_id, function(err, user) {
                    if (err) {
                        res.send(err);
                    } else {
                        // validates user role
                        if (req.body.role == roles.ADMIN || req.body.role == roles.REGULAR) {
                            user.role = req.body.role;

                            if (req.body.password) {
                                // new password has to be hashed
                                hashPasswordAndSaveUser(req.body.password, user, res, 'User updated successfuly.');
                            } else {
                                user.save(function(err) {
                                    if(err) {
                                        res.send(err);
                                    } else {
                                        res.json({success: true, message: 'User updated successfuly.'});
                                    }
                                });
                            }

                        } else {
                            res.json({success: false, message: 'User role must be: REGULAR or ADMIN.'});
                        }
                    }
                });
            } else {
                res.status(403).send({success: false, message: 'Your role do not grant access to this.'});
            }
        }
    })

    .delete(function(req, res) {
        if (!req.user) {
            res.status(403).send({success: false, message: 'An authentication token is required.'});
        } else {
            if (req.user.role == roles.ADMIN) {
                User.remove({_id: req.params.user_id}, function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({success: true, message: 'User deleted successfuly.'});
                    }
                });
            } else {
                res.status(403).send({success: false, message: 'Your role do not grant access to this.'});
            }
        }
    });

module.exports = {
    unauthenticatedRoutes: unauthenticatedRoutes,
    authenticatedRoutes: authenticatedRoutes
};
