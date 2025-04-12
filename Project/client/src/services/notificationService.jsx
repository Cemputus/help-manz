import api from './api';

/**
 * Service for handling API calls related to notifications
 */
const notificationService = {
  /**
   * Get all notifications for the current user
   * @param {Object} params - Query parameters (page, limit, type, etc.)
   * @returns {Promise} Promise with notifications data
   */
  getNotifications: async (params = {}) => {
    try {
      const response = await api.get('/notifications', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  /**
   * Get a single notification by ID
   * @param {string} id - Notification ID
   * @returns {Promise} Promise with notification data
   */
  getNotificationById: async (id) => {
    try {
      const response = await api.get(`/notifications/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching notification with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get unread notifications count for the current user
   * @returns {Promise} Promise with unread count
   */
  getUnreadCount: async () => {
    try {
      const response = await api.get('/notifications/unread/count');
      return response.data;
    } catch (error) {
      console.error('Error fetching unread notification count:', error);
      throw error;
    }
  },

  /**
   * Mark a notification as read
   * @param {string} id - Notification ID
   * @returns {Promise} Promise with updated notification
   */
  markAsRead: async (id) => {
    try {
      const response = await api.put(`/notifications/${id}/read`);
      return response.data;
    } catch (error) {
      console.error(`Error marking notification ${id} as read:`, error);
      throw error;
    }
  },

  /**
   * Mark all notifications as read for the current user
   * @returns {Promise} Promise with operation result
   */
  markAllAsRead: async () => {
    try {
      const response = await api.put('/notifications/read-all');
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  /**
   * Create a new notification
   * @param {Object} notificationData - Notification data to create
   * @returns {Promise} Promise with created notification
   */
  createNotification: async (notificationData) => {
    try {
      const response = await api.post('/notifications', notificationData);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  /**
   * Update a notification
   * @param {string} id - Notification ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} Promise with updated notification
   */
  updateNotification: async (id, updateData) => {
    try {
      const response = await api.put(`/notifications/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating notification ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a notification
   * @param {string} id - Notification ID
   * @returns {Promise} Promise with operation result
   */
  deleteNotification: async (id) => {
    try {
      const response = await api.delete(`/notifications/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting notification ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get notification preferences for the current user
   * @returns {Promise} Promise with notification preferences
   */
  getNotificationPreferences: async () => {
    try {
      const response = await api.get('/notifications/preferences');
      return response.data;
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      throw error;
    }
  },

  /**
   * Update notification preferences for the current user
   * @param {Object} preferences - Updated preferences
   * @returns {Promise} Promise with updated preferences
   */
  updateNotificationPreferences: async (preferences) => {
    try {
      const response = await api.put('/notifications/preferences', preferences);
      return response.data;
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
  },
  
  /**
   * Subscribe to push notifications
   * @param {Object} subscription - Push subscription object
   * @returns {Promise} Promise with subscription result
   */
  subscribeToPushNotifications: async (subscription) => {
    try {
      const response = await api.post('/notifications/subscribe', subscription);
      return response.data;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      throw error;
    }
  },
  
  /**
   * Unsubscribe from push notifications
   * @returns {Promise} Promise with unsubscribe result
   */
  unsubscribeFromPushNotifications: async () => {
    try {
      const response = await api.post('/notifications/unsubscribe');
      return response.data;
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      throw error;
    }
  }
};

export default notificationService; 