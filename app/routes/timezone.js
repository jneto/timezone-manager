var express = require('express');

var Timezone = require('../models/timezone');

var timezoneRoutes = express.Router();

timezoneRoutes.route('/')
    .post(function(req, res) {
        var timezone = new Timezone();
        timezone.name = req.body.name;
        timezone.city = req.body.city;
        timezone.diff = req.body.diff;

        timezone.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({success: true, message: 'Timezone created successfully.'});
            }
        });
    })

    .get(function(req, res) {
        Timezone.find({}, function(err, timezones) {
            if (err) {
                res.send(err);
            } else {
                res.json(timezones);
            }
        });
    });

timezoneRoutes.route('/:timezone_id')
    .get(function(req, res) {
        Timezone.findById(req.params.timezone_id, function(err, timezone) {
            if (err) {
                res.send(err);
            } else {
                if (!timezone) {
                    res.json({success: false, message: 'Timezone not found.'});
                } else {
                    res.json(timezone);
                }
            }
        });
    })

    .put(function(req, res) {
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
    })

    .delete(function(req, res) {
        Timezone.remove({_id: req.params.timezone_id}, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({success: true, message: 'Timezone deleted successfully.'});
            }
        });
    });

module.exports = timezoneRoutes;
