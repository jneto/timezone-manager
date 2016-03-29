var jwt = require('jsonwebtoken');

var config = require('../../config');

module.exports = {
    setAuthenticatedUser: function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    req.user = decoded._doc;
                    next();
                }
            });
        } else {
            next();
        }
    },

    blockUnauthenticatedUser: function(req, res, next) {
        if (!req.user) {
            res.status(403).send({success: false, message: 'An authentication token is required.'});
        } else {
            next();
        }
    }
};