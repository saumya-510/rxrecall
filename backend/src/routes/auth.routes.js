const express = require('express');
const router = express.Router();
const { signup, login, getProfile } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getProfile);  // protected - needs login

module.exports = router;