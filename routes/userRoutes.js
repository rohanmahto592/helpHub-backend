const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for registering a user
router.post('/register', userController.registerUser);

// Route for logging in a user
router.post('/login', userController.loginUser);

// Route for getting a user by ID
router.get('/:id', userController.getUserById);

// Route for updating a user
router.put('/:id', userController.updateUser);

// Route for deleting a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
