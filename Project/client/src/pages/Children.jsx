import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { children } from '../services/api';
import { toast } from 'react-toastify';
import './Children.css';

const Children = () => {
  const [childList, setChildList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    medicalNotes: ''
  });

  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchChildren();
    }
  }, [token]);

  const fetchChildren = async () => {
    try {
      const response = await children.getAll();
      setChildList(response.data);
    } catch (error) {
      console.error('Error fetching children:', error);
      toast.error('Failed to load children data');
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (child = null) => {
    if (child) {
      setSelectedChild(child);
      setFormData({
        firstName: child.firstName,
        lastName: child.lastName,
        dateOfBirth: child.dateOfBirth,
        gender: child.gender,
        parentName: child.parentName,
        parentPhone: child.parentPhone,
        parentEmail: child.parentEmail,
        address: child.address,
        medicalNotes: child.medicalNotes
      });
    } else {
      setSelectedChild(null);
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        parentName: '',
        parentPhone: '',
        parentEmail: '',
        address: '',
        medicalNotes: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedChild(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedChild) {
        await children.update(selectedChild._id, formData);
        toast.success('Child updated successfully');
      } else {
        await children.create(formData);
        toast.success('Child added successfully');
      }
      handleCloseModal();
      fetchChildren();
    } catch (error) {
      console.error('Error saving child:', error);
      toast.error('Failed to save child data');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this child?')) {
      try {
        await children.delete(id);
        toast.success('Child deleted successfully');
        fetchChildren();
      } catch (error) {
        console.error('Error deleting child:', error);
        toast.error('Failed to delete child');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="children-page">
      <Container fluid>
        <div className="page-header">
          <h1>Children</h1>
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add New Child
          </Button>
        </div>

        <Card>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Parent</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {childList.map((child) => (
                  <tr key={child._id}>
                    <td>{child.firstName} {child.lastName}</td>
                    <td>{new Date(child.dateOfBirth).toLocaleDateString()}</td>
                    <td>{child.gender}</td>
                    <td>{child.parentName}</td>
                    <td>{child.parentPhone}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowModal(child)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(child._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedChild ? 'Edit Child' : 'Add New Child'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Parent Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Parent Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Parent Email</Form.Label>
                <Form.Control
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Medical Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  name="medicalNotes"
                  value={formData.medicalNotes}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="text-end">
                <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {selectedChild ? 'Update' : 'Add'} Child
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Children; 