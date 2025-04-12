import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { FaChild, FaCheck, FaTimes, FaClock, FaSearch } from 'react-icons/fa';
import './Attendance.css';

const Attendance = ({ child }) => {
  const today = new Date();
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(today, { weekStartsOn: 1 }));
  const [searchDate, setSearchDate] = useState(format(today, 'yyyy-MM-dd'));
  
  // Sample attendance data
  const [attendanceData, setAttendanceData] = useState([
    { 
      id: 1, 
      childId: 1, 
      date: new Date(2023, 6, 10), 
      checkIn: '08:30', 
      checkOut: '16:00', 
      status: 'Present',
      notes: ''
    },
    { 
      id: 2, 
      childId: 1, 
      date: new Date(2023, 6, 11), 
      checkIn: '08:45', 
      checkOut: '15:30', 
      status: 'Present',
      notes: 'Picked up early by mother'
    },
    { 
      id: 3, 
      childId: 1, 
      date: new Date(2023, 6, 12), 
      checkIn: '', 
      checkOut: '', 
      status: 'Absent',
      notes: 'Sick leave'
    },
    { 
      id: 4, 
      childId: 1, 
      date: new Date(2023, 6, 13), 
      checkIn: '08:15', 
      checkOut: '16:30', 
      status: 'Present',
      notes: ''
    },
  ]);
  
  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  
  // Filter attendance by date
  const filterAttendanceByDate = (date) => {
    return attendanceData.filter(record => isSameDay(new Date(record.date), date));
  };
  
  // Navigate to previous week
  const prevWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
  };
  
  // Navigate to next week
  const nextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };
  
  // Handle attendance record update
  const handleAttendanceUpdate = (date, field, value) => {
    const existingRecord = attendanceData.find(record => 
      isSameDay(new Date(record.date), date)
    );
    
    if (existingRecord) {
      setAttendanceData(attendanceData.map(record => 
        isSameDay(new Date(record.date), date) 
          ? { ...record, [field]: value }
          : record
      ));
    } else {
      const newRecord = {
        id: Date.now(),
        childId: child ? child.id : 1,
        date: date,
        checkIn: field === 'checkIn' ? value : '',
        checkOut: field === 'checkOut' ? value : '',
        status: field === 'status' ? value : 'Present',
        notes: field === 'notes' ? value : ''
      };
      setAttendanceData([...attendanceData, newRecord]);
    }
  };
  
  // Create or update attendance for a day
  const updateAttendance = (date, status) => {
    handleAttendanceUpdate(date, 'status', status);
  };
  
  // Search for attendance record by date
  const handleSearchDate = (e) => {
    setSearchDate(e.target.value);
  };
  
  // Find record by search date
  const searchedRecord = attendanceData.find(record => 
    format(new Date(record.date), 'yyyy-MM-dd') === searchDate
  );
  
  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h2 className="attendance-title">
          <FaChild className="title-icon" /> Attendance Tracker
        </h2>
        <div className="date-search">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="date"
              value={searchDate}
              onChange={handleSearchDate}
              className="date-input"
            />
          </div>
        </div>
      </div>
      
      {searchedRecord && (
        <div className="searched-attendance">
          <h3 className="search-result-title">
            Attendance for {format(new Date(searchedRecord.date), 'MMMM d, yyyy')}
          </h3>
          <div className="searched-record">
            <div className="record-status">
              <span className={`status-badge status-${searchedRecord.status.toLowerCase()}`}>
                {searchedRecord.status}
              </span>
            </div>
            
            {searchedRecord.status === 'Present' && (
              <div className="record-times">
                <div className="time-item">
                  <span className="time-label">Check-in:</span>
                  <span className="time-value">{searchedRecord.checkIn || 'Not recorded'}</span>
                </div>
                <div className="time-item">
                  <span className="time-label">Check-out:</span>
                  <span className="time-value">{searchedRecord.checkOut || 'Not recorded'}</span>
                </div>
              </div>
            )}
            
            <div className="record-notes">
              <span className="notes-label">Notes:</span>
              <span className="notes-value">{searchedRecord.notes || 'No notes'}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="calendar-navigation">
        <button className="btn btn-link" onClick={prevWeek}>&larr; Previous Week</button>
        <h3 className="current-week">
          {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
        </h3>
        <button className="btn btn-link" onClick={nextWeek}>Next Week &rarr;</button>
      </div>
      
      <div className="attendance-calendar">
        {weekDays.map((day) => {
          const dayAttendance = filterAttendanceByDate(day)[0];
          const isPast = day < today;
          const isToday = isSameDay(day, today);
          
          return (
            <div 
              key={day.toString()} 
              className={`calendar-day ${isToday ? 'today' : ''}`}
            >
              <div className="day-header">
                <span className="day-name">{format(day, 'EEE')}</span>
                <span className="day-date">{format(day, 'd')}</span>
              </div>
              
              <div className="day-content">
                {dayAttendance ? (
                  <div className={`attendance-status attendance-${dayAttendance.status.toLowerCase()}`}>
                    <span className="status-text">{dayAttendance.status}</span>
                    
                    {dayAttendance.status === 'Present' && (
                      <div className="time-info">
                        <div className="time-entry">
                          <FaClock className="time-icon" />
                          <span className="time-label">In:</span>
                          <span className="time-value">{dayAttendance.checkIn || '--:--'}</span>
                        </div>
                        <div className="time-entry">
                          <FaClock className="time-icon" />
                          <span className="time-label">Out:</span>
                          <span className="time-value">{dayAttendance.checkOut || '--:--'}</span>
                        </div>
                      </div>
                    )}
                    
                    {dayAttendance.notes && (
                      <div className="attendance-notes">
                        <span className="notes-icon">📝</span> {dayAttendance.notes}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="no-attendance">
                    {isPast || isToday ? (
                      <div className="attendance-buttons">
                        <button 
                          className="attendance-btn present-btn"
                          onClick={() => updateAttendance(day, 'Present')}
                        >
                          <FaCheck /> Present
                        </button>
                        <button 
                          className="attendance-btn absent-btn"
                          onClick={() => updateAttendance(day, 'Absent')}
                        >
                          <FaTimes /> Absent
                        </button>
                      </div>
                    ) : (
                      <span className="future-date">Future date</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="attendance-summary">
        <h3 className="summary-title">Attendance Summary</h3>
        <div className="summary-stats">
          <div className="stat-card">
            <div className="stat-value">
              {attendanceData.filter(record => record.status === 'Present').length}
            </div>
            <div className="stat-label">Present</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {attendanceData.filter(record => record.status === 'Absent').length}
            </div>
            <div className="stat-label">Absent</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {(attendanceData.filter(record => record.status === 'Present').length / 
                attendanceData.length * 100).toFixed(0)}%
            </div>
            <div className="stat-label">Attendance Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance; 