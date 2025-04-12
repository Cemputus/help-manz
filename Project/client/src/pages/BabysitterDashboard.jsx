import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMoneyBillWave, FaUser, FaClock, FaBell, FaChartLine, FaChild } from 'react-icons/fa';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import './BabysitterDashboard.css';
import { useNavigate } from 'react-router-dom';

const BabysitterDashboard = () => {
  const [babysitterData, setBabysitterData] = useState({
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    hourlyRate: 15,
    totalHours: 120,
    totalEarnings: 1800,
    upcomingShifts: [],
    recentPayments: [],
    notifications: []
  });
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Fetch babysitter data on component mount
  useEffect(() => {
    const fetchBabysitterData = async () => {
      try {
        setLoading(true);
        
        // In a real application, this would be an API call
        // For now, we'll use mock data
        const mockData = {
          id: 1,
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.johnson@example.com',
          phone: '+1 (555) 123-4567',
          status: 'active',
          hourlyRate: 15,
          totalHours: 120,
          totalEarnings: 1800,
          upcomingShifts: [
            { id: 1, childName: 'Emma Wilson', date: '2023-06-15', startTime: '08:00', endTime: '16:00', status: 'scheduled' },
            { id: 2, childName: 'Noah Brown', date: '2023-06-16', startTime: '09:00', endTime: '17:00', status: 'scheduled' },
            { id: 3, childName: 'Olivia Davis', date: '2023-06-17', startTime: '10:00', endTime: '18:00', status: 'scheduled' }
          ],
          recentPayments: [
            { id: 1, date: '2023-06-01', amount: 450, status: 'paid' },
            { id: 2, date: '2023-05-15', amount: 480, status: 'paid' },
            { id: 3, date: '2023-05-01', amount: 420, status: 'paid' }
          ],
          notifications: [
            { id: 1, message: 'New shift scheduled for next week', date: '2023-06-10', read: false },
            { id: 2, message: 'Payment processed for May 15-31', date: '2023-06-01', read: true },
            { id: 3, message: 'Profile update required', date: '2023-05-28', read: false }
          ]
        };
        
        setBabysitterData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching babysitter data:', error);
        toast.error('Failed to load babysitter data');
        setLoading(false);
      }
    };
    
    fetchBabysitterData();
  }, []);
  
  // Handle notification click
  const handleNotificationClick = (notificationId) => {
    setBabysitterData({
      ...babysitterData,
      notifications: babysitterData.notifications.map(notification => 
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    });
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX'
    }).format(amount);
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'inactive':
        return <Badge bg="danger">Inactive</Badge>;
      case 'on-leave':
        return <Badge bg="warning">On Leave</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };
  
  const handleCardClick = (path) => {
    navigate(path);
  };
  
  return (
    <Container fluid className="babysitter-dashboard">
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {babysitterData.firstName}!</h2>
          <p className="text-muted">Here's your dashboard overview</p>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="dashboard-card" onClick={() => handleCardClick('/attendance')}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-1 text-muted">Total Hours</h6>
                  <h3 className="card-title mb-0">{babysitterData.totalHours}</h3>
                </div>
                <div className="dashboard-icon">
                  <FaClock />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card" onClick={() => handleCardClick('/schedule')}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-1 text-muted">Total Earnings</h6>
                  <h3 className="card-title mb-0">{formatCurrency(babysitterData.totalEarnings)}</h3>
                </div>
                <div className="dashboard-icon">
                  <FaMoneyBillWave />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card" onClick={() => handleCardClick('/children')}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-1 text-muted">Upcoming Shifts</h6>
                  <h3 className="card-title mb-0">{babysitterData.upcomingShifts.length}</h3>
                </div>
                <div className="dashboard-icon">
                  <FaChild />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <span>Upcoming Shifts</span>
                <Button variant="outline-primary" size="sm">
                  View Calendar
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : babysitterData.upcomingShifts.length === 0 ? (
                <p className="text-center">No upcoming shifts</p>
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Child</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {babysitterData.upcomingShifts.map(shift => (
                      <tr key={shift.id}>
                        <td>{shift.childName}</td>
                        <td>{format(new Date(shift.date), 'MMM dd, yyyy')}</td>
                        <td>{shift.startTime} - {shift.endTime}</td>
                        <td>
                          <Badge bg={shift.status === 'scheduled' ? 'primary' : 'secondary'}>
                            {shift.status}
                          </Badge>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm">
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <span>Recent Payments</span>
                <Button variant="outline-primary" size="sm">
                  View All
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : babysitterData.recentPayments.length === 0 ? (
                <p className="text-center">No recent payments</p>
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {babysitterData.recentPayments.map(payment => (
                      <tr key={payment.id}>
                        <td>{format(new Date(payment.date), 'MMM dd, yyyy')}</td>
                        <td>{formatCurrency(payment.amount)}</td>
                        <td>
                          <Badge bg={payment.status === 'paid' ? 'success' : 'warning'}>
                            {payment.status}
                          </Badge>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm">
                            View Receipt
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <span>Profile</span>
                <Button variant="outline-primary" size="sm">
                  Edit
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                <div className="profile-image">
                  <FaUser size={40} />
                </div>
                <h5 className="mt-2">{babysitterData.firstName} {babysitterData.lastName}</h5>
                <p className="text-muted">{getStatusBadge(babysitterData.status)}</p>
              </div>
              
              <div className="profile-info">
                <div className="profile-info-item">
                  <span className="profile-info-label">Email:</span>
                  <span className="profile-info-value">{babysitterData.email}</span>
                </div>
                <div className="profile-info-item">
                  <span className="profile-info-label">Phone:</span>
                  <span className="profile-info-value">{babysitterData.phone}</span>
                </div>
                <div className="profile-info-item">
                  <span className="profile-info-label">Hourly Rate:</span>
                  <span className="profile-info-value">{formatCurrency(babysitterData.hourlyRate)}/hr</span>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <span>Notifications</span>
                <Button variant="outline-primary" size="sm">
                  Mark All Read
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <p className="text-center p-3">Loading...</p>
              ) : babysitterData.notifications.length === 0 ? (
                <p className="text-center p-3">No notifications</p>
              ) : (
                <div className="notification-list">
                  {babysitterData.notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${!notification.read ? 'unread' : ''}`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="notification-icon">
                        <FaBell />
                      </div>
                      <div className="notification-content">
                        <p className="notification-message">{notification.message}</p>
                        <small className="notification-date">
                          {format(new Date(notification.date), 'MMM dd, yyyy')}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BabysitterDashboard; 