const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

// Route for creating a new offer
router.post('/', offerController.createOffer);

// Route for getting all offers
router.get('/', offerController.getAllOffers);

// Route for getting an offer by ID
router.get('/:id', offerController.getOfferById);

// Route for updating an offer
router.put('/:id', offerController.updateOffer);

// Route for deleting an offer
router.delete('/:id', offerController.deleteOffer);

module.exports = router;
