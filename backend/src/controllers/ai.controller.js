const prisma = require('../lib/prisma');
const { generateDoctorSummary, generateRecoveryPlan } = require('../services/ai.service');

// Generate AI doctor summary from symptoms
const getDoctorSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get last 14 days of symptoms
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const symptoms = await prisma.symptom.findMany({
      where: {
        userId,
        recordedAt: { gte: twoWeeksAgo }
      },
      orderBy: { recordedAt: 'asc' }
    });

    if (symptoms.length === 0) {
      return res.status(400).json({ error: 'No symptoms logged in the last 14 days.' });
    }

    const summary = await generateDoctorSummary(symptoms);
    res.json({ summary });

  } catch (error) {
    console.error('AI Summary error:', error);
    res.status(500).json({ error: 'Failed to generate summary.' });
  }
};

// Generate AI recovery plan from prescription
const getRecoveryPlan = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    const prescription = await prisma.prescription.findUnique({
      where: { id: prescriptionId },
      include: { medicines: true }
    });

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found.' });
    }

    const plan = await generateRecoveryPlan(prescription);
    res.json({ plan });

  } catch (error) {
    console.error('Recovery plan error:', error);
    res.status(500).json({ error: 'Failed to generate recovery plan.' });
  }
};

module.exports = { getDoctorSummary, getRecoveryPlan };