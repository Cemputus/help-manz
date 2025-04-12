const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const User = require('../models/user.model');
const Child = require('../models/child.model');
const Schedule = require('../models/schedule.model');
const Finance = require('../models/finance.model');

// Get dashboard statistics
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = {
      totalChildren: 0,
      activeBabysitters: 0,
      pendingRequests: 0,
      totalEarnings: 0
    };

    // Count total children
    stats.totalChildren = await Child.countDocuments();

    // Count active babysitters
    stats.activeBabysitters = await User.countDocuments({ 
      role: 'babysitter',
      status: 'active'
    });

    // Count pending requests
    stats.pendingRequests = await Schedule.countDocuments({
      status: 'pending'
    });

    // Calculate total earnings
    const earnings = await Finance.aggregate([
      { $match: { type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    stats.totalEarnings = earnings.length > 0 ? earnings[0].total : 0;

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
});

module.exports = router; 