const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  addToHistory,
  getHistory,
  deleteHistory,
} = require('../controllers/historyController');

const router = express.Router();

router.get('/', protect, getHistory);
router.post('/', protect, addToHistory);
router.delete('/:index', protect, deleteHistory);

module.exports = router;
