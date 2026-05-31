const express = require('express');
const router = express.Router();
const { uploadPrescription, getPrescriptions } = require('../controllers/prescriptions.controller');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.use(protect);

router.post('/', upload.single('image'), uploadPrescription);
router.get('/', getPrescriptions);

module.exports = router;