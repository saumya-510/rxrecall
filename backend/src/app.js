const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const symptomsRoutes = require('./routes/symptoms.routes');
const prescriptionsRoutes = require('./routes/prescriptions.routes');
const remindersRoutes = require('./routes/reminders.routes');
const aiRoutes = require('./routes/ai.routes');

const app = express();

// Middleware - these run before every request
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
})); // Allow frontend to talk to backend
app.use(express.json()); // Allow JSON request bodies
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Serve uploaded files

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/symptoms', symptomsRoutes);
app.use('/api/prescriptions', prescriptionsRoutes);
app.use('/api/reminders', remindersRoutes);
app.use('/api/ai', aiRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'RxRecall API is running!' });
});

module.exports = app;