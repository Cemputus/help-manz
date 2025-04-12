import React, { useContext, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUserPlus, FaChild, FaCalendarAlt, FaMoneyBillWave, FaChartBar, FaCog, FaSignOutAlt, FaUserFriends } from 'react-icons/fa';
import { AppContext } from '../../App';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, handleLogout, userRole } = useContext(AppContext);

  useEffect(() => {
    console.log('Sidebar component mounted, isAuthenticated:', isAuthenticated);
    console.log('Current location:', location.pathname);
    console.log('User role:', userRole);
  }, [isAuthenticated, location, userRole]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!isAuthenticated) {
    console.log('Sidebar not rendered because user is not authenticated');
    return null;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Daystar Daycare</h3>
      </div>
      
      <div className="sidebar-content">
        <Nav className="flex-column">
          {userRole === 'babysitter' ? (
            // Babysitter navigation
            <>
              <Nav.Link 
                as={Link} 
                to="/babysitter-dashboard" 
                className={isActive('/babysitter-dashboard') ? 'active' : ''}
              >
                <FaHome className="nav-icon" /> Dashboard
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/schedule" 
                className={isActive('/schedule') ? 'active' : ''}
              >
                <FaCalendarAlt className="nav-icon" /> Schedule
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/attendance" 
                className={isActive('/attendance') ? 'active' : ''}
              >
                <FaUserFriends className="nav-icon" /> Attendance
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/finance" 
                className={isActive('/finance') ? 'active' : ''}
              >
                <FaMoneyBillWave className="nav-icon" /> Finance
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/settings" 
                className={isActive('/settings') ? 'active' : ''}
              >
                <FaCog className="nav-icon" /> Settings
              </Nav.Link>
            </>
          ) : (
            // Admin navigation
            <>
              <Nav.Link 
                as={Link} 
                to="/dashboard" 
                className={isActive('/dashboard') ? 'active' : ''}
              >
                <FaHome className="nav-icon" /> Dashboard
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/babysitters" 
                className={isActive('/babysitters') ? 'active' : ''}
              >
                <FaUserPlus className="nav-icon" /> Babysitters
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/children" 
                className={isActive('/children') ? 'active' : ''}
              >
                <FaChild className="nav-icon" /> Children
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/finance" 
                className={isActive('/finance') ? 'active' : ''}
              >
                <FaMoneyBillWave className="nav-icon" /> Finance
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/reports" 
                className={isActive('/reports') ? 'active' : ''}
              >
                <FaChartBar className="nav-icon" /> Reports
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/settings" 
                className={isActive('/settings') ? 'active' : ''}
              >
                <FaCog className="nav-icon" /> Settings
              </Nav.Link>
            </>
          )}
        </Nav>
      </div>
      
      <div className="sidebar-footer">
        <Nav.Link 
          onClick={handleLogout}
          className="logout-link"
        >
          <FaSignOutAlt className="nav-icon" /> Logout
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar; 