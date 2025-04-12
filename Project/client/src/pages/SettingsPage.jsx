import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import { FaUser, FaCog, FaBell, FaLock, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAppContext } from '../App';
import './SettingsPage.css';

const SettingsPage = () => {
  const { isAuthenticated, handleLogout } = useAppContext();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    profileImage: null
  });
  
  // Application settings state
  const [appSettings, setAppSettings] = useState({
    theme: 'light',
    language: 'en',
    notifications: true,
    emailNotifications: true,
    smsNotifications: false
  });
  
  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    newBookings: true,
    paymentReminders: true,
    attendanceAlerts: true,
    incidentReports: true,
    systemUpdates: false
  });
  
  // Fetch user settings on component mount
  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        setLoading(true);
        
        // In a real application, this would be an API call
        // For now, we'll use mock data
        const mockUserData = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          role: 'Administrator',
          profileImage: null
        };
        
        const mockAppSettings = {
          theme: 'light',
          language: 'en',
          notifications: true,
          emailNotifications: true,
          smsNotifications: false
        };
        
        const mockNotificationSettings = {
          newBookings: true,
          paymentReminders: true,
          attendanceAlerts: true,
          incidentReports: true,
          systemUpdates: false
        };
        
        setProfileData(mockUserData);
        setAppSettings(mockAppSettings);
        setNotificationSettings(mockNotificationSettings);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user settings:', error);
        toast.error('Failed to load user settings');
        setLoading(false);
      }
    };
    
    fetchUserSettings();
  }, []);
  
  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully');
      setSuccessMessage('Profile settings saved successfully');
      setLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };
  
  // Handle application settings form submission
  const handleAppSettingsSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Application settings updated successfully');
      setSuccessMessage('Application settings saved successfully');
      setLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };
  
  // Handle security settings form submission
  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Security settings updated successfully');
      setSuccessMessage('Security settings saved successfully');
      setSecuritySettings({
        ...securitySettings,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };
  
  // Handle notification settings form submission
  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Notification settings updated successfully');
      setSuccessMessage('Notification settings saved successfully');
      setLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };
  
  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <Container fluid className="settings-page">
      <Row className="mb-4">
        <Col>
          <h2>Settings</h2>
          <p className="text-muted">Manage your account settings and preferences</p>
        </Col>
      </Row>
      
      {successMessage && (
        <Alert variant="success" className="mb-4">
          {successMessage}
        </Alert>
      )}
      
      <Row>
        <Col md={3}>
          <Card className="settings-nav mb-4">
            <Card.Body className="p-0">
              <div className="settings-nav-item active" onClick={() => setActiveTab('profile')}>
                <FaUser className="me-2" /> Profile Settings
              </div>
              <div className="settings-nav-item" onClick={() => setActiveTab('app')}>
                <FaCog className="me-2" /> Application Settings
              </div>
              <div className="settings-nav-item" onClick={() => setActiveTab('notifications')}>
                <FaBell className="me-2" /> Notification Settings
              </div>
              <div className="settings-nav-item" onClick={() => setActiveTab('security')}>
                <FaLock className="me-2" /> Security Settings
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={9}>
          <Card className="settings-content">
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4"
              >
                <Tab eventKey="profile" title="Profile Settings">
                  <Form onSubmit={handleProfileSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.role}
                        disabled
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Profile Image</Form.Label>
                      <div className="d-flex align-items-center">
                        <div className="profile-image-preview me-3">
                          {profileData.profileImage ? (
                            <img src={profileData.profileImage} alt="Profile" className="rounded-circle" />
                          ) : (
                            <div className="profile-image-placeholder">
                              <FaUser size={24} />
                            </div>
                          )}
                        </div>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </Form>
                </Tab>
                
                <Tab eventKey="app" title="Application Settings">
                  <Form onSubmit={handleAppSettingsSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Theme</Form.Label>
                      <Form.Select
                        value={appSettings.theme}
                        onChange={(e) => setAppSettings({...appSettings, theme: e.target.value})}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System Default</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Language</Form.Label>
                      <Form.Select
                        value={appSettings.language}
                        onChange={(e) => setAppSettings({...appSettings, language: e.target.value})}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="notifications-switch"
                        label="Enable Notifications"
                        checked={appSettings.notifications}
                        onChange={(e) => setAppSettings({...appSettings, notifications: e.target.checked})}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="email-notifications-switch"
                        label="Email Notifications"
                        checked={appSettings.emailNotifications}
                        onChange={(e) => setAppSettings({...appSettings, emailNotifications: e.target.checked})}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="sms-notifications-switch"
                        label="SMS Notifications"
                        checked={appSettings.smsNotifications}
                        onChange={(e) => setAppSettings({...appSettings, smsNotifications: e.target.checked})}
                      />
                    </Form.Group>
                    
                    <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </Form>
                </Tab>
                
                <Tab eventKey="notifications" title="Notification Settings">
                  <Form onSubmit={handleNotificationSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="new-bookings-switch"
                        label="New Bookings"
                        checked={notificationSettings.newBookings}
                        onChange={(e) => setNotificationSettings({...notificationSettings, newBookings: e.target.checked})}
                      />
                      <Form.Text className="text-muted">
                        Receive notifications when new bookings are made
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="payment-reminders-switch"
                        label="Payment Reminders"
                        checked={notificationSettings.paymentReminders}
                        onChange={(e) => setNotificationSettings({...notificationSettings, paymentReminders: e.target.checked})}
                      />
                      <Form.Text className="text-muted">
                        Receive reminders for upcoming payments
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="attendance-alerts-switch"
                        label="Attendance Alerts"
                        checked={notificationSettings.attendanceAlerts}
                        onChange={(e) => setNotificationSettings({...notificationSettings, attendanceAlerts: e.target.checked})}
                      />
                      <Form.Text className="text-muted">
                        Receive alerts for attendance issues
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="incident-reports-switch"
                        label="Incident Reports"
                        checked={notificationSettings.incidentReports}
                        onChange={(e) => setNotificationSettings({...notificationSettings, incidentReports: e.target.checked})}
                      />
                      <Form.Text className="text-muted">
                        Receive notifications about incident reports
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="system-updates-switch"
                        label="System Updates"
                        checked={notificationSettings.systemUpdates}
                        onChange={(e) => setNotificationSettings({...notificationSettings, systemUpdates: e.target.checked})}
                      />
                      <Form.Text className="text-muted">
                        Receive notifications about system updates and maintenance
                      </Form.Text>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </Form>
                </Tab>
                
                <Tab eventKey="security" title="Security Settings">
                  <Form onSubmit={handleSecuritySubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={securitySettings.currentPassword}
                        onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={securitySettings.newPassword}
                        onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={securitySettings.confirmPassword}
                        onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="two-factor-auth-switch"
                        label="Two-Factor Authentication"
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                      />
                      <Form.Text className="text-muted">
                        Add an extra layer of security to your account
                      </Form.Text>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </Form>
                  
                  <hr className="my-4" />
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>Logout</h5>
                      <p className="text-muted mb-0">Sign out of your account</p>
                    </div>
                    <Button variant="outline-danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage; 