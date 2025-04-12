import React, { useState } from 'react';
import { format } from 'date-fns';
import { FaBell, FaExclamationTriangle, FaPlus, FaEye, FaDownload, FaTrash } from 'react-icons/fa';
import './IncidentReport.css';

const IncidentReport = ({ child }) => {
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');
  
  // Initial form state
  const initialFormState = {
    date: formattedToday,
    time: format(today, 'HH:mm'),
    type: 'Injury',
    severity: 'Minor',
    location: 'Playground',
    description: '',
    actionTaken: '',
    witnesses: '',
    notifyParent: true,
    notifyEmergency: false,
    followUp: '',
    babysitterId: 1 // This would come from context/state in a real app
  };
  
  // States
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      childId: 1,
      childName: 'Michael Johnson',
      date: new Date(2023, 5, 15),
      time: '10:30',
      type: 'Injury',
      severity: 'Minor',
      location: 'Playground',
      description: 'Scraped knee while playing on the slide',
      actionTaken: 'Cleaned wound with antiseptic and applied bandage',
      witnesses: 'Jane Smith (babysitter)',
      notifyParent: true,
      notifyEmergency: false,
      followUp: 'None required',
      babysitterId: 2,
      babysitterName: 'Jane Smith',
      reportedBy: 'Jane Smith'
    },
    {
      id: 2,
      childId: 1,
      childName: 'Michael Johnson',
      date: new Date(2023, 6, 2),
      time: '14:15',
      type: 'Behavior',
      severity: 'Moderate',
      location: 'Classroom',
      description: 'Conflict with another child over sharing toys',
      actionTaken: 'Separated children, discussed sharing importance',
      witnesses: 'Robert Brown (babysitter)',
      notifyParent: true,
      notifyEmergency: false,
      followUp: 'Monitor behavior for the next week',
      babysitterId: 4,
      babysitterName: 'Robert Brown',
      reportedBy: 'Robert Brown'
    }
  ]);
  
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Toggle form visibility
  const handleToggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setFormData(initialFormState);
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Submit new incident
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newIncident = {
      id: Date.now(),
      childId: child ? child.id : 1,
      childName: child ? child.name : 'Michael Johnson',
      date: new Date(formData.date),
      time: formData.time,
      type: formData.type,
      severity: formData.severity,
      location: formData.location,
      description: formData.description,
      actionTaken: formData.actionTaken,
      witnesses: formData.witnesses,
      notifyParent: formData.notifyParent,
      notifyEmergency: formData.notifyEmergency,
      followUp: formData.followUp,
      babysitterId: formData.babysitterId,
      babysitterName: 'Jane Smith', // This would come from context/state in a real app
      reportedBy: 'Jane Smith' // This would come from auth context in a real app
    };
    
    setIncidents([newIncident, ...incidents]);
    setShowForm(false);
    setFormData(initialFormState);
  };
  
  // View incident details
  const handleViewDetails = (incident) => {
    setSelectedIncident(incident);
    setShowDetails(true);
  };
  
  // Close details modal
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedIncident(null);
  };
  
  // Delete incident
  const handleDeleteIncident = (id) => {
    if (window.confirm('Are you sure you want to delete this incident report?')) {
      setIncidents(incidents.filter(incident => incident.id !== id));
      if (showDetails && selectedIncident && selectedIncident.id === id) {
        setShowDetails(false);
        setSelectedIncident(null);
      }
    }
  };
  
  // Get severity class for styling
  const getSeverityClass = (severity) => {
    switch(severity.toLowerCase()) {
      case 'minor':
        return 'severity-minor';
      case 'moderate':
        return 'severity-moderate';
      case 'serious':
        return 'severity-serious';
      case 'critical':
        return 'severity-critical';
      default:
        return '';
    }
  };
  
  return (
    <div className="incident-report-container">
      <div className="incident-header">
        <h2 className="incident-title">
          <FaExclamationTriangle className="title-icon" /> Incident Reports
        </h2>
        <button 
          className="btn btn-primary add-incident-btn"
          onClick={handleToggleForm}
        >
          {showForm ? <><FaTimes /> Cancel</> : <><FaPlus /> New Incident</>}
        </button>
      </div>
      
      {showForm && (
        <div className="incident-form-container">
          <h3 className="form-title">New Incident Report</h3>
          <form onSubmit={handleSubmit} className="incident-form">
            <div className="form-section">
              <h4 className="section-title">Incident Details</h4>
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
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    className="form-control"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">Incident Type</label>
                  <select
                    id="type"
                    name="type"
                    className="form-control"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Injury">Injury</option>
                    <option value="Illness">Illness</option>
                    <option value="Behavior">Behavior</option>
                    <option value="Accident">Accident</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="severity">Severity</label>
                  <select
                    id="severity"
                    name="severity"
                    className="form-control"
                    value={formData.severity}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Minor">Minor</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Serious">Serious</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Playground">Playground</option>
                  <option value="Classroom">Classroom</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Dining Area">Dining Area</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="section-title">Response</h4>
              <div className="form-group">
                <label htmlFor="actionTaken">Action Taken</label>
                <textarea
                  id="actionTaken"
                  name="actionTaken"
                  className="form-control"
                  value={formData.actionTaken}
                  onChange={handleInputChange}
                  rows="2"
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="witnesses">Witnesses</label>
                <input
                  type="text"
                  id="witnesses"
                  name="witnesses"
                  className="form-control"
                  value={formData.witnesses}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-row checkboxes">
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="notifyParent"
                    name="notifyParent"
                    checked={formData.notifyParent}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="notifyParent">Notify Parent/Guardian</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="notifyEmergency"
                    name="notifyEmergency"
                    checked={formData.notifyEmergency}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="notifyEmergency">Emergency Services Called</label>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="followUp">Follow-up Required</label>
                <textarea
                  id="followUp"
                  name="followUp"
                  className="form-control"
                  value={formData.followUp}
                  onChange={handleInputChange}
                  rows="2"
                ></textarea>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Submit Report</button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleToggleForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {incidents.length > 0 ? (
        <div className="incident-list">
          <table className="incident-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Location</th>
                <th>Reported By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident.id}>
                  <td>{format(new Date(incident.date), 'MMM dd, yyyy')}</td>
                  <td>{incident.time}</td>
                  <td>{incident.type}</td>
                  <td>
                    <span className={`severity-badge ${getSeverityClass(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td>{incident.location}</td>
                  <td>{incident.reportedBy}</td>
                  <td className="actions-cell">
                    <button 
                      className="action-btn view-btn" 
                      onClick={() => handleViewDetails(incident)}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="action-btn download-btn" 
                      title="Download Report"
                    >
                      <FaDownload />
                    </button>
                    <button 
                      className="action-btn delete-btn" 
                      onClick={() => handleDeleteIncident(incident.id)}
                      title="Delete Report"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-incidents">
          <FaBell className="no-data-icon" />
          <p>No incident reports recorded yet.</p>
        </div>
      )}
      
      {showDetails && selectedIncident && (
        <div className="incident-details-modal">
          <div className="modal-overlay" onClick={handleCloseDetails}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Incident Report Details</h3>
              <button className="close-btn" onClick={handleCloseDetails}>&times;</button>
            </div>
            
            <div className="modal-body">
              <div className="details-section">
                <h4 className="details-heading">General Information</h4>
                <div className="details-grid">
                  <div className="details-item">
                    <span className="details-label">Child:</span>
                    <span className="details-value">{selectedIncident.childName}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Date:</span>
                    <span className="details-value">{format(new Date(selectedIncident.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Time:</span>
                    <span className="details-value">{selectedIncident.time}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Location:</span>
                    <span className="details-value">{selectedIncident.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h4 className="details-heading">Incident Information</h4>
                <div className="details-grid">
                  <div className="details-item">
                    <span className="details-label">Type:</span>
                    <span className="details-value">{selectedIncident.type}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Severity:</span>
                    <span className={`details-value severity-text ${getSeverityClass(selectedIncident.severity)}`}>
                      {selectedIncident.severity}
                    </span>
                  </div>
                  <div className="details-item full-width">
                    <span className="details-label">Description:</span>
                    <p className="details-value details-description">{selectedIncident.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h4 className="details-heading">Response</h4>
                <div className="details-grid">
                  <div className="details-item full-width">
                    <span className="details-label">Action Taken:</span>
                    <p className="details-value">{selectedIncident.actionTaken}</p>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Witnesses:</span>
                    <span className="details-value">{selectedIncident.witnesses || 'None'}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Parent Notified:</span>
                    <span className="details-value">{selectedIncident.notifyParent ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Emergency Services:</span>
                    <span className="details-value">{selectedIncident.notifyEmergency ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="details-item full-width">
                    <span className="details-label">Follow-up:</span>
                    <p className="details-value">{selectedIncident.followUp || 'None required'}</p>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h4 className="details-heading">Report Information</h4>
                <div className="details-grid">
                  <div className="details-item">
                    <span className="details-label">Reported By:</span>
                    <span className="details-value">{selectedIncident.reportedBy}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Report ID:</span>
                    <span className="details-value">#{selectedIncident.id}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseDetails}>Close</button>
              <button className="btn btn-primary">
                <FaDownload className="btn-icon" /> Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentReport; 