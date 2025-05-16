const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { checkAccess } = require('../middleware/checkAccess');
const { detectDisease } = require('../controllers/detectionController');

const router = express.Router();

// Apply auth + access check
router.post('/detect', protect, checkAccess, detectDisease);

module.exports = router;
