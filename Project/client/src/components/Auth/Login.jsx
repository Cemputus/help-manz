import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../App';
import { FaUser, FaLock } from 'react-icons/fa';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

// Predefined test accounts
const TEST_ACCOUNTS = {
  babysitter: {
    email: 'babysitter@example.com',
    password: 'password123',
    role: 'babysitter'
  },
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  }
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Use the onLogin prop instead of context
  // const { handleLogin } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    console.log('Login attempt with email:', email);
    
    try {
      // Check if the credentials match any of our test accounts
      const testAccount = Object.values(TEST_ACCOUNTS).find(
        account => account.email === email && account.password === password
      );
      
      if (testAccount) {
        // Simulate authentication token with role information
        const mockToken = `mock-auth-token-${testAccount.role}-${Date.now()}`;
        console.log('Login successful, token received:', mockToken);
        
        // Store role information in localStorage for role-based access
        localStorage.setItem('userRole', testAccount.role);
        
        onLogin(mockToken);
        toast.success(`Login successful! Welcome ${testAccount.role}`);
        setLoading(false);
      } else {
        // For any other credentials, simulate a failed login
        setTimeout(() => {
          setError('Invalid email or password');
          toast.error('Login failed. Please check your credentials.');
          setLoading(false);
        }, 1000);
      }
      
      // Uncomment this for real API integration
      // const response = await axios.post('/api/auth/login', { email, password });
      // console.log('Login successful, token received:', response.data.token);
      // onLogin(response.data.token);
      // toast.success('Login successful!');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
      toast.error('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <div className="text-center mt-3">
            <p className="text-muted small">
              Test Accounts:<br />
              Babysitter: babysitter@example.com / password123<br />
              Admin: admin@example.com / admin123
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login; 