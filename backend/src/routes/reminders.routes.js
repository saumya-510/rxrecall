const express = require('express');
const router = express.Router();
const { getTodayReminders, createReminder, toggleReminder } = require('../controllers/reminders.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.get('/', getTodayReminders);
router.post('/', createReminder);
router.patch('/:id/toggle', toggleReminder);

module.exports = router;