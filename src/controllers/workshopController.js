const Workshop = require('../models/workshopModel');


const workshopController = {

    createWorkshop: async (req, res) => {
        try {
            const workshopData = req.body;
            const workshopId = await Workshop.create(workshopData);
            res.status(201).json({ message: 'Workshop created', id: workshopId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    getAllWorkshops: async (req, res) => {
        try {
            const workshops = await Workshop.getAll();
            res.status(200).json(workshops);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a single workshop by ID
    getWorkshopById: async (req, res) => {
        try {
            const workshopId = req.params.id; // Extract ID from the URL
            const workshop = await Workshop.getById(workshopId); // Fetch workshop by ID
            if (!workshop) {
                return res.status(404).json({ message: 'Workshop not found' });
            }
            res.status(200).json(workshop);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    updateWorkshop: async (req, res) => {
        try {
            const workshopId = req.params.id;
            const updatedData = req.body;
            await Workshop.update(workshopId, updatedData);
            res.status(200).json({ message: 'Workshop updated' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    deleteWorkshop: async (req, res) => {
        try {
            const workshopId = req.params.id;
            await Workshop.delete(workshopId);
            res.status(200).json({ message: 'Workshop deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // learner specific APIs
    enrollLearner: async (req, res) => {
        try {
            const workshopId = req.params.id; // Workshop ID
            const { learnerId, name } = req.body; // Learner details

            console.log('Workshop ID:', workshopId);
            console.log('Learner Details:', { learnerId, name });

            const workshopRef = db.collection('workshops').doc(workshopId); // Firestore reference
            const workshopDoc = await workshopRef.get();

            if (!workshopDoc.exists) {
                return res.status(404).json({ message: 'Workshop not found' });
            }

            await workshopRef.update({
                enrolledLearners: admin.firestore.FieldValue.arrayUnion({ learnerId, name }),
            });

            res.status(200).json({ message: 'Learner enrolled successfully' });

            //code for emailing mentor and learner
            const workshopData = workshopDoc.data();
            const mentorEmail = workshopData.mentorEmail || 'mentor@example.com'; // Default for testing

            // Send notifications
            await sendEmailNotification(mentorEmail, 'New Enrollment', `${name} has enrolled in your workshop: ${workshopData.title}`);
            await sendEmailNotification(
                `${name}@example.com`, // Replace with learner's real email
                'Enrollment Confirmation',
                `You have successfully enrolled in the workshop: ${workshopData.title}`
            );

            res.status(200).json({ message: 'Learner enrolled successfully, notifications sent' });

        } catch (error) {
            console.error('Error during enrollment:', error);
            res.status(500).json({ message: error.message });
        }
    },


    getLearnerEnrollments: async (req, res) => {
        try {
            const learnerId = req.params.learnerId; // Extract learner ID from the URL

            // Fetch all workshops
            const workshopsSnapshot = await db.collection('workshops').get();

            if (workshopsSnapshot.empty) {
                return res.status(404).json({ message: 'No workshops found' });
            }

            // Filter workshops where the learner is enrolled
            const enrolledWorkshops = workshopsSnapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter((workshop) =>
                    workshop.enrolledLearners?.some((learner) => learner.learnerId === learnerId)
                );

            if (enrolledWorkshops.length === 0) {
                return res.status(404).json({ message: 'No enrollments found' });
            }

            res.status(200).json(enrolledWorkshops);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //helper function for sending email
    sendEmailNotification: async (to, subject, text) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });
    
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to,
            subject,
            text,
        };
    
        await transporter.sendMail(mailOptions);
    }

};

module.exports = workshopController; 
