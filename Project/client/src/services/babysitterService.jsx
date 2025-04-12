import api from './api';

/**
 * Service for handling API calls related to babysitters
 */
const babysitterService = {
  /**
   * Get all babysitters
   * @param {Object} params - Query parameters (page, limit, search, etc.)
   * @returns {Promise} Promise with babysitters data
   */
  getAllBabysitters: async (params = {}) => {
    try {
      const response = await api.get('/babysitters', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching babysitters:', error);
      throw error;
    }
  },

  /**
   * Get a babysitter by ID
   * @param {string} id - Babysitter ID
   * @returns {Promise} Promise with babysitter data
   */
  getBabysitterById: async (id) => {
    try {
      const response = await api.get(`/babysitters/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching babysitter with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new babysitter
   * @param {Object} babysitterData - Babysitter data to create
   * @returns {Promise} Promise with created babysitter
   */
  createBabysitter: async (babysitterData) => {
    try {
      const response = await api.post('/babysitters', babysitterData);
      return response.data;
    } catch (error) {
      console.error('Error creating babysitter:', error);
      throw error;
    }
  },

  /**
   * Update a babysitter
   * @param {string} id - Babysitter ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} Promise with updated babysitter
   */
  updateBabysitter: async (id, updateData) => {
    try {
      const response = await api.put(`/babysitters/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating babysitter ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a babysitter
   * @param {string} id - Babysitter ID
   * @returns {Promise} Promise with operation result
   */
  deleteBabysitter: async (id) => {
    try {
      const response = await api.delete(`/babysitters/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting babysitter ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get babysitter schedule
   * @param {string} babysitterId - Babysitter ID
   * @param {Object} params - Query parameters (startDate, endDate, etc.)
   * @returns {Promise} Promise with schedule data
   */
  getBabysitterSchedule: async (babysitterId, params = {}) => {
    try {
      const response = await api.get(`/babysitters/${babysitterId}/schedule`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching schedule for babysitter ${babysitterId}:`, error);
      throw error;
    }
  },

  /**
   * Update babysitter schedule
   * @param {string} babysitterId - Babysitter ID
   * @param {Object} scheduleData - Schedule data
   * @returns {Promise} Promise with updated schedule
   */
  updateBabysitterSchedule: async (babysitterId, scheduleData) => {
    try {
      const response = await api.put(`/babysitters/${babysitterId}/schedule`, scheduleData);
      return response.data;
    } catch (error) {
      console.error(`Error updating schedule for babysitter ${babysitterId}:`, error);
      throw error;
    }
  },

  /**
   * Add a schedule entry for a babysitter
   * @param {string} babysitterId - Babysitter ID
   * @param {Object} scheduleEntry - Schedule entry data
   * @returns {Promise} Promise with created schedule entry
   */
  addScheduleEntry: async (babysitterId, scheduleEntry) => {
    try {
      const response = await api.post(`/babysitters/${babysitterId}/schedule`, scheduleEntry);
      return response.data;
    } catch (error) {
      console.error(`Error adding schedule entry for babysitter ${babysitterId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a schedule entry
   * @param {string} scheduleId - Schedule entry ID
   * @returns {Promise} Promise with operation result
   */
  deleteScheduleEntry: async (scheduleId) => {
    try {
      const response = await api.delete(`/schedule/${scheduleId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting schedule entry ${scheduleId}:`, error);
      throw error;
    }
  },

  /**
   * Get babysitter payment summary
   * @param {string} babysitterId - Babysitter ID
   * @param {Object} params - Query parameters (month, year, etc.)
   * @returns {Promise} Promise with payment summary
   */
  getPaymentSummary: async (babysitterId, params = {}) => {
    try {
      const response = await api.get(`/babysitters/${babysitterId}/payments`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching payment summary for babysitter ${babysitterId}:`, error);
      throw error;
    }
  },

  /**
   * Process payment for a babysitter
   * @param {string} babysitterId - Babysitter ID
   * @param {Object} paymentData - Payment data
   * @returns {Promise} Promise with payment result
   */
  processPayment: async (babysitterId, paymentData) => {
    try {
      const response = await api.post(`/babysitters/${babysitterId}/payments`, paymentData);
      return response.data;
    } catch (error) {
      console.error(`Error processing payment for babysitter ${babysitterId}:`, error);
      throw error;
    }
  },

  /**
   * Get assigned children for a babysitter
   * @param {string} babysitterId - Babysitter ID
   * @returns {Promise} Promise with assigned children
   */
  getAssignedChildren: async (babysitterId) => {
    try {
      const response = await api.get(`/babysitters/${babysitterId}/children`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching assigned children for babysitter ${babysitterId}:`, error);
      throw error;
    }
  },

  /**
   * Assign a child to a babysitter
   * @param {string} babysitterId - Babysitter ID
   * @param {string} childId - Child ID
   * @returns {Promise} Promise with assignment result
   */
  assignChild: async (babysitterId, childId) => {
    try {
      const response = await api.post(`/babysitters/${babysitterId}/children`, { childId });
      return response.data;
    } catch (error) {
      console.error(`Error assigning child ${childId} to babysitter ${babysitterId}:`, error);
      throw error;
    }
  },

  /**
   * Unassign a child from a babysitter
   * @param {string} babysitterId - Babysitter ID
   * @param {string} childId - Child ID
   * @returns {Promise} Promise with unassignment result
   */
  unassignChild: async (babysitterId, childId) => {
    try {
      const response = await api.delete(`/babysitters/${babysitterId}/children/${childId}`);
      return response.data;
    } catch (error) {
      console.error(`Error unassigning child ${childId} from babysitter ${babysitterId}:`, error);
      throw error;
    }
  },

  /**
   * Get babysitter performance metrics
   * @param {string} babysitterId - Babysitter ID
   * @param {Object} params - Query parameters (startDate, endDate, etc.)
   * @returns {Promise} Promise with performance metrics
   */
  getPerformanceMetrics: async (babysitterId, params = {}) => {
    try {
      const response = await api.get(`/babysitters/${babysitterId}/performance`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching performance metrics for babysitter ${babysitterId}:`, error);
      throw error;
    }
  }
};

export default babysitterService; 