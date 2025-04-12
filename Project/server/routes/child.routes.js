const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');
const Child = require('../models/child.model');
const User = require('../models/user.model');

// Get all children
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = {};
    
    // If user is not admin, only show their children
    if (req.user.role !== 'admin') {
      query.parent = req.user.id;
    }

    const children = await Child.find(query)
      .populate('parent', 'firstName lastName email phone');
    res.json(children);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching children', error: error.message });
  }
});

// Create new child
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, medicalInfo, preferences, photo } = req.body;

    // Check if parent exists
    const parent = await User.findById(req.user.id);
    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    const child = new Child({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      parent: req.user.id,
      medicalInfo,
      preferences,
      photo
    });

    await child.save();
    res.status(201).json(child);
  } catch (error) {
    res.status(500).json({ message: 'Error creating child', error: error.message });
  }
});

// Get specific child
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const child = await Child.findById(req.params.id)
      .populate('parent', 'firstName lastName email phone');

    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Check if user is authorized to view this child
    if (req.user.role !== 'admin' && child.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this child' });
    }

    res.json(child);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching child', error: error.message });
  }
});

// Update child
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Check if user is authorized to update
    if (req.user.role !== 'admin' && child.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this child' });
    }

    const { firstName, lastName, dateOfBirth, gender, medicalInfo, preferences, photo, isActive } = req.body;

    child.firstName = firstName || child.firstName;
    child.lastName = lastName || child.lastName;
    child.dateOfBirth = dateOfBirth || child.dateOfBirth;
    child.gender = gender || child.gender;
    child.medicalInfo = medicalInfo || child.medicalInfo;
    child.preferences = preferences || child.preferences;
    child.photo = photo || child.photo;
    child.isActive = isActive !== undefined ? isActive : child.isActive;

    await child.save();
    res.json({ message: 'Child updated successfully', child });
  } catch (error) {
    res.status(500).json({ message: 'Error updating child', error: error.message });
  }
});

// Delete child
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Check if user is authorized to delete
    if (req.user.role !== 'admin' && child.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this child' });
    }

    await child.remove();
    res.json({ message: 'Child deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting child', error: error.message });
  }
});

// Get child attendance
router.get('/:id/attendance', authMiddleware, async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Check if user is authorized to view attendance
    if (req.user.role !== 'admin' && child.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this child\'s attendance' });
    }

    // TODO: Implement attendance fetching logic
    res.json({ message: 'Attendance endpoint not implemented yet' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
});

// Get child schedule
router.get('/:id/schedule', authMiddleware, async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Check if user is authorized to view schedule
    if (req.user.role !== 'admin' && child.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this child\'s schedule' });
    }

    // TODO: Implement schedule fetching logic
    res.json({ message: 'Schedule endpoint not implemented yet' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule', error: error.message });
  }
});

module.exports = router; 