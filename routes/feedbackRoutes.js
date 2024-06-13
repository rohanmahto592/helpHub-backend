const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route for creating a new feedback
router.post('/', feedbackController.createFeedback);

// Route for getting all feedbacks
router.get('/', feedbackController.getAllFeedbacks);

// Route for getting a feedback by ID
router.get('/:id', feedbackController.getFeedbackById);

// Route for updating feedback
router.put('/:id',  feedbackController.updateFeedback);

// Route for deleting feedback
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
