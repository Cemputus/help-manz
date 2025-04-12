import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Form, InputGroup, Tabs, Tab } from 'react-bootstrap';
import { 
  FaBell, 
  FaSearch, 
  FaFilter,
  FaCheckDouble, 
  FaCheck, 
  FaTrash, 
  FaInfo,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaCog
} from 'react-icons/fa';
import { format } from 'date-fns';
import notificationService from '../services/notificationService';
import AlertBox from '../components/Notification/AlertBox';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [notificationTypes, setNotificationTypes] = useState([
    'info', 'success', 'warning', 'danger'
  ]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    // Filter notifications whenever filters change
    filterNotifications();
  }, [notifications, activeTab, searchTerm, selectedType]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // In a real app, this would call the API
      // const data = await notificationService.getNotifications();
      
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
        },
        {
          id: '6',
          title: 'Staff Meeting Reminder',
          message: 'Reminder: Staff meeting tomorrow at 9 AM',
          type: 'info',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
          link: '/events/12'
        },
        {
          id: '7',
          title: 'New Policy Update',
          message: 'The daycare policy has been updated. Please review the changes.',
          type: 'warning',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
          link: '/policy/updates'
        },
        {
          id: '8',
          title: 'Emergency Contact Update',
          message: 'The Miller family has updated their emergency contact information',
          type: 'info',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
          link: '/child/5/contacts'
        }
      ];

      setNotifications(mockNotifications);
      setFilteredNotifications(mockNotifications);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications');
      setLoading(false);
    }
  };

  const filterNotifications = () => {
    let filtered = [...notifications];
    
    // Filter by tab (read status)
    if (activeTab === 'unread') {
      filtered = filtered.filter(n => !n.read);
    } else if (activeTab === 'read') {
      filtered = filtered.filter(n => n.read);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(term) || 
        n.message.toLowerCase().includes(term)
      );
    }
    
    // Filter by type
    if (selectedType) {
      filtered = filtered.filter(n => n.type === selectedType);
    }
    
    setFilteredNotifications(filtered);
  };

  const handleMarkAsRead = async (id) => {
    try {
      // In a real app, this would call the API
      // await notificationService.markAsRead(id);
      
      // Update state locally
      const updatedNotifications = notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      );
      
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      setError('Failed to mark notification as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // In a real app, this would call the API
      // await notificationService.markAllAsRead();
      
      // Update state locally
      const updatedNotifications = notifications.map(notification => ({ 
        ...notification, 
        read: true 
      }));
      
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      setError('Failed to mark all notifications as read');
    }
  };

  const handleMarkSelectedAsRead = async () => {
    try {
      const updatedNotifications = notifications.map(notification => 
        selectedNotifications.includes(notification.id) 
          ? { ...notification, read: true } 
          : notification
      );
      
      setNotifications(updatedNotifications);
      setSelectedNotifications([]);
    } catch (error) {
      console.error('Error marking selected notifications as read:', error);
      setError('Failed to mark selected notifications as read');
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      // In a real app, this would call the API
      // await notificationService.deleteNotification(id);
      
      // Update state locally
      const updatedNotifications = notifications.filter(notification => notification.id !== id);
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error deleting notification:', error);
      setError('Failed to delete notification');
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const updatedNotifications = notifications.filter(
        notification => !selectedNotifications.includes(notification.id)
      );
      
      setNotifications(updatedNotifications);
      setSelectedNotifications([]);
    } catch (error) {
      console.error('Error deleting selected notifications:', error);
      setError('Failed to delete selected notifications');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    } else {
      setSelectedNotifications([]);
    }
  };

  const handleSelectNotification = (id, isChecked) => {
    if (isChecked) {
      setSelectedNotifications([...selectedNotifications, id]);
    } else {
      setSelectedNotifications(selectedNotifications.filter(nId => nId !== id));
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

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy h:mm a');
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'success':
        return <Badge bg="success">Success</Badge>;
      case 'warning':
        return <Badge bg="warning" text="dark">Warning</Badge>;
      case 'danger':
        return <Badge bg="danger">Important</Badge>;
      case 'info':
      default:
        return <Badge bg="info">Info</Badge>;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>
            <FaBell className="me-2" />
            Notifications
          </h1>
          <p className="text-muted">
            Manage all your notifications in one place
          </p>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <AlertBox 
              type="danger" 
              message={error} 
              dismissible={true}
              onClose={() => setError(null)}
            />
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {selectedNotifications.length > 0 ? (
                    <>
                      <span className="me-2">{selectedNotifications.length} selected</span>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={handleMarkSelectedAsRead}
                      >
                        <FaCheck className="me-1" /> Mark as Read
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={handleDeleteSelected}
                      >
                        <FaTrash className="me-1" /> Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      {unreadCount > 0 && (
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={handleMarkAllAsRead}
                        >
                          <FaCheckDouble className="me-1" /> Mark All as Read
                        </Button>
                      )}
                    </>
                  )}
                </div>
                <div className="d-flex gap-2">
                  <Form.Group style={{ width: '200px' }}>
                    <Form.Select 
                      size="sm"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="">All Types</option>
                      {notificationTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <InputGroup style={{ width: '250px' }}>
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                      size="sm"
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-0 notification-tabs"
              >
                <Tab eventKey="all" title={`All (${notifications.length})`}>
                  {renderNotificationTable()}
                </Tab>
                <Tab eventKey="unread" title={`Unread (${unreadCount})`}>
                  {renderNotificationTable()}
                </Tab>
                <Tab eventKey="read" title={`Read (${notifications.length - unreadCount})`}>
                  {renderNotificationTable()}
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Notification Settings</h5>
            </Card.Header>
            <Card.Body>
              <p>
                <FaCog className="me-2" />
                Configure your notification preferences to determine which notifications you receive and how.
              </p>
              <Button variant="primary">
                Notification Settings
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  function renderNotificationTable() {
    if (loading) {
      return <div className="p-4 text-center">Loading notifications...</div>;
    }

    if (filteredNotifications.length === 0) {
      return <div className="p-4 text-center">No notifications found</div>;
    }

    return (
      <div className="table-responsive">
        <Table hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th style={{ width: '40px' }}>
                <Form.Check 
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    filteredNotifications.length > 0 && 
                    selectedNotifications.length === filteredNotifications.length
                  }
                />
              </th>
              <th style={{ width: '40px' }}></th>
              <th>Details</th>
              <th style={{ width: '120px' }}>Type</th>
              <th style={{ width: '180px' }}>Date</th>
              <th style={{ width: '100px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map(notification => (
              <tr 
                key={notification.id} 
                className={!notification.read ? 'table-light fw-bold' : ''}
              >
                <td>
                  <Form.Check 
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={(e) => handleSelectNotification(notification.id, e.target.checked)}
                  />
                </td>
                <td>{getNotificationIcon(notification.type)}</td>
                <td>
                  <div>{notification.title}</div>
                  <div className="text-muted small">{notification.message}</div>
                </td>
                <td>{getTypeBadge(notification.type)}</td>
                <td>{getFormattedDate(notification.createdAt)}</td>
                <td>
                  {!notification.read && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0 me-2 text-decoration-none"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <FaCheck className="me-1" /> Read
                    </Button>
                  )}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 text-danger text-decoration-none"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <FaTrash className="me-1" /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default NotificationsPage; 