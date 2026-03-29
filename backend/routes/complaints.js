const router = require('express').Router();
const Complaint = require('../models/Complaint');
const protect = require('../middleware/auth');

// POST - submit a new complaint (public)
router.post('/', async (req, res) => {
  try {
    const trackingId = 'CB-' + Math.random().toString(36).slice(2, 10).toUpperCase();
    const complaint = new Complaint({ ...req.body, trackingId });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all - admin only (protected)
router.get('/', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one - track by tracking ID (public)
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ trackingId: req.params.id });
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH - update status (protected)
router.patch('/:id', protect, async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;