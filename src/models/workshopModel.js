const admin = require('../config/firebase');
const db = admin.firestore();


const Workshop = {
    create: async (data) => {
        const ref = await db.collection('workshops').add(data);
        return ref.id;
    },

    getAll: async () => {
        const snapshot = await db.collection('workshops').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },


    getById: async (id) => {
        const doc = await db.collection('workshops').doc(id).get();
        if (!doc.exists) throw new Error('Workshop not found');
        return { id: doc.id, ...doc.data() };
    },

    update: async (id, data) => {
        await db.collection('workshops').doc(id).update(data);
    },
    
    delete: async (id) => {
        await db.collection('workshops').doc(id).delete();
    },
};



module.exports = Workshop;
