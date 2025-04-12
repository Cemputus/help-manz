import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUserFriends, 
  FaChild, 
  FaMoneyBillWave, 
  FaChartBar, 
  FaSignOutAlt 
} from 'react-icons/fa';

const Navigation = ({ onLogout }) => {
  return (
    <div className="nav-sidebar">
      <div className="nav-items">
        <NavLink to="/" className="nav-link" end>
          <FaHome className="nav-icon" />
          <span className="nav-text">Dashboard</span>
        </NavLink>
        
        <NavLink to="/babysitters" className="nav-link">
          <FaUserFriends className="nav-icon" />
          <span className="nav-text">Babysitters</span>
        </NavLink>
        
        <NavLink to="/children" className="nav-link">
          <FaChild className="nav-icon" />
          <span className="nav-text">Children</span>
        </NavLink>
        
        <NavLink to="/finance" className="nav-link">
          <FaMoneyBillWave className="nav-icon" />
          <span className="nav-text">Finance</span>
        </NavLink>
        
        <NavLink to="/reports" className="nav-link">
          <FaChartBar className="nav-icon" />
          <span className="nav-text">Reports</span>
        </NavLink>
      </div>
      
      <div className="mt-auto">
        <button 
          onClick={onLogout} 
          className="nav-link border-0 bg-transparent w-100 text-start"
        >
          <FaSignOutAlt className="nav-icon" />
          <span className="nav-text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation; 