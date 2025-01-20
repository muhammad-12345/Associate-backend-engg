const admin = require('../config/firebase');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        // console.log('Decoded Token:', decodedToken); // Debugging decoded token
        console.log('Workshop ID:', req.params.id);
        console.log('Learner Details:', req.body);

        req.user = decodedToken; // Attach user info (UID) to the request
        next();
    } catch (error) {
        console.error('Error verifying token:', error); // Debugging token verification errors
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
