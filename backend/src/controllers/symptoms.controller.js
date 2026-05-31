const prisma = require('../lib/prisma');

// Log a new symptom
const logSymptom = async (req, res) => {
  try {
    const { description, severity, bodyPart, notes } = req.body;
    const userId = req.user.id;

    if (!description) {
      return res.status(400).json({ error: 'Description is required.' });
    }

    const symptom = await prisma.symptom.create({
      data: {
        userId,
        description,
        severity: severity ? parseInt(severity) : 5,
        bodyPart,
        notes
      }
    });

    res.status(201).json({ message: 'Symptom logged!', symptom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};

// Get all symptoms for logged in user
const getSymptoms = async (req, res) => {
  try {
    const symptoms = await prisma.symptom.findMany({
      where: { userId: req.user.id },
      orderBy: { recordedAt: 'desc' }
    });
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

// Delete a symptom
const deleteSymptom = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.symptom.delete({ where: { id } });
    res.json({ message: 'Symptom deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

module.exports = { logSymptom, getSymptoms, deleteSymptom };