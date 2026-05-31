const prisma = require('../lib/prisma');

// Get today's reminders
const getTodayReminders = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reminders = await prisma.reminder.findMany({
      where: {
        userId: req.user.id,
        date: { gte: today }
      },
      include: { medicine: true },
      orderBy: { time: 'asc' }
    });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

// Create a reminder
const createReminder = async (req, res) => {
  try {
    const { label, time, medicineId } = req.body;

    const reminder = await prisma.reminder.create({
      data: {
        userId: req.user.id,
        label,
        time,
        medicineId: medicineId || null
      }
    });

    res.status(201).json({ message: 'Reminder created!', reminder });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

// Mark reminder as taken/not taken
const toggleReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await prisma.reminder.findUnique({ where: { id } });
    const updated = await prisma.reminder.update({
      where: { id },
      data: { taken: !reminder.taken }
    });

    res.json({ message: 'Updated!', reminder: updated });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

module.exports = { getTodayReminders, createReminder, toggleReminder };