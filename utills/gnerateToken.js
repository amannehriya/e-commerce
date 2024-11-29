const jwt = require('jsonwebtoken');

module.exports.generateToken = (user) => {
    return jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET);
}