var jwt = require('jsonwebtoken');

require('dotenv').config();

var User = require('../models/user')

module.exports = {
    setAuthenticatedUser: function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (err) {
                    res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    User.findOne({_id: decoded._doc._id}, function(err, user) {
                        if (err) {
                            res.json({success: false, message: 'Error finding authenticated user.'})
                        } else if (!user) {
                            res.json({success: false, message: 'Authenticated user not found.'})
                        } else {
                            user.hashedPassword = undefined;
                            req.user = user;
                            next();
                        }
                    });
                }
            });
        } else {
            next();
        }
    }
};
