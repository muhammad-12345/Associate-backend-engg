const db = require('../config/firebase').firestore();

const authorizeRole = (role) => {
    return async (req, res, next) => {
        try {
            console.log('UID from req.user:', req.user.uid); // Debugging UID

            const userDoc = await db.collection('users').doc(req.user.uid).get();
            if (!userDoc.exists) {
                console.log('User not found in Firestore'); // Debugging
                return res.status(404).json({ message: 'User not found' });
            }

            const userRole = userDoc.data().role;
            console.log('Role from Firestore:', userRole); // Debugging

            if (userRole !== role) {
                return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
            }

            next();
        }catch (error) {
            console.error('Error in authorization middleware:', error);
            res.status(500).json({ message: 'Authorization error', error: error.message });
        }
    };
};


module.exports = authorizeRole;
