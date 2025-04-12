const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');
const Notification = require('../models/notification.model');
const User = require('../models/user.model');

// Get all notifications
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = {};
    
    // If user is not admin, only show their notifications
    if (req.user.role !== 'admin') {
      query.$or = [
        { recipient: req.user.id },
        { sender: req.user.id }
      ];
    }

    const notifications = await Notification.find(query)
      .populate('sender', 'firstName lastName')
      .populate('recipient', 'firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
});

// Create new notification
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { recipient, type, title, message, relatedTo, priority } = req.body;

    // Validate recipient exists
    const recipientUser = await User.findById(recipient);
    if (!recipientUser) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const notification = new Notification({
      sender: req.user.id,
      recipient,
      type,
      title,
      message,
      relatedTo,
      priority,
      status: 'unread'
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error: error.message });
  }
});

// Get specific notification
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
      .populate('sender', 'firstName lastName')
      .populate('recipient', 'firstName lastName');

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Check if user is authorized to view this notification
    if (req.user.role !== 'admin' && 
        notification.recipient.toString() !== req.user.id && 
        notification.sender.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this notification' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notification', error: error.message });
  }
});

// Update notification status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Check if user is authorized to update
    if (req.user.role !== 'admin' && 
        notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this notification' });
    }

    const { status } = req.body;
    notification.status = status || notification.status;

    await notification.save();
    res.json({ message: 'Notification updated successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
});

// Delete notification
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Check if user is authorized to delete
    if (req.user.role !== 'admin' && 
        notification.recipient.toString() !== req.user.id && 
        notification.sender.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this notification' });
    }

    await notification.remove();
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification', error: error.message });
  }
});

module.exports = router; 