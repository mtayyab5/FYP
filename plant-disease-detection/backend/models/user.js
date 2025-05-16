const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false, // Don't return password by default
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  trialCount: {
    type: Number,
    default: 0,
  },
  subscription: {
    type: String,
    enum: ['trial', 'free', 'premium'],
    default: 'trial',
  },
  subscriptionExpires: {
    type: Date,
    default: null,
  },
  detectionHistory: [
    {
      image: String,
      prediction: String,
      confidence: Number,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  
}, {
  timestamps: true,
});

// 🔒 Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔐 Compare entered password to hashed
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
