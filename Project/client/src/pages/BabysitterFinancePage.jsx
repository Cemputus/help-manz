import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal } from 'react-bootstrap';
import { FaMoneyBillWave, FaDownload, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import './BabysitterFinancePage.css';

const BabysitterFinancePage = () => {
  const [loading, setLoading] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterDateRange, setFilterDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  
  // Mock data for babysitter finances
  const [financeData, setFinanceData] = useState({
    totalEarnings: 1800,
    pendingPayments: 450,
    paymentHistory: [
      { id: 1, date: '2023-06-01', amount: 450, status: 'paid', description: 'May 15-31, 2023' },
      { id: 2, date: '2023-05-15', amount: 480, status: 'paid', description: 'May 1-14, 2023' },
      { id: 3, date: '2023-05-01', amount: 420, status: 'paid', description: 'Apr 15-30, 2023' },
      { id: 4, date: '2023-04-15', amount: 450, status: 'paid', description: 'Apr 1-14, 2023' }
    ],
    upcomingPayments: [
      { id: 5, date: '2023-06-15', amount: 450, status: 'pending', description: 'Jun 1-14, 2023' },
      { id: 6, date: '2023-07-01', amount: 450, status: 'pending', description: 'Jun 15-30, 2023' }
    ],
    hourlyRate: 15,
    totalHours: 120
  });
  
  // Fetch babysitter finance data on component mount
  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        setLoading(true);
        
        // In a real application, this would be an API call
        // For now, we'll use mock data
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching finance data:', error);
        toast.error('Failed to load finance data');
        setLoading(false);
      }
    };
    
    fetchFinanceData();
  }, []);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX'
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge bg="success">Paid</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'overdue':
        return <Badge bg="danger">Overdue</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };
  
  // Handle filter apply
  const handleFilterApply = () => {
    // In a real app, this would filter the data based on the date range
    // For now, we'll just close the modal
    setShowFilterModal(false);
    toast.success('Filter applied successfully');
  };
  
  // Handle download report
  const handleDownloadReport = () => {
    // In a real app, this would generate and download a report
    toast.success('Report downloaded successfully');
  };
  
  return (
    <Container fluid className="babysitter-finance-page">
      <Row className="mb-4">
        <Col>
          <h2 className="page-title">My Finances</h2>
          <p className="text-muted">Track your earnings and payment history</p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Button 
            variant="outline-primary" 
            className="me-2"
            onClick={() => setShowFilterModal(true)}
          >
            <FaFilter className="me-1" /> Filter
          </Button>
          <Button 
            variant="outline-success"
            onClick={handleDownloadReport}
          >
            <FaDownload className="me-1" /> Download Report
          </Button>
        </Col>
      </Row>
      
      <Row>
        <Col md={4}>
          <Card className="finance-card total-earnings">
            <Card.Body>
              <Card.Title>Total Earnings</Card.Title>
              <Card.Text className="h3">{formatCurrency(financeData.totalEarnings)}</Card.Text>
              <div className="finance-details">
                <div className="detail-item">
                  <span className="detail-label">Hourly Rate:</span>
                  <span className="detail-value">{formatCurrency(financeData.hourlyRate)}/hr</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Hours:</span>
                  <span className="detail-value">{financeData.totalHours} hrs</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="finance-card pending-payments">
            <Card.Body>
              <Card.Title>Pending Payments</Card.Title>
              <Card.Text className="h3">{formatCurrency(financeData.pendingPayments)}</Card.Text>
              <div className="finance-details">
                <div className="detail-item">
                  <span className="detail-label">Next Payment:</span>
                  <span className="detail-value">{formatDate(financeData.upcomingPayments[0]?.date || 'N/A')}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Payment Cycle:</span>
                  <span className="detail-value">Bi-weekly</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="finance-card payment-method">
            <Card.Body>
              <Card.Title>Payment Method</Card.Title>
              <Card.Text className="h3">Bank Transfer</Card.Text>
              <div className="finance-details">
                <div className="detail-item">
                  <span className="detail-label">Account:</span>
                  <span className="detail-value">**** **** **** 1234</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Bank:</span>
                  <span className="detail-value">Example Bank</span>
                </div>
              </div>
              <Button variant="outline-light" size="sm" className="mt-2">
                Update Payment Method
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <span>Payment History</span>
                <Button variant="outline-primary" size="sm">
                  <FaCalendarAlt className="me-1" /> View Calendar
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {financeData.paymentHistory.map(payment => (
                    <tr key={payment.id}>
                      <td>{formatDate(payment.date)}</td>
                      <td>{payment.description}</td>
                      <td>{formatCurrency(payment.amount)}</td>
                      <td>{getStatusBadge(payment.status)}</td>
                      <td>
                        <Button variant="link" size="sm">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <span>Upcoming Payments</span>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {financeData.upcomingPayments.map(payment => (
                    <tr key={payment.id}>
                      <td>{formatDate(payment.date)}</td>
                      <td>{payment.description}</td>
                      <td>{formatCurrency(payment.amount)}</td>
                      <td>{getStatusBadge(payment.status)}</td>
                      <td>
                        <Button variant="link" size="sm">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Filter Modal */}
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Payments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={filterDateRange.startDate}
                onChange={(e) => setFilterDateRange({...filterDateRange, startDate: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={filterDateRange.endDate}
                onChange={(e) => setFilterDateRange({...filterDateRange, endDate: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFilterApply}>
            Apply Filter
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BabysitterFinancePage; 