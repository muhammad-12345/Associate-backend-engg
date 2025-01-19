async function testFirestore() {
    const db = admin.firestore();
    try {
        const testRef = db.collection('test').doc('sample');
        await testRef.set({ message: 'Firebase is working!' });
        console.log('Firestore write successful');
    } catch (error) {
        console.error('Error connecting to Firestore:', error);
    }
}

testFirestore();


