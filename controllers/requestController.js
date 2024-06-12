// controllers/requestController.js
const Request = require('../models/requests/requestSchema');
const User = require('../models/user/userSchema');
const Offer = require('../models/offer/offerSchema');

// @desc    Create a new request
// @route   POST /api/requests
// @access  Private
exports.createRequest = async (req, res) => {
  const { userId, typeOfHelp, details, pickupLocation, deliveryLocation } = req.body;

  try {
    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const newRequest = new Request({
      userId,
      typeOfHelp,
      details,
      pickupLocation,
      deliveryLocation
    });

    const request = await newRequest.save();
    res.status(201).json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all requests
// @route   GET /api/requests
// @access  Public
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('userId', 'name email').populate('matchedOffers');
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get request by ID
// @route   GET /api/requests/:id
// @access  Public
exports.getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('userId', 'name email').populate('matchedOffers');
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update request
// @route   PUT /api/requests/:id
// @access  Private
exports.updateRequest = async (req, res) => {
  const { typeOfHelp, details, pickupLocation, deliveryLocation, status, matchedOffers } = req.body;

  // Build request object
  const requestFields = {};
  if (typeOfHelp) requestFields.typeOfHelp = typeOfHelp;
  if (details) requestFields.details = details;
  if (pickupLocation) requestFields.pickupLocation = pickupLocation;
  if (deliveryLocation) requestFields.deliveryLocation = deliveryLocation;
  if (status) requestFields.status = status;
  if (matchedOffers) requestFields.matchedOffers = matchedOffers;

  try {
    let request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    request = await Request.findByIdAndUpdate(
      req.params.id,
      { $set: requestFields },
      { new: true }
    );

    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete request
// @route   DELETE /api/requests/:id
// @access  Private
exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    await request.remove();
    res.json({ msg: 'Request removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
