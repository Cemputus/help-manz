const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true
  },
  babysitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  checkIn: {
    time: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    notes: String
  },
  checkOut: {
    time: {
      type: Date
    },
    location: {
      type: String
    },
    notes: String
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Early Departure'],
    default: 'Present'
  },
  activities: [{
    name: String,
    startTime: Date,
    endTime: Date,
    notes: String
  }],
  meals: [{
    type: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Snack', 'Dinner']
    },
    time: Date,
    notes: String
  }],
  naps: [{
    startTime: Date,
    endTime: Date,
    notes: String
  }],
  incidents: [{
    type: {
      type: String,
      enum: ['Injury', 'Illness', 'Behavior', 'Other']
    },
    description: String,
    actionTaken: String,
    reportedToParent: Boolean
  }],
  parentNotes: String,
  babysitterNotes: String,
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
attendanceSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance; 