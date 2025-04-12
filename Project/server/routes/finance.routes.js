const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');
const Finance = require('../models/finance.model');
const User = require('../models/user.model');

// Get all financial records
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = {};
    
    // If user is not admin, only show their records
    if (req.user.role !== 'admin') {
      query.parent = req.user.id;
    }

    const records = await Finance.find(query)
      .populate('parent', 'firstName lastName')
      .populate('babysitter', 'firstName lastName')
      .populate('child', 'firstName lastName');
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching financial records', error: error.message });
  }
});

// Create new financial record
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { type, amount, description, babysitter, child, date, paymentMethod, notes } = req.body;

    // Check if parent exists
    const parent = await User.findById(req.user.id);
    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    const record = new Finance({
      type,
      amount,
      description,
      parent: req.user.id,
      babysitter,
      child,
      date,
      paymentMethod,
      notes
    });

    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error creating financial record', error: error.message });
  }
});

// Get specific financial record
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const record = await Finance.findById(req.params.id)
      .populate('parent', 'firstName lastName')
      .populate('babysitter', 'firstName lastName')
      .populate('child', 'firstName lastName');

    if (!record) {
      return res.status(404).json({ message: 'Financial record not found' });
    }

    // Check if user is authorized to view this record
    if (req.user.role !== 'admin' && record.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this record' });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching financial record', error: error.message });
  }
});

// Update financial record
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const record = await Finance.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Financial record not found' });
    }

    // Check if user is authorized to update
    if (req.user.role !== 'admin' && record.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this record' });
    }

    const { type, amount, description, babysitter, child, date, status, paymentMethod, notes } = req.body;

    record.type = type || record.type;
    record.amount = amount || record.amount;
    record.description = description || record.description;
    record.babysitter = babysitter || record.babysitter;
    record.child = child || record.child;
    record.date = date || record.date;
    record.status = status || record.status;
    record.paymentMethod = paymentMethod || record.paymentMethod;
    record.notes = notes || record.notes;

    await record.save();
    res.json({ message: 'Financial record updated successfully', record });
  } catch (error) {
    res.status(500).json({ message: 'Error updating financial record', error: error.message });
  }
});

// Delete financial record
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const record = await Finance.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Financial record not found' });
    }

    // Check if user is authorized to delete
    if (req.user.role !== 'admin' && record.parent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this record' });
    }

    await record.remove();
    res.json({ message: 'Financial record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting financial record', error: error.message });
  }
});

// Get financial summary
router.get('/summary', authMiddleware, async (req, res) => {
  try {
    let query = {};
    
    // If user is not admin, only show their records
    if (req.user.role !== 'admin') {
      query.parent = req.user.id;
    }

    const records = await Finance.find(query);
    
    const summary = {
      totalIncome: 0,
      totalExpenses: 0,
      netBalance: 0,
      byType: {},
      byMonth: {},
      byPaymentMethod: {}
    };

    records.forEach(record => {
      const amount = record.amount;
      const month = new Date(record.date).toLocaleString('default', { month: 'long' });
      const type = record.type;
      const paymentMethod = record.paymentMethod;

      // Update totals
      if (type === 'Payment') {
        summary.totalIncome += amount;
      } else {
        summary.totalExpenses += amount;
      }

      // Update by type
      summary.byType[type] = (summary.byType[type] || 0) + amount;

      // Update by month
      summary.byMonth[month] = (summary.byMonth[month] || 0) + amount;

      // Update by payment method
      summary.byPaymentMethod[paymentMethod] = (summary.byPaymentMethod[paymentMethod] || 0) + amount;
    });

    summary.netBalance = summary.totalIncome - summary.totalExpenses;

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error generating financial summary', error: error.message });
  }
});

// Generate financial reports
router.get('/reports', authMiddleware, async (req, res) => {
  try {
    let query = {};
    
    // If user is not admin, only show their records
    if (req.user.role !== 'admin') {
      query.parent = req.user.id;
    }

    const { startDate, endDate, type, paymentMethod } = req.query;

    if (startDate) query.date = { ...query.date, $gte: new Date(startDate) };
    if (endDate) query.date = { ...query.date, $lte: new Date(endDate) };
    if (type) query.type = type;
    if (paymentMethod) query.paymentMethod = paymentMethod;

    const records = await Finance.find(query)
      .populate('parent', 'firstName lastName')
      .populate('babysitter', 'firstName lastName')
      .populate('child', 'firstName lastName')
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error generating financial report', error: error.message });
  }
});

module.exports = router; 