const User = require('../models/User');

// Add to history
const addToHistory = async (req, res) => {
  try {
    const { image, prediction, confidence } = req.body;

    const user = await User.findById(req.user._id);
    user.detectionHistory.push({ image, prediction, confidence });
    await user.save();

    res.status(200).json({ message: 'Added to history' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add history', error: err.message });
  }
};

// Get all history
const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user.detectionHistory.reverse());
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history', error: err.message });
  }
};

// Delete history item by index
const deleteHistory = async (req, res) => {
  try {
    const { index } = req.params;
    const user = await User.findById(req.user._id);

    if (index >= 0 && index < user.detectionHistory.length) {
      user.detectionHistory.splice(index, 1);
      await user.save();
      res.status(200).json({ message: 'History item deleted' });
    } else {
      res.status(400).json({ message: 'Invalid index' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete history', error: err.message });
  }
};

module.exports = {
  addToHistory,
  getHistory,
  deleteHistory,
};
