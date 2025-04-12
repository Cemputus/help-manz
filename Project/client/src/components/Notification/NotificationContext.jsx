import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { GlobalAlertBox } from './AlertBox';

// Create notification context
const NotificationContext = createContext();

// Action types
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

// Initial state
const initialState = {
  notifications: []
};

// Reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now(),
          ...action.payload
        }]
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      };
    default:
      return state;
  }
};

// Provider component
export const NotificationProvider = ({ children, position = 'top-right' }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = useCallback((notification) => {
    dispatch({
      type: ADD_NOTIFICATION,
      payload: notification
    });
    
    // Auto-dismiss after timeout if specified
    if (notification.timeout && notification.timeout > 0) {
      setTimeout(() => {
        dispatch({
          type: REMOVE_NOTIFICATION,
          payload: notification.id
        });
      }, notification.timeout);
    }
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({
      type: REMOVE_NOTIFICATION,
      payload: id
    });
  }, []);

  const clearNotifications = useCallback(() => {
    dispatch({ type: CLEAR_NOTIFICATIONS });
  }, []);

  // Convenience methods for different notification types
  const showSuccess = useCallback((message, options = {}) => {
    addNotification({
      variant: 'success',
      message,
      timeout: 5000,
      ...options
    });
  }, [addNotification]);

  const showError = useCallback((message, options = {}) => {
    addNotification({
      variant: 'error',
      message,
      timeout: 8000,
      ...options
    });
  }, [addNotification]);

  const showWarning = useCallback((message, options = {}) => {
    addNotification({
      variant: 'warning',
      message,
      timeout: 6000,
      ...options
    });
  }, [addNotification]);

  const showInfo = useCallback((message, options = {}) => {
    addNotification({
      variant: 'info',
      message,
      timeout: 5000,
      ...options
    });
  }, [addNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        addNotification,
        removeNotification,
        clearNotifications,
        showSuccess,
        showError,
        showWarning,
        showInfo
      }}
    >
      {children}
      <GlobalAlertBox
        alerts={state.notifications}
        onClose={removeNotification}
        position={position}
      />
    </NotificationContext.Provider>
  );
};

// Custom hook for using the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  
  return context;
};

export default NotificationContext; 