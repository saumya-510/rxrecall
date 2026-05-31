const prisma = require('../lib/prisma');
const { extractTextFromImage } = require('../services/ocr.service');
const { parsePrescription } = require('../services/ai.service');

// Upload prescription image and extract medicines
const uploadPrescription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image.' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const imagePath = req.file.path;

    // Step 1: Extract text from image using OCR
    console.log('Running OCR...');
    const rawText = await extractTextFromImage(imagePath);

    // Step 2: Send text to AI to parse medicine details
    console.log('Sending to AI for parsing...');
    const parsedData = await parsePrescription(rawText);

    // Step 3: Save prescription to database
    const prescription = await prisma.prescription.create({
      data: {
        userId: req.user.id,
        imageUrl,
        rawText,
        parsedJson: parsedData
      }
    });

    // Step 4: Save each medicine as its own record
    if (parsedData.medicines && parsedData.medicines.length > 0) {
      for (const med of parsedData.medicines) {
        await prisma.medicine.create({
          data: {
            prescriptionId: prescription.id,
            name: med.name || 'Unknown',
            dosage: med.dosage || '',
            frequency: med.frequency || '',
            duration: med.duration || '',
            instructions: med.instructions || ''
          }
        });
      }
    }

    // Fetch the prescription with its medicines to return
    const fullPrescription = await prisma.prescription.findUnique({
      where: { id: prescription.id },
      include: { medicines: true }
    });

    res.status(201).json({
      message: 'Prescription uploaded and processed!',
      prescription: fullPrescription
    });

  } catch (error) {
    console.error('Prescription upload error:', error);
    res.status(500).json({ error: 'Failed to process prescription.' });
  }
};

// Get all prescriptions for logged in user
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: { userId: req.user.id },
      include: { medicines: true },
      orderBy: { uploadedAt: 'desc' }
    });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

module.exports = { uploadPrescription, getPrescriptions };