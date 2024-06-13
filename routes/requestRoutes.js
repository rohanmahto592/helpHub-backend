const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Route for creating a new request
router.post('/',  requestController.createRequest);

// Route for getting all requests
router.get('/', requestController.getAllRequests);

// Route for getting a request by ID
router.get('/:id', requestController.getRequestById);

// Route for updating a request
router.put('/:id',  requestController.updateRequest);

// Route for deleting a request
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
