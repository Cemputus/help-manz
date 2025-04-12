import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUserPlus, FaChild, FaCalendarAlt, FaMoneyBillWave, FaChartBar, FaCog, FaSignOutAlt, FaUserFriends } from 'react-icons/fa';
import { AppContext } from '../../App';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, handleLogout, userRole } = useContext(AppContext);

  useEffect(() => {
    console.log('Navigation component mounted, isAuthenticated:', isAuthenticated);
    console.log('Current location:', location.pathname);
    console.log('User role:', userRole);
  }, [isAuthenticated, location, userRole]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!isAuthenticated) {
    console.log('Navigation not rendered because user is not authenticated');
    return null;
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Daystar Daycare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userRole === 'babysitter' ? (
              // Babysitter navigation
              <>
                <Nav.Link 
                  as={Link} 
                  to="/babysitter-dashboard" 
                  active={isActive('/babysitter-dashboard')}
                >
                  <FaHome className="me-1" /> Dashboard
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/schedule" 
                  active={isActive('/schedule')}
                >
                  <FaCalendarAlt className="me-1" /> Schedule
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/attendance" 
                  active={isActive('/attendance')}
                >
                  <FaUserFriends className="me-1" /> Attendance
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/finance" 
                  active={isActive('/finance')}
                >
                  <FaMoneyBillWave className="me-1" /> Finance
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/settings" 
                  active={isActive('/settings')}
                >
                  <FaCog className="me-1" /> Settings
                </Nav.Link>
              </>
            ) : (
              // Admin navigation
              <>
                <Nav.Link 
                  as={Link} 
                  to="/dashboard" 
                  active={isActive('/dashboard')}
                >
                  <FaHome className="me-1" /> Dashboard
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/babysitters" 
                  active={isActive('/babysitters')}
                >
                  <FaUserPlus className="me-1" /> Babysitters
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/children" 
                  active={isActive('/children')}
                >
                  <FaChild className="me-1" /> Children
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/finance" 
                  active={isActive('/finance')}
                >
                  <FaMoneyBillWave className="me-1" /> Finance
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/reports" 
                  active={isActive('/reports')}
                >
                  <FaChartBar className="me-1" /> Reports
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/settings" 
                  active={isActive('/settings')}
                >
                  <FaCog className="me-1" /> Settings
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <Button 
              variant="outline-light" 
              onClick={handleLogout}
              className="d-flex align-items-center"
            >
              <FaSignOutAlt className="me-1" /> Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation; 