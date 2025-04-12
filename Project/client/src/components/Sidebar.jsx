import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChild, FaUserNurse, FaMoneyBillWave, FaCalendarAlt, FaBell } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <FaHome /> },
    { path: '/children', label: 'Children', icon: <FaChild /> },
    { path: '/babysitters', label: 'Babysitters', icon: <FaUserNurse /> },
    { path: '/finances', label: 'Finances', icon: <FaMoneyBillWave /> },
    { path: '/attendance', label: 'Attendance', icon: <FaCalendarAlt /> },
    { path: '/schedules', label: 'Schedules', icon: <FaCalendarAlt /> },
    { path: '/notifications', label: 'Notifications', icon: <FaBell /> }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Help Manz</h3>
      </div>
      <Nav className="flex-column">
        {navItems.map((item) => (
          <Nav.Item key={item.path}>
            <Nav.Link
              as={Link}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar; 