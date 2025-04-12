const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');
const Attendance = require('../models/attendance.model');
const Child = require('../models/child.model');
const User = require('../models/user.model');

// Get all attendance records
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = {};
    
    // If user is not admin, only show their children's records
    if (req.user.role !== 'admin') {
      const children = await Child.find({ parent: req.user.id });
      const childIds = children.map(child => child._id);
      query.child = { $in: childIds };
    }

    const records = await Attendance.find(query)
      .populate('child', 'firstName lastName')
      .populate('babysitter', 'firstName lastName')
      .sort({ date: -1, 'checkIn.time': -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error: error.message });
  }
});

// Create new attendance record
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { child, date, checkIn, checkOut, status, activities, meals, naps, incidents, parentNotes, babysitterNotes } = req.body;

    // Check if child exists and user is authorized
    const childRecord = await Child.findById(child);
    if (!childRecord) {
      return res.status(404).json({ message: 'Child not found' });
    }

    if (req.user.role !== 'admin' && childRecord.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to create attendance record for this child' });
    }

    const record = new Attendance({
      child,
      babysitter: req.user.id,
      date,
      checkIn,
      checkOut,
      status,
      activities,
      meals,
      naps,
      incidents,
      parentNotes,
      babysitterNotes
    });

    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error creating attendance record', error: error.message });
  }
});

// Get specific attendance record
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id)
      .populate('child', 'firstName lastName')
      .populate('babysitter', 'firstName lastName');

    if (!record) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    // Check if user is authorized to view this record
    const child = await Child.findById(record.child);
    if (req.user.role !== 'admin' && child.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this record' });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance record', error: error.message });
  }
});

// Update attendance record
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    // Check if user is authorized to update
    const child = await Child.findById(record.child);
    if (req.user.role !== 'admin' && child.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this record' });
    }

    const { checkIn, checkOut, status, activities, meals, naps, incidents, parentNotes, babysitterNotes } = req.body;

    record.checkIn = checkIn || record.checkIn;
    record.checkOut = checkOut || record.checkOut;
    record.status = status || record.status;
    record.activities = activities || record.activities;
    record.meals = meals || record.meals;
    record.naps = naps || record.naps;
    record.incidents = incidents || record.incidents;
    record.parentNotes = parentNotes || record.parentNotes;
    record.babysitterNotes = babysitterNotes || record.babysitterNotes;

    await record.save();
    res.json({ message: 'Attendance record updated successfully', record });
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance record', error: error.message });
  }
});

// Generate attendance reports
router.get('/reports', authMiddleware, async (req, res) => {
  try {
    let query = {};
    const { startDate, endDate, child, status } = req.query;

    // If user is not admin, only show their children's records
    if (req.user.role !== 'admin') {
      const children = await Child.find({ parent: req.user.id });
      const childIds = children.map(child => child._id);
      query.child = { $in: childIds };
    }

    if (startDate) query.date = { ...query.date, $gte: new Date(startDate) };
    if (endDate) query.date = { ...query.date, $lte: new Date(endDate) };
    if (child) query.child = child;
    if (status) query.status = status;

    const records = await Attendance.find(query)
      .populate('child', 'firstName lastName')
      .populate('babysitter', 'firstName lastName')
      .sort({ date: -1, 'checkIn.time': -1 });

    // Generate summary statistics
    const summary = {
      totalRecords: records.length,
      byStatus: {},
      byChild: {},
      averageCheckInTime: null,
      averageCheckOutTime: null
    };

    let totalCheckInTime = 0;
    let totalCheckOutTime = 0;
    let checkInCount = 0;
    let checkOutCount = 0;

    records.forEach(record => {
      // Count by status
      summary.byStatus[record.status] = (summary.byStatus[record.status] || 0) + 1;

      // Count by child
      const childName = `${record.child.firstName} ${record.child.lastName}`;
      summary.byChild[childName] = (summary.byChild[childName] || 0) + 1;

      // Calculate average times
      if (record.checkIn && record.checkIn.time) {
        totalCheckInTime += new Date(record.checkIn.time).getTime();
        checkInCount++;
      }

      if (record.checkOut && record.checkOut.time) {
        totalCheckOutTime += new Date(record.checkOut.time).getTime();
        checkOutCount++;
      }
    });

    if (checkInCount > 0) {
      summary.averageCheckInTime = new Date(totalCheckInTime / checkInCount).toLocaleTimeString();
    }

    if (checkOutCount > 0) {
      summary.averageCheckOutTime = new Date(totalCheckOutTime / checkOutCount).toLocaleTimeString();
    }

    res.json({
      records,
      summary
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating attendance report', error: error.message });
  }
});

module.exports = router; 