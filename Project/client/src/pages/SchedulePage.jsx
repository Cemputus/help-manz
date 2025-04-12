import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import './SchedulePage.css';

const SchedulePage = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockSchedule = [
    {
      id: 1,
      date: '2024-03-20',
      startTime: '09:00',
      endTime: '17:00',
      children: ['John Doe', 'Jane Smith'],
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2024-03-21',
      startTime: '10:00',
      endTime: '16:00',
      children: ['Alice Johnson'],
      status: 'pending'
    },
    {
      id: 3,
      date: '2024-03-22',
      startTime: '08:00',
      endTime: '18:00',
      children: ['John Doe', 'Jane Smith', 'Alice Johnson'],
      status: 'confirmed'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSchedule(mockSchedule);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge bg="success">Confirmed</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <Container className="schedule-page">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="schedule-page">
      <Row className="mb-4">
        <Col>
          <h1 className="page-title">My Schedule</h1>
        </Col>
        <Col xs="auto">
          <Button variant="primary">
            <FaCalendarAlt className="me-2" />
            View Calendar
          </Button>
        </Col>
      </Row>

      <Card className="schedule-card">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Children</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item) => (
                <tr key={item.id}>
                  <td>{format(new Date(item.date), 'MMM dd, yyyy')}</td>
                  <td>
                    {item.startTime} - {item.endTime}
                  </td>
                  <td>
                    {item.children.map((child, index) => (
                      <Badge key={index} bg="info" className="me-1">
                        {child}
                      </Badge>
                    ))}
                  </td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SchedulePage; 