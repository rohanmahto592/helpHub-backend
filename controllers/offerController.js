const Offer = require('../models/offer/offerSchema');
const User = require('../models/user/userSchema');

// @desc    Create a new offer
// @route   POST /api/offers
// @access  Private
exports.createOffer = async (req, res) => {
  const { userId, typeOfHelp, details, location, availability } = req.body;

  try {
    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const newOffer = new Offer({
      userId,
      typeOfHelp,
      details,
      location,
      availability
    });

    const offer = await newOffer.save();
    res.status(201).json(offer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all offers
// @route   GET /api/offers
// @access  Public
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate('userId', 'name email');
    res.json(offers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get offer by ID
// @route   GET /api/offers/:id
// @access  Public
exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate('userId', 'name email');
    if (!offer) {
      return res.status(404).json({ msg: 'Offer not found' });
    }
    res.json(offer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update offer
// @route   PUT /api/offers/:id
// @access  Private
exports.updateOffer = async (req, res) => {
  const { typeOfHelp, details, location, availability, status } = req.body;

  // Build offer object
  const offerFields = {};
  if (typeOfHelp) offerFields.typeOfHelp = typeOfHelp;
  if (details) offerFields.details = details;
  if (location) offerFields.location = location;
  if (availability) offerFields.availability = availability;
  if (status) offerFields.status = status;

  try {
    let offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ msg: 'Offer not found' });
    }

    offer = await Offer.findByIdAndUpdate(
      req.params.id,
      { $set: offerFields },
      { new: true }
    );

    res.json(offer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete offer
// @route   DELETE /api/offers/:id
// @access  Private
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ msg: 'Offer not found' });
    }

    await offer.remove();
    res.json({ msg: 'Offer removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
