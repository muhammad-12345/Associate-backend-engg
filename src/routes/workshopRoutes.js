const express = require('express');
const workshopController = require('../controllers/workshopController');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

const router = express.Router();

// Mentor-only routes
router.post('/', verifyToken, authorizeRole('mentor'), workshopController.createWorkshop);
router.put('/:id', verifyToken, authorizeRole('mentor'), workshopController.updateWorkshop);
router.delete('/:id', verifyToken, authorizeRole('mentor'), workshopController.deleteWorkshop);
router.get('/:id', verifyToken, workshopController.getWorkshopById);
router.post('/:id/enroll', verifyToken, workshopController.enrollLearner);
router.get('learners/:learnerId/enrollments', verifyToken, workshopController.getLearnerEnrollments);


module.exports = router; 
