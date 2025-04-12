import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { FaPlus, FaTrash, FaCalendarAlt, FaClock } from 'react-icons/fa';
import './Schedule.css';

const Schedule = ({ babysitter }) => {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [scheduleEntries, setScheduleEntries] = useState([
    { id: 1, date: new Date(2023, 6, 10), startTime: '08:00', endTime: '15:00', children: 4 },
    { id: 2, date: new Date(2023, 6, 11), startTime: '09:00', endTime: '17:00', children: 6 },
    { id: 3, date: new Date(2023, 6, 13), startTime: '08:00', endTime: '16:00', children: 5 },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '08:00',
    endTime: '16:00',
    children: 0
  });
  
  // Generate days for the week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Add new schedule entry
  const handleAddSchedule = (e) => {
    e.preventDefault();
    
    const newEntry = {
      id: Date.now(),
      date: new Date(formData.date),
      startTime: formData.startTime,
      endTime: formData.endTime,
      children: parseInt(formData.children, 10)
    };
    
    setScheduleEntries([...scheduleEntries, newEntry]);
    setShowAddForm(false);
    setFormData({
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '08:00',
      endTime: '16:00',
      children: 0
    });
  };
  
  // Delete schedule entry
  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to remove this schedule entry?')) {
      setScheduleEntries(scheduleEntries.filter(entry => entry.id !== id));
    }
  };
  
  // Navigate to previous week
  const prevWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
  };
  
  // Navigate to next week
  const nextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };
  
  // Get entries for a specific day
  const getEntriesForDay = (day) => {
    return scheduleEntries.filter(entry => isSameDay(new Date(entry.date), day));
  };
  
  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2 className="schedule-title">Babysitter Schedule</h2>
        <div className="schedule-actions">
          <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
            <FaPlus /> {showAddForm ? 'Cancel' : 'Add Schedule'}
          </button>
        </div>
      </div>
      
      {showAddForm && (
        <div className="schedule-form card">
          <h3 className="schedule-form-title">Add New Schedule</h3>
          <form onSubmit={handleAddSchedule}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="children">Number of Children</label>
                <input
                  type="number"
                  id="children"
                  name="children"
                  className="form-control"
                  value={formData.children}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="form-control"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="form-control"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary">Save Schedule</button>
          </form>
        </div>
      )}
      
      <div className="calendar-navigation">
        <button className="btn btn-link" onClick={prevWeek}>&larr; Previous Week</button>
        <h3 className="current-week">
          {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
        </h3>
        <button className="btn btn-link" onClick={nextWeek}>Next Week &rarr;</button>
      </div>
      
      <div className="calendar-week">
        {weekDays.map((day) => (
          <div key={day.toString()} className="calendar-day">
            <div className="day-header">
              <span className="day-name">{format(day, 'EEE')}</span>
              <span className="day-date">{format(day, 'd')}</span>
            </div>
            
            <div className="day-content">
              {getEntriesForDay(day).map((entry) => (
                <div key={entry.id} className="schedule-entry">
                  <div className="entry-time">
                    <FaClock className="entry-icon" />
                    {entry.startTime} - {entry.endTime}
                  </div>
                  <div className="entry-children">
                    <span className="children-count">{entry.children} children</span>
                  </div>
                  <button
                    className="delete-entry-btn"
                    onClick={() => handleDeleteEntry(entry.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              
              {getEntriesForDay(day).length === 0 && (
                <div className="no-schedule">
                  <span>No schedule</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="schedule-list">
        <h3 className="list-title">Upcoming Schedules</h3>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Children</th>
              <th>Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scheduleEntries.length > 0 ? (
              scheduleEntries.map((entry) => {
                // Calculate hours
                const startHour = parseInt(entry.startTime.split(':')[0], 10);
                const endHour = parseInt(entry.endTime.split(':')[0], 10);
                const hours = endHour - startHour;
                
                return (
                  <tr key={entry.id}>
                    <td>{format(new Date(entry.date), 'MMM dd, yyyy')}</td>
                    <td>{entry.startTime} - {entry.endTime}</td>
                    <td>{entry.children}</td>
                    <td>{hours}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="no-entries">No scheduled sessions.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule; 