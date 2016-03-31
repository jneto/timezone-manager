var express = require('express');

var Timezone = require('../models/timezone');
var roles = require('../roles');

var timezoneRoutes = express.Router();

timezoneRoutes.route('/')
    .post(function(req, res) {
        if (req.user.role != roles.USER_MANAGER) {
            var timezone = new Timezone();
            timezone.name = req.body.name;
            timezone.city = req.body.city;
            timezone.diff = req.body.diff;
            timezone.owner = req.user._id;

            timezone.save(function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({success: true, message: 'Timezone created successfully.'});
                }
            });
        } else {
            res.status(403).send({success: false, message: 'Your role do not grant access to this.'});
        }
    })

    .get(function(req, res) {
        if (req.user.role == roles.REGULAR) {
            Timezone.find({owner: req.user._id}, function(err, timezones) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({success: true, timezones: timezones});
                }
            });
        } else if (req.user.role == roles.ADMIN) {
            Timezone.find({}, function(err, timezones) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({success: true, timezones: timezones});
                }
            });
        } else {
            res.status(403).send({success: false, message: 'Your role do not grant access to this.'});
        }
    });

timezoneRoutes.route('/:timezone_id')
    .get(function(req, res) {
        if (req.user.role == roles.REGULAR) {
            Timezone.findOne({_id: req.params.timezone_id, owner: req.user._id}, function(err, timezone) {
                if (err) {
                    res.send(err);
                } else {
                    if (!timezone) {
                        res.json({success: false, message: 'Timezone not found.'});
                    } else {
                        res.json({success: true, timezone: timezone});
                    }
                }
            });
        } else if (req.user.role == roles.ADMIN) {
            Timezone.findById(req.params.timezone_id, function(err, timezone) {
                if (err) {
                    res.send(err);
                } else {
                    if (!timezone) {
                        res.json({success: false, message: 'Timezone not found.'});
                    } else {
                        res.json({success: true, timezone: timezone});
                    }
                }
            });
        } else {
            res.status(403).send({success: false, message: 'Your role do not grant access to this.'});
        }
    })

    .put(function(req, res) {
        if (req.user.role == roles.REGULAR) {
            Timezone.findOne({_id: req.params.timezone_id, owner: req.user._id}, function(err, timezone) {
                if (err) {
                    res.send(err);
                } else {
                    if (!timezone) {
                        res.json({success: false, message: 'Timezone not found.'});
                    } else {
                        if (req.body.name) {
                            timezone.name = req.body.name;
                        }
                        if (req.body.city) {
                            timezone.city = req.body.city;
                        }
                        if (req.body.diff) {
                            timezone.diff = req.body.diff;
                        }

                        timezone.save(function(err) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json({success: true, message: 'Timezone updated successfully.'});
                            }
                        });
                    }
                }
            });
        } else if (req.user.role == roles.ADMIN) {
            Timezone.findById(req.params.timezone_id, function(err, timezone) {
                if (err) {
                    res.send(err);
                } else {
                    if (!timezone) {
                        res.json({success: false, message: 'Timezone not found.'});
                    } else {
                        if (req.body.name) {
                            timezone.name = req.body.name;
                        }
                        if (req.body.city) {
                            timezone.city = req.body.city;
                        }
                        if (req.body.diff) {
                            timezone.diff = req.body.diff;
                        }

                        timezone.save(function(err) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json({success: true, message: 'Timezone updated successfully.'});
                            }
                        });
                    }
                }
            });
        } else {
            res.status(403).send({success: false, message: 'Your role do not grant access to this.'});
        }
    })

    .delete(function(req, res) {
        if (req.user.role == roles.REGULAR) {
            Timezone.remove({_id: req.params.timezone_id, owner: req.user._id}, function(err, removed) {
                if (err) {
                    res.send(err);
                } else {
                    if (removed.result.n == 1) {
                        res.json({success: true, message: 'Timezone deleted successfully.'});
                    } else {
                        res.json({success: false, message: 'Timezone not found.'});
                    }
                }
            });
        } else if (req.user.role == roles.ADMIN) {
            Timezone.remove({_id: req.params.timezone_id}, function(err, removed) {
                if (err) {
                    res.send(err);
                } else {
                    if (removed.result.n == 1) {
                        res.json({success: true, message: 'Timezone deleted successfully.'});
                    } else {
                        res.json({success: false, message: 'Timezone not found.'});
                    }
                }
            });
        } else {
            res.status(403).send({success: false, message: 'Your role do not grant access to this.'});
        }
    });

module.exports = timezoneRoutes;
