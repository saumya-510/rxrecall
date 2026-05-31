const Tesseract = require('tesseract.js');

// Extract text from an image file using OCR
const extractTextFromImage = async (imagePath) => {
  try {
    const result = await Tesseract.recognize(imagePath, 'eng', {
      logger: m => {
        if (m.status === 'recognizing text') {
          console.log(`OCR Progress: ${Math.floor(m.progress * 100)}%`);
        }
      }
    });

    return result.data.text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to extract text from image.');
  }
};

module.exports = { extractTextFromImage };