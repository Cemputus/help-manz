import React, { useState, useEffect } from 'react';
import { Alert, Toast, ToastContainer } from 'react-bootstrap';
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Notification.css';

/**
 * AlertBox component for displaying notifications
 * 
 * @param {Object} props Component props
 * @returns {JSX.Element} AlertBox component
 */
const AlertBox = ({ 
  type = 'info',
  message = '',
  title = '',
  duration = 5000,
  position = 'top-right',
  showIcon = true,
  dismissible = true,
  isToast = false,
  onClose = () => {},
  visible = true
}) => {
  const [show, setShow] = useState(visible);
  
  useEffect(() => {
    setShow(visible);
  }, [visible]);
  
  useEffect(() => {
    if (duration && duration > 0 && show) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, show]);
  
  const handleClose = () => {
    setShow(false);
    onClose();
  };
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'danger':
        return <FaExclamationCircle />;
      case 'info':
      default:
        return <FaInfoCircle />;
    }
  };
  
  const getVariant = () => {
    switch (type) {
      case 'success':
      case 'warning':
      case 'danger':
        return type;
      case 'info':
      default:
        return 'info';
    }
  };

  // If it should be rendered as a Toast
  if (isToast) {
    return (
      <ToastContainer position={position} className="p-3" style={{ zIndex: 1070 }}>
        <Toast show={show} onClose={handleClose} delay={duration} autohide={duration > 0}>
          <Toast.Header className={`bg-${getVariant()} text-white`}>
            {showIcon && <span className="me-2">{getIcon()}</span>}
            <strong className="me-auto">{title || type.charAt(0).toUpperCase() + type.slice(1)}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    );
  }
  
  // Otherwise, render as an Alert
  return show ? (
    <Alert 
      variant={getVariant()} 
      onClose={dismissible ? handleClose : null}
      dismissible={dismissible}
      className="alert-box"
    >
      <div className="d-flex align-items-center">
        {showIcon && <span className="alert-icon me-2">{getIcon()}</span>}
        <div className="alert-content">
          {title && <Alert.Heading>{title}</Alert.Heading>}
          <p className={title ? 'mb-0 mt-1' : 'mb-0'}>{message}</p>
        </div>
      </div>
    </Alert>
  ) : null;
};

AlertBox.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
  duration: PropTypes.number,
  position: PropTypes.oneOf([
    'top-left', 'top-center', 'top-right',
    'middle-left', 'middle-center', 'middle-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ]),
  showIcon: PropTypes.bool,
  dismissible: PropTypes.bool,
  isToast: PropTypes.bool,
  onClose: PropTypes.func,
  visible: PropTypes.bool
};

export default AlertBox; 