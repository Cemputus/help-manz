import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useNotification } from './NotificationContext';
import AlertBox from './AlertBox';
import './NotificationDemo.css';

const NotificationDemo = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  
  const [localAlertOptions, setLocalAlertOptions] = useState({
    variant: 'info',
    heading: 'This is a local alert',
    message: 'This alert is displayed inline within the component',
    dismissible: true,
    show: true,
    timeout: 0,
    icon: true,
    position: 'static',
    animation: false,
    wide: false
  });

  const [localAlertVisible, setLocalAlertVisible] = useState(false);

  const handleOptionChange = (option, value) => {
    setLocalAlertOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleToggleLocalAlert = () => {
    setLocalAlertVisible(!localAlertVisible);
  };

  // For demo purposes
  const showNotificationDemo = (type) => {
    const message = `This is a ${type} notification`;
    const heading = `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`;
    
    switch (type) {
      case 'success':
        showSuccess(message, { heading });
        break;
      case 'error':
        showError(message, { heading });
        break;
      case 'warning':
        showWarning(message, { heading });
        break;
      case 'info':
      default:
        showInfo(message, { heading });
        break;
    }
  };

  return (
    <div className="notification-demo">
      <h2 className="demo-title">Notification System</h2>
      
      <Card className="mb-4">
        <Card.Header>
          <h3 className="section-title">Global Notifications</h3>
        </Card.Header>
        <Card.Body>
          <p className="mb-3">
            Click the buttons below to trigger different types of global notifications.
            These notifications are managed by the NotificationContext and can be triggered from anywhere in the application.
          </p>
          
          <div className="global-notification-buttons">
            <Button 
              variant="success" 
              onClick={() => showNotificationDemo('success')}
            >
              Show Success
            </Button>
            
            <Button 
              variant="danger" 
              onClick={() => showNotificationDemo('error')}
            >
              Show Error
            </Button>
            
            <Button 
              variant="warning" 
              onClick={() => showNotificationDemo('warning')}
            >
              Show Warning
            </Button>
            
            <Button 
              variant="info" 
              onClick={() => showNotificationDemo('info')}
            >
              Show Info
            </Button>
          </div>
        </Card.Body>
      </Card>
      
      <Card className="mb-4">
        <Card.Header>
          <h3 className="section-title">Local Alert Demo</h3>
        </Card.Header>
        <Card.Body>
          <p className="mb-3">
            This demonstrates using the AlertBox component directly within a component,
            rather than through the global notification system.
          </p>
          
          <Button 
            variant={localAlertVisible ? "secondary" : "primary"}
            onClick={handleToggleLocalAlert}
            className="mb-4"
          >
            {localAlertVisible ? "Hide Alert" : "Show Local Alert"}
          </Button>
          
          {localAlertVisible && (
            <div className="local-alert-container mb-4">
              <AlertBox
                variant={localAlertOptions.variant}
                heading={localAlertOptions.heading}
                message={localAlertOptions.message}
                dismissible={localAlertOptions.dismissible}
                show={localAlertOptions.show}
                timeout={Number(localAlertOptions.timeout)}
                icon={localAlertOptions.icon}
                position={localAlertOptions.position}
                animation={localAlertOptions.animation}
                wide={localAlertOptions.wide}
                onClose={() => setLocalAlertVisible(false)}
              />
            </div>
          )}
          
          <Card className="options-card">
            <Card.Header>
              <h4 className="mb-0">Alert Options</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Variant</Form.Label>
                      <Form.Select
                        value={localAlertOptions.variant}
                        onChange={(e) => handleOptionChange('variant', e.target.value)}
                      >
                        <option value="info">Info</option>
                        <option value="success">Success</option>
                        <option value="warning">Warning</option>
                        <option value="danger">Danger</option>
                        <option value="error">Error</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Heading</Form.Label>
                      <Form.Control
                        type="text"
                        value={localAlertOptions.heading}
                        onChange={(e) => handleOptionChange('heading', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={localAlertOptions.message}
                    onChange={(e) => handleOptionChange('message', e.target.value)}
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Timeout (ms, 0 for no timeout)</Form.Label>
                      <Form.Control
                        type="number"
                        value={localAlertOptions.timeout}
                        onChange={(e) => handleOptionChange('timeout', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Position</Form.Label>
                      <Form.Select
                        value={localAlertOptions.position}
                        onChange={(e) => handleOptionChange('position', e.target.value)}
                      >
                        <option value="static">Static (inline)</option>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="top-left">Top Left</option>
                        <option value="top-right">Top Right</option>
                        <option value="bottom-left">Bottom Left</option>
                        <option value="bottom-right">Bottom Right</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Dismissible"
                        checked={localAlertOptions.dismissible}
                        onChange={(e) => handleOptionChange('dismissible', e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Show Icon"
                        checked={localAlertOptions.icon}
                        onChange={(e) => handleOptionChange('icon', e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Animation"
                        checked={localAlertOptions.animation}
                        onChange={(e) => handleOptionChange('animation', e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Wide"
                        checked={localAlertOptions.wide}
                        onChange={(e) => handleOptionChange('wide', e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotificationDemo; 