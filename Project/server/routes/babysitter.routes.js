const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');
const Babysitter = require('../models/babysitter.model');
const User = require('../models/user.model');

// Get all babysitters
router.get('/', authMiddleware, async (req, res) => {
  try {
    const babysitters = await Babysitter.find()
      .populate('user', 'firstName lastName email phone profilePicture')
      .populate('reviews.parent', 'firstName lastName');
    res.json(babysitters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching babysitters', error: error.message });
  }
});

// Create new babysitter
router.post('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const { userId, hourlyRate, availability, experience, qualifications, certifications, languages, ageRange, maxChildren, bio } = req.body;

    // Check if user exists and is not already a babysitter
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingBabysitter = await Babysitter.findOne({ user: userId });
    if (existingBabysitter) {
      return res.status(400).json({ message: 'User is already a babysitter' });
    }

    const babysitter = new Babysitter({
      user: userId,
      hourlyRate,
      availability,
      experience,
      qualifications,
      certifications,
      languages,
      ageRange,
      maxChildren,
      bio
    });

    await babysitter.save();
    res.status(201).json(babysitter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating babysitter', error: error.message });
  }
});

// Get specific babysitter
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const babysitter = await Babysitter.findById(req.params.id)
      .populate('user', 'firstName lastName email phone profilePicture')
      .populate('reviews.parent', 'firstName lastName');

    if (!babysitter) {
      return res.status(404).json({ message: 'Babysitter not found' });
    }

    res.json(babysitter);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching babysitter', error: error.message });
  }
});

// Update babysitter
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const babysitter = await Babysitter.findById(req.params.id);
    if (!babysitter) {
      return res.status(404).json({ message: 'Babysitter not found' });
    }

    // Check if user is authorized to update
    if (req.user.role !== 'admin' && babysitter.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this babysitter' });
    }

    const { hourlyRate, availability, experience, qualifications, certifications, languages, ageRange, maxChildren, bio, isAvailable } = req.body;

    babysitter.hourlyRate = hourlyRate || babysitter.hourlyRate;
    babysitter.availability = availability || babysitter.availability;
    babysitter.experience = experience || babysitter.experience;
    babysitter.qualifications = qualifications || babysitter.qualifications;
    babysitter.certifications = certifications || babysitter.certifications;
    babysitter.languages = languages || babysitter.languages;
    babysitter.ageRange = ageRange || babysitter.ageRange;
    babysitter.maxChildren = maxChildren || babysitter.maxChildren;
    babysitter.bio = bio || babysitter.bio;
    babysitter.isAvailable = isAvailable !== undefined ? isAvailable : babysitter.isAvailable;

    await babysitter.save();
    res.json({ message: 'Babysitter updated successfully', babysitter });
  } catch (error) {
    res.status(500).json({ message: 'Error updating babysitter', error: error.message });
  }
});

// Delete babysitter
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const babysitter = await Babysitter.findById(req.params.id);
    if (!babysitter) {
      return res.status(404).json({ message: 'Babysitter not found' });
    }

    await babysitter.remove();
    res.json({ message: 'Babysitter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting babysitter', error: error.message });
  }
});

// Get babysitter schedule
router.get('/:id/schedule', authMiddleware, async (req, res) => {
  try {
    const babysitter = await Babysitter.findById(req.params.id);
    if (!babysitter) {
      return res.status(404).json({ message: 'Babysitter not found' });
    }

    // TODO: Implement schedule fetching logic
    res.json({ message: 'Schedule endpoint not implemented yet' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule', error: error.message });
  }
});

// Get babysitter payments
router.get('/:id/payments', authMiddleware, async (req, res) => {
  try {
    const babysitter = await Babysitter.findById(req.params.id);
    if (!babysitter) {
      return res.status(404).json({ message: 'Babysitter not found' });
    }

    // TODO: Implement payments fetching logic
    res.json({ message: 'Payments endpoint not implemented yet' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
});

// Get babysitter attendance
router.get('/:id/attendance', authMiddleware, async (req, res) => {
  try {
    const babysitter = await Babysitter.findById(req.params.id);
    if (!babysitter) {
      return res.status(404).json({ message: 'Babysitter not found' });
    }

    // TODO: Implement attendance fetching logic
    res.json({ message: 'Attendance endpoint not implemented yet' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
});

module.exports = router; 