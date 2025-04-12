import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge } from 'react-bootstrap';
import { FaCheck, FaTimes, FaClock, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data for testing
    const mockChildren = [
      { id: 1, firstName: 'John', lastName: 'Doe' },
      { id: 2, firstName: 'Jane', lastName: 'Smith' },
      { id: 3, firstName: 'Mike', lastName: 'Johnson' }
    ];

    const mockAttendance = [
      {
        id: 1,
        childId: 1,
        date: selectedDate,
        status: 'present',
        checkInTime: '08:30:00',
        checkOutTime: null
      },
      {
        id: 2,
        childId: 2,
        date: selectedDate,
        status: 'absent',
        checkInTime: null,
        checkOutTime: null
      }
    ];

    setChildren(mockChildren);
    setAttendance(mockAttendance);
    setLoading(false);
  }, [selectedDate]);

  const handleAttendanceChange = async (childId, status) => {
    try {
      // Mock API call
      const newAttendance = {
        id: Date.now(),
        childId,
        date: selectedDate,
        status,
        checkInTime: status === 'present' ? new Date().toISOString() : null,
        checkOutTime: null
      };
      
      setAttendance([...attendance, newAttendance]);
      toast.success('Attendance updated successfully');
    } catch (error) {
      toast.error('Failed to update attendance');
      console.error('Error updating attendance:', error);
    }
  };

  const handleCheckOut = async (childId) => {
    try {
      // Mock API call
      const updatedAttendance = attendance.map(record => 
        record.childId === childId 
          ? { ...record, checkOutTime: new Date().toISOString() }
          : record
      );
      
      setAttendance(updatedAttendance);
      toast.success('Check-out recorded successfully');
    } catch (error) {
      toast.error('Failed to record check-out');
      console.error('Error recording check-out:', error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <Badge bg="success">Present</Badge>;
      case 'absent':
        return <Badge bg="danger">Absent</Badge>;
      case 'late':
        return <Badge bg="warning">Late</Badge>;
      default:
        return <Badge bg="secondary">Not Recorded</Badge>;
    }
  };

  const filteredChildren = children.filter(child => 
    child.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Attendance Management</h2>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Form.Group>
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Form.Group>
                <Form.Label>Search Children</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline-secondary">
                    <FaSearch />
                  </Button>
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Child Name</th>
                    <th>Status</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center">Loading...</td>
                    </tr>
                  ) : filteredChildren.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">No children found</td>
                    </tr>
                  ) : (
                    filteredChildren.map(child => {
                      const childAttendance = attendance.find(a => a.childId === child.id);
                      return (
                        <tr key={child.id}>
                          <td>{`${child.firstName} ${child.lastName}`}</td>
                          <td>
                            {childAttendance ? (
                              getStatusBadge(childAttendance.status)
                            ) : (
                              <Badge bg="secondary">Not Recorded</Badge>
                            )}
                          </td>
                          <td>
                            {childAttendance?.checkInTime ? (
                              new Date(childAttendance.checkInTime).toLocaleTimeString()
                            ) : (
                              '-'
                            )}
                          </td>
                          <td>
                            {childAttendance?.checkOutTime ? (
                              new Date(childAttendance.checkOutTime).toLocaleTimeString()
                            ) : (
                              '-'
                            )}
                          </td>
                          <td>
                            {!childAttendance ? (
                              <div className="btn-group">
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() => handleAttendanceChange(child.id, 'present')}
                                >
                                  <FaCheck /> Present
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleAttendanceChange(child.id, 'absent')}
                                >
                                  <FaTimes /> Absent
                                </Button>
                                <Button
                                  variant="outline-warning"
                                  size="sm"
                                  onClick={() => handleAttendanceChange(child.id, 'late')}
                                >
                                  <FaClock /> Late
                                </Button>
                              </div>
                            ) : childAttendance.status === 'present' && !childAttendance.checkOutTime ? (
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleCheckOut(child.id)}
                              >
                                Check Out
                              </Button>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AttendancePage; 