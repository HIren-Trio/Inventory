
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.replace("Bearer ", "");

    const secret = process.env.JWT_SECRET_KEY
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Failed to authenticate token' });
            } else {
                req.user = decoded;
                next(); 
            }
        });
    } else {
        return res.status(401).json({ error: 'Access Denied: Token missing' });
    }
};

module.exports = { verifyToken }