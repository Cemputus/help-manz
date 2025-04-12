const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');
const Schedule = require('../models/schedule.model');
const User = require('../models/user.model');
const Child = require('../models/child.model');

// Get all schedules
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = {};
    
    // If user is not admin, only show their schedules
    if (req.user.role !== 'admin') {
      query.$or = [
        { babysitter: req.user.id },
        { parent: req.user.id }
      ];
    }

    const schedules = await Schedule.find(query)
      .populate('babysitter', 'firstName lastName')
      .populate('parent', 'firstName lastName')
      .populate('children', 'firstName lastName')
      .sort({ date: 1, startTime: 1 });
    
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error: error.message });
  }
});

// Create new schedule
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { date, startTime, endTime, children, parent, status, notes } = req.body;

    // Validate parent exists
    const parentUser = await User.findById(parent);
    if (!parentUser) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    // Validate children exist and belong to parent
    if (children && children.length > 0) {
      const childrenRecords = await Child.find({ _id: { $in: children } });
      if (childrenRecords.length !== children.length) {
        return res.status(404).json({ message: 'One or more children not found' });
      }
      
      const invalidChildren = childrenRecords.filter(child => child.parent.toString() !== parent);
      if (invalidChildren.length > 0) {
        return res.status(403).json({ message: 'One or more children do not belong to the specified parent' });
      }
    }

    const schedule = new Schedule({
      date,
      startTime,
      endTime,
      children,
      parent,
      babysitter: req.user.id,
      status,
      notes
    });

    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating schedule', error: error.message });
  }
});

// Get specific schedule
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('babysitter', 'firstName lastName')
      .populate('parent', 'firstName lastName')
      .populate('children', 'firstName lastName');

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Check if user is authorized to view this schedule
    if (req.user.role !== 'admin' && 
        schedule.babysitter.toString() !== req.user.id && 
        schedule.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this schedule' });
    }

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule', error: error.message });
  }
});

// Update schedule
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Check if user is authorized to update
    if (req.user.role !== 'admin' && 
        schedule.babysitter.toString() !== req.user.id && 
        schedule.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this schedule' });
    }

    const { date, startTime, endTime, children, status, notes } = req.body;

    schedule.date = date || schedule.date;
    schedule.startTime = startTime || schedule.startTime;
    schedule.endTime = endTime || schedule.endTime;
    schedule.children = children || schedule.children;
    schedule.status = status || schedule.status;
    schedule.notes = notes || schedule.notes;

    await schedule.save();
    res.json({ message: 'Schedule updated successfully', schedule });
  } catch (error) {
    res.status(500).json({ message: 'Error updating schedule', error: error.message });
  }
});

// Delete schedule
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Check if user is authorized to delete
    if (req.user.role !== 'admin' && 
        schedule.babysitter.toString() !== req.user.id && 
        schedule.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this schedule' });
    }

    await schedule.remove();
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting schedule', error: error.message });
  }
});

module.exports = router; 