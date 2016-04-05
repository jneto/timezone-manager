var jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
    setAuthenticatedUser: function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
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
    }
};
