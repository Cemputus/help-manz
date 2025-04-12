const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/error.middleware');
const { connectDB } = require('./config/db.config');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const babysitterRoutes = require('./routes/babysitter.routes');
const childRoutes = require('./routes/child.routes');
const financeRoutes = require('./routes/finance.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const scheduleRoutes = require('./routes/schedule.routes');
const notificationRoutes = require('./routes/notification.routes');
const reportRoutes = require('./routes/report.routes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/babysitters', babysitterRoutes);
app.use('/api/children', childRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reports', reportRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 