const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/upgrade', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.subscription = 'premium';
  await user.save();
  res.json({ message: 'Subscription upgraded to premium' });
});

router.post('/downgrade', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.subscription = 'trial';
  user.trialCount = 0;
  await user.save();
  res.json({ message: 'Subscription downgraded to trial' });
});

module.exports = router;
