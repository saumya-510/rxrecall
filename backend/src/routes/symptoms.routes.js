const express = require('express');
const router = express.Router();
const { logSymptom, getSymptoms, deleteSymptom } = require('../controllers/symptoms.controller');
const { protect } = require('../middleware/auth.middleware');

// All these routes require user to be logged in
router.use(protect);

router.post('/', logSymptom);
router.get('/', getSymptoms);
router.delete('/:id', deleteSymptom);

module.exports = router;