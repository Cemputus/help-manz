import api from './api';

/**
 * Service for handling API calls related to children
 */
const childService = {
  /**
   * Get all children
   * @param {Object} params - Query parameters (page, limit, search, etc.)
   * @returns {Promise} Promise with children data
   */
  getAllChildren: async (params = {}) => {
    try {
      const response = await api.get('/children', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching children:', error);
      throw error;
    }
  },

  /**
   * Get a child by ID
   * @param {string} id - Child ID
   * @returns {Promise} Promise with child data
   */
  getChildById: async (id) => {
    try {
      const response = await api.get(`/children/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching child with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new child
   * @param {Object} childData - Child data to create
   * @returns {Promise} Promise with created child
   */
  createChild: async (childData) => {
    try {
      const response = await api.post('/children', childData);
      return response.data;
    } catch (error) {
      console.error('Error creating child:', error);
      throw error;
    }
  },

  /**
   * Update a child
   * @param {string} id - Child ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} Promise with updated child
   */
  updateChild: async (id, updateData) => {
    try {
      const response = await api.put(`/children/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating child ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a child
   * @param {string} id - Child ID
   * @returns {Promise} Promise with operation result
   */
  deleteChild: async (id) => {
    try {
      const response = await api.delete(`/children/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting child ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get attendance records for a child
   * @param {string} childId - Child ID
   * @param {Object} params - Query parameters (startDate, endDate, etc.)
   * @returns {Promise} Promise with attendance data
   */
  getChildAttendance: async (childId, params = {}) => {
    try {
      const response = await api.get(`/children/${childId}/attendance`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching attendance for child ${childId}:`, error);
      throw error;
    }
  },

  /**
   * Record attendance for a child
   * @param {string} childId - Child ID
   * @param {Object} attendanceData - Attendance data
   * @returns {Promise} Promise with created attendance record
   */
  recordAttendance: async (childId, attendanceData) => {
    try {
      const response = await api.post(`/children/${childId}/attendance`, attendanceData);
      return response.data;
    } catch (error) {
      console.error(`Error recording attendance for child ${childId}:`, error);
      throw error;
    }
  },

  /**
   * Get incident reports for a child
   * @param {string} childId - Child ID
   * @param {Object} params - Query parameters (startDate, endDate, etc.)
   * @returns {Promise} Promise with incident reports
   */
  getChildIncidents: async (childId, params = {}) => {
    try {
      const response = await api.get(`/children/${childId}/incidents`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching incidents for child ${childId}:`, error);
      throw error;
    }
  },

  /**
   * Create an incident report for a child
   * @param {string} childId - Child ID
   * @param {Object} incidentData - Incident data
   * @returns {Promise} Promise with created incident report
   */
  createIncidentReport: async (childId, incidentData) => {
    try {
      const response = await api.post(`/children/${childId}/incidents`, incidentData);
      return response.data;
    } catch (error) {
      console.error(`Error creating incident for child ${childId}:`, error);
      throw error;
    }
  },

  /**
   * Get a specific incident report
   * @param {string} incidentId - Incident ID
   * @returns {Promise} Promise with incident report
   */
  getIncidentById: async (incidentId) => {
    try {
      const response = await api.get(`/incidents/${incidentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching incident ${incidentId}:`, error);
      throw error;
    }
  },

  /**
   * Update an incident report
   * @param {string} incidentId - Incident ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} Promise with updated incident report
   */
  updateIncidentReport: async (incidentId, updateData) => {
    try {
      const response = await api.put(`/incidents/${incidentId}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating incident ${incidentId}:`, error);
      throw error;
    }
  },

  /**
   * Get emergency contacts for a child
   * @param {string} childId - Child ID
   * @returns {Promise} Promise with emergency contacts
   */
  getEmergencyContacts: async (childId) => {
    try {
      const response = await api.get(`/children/${childId}/contacts`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contacts for child ${childId}:`, error);
      throw error;
    }
  },

  /**
   * Add an emergency contact for a child
   * @param {string} childId - Child ID
   * @param {Object} contactData - Contact data
   * @returns {Promise} Promise with created contact
   */
  addEmergencyContact: async (childId, contactData) => {
    try {
      const response = await api.post(`/children/${childId}/contacts`, contactData);
      return response.data;
    } catch (error) {
      console.error(`Error adding contact for child ${childId}:`, error);
      throw error;
    }
  },

  /**
   * Update an emergency contact
   * @param {string} contactId - Contact ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} Promise with updated contact
   */
  updateEmergencyContact: async (contactId, updateData) => {
    try {
      const response = await api.put(`/contacts/${contactId}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating contact ${contactId}:`, error);
      throw error;
    }
  },

  /**
   * Delete an emergency contact
   * @param {string} contactId - Contact ID
   * @returns {Promise} Promise with operation result
   */
  deleteEmergencyContact: async (contactId) => {
    try {
      const response = await api.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting contact ${contactId}:`, error);
      throw error;
    }
  }
};

export default childService; 