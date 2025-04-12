import React, { useState, useEffect } from 'react';
import { Dropdown, Badge, Button, Nav } from 'react-bootstrap';
import { 
  FaBell, 
  FaCheckDouble, 
  FaRegBell, 
  FaCircle, 
  FaInfo,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaCog
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
// Will be used when connected to real backend
// import notificationService from '../../services/notificationService';
import './Notification.css';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    
    // Set up interval to check for new notifications every 2 minutes
    const intervalId = setInterval(() => {
      fetchUnreadCount();
    }, 120000);
    
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const fetchUnreadCount = async () => {
    try {
      // In a real app with working backend
      // const data = await notificationService.getUnreadCount();
      // setUnreadCount(data.count);
      
      // For demo, we'll just recalculate based on current state
      setUnreadCount(notifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // In a real app with working backend
      // const data = await notificationService.getNotifications({ limit: 5 });
      // setNotifications(data.notifications);
      // setUnreadCount(data.unreadCount);
      
      // Mock data for demo
      const mockNotifications = [
        {
          id: '1',
          title: 'New Child Registration',
          message: 'A new child, Emma Johnson, has been registered',
          type: 'info',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
          link: '/child/1'
        },
        {
          id: '2',
          title: 'Babysitter Availability Update',
          message: 'Sarah Wilson has updated her availability for next week',
          type: 'info',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          link: '/babysitter/schedule/2'
        },
        {
          id: '3',
          title: 'Payment Due',
          message: 'Monthly payment for Johnson family is due tomorrow',
          type: 'warning',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
          link: '/finance/payments'
        },
        {
          id: '4',
          title: 'Incident Report Filed',
          message: 'An incident report has been filed for Noah Smith',
          type: 'danger',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          link: '/child/incident/4'
        },
        {
          id: '5',
          title: 'Payroll Processed',
          message: 'Payroll for the current period has been processed successfully',
          type: 'success',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
          link: '/finance/payroll'
        }
      ];

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications');
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      // In a real app with working backend
      // await notificationService.markAsRead(id);
      
      // Update state locally
      const updatedNotifications = notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      );
      
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // In a real app with working backend
      // await notificationService.markAllAsRead();
      
      // Update state locally
      const updatedNotifications = notifications.map(notification => ({ 
        ...notification, 
        read: true 
      }));
      
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    
    // Navigate to the linked page
    if (notification.link) {
      // Close dropdown (will happen automatically in most cases)
      navigate(notification.link);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-success" />;
      case 'warning':
        return <FaExclamationTriangle className="text-warning" />;
      case 'danger':
        return <FaTimesCircle className="text-danger" />;
      case 'info':
      default:
        return <FaInfo className="text-info" />;
    }
  };

  const getFormattedTime = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle 
        variant="link" 
        id="notification-dropdown" 
        className="notification-bell nav-link"
        bsPrefix="no-caret"
      >
        {unreadCount > 0 ? (
          <>
            <FaBell className="fs-5" />
            <Badge pill bg="danger" className="notification-count">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          </>
        ) : (
          <FaRegBell className="fs-5" />
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="notification-dropdown shadow-lg">
        <div className="notification-header">
          <h6 className="mb-0">Notifications</h6>
          {unreadCount > 0 && (
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 text-decoration-none"
              onClick={handleMarkAllAsRead}
            >
              <FaCheckDouble className="me-1" /> Mark all as read
            </Button>
          )}
        </div>

        <div>
          {loading ? (
            <div className="notification-empty">Loading...</div>
          ) : error ? (
            <div className="notification-empty text-danger">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="notification-empty">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="d-flex">
                  <div className="me-2">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-grow-1">
                    <div className="notification-item-header">
                      <span className="notification-item-title">{notification.title}</span>
                      {!notification.read && <FaCircle className="text-primary" size={8} />}
                    </div>
                    <p className="notification-item-message">{notification.message}</p>
                    <div className="notification-item-time">
                      {getFormattedTime(notification.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="notification-footer">
          <Link to="/notifications" className="text-decoration-none">
            View All Notifications
          </Link>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationCenter; 