const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Payment', 'Refund', 'Expense'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  babysitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child'
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Debit Card', 'Bank Transfer', 'Cash'],
    required: true
  },
  transactionId: String,
  receipt: String,
  notes: String,
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
financeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Finance = mongoose.model('Finance', financeSchema);

module.exports = Finance; 