# 💊 RxRecall

> Your health, remembered. Your recovery, guided.

An AI-powered personal health assistant that helps patients manage their complete healthcare journey.

## Features
- 📝 Daily symptom logging with severity tracking
- 📷 Prescription OCR scanner — upload photo, AI reads it
- 🤖 AI-generated doctor-ready summaries
- 🌿 Personalized recovery plans
- 💊 Medicine reminder system

## Tech Stack
- **Frontend:** React.js + Tailwind CSS + Vite
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL (Supabase)
- **AI:** Google Gemini 1.5 Flash
- **OCR:** Tesseract.js
- **Auth:** JWT Tokens
- **ORM:** Prisma

## Setup
1. Clone the repo
2. Add `.env` files with your keys
3. Run `npm install` in both backend and frontend
4. Run `npx prisma generate` and `npx prisma db push` in backend
5. Run `npm run dev` in both folders

## Disclaimer
RxRecall is not a medical diagnosis tool. Always consult a licensed healthcare professional.
