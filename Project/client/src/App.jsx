import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, createContext, useContext, useEffect } from 'react';
import Sidebar from './components/Navigation/Sidebar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import BabysitterPage from './pages/BabysitterPage';
import BabysitterForm from './components/Babysitter/BabysitterForm';
import PaymentSummary from './components/Babysitter/PaymentSummary';
import Schedule from './components/Babysitter/Schedule';
import NotificationCenter from './components/Notification/NotificationCenter';
import ReportsPage from './pages/ReportsPage';
import ChildPage from './pages/ChildPage';
import FinancePage from './pages/FinancePage';
import BabysitterFinancePage from './pages/BabysitterFinancePage';
import ChildForm from './components/Child/ChildForm';
import AttendancePage from './pages/AttendancePage';
import SettingsPage from './pages/SettingsPage';
import BabysitterDashboard from './pages/BabysitterDashboard';
import SchedulePage from './pages/SchedulePage';
import './App.css';

// Context for app-wide state
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('authToken') ? true : false
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem('userRole') || null
  );
  const [selectedBabysitter, setSelectedBabysitter] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // list, form, payments, schedule
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    console.log('App component mounted, isAuthenticated:', isAuthenticated);
    console.log('Auth token:', localStorage.getItem('authToken'));
    console.log('User role:', localStorage.getItem('userRole'));
  }, [isAuthenticated]);
  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };
  
  // Login function
  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    setIsAuthenticated(true);
  };

  // Handler for babysitter selection
  const handleBabysitterSelect = (babysitter) => {
    setSelectedBabysitter(babysitter);
  };

  // Handler for view change
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Add notification
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  // Context value
  const contextValue = {
    isAuthenticated,
    userRole,
    handleLogin,
    handleLogout,
    notifications,
    addNotification
  };

  // Render babysitter details component based on currentView
  const renderBabysitterDetailView = () => {
    switch (currentView) {
      case 'form':
        return <BabysitterForm 
                 babysitter={selectedBabysitter}
                 onSubmit={() => {
                   setCurrentView('list');
                   setSelectedBabysitter(null);
                 }}
                 onCancel={() => {
                   setCurrentView('list');
                   setSelectedBabysitter(null);
                 }}
               />;
      case 'payments':
        return <PaymentSummary babysitter={selectedBabysitter} />;
      case 'schedule':
        return <Schedule babysitter={selectedBabysitter} />;
      case 'list':
      default:
        return <BabysitterPage 
                 onBabysitterSelect={handleBabysitterSelect}
                 onViewChange={handleViewChange}
               />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="app-container">
          {isAuthenticated && <Sidebar />}
          <main className="main-content">
            <Routes>
              <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to={userRole === 'babysitter' ? "/babysitter-dashboard" : "/dashboard"} />} />
              <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to={userRole === 'babysitter' ? "/babysitter-dashboard" : "/dashboard"} />} />
              <Route path="/dashboard" element={isAuthenticated && userRole !== 'babysitter' ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/babysitters" element={isAuthenticated && userRole !== 'babysitter' ? <BabysitterPage /> : <Navigate to="/login" />} />
              <Route path="/reports" element={isAuthenticated && userRole !== 'babysitter' ? <ReportsPage /> : <Navigate to="/login" />} />
              <Route path="/children" element={isAuthenticated && userRole !== 'babysitter' ? <ChildPage /> : <Navigate to="/login" />} />
              <Route path="/finance" element={isAuthenticated ? (userRole === 'babysitter' ? <BabysitterFinancePage /> : <FinancePage />) : <Navigate to="/login" />} />
              <Route path="/attendance" element={isAuthenticated ? <AttendancePage /> : <Navigate to="/login" />} />
              <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
              <Route path="/babysitter-dashboard" element={isAuthenticated && userRole === 'babysitter' ? <BabysitterDashboard /> : <Navigate to="/login" />} />
              <Route path="/schedule" element={isAuthenticated ? <SchedulePage /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to={isAuthenticated ? (userRole === 'babysitter' ? "/babysitter-dashboard" : "/dashboard") : "/login"} />} />
            </Routes>
          </main>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AppContext.Provider>
  );
};

// Custom hook for using the AppContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export default App;
