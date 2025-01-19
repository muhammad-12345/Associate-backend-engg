const db = require('../config/firebase').firestore();

const authorizeRole = (role) => {
    return async (req, res, next) => {
        try {
            const userDoc = await db.collection('users').doc(req.user.uid).get();
            if (!userDoc.exists) {
                return res.status(404).json({ message: 'User not found' });
            }

            const userRole = userDoc.data().role;
            if (userRole !== role) {
                return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
            }

            next(); // Proceed to the next middleware or controller
        } catch (error) {
            console.error('Authorization error:', error);
            res.status(500).json({ message: 'Authorization error', error: error.message });
        }
    };
};

module.exports = authorizeRole;
