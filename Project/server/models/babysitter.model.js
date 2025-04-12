const mongoose = require('mongoose');

const babysitterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  }],
  experience: {
    type: Number,
    required: true
  },
  qualifications: [{
    type: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: Date
  }],
  languages: [{
    type: String
  }],
  ageRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  maxChildren: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  isAvailable: {
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
babysitterSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Babysitter = mongoose.model('Babysitter', babysitterSchema);

module.exports = Babysitter; 