const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
const parsePrescription = async (rawText) => {
  try {
    const prompt = `
You are a medical assistant. Extract medicine information from this prescription text.
Return ONLY a valid JSON object. No explanation, no markdown backticks, just raw JSON.

Prescription text:
"""
${rawText}
"""

Return exactly this JSON format:
{
  "medicines": [
    {
      "name": "medicine name",
      "dosage": "e.g. 500mg",
      "frequency": "e.g. twice daily after meals",
      "duration": "e.g. 7 days",
      "instructions": "e.g. take with water after food"
    }
  ],
  "doctorNotes": "any general instructions from doctor",
  "followUpDate": "follow up date if mentioned, else empty string",
  "dietaryAdvice": "food or diet instructions if mentioned, else empty string"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Remove any accidental markdown backticks
    const cleaned = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);

  } catch (error) {
    console.error('Gemini parse error:', error.message);
    // Return empty safe structure if something goes wrong
    return {
      medicines: [],
      doctorNotes: '',
      followUpDate: '',
      dietaryAdvice: ''
    };
  }
};

// ─────────────────────────────────────────────
// 2. Generate a doctor-ready symptom summary
// ─────────────────────────────────────────────
const generateDoctorSummary = async (symptoms) => {
  try {
    // Format symptoms into readable list
    const symptomList = symptoms.map(s => {
      const date = new Date(s.recordedAt).toLocaleDateString('en-IN');
      return `- ${date}: ${s.description} (severity: ${s.severity}/10)${s.bodyPart ? ', area: ' + s.bodyPart : ''}`;
    }).join('\n');

    const prompt = `
You are a helpful medical assistant. A patient is going to visit a doctor and needs 
a clear, professional summary of their recent symptoms to show the doctor.

Patient's logged symptoms from the last 14 days:
${symptomList}

Write a structured doctor-ready summary with these 4 sections:
1. Chief Complaints
2. Symptom Timeline  
3. Severity Pattern
4. Key Points for Doctor

Keep it clear, professional, and under 300 words. Use simple medical language.`;

    const result = await model.generateContent(prompt);
    return result.response.text();

  } catch (error) {
    console.error('Gemini summary error:', error.message);
    throw new Error('Failed to generate summary. Check your Gemini API key.');
  }
};

// ─────────────────────────────────────────────
// 3. Generate a personalized recovery plan
// ─────────────────────────────────────────────
const generateRecoveryPlan = async (prescription) => {
  try {
    const medicines = prescription.medicines.map(m =>
      `- ${m.name} ${m.dosage || ''} — ${m.frequency || 'as prescribed'} for ${m.duration || 'prescribed duration'}. ${m.instructions || ''}`
    ).join('\n');

    const parsedData = prescription.parsedJson || {};

    const prompt = `
You are a friendly health assistant. Create a simple, easy-to-follow recovery plan for a patient.

Prescribed medicines:
${medicines}

Doctor's notes: ${parsedData.doctorNotes || 'None provided'}
Dietary advice from doctor: ${parsedData.dietaryAdvice || 'None provided'}
Follow-up date: ${parsedData.followUpDate || 'Not mentioned'}

Write a friendly recovery plan with these 5 sections:
1. 📅 Daily Medicine Schedule (morning / afternoon / evening / night timing)
2. 🥗 Diet — What to eat and what to avoid
3. 🏃 Activity — Exercise or rest recommendations  
4. ⚠️ Warning Signs — Symptoms that mean you should see a doctor immediately
5. 📆 Follow-up Reminder

Use simple language. Be warm, encouraging, and clear. Avoid complex medical terms.`;

    const result = await model.generateContent(prompt);
    return result.response.text();

  } catch (error) {
    console.error('Gemini recovery error:', error.message);
    throw new Error('Failed to generate recovery plan. Check your Gemini API key.');
  }
};

module.exports = { parsePrescription, generateDoctorSummary, generateRecoveryPlan };