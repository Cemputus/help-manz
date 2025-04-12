const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: [
      'Schedule',
      'Payment',
      'Attendance',
      'Message',
      'System',
      'Emergency',
      'Review'
    ],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  relatedTo: {
    model: {
      type: String,
      enum: ['Schedule', 'Payment', 'Attendance', 'Child', 'Babysitter']
    },
    id: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Unread', 'Read', 'Archived'],
    default: 'Unread'
  },
  actionRequired: {
    type: Boolean,
    default: false
  },
  actionUrl: String,
  readAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
notificationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification; 