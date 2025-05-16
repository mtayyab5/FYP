const User = require('../models/User');

const checkAccess = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(401).json({ message: 'User not found' });

    // If user is premium or free, allow
    if (user.subscription === 'premium') return next();

    // For trial, check limit
    if (user.subscription === 'trial') {
      if (user.trialCount < 10) {
        user.trialCount += 1;
        await user.save();
        return next();
      } else {
        return res.status(403).json({
          message: 'Trial limit reached. Please subscribe to continue using the service.',
        });
      }
    }

    // Fallback
    return res.status(403).json({ message: 'Access denied' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { checkAccess };
