const Feedback = require('../models/feedback/feedbackSchema');
const User = require('../models/user/userSchema');

// @desc    Create a new feedback
// @route   POST /api/feedbacks
// @access  Private
exports.createFeedback = async (req, res) => {
  const { fromUser, toUser, rating, message } = req.body;

  try {
    // Validate user existence
    const fromUserExists = await User.findById(fromUser);
    const toUserExists = await User.findById(toUser);

    if (!fromUserExists || !toUserExists) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const newFeedback = new Feedback({
      fromUser,
      toUser,
      rating,
      message,
    });

    const feedback = await newFeedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all feedbacks
// @route   GET /api/feedbacks
// @access  Public
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('fromUser', 'name email')
      .populate('toUser', 'name email');
    res.json(feedbacks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get feedback by ID
// @route   GET /api/feedbacks/:id
// @access  Public
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('fromUser', 'name email')
      .populate('toUser', 'name email');
    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update feedback
// @route   PUT /api/feedbacks/:id
// @access  Private
exports.updateFeedback = async (req, res) => {
  const { rating, message } = req.body;

  // Build feedback object
  const feedbackFields = {};
  if (rating) feedbackFields.rating = rating;
  if (message) feedbackFields.message = message;

  try {
    let feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback not found' });
    }

    feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { $set: feedbackFields },
      { new: true }
    );

    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete feedback
// @route   DELETE /api/feedbacks/:id
// @access  Private
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback not found' });
    }

    await feedback.remove();
    res.json({ msg: 'Feedback removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
