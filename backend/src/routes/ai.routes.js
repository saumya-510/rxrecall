const express = require('express');
const router = express.Router();
const { getDoctorSummary, getRecoveryPlan } = require('../controllers/ai.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.get('/summary', getDoctorSummary);
router.get('/recovery/:prescriptionId', getRecoveryPlan);

module.exports = router;