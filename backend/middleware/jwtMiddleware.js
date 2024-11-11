const jwt = require('jsonwebtoken');
const JWT_SECRET = '54^%8687%';

const verifyToken = (req, res, next) => {
    console.log('executing middleware');
    // console.log(JSON.stringify(req));
    // Get token from headers (commonly sent in the 'Authorization' header)
    // const token = req.headers['authorization']?.split(' ')[1]; // Expected format: 'Bearer <token>'
    // console.log("tyjfjerjtoken", token);
    // if (token) {
    //     return res.status(401).json({
    //         success: false,
    //         message: 'Access Denied. No token provided.',
    //     });
    // }

    // Verify token
    // jwt.verify(token, JWT_SECRET, (err, decoded) => {
    //     console.log("token");
    //     if (err) {
    //         return res.status(403).json({
    //             success: false,
    //             message: 'Invalid token.',
    //         });
    //     }
    //     return res.status(200).json({
    //         success: true,
    //         message: 'valid token.',
    //     });

    // Token is valid, store the user info in request for later use
    // req.user = decoded; // decoded contains userId and role
    next(); // Call the next middleware or route handler
    // });
};

module.exports = verifyToken;
