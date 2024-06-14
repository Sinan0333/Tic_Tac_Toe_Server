const jwt = require('jsonwebtoken');


const generateToken = (data) => {
    if (!process.env.JWT_SECRET) throw new Error('JWT secret is not defined');
    const plainObject = data.toObject();
    return jwt.sign(plainObject, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION });
};


const verifyToken = (token) => {
    if (!process.env.JWT_SECRET) throw new Error('JWT secret is not defined');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded 
    } catch (error) {
        if(error.name === 'TokenExpiredError') throw new Error('Token expired');
        throw new Error('Token verification failed');
    }
};

module.exports = {
    generateToken,
    verifyToken
}