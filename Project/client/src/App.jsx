import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Children from './pages/Children';
import Babysitters from './pages/Babysitters';
import Finances from './pages/Finances';
import Attendance from './pages/Attendance';
import Schedules from './pages/Schedules';
import Notifications from './pages/Notifications';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Layout component for authenticated pages
const AuthenticatedLayout = ({ children }) => (
  <div className="app-container">
    <Sidebar />
    <main className="main-content">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Dashboard />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/children"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Children />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/babysitters"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Babysitters />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/finances"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Finances />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Attendance />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedules"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Schedules />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Notifications />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
