const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medicalInfo: {
    allergies: [String],
    medications: [{
      name: String,
      dosage: String,
      schedule: String
    }],
    conditions: [String],
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String
    }
  },
  preferences: {
    favoriteActivities: [String],
    dietaryRestrictions: [String],
    napSchedule: String,
    bedtime: String
  },
  photo: String,
  isActive: {
    type: Boolean,
    default: true
  },
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
childSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Child = mongoose.model('Child', childSchema);

module.exports = Child; 