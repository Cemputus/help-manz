import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Modal, Badge, InputGroup } from 'react-bootstrap';
import { FaUserNurse, FaPlus, FaSearch, FaEdit, FaTrash, FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './BabysitterPage.css';

const BabysitterPage = () => {
  const [babysitters, setBabysitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentBabysitter, setCurrentBabysitter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    startDate: '',
    certifications: '',
    hourlyRate: '',
    status: 'active'
  });

  // Fetch babysitters data
  useEffect(() => {
    const fetchBabysitters = async () => {
      try {
        setLoading(true);
        
        // Mock data for demonstration
        const mockData = [
          {
            id: 1,
            name: 'Mary Williams',
            email: 'mary.williams@example.com',
            phone: '(555) 123-4567',
            address: '123 Main St, Anytown, USA',
            dob: '1985-06-15',
            startDate: '2023-01-15',
            certifications: 'CPR, First Aid, Child Development',
            hourlyRate: 22,
            status: 'active',
            childrenAssigned: 8
          },
          {
            id: 2,
            name: 'John Davis',
            email: 'john.davis@example.com',
            phone: '(555) 234-5678',
            address: '456 Oak Ave, Sometown, USA',
            dob: '1990-03-22',
            startDate: '2023-02-10',
            certifications: 'CPR, First Aid, Early Childhood Education',
            hourlyRate: 25,
            status: 'active',
            childrenAssigned: 6
          },
          {
            id: 3,
            name: 'Patricia Moore',
            email: 'patricia.moore@example.com',
            phone: '(555) 345-6789',
            address: '789 Pine St, Othertown, USA',
            dob: '1988-11-03',
            startDate: '2023-01-05',
            certifications: 'CPR, First Aid, Child Psychology',
            hourlyRate: 23,
            status: 'on leave',
            childrenAssigned: 0
          },
          {
            id: 4,
            name: 'Robert Johnson',
            email: 'robert.johnson@example.com',
            phone: '(555) 456-7890',
            address: '101 Elm St, Anycity, USA',
            dob: '1992-08-17',
            startDate: '2023-03-01',
            certifications: 'CPR, First Aid',
            hourlyRate: 20,
            status: 'active',
            childrenAssigned: 5
          },
          {
            id: 5,
            name: 'Jennifer Smith',
            email: 'jennifer.smith@example.com',
            phone: '(555) 567-8901',
            address: '202 Maple Dr, Somewhere, USA',
            dob: '1987-04-29',
            startDate: '2023-02-15',
            certifications: 'CPR, First Aid, Elementary Education',
            hourlyRate: 24,
            status: 'terminated',
            childrenAssigned: 0
          }
        ];
        
        setBabysitters(mockData);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError('Failed to load babysitters data');
        setLoading(false);
        toast.error('Failed to load babysitters data');
        console.error(err);
      }
    };

    fetchBabysitters();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle add babysitter
  const handleAddBabysitter = () => {
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, this would be an API call to add the babysitter
    const newBabysitter = {
      id: babysitters.length + 1,
      ...formData,
      childrenAssigned: 0
    };

    setBabysitters([...babysitters, newBabysitter]);
    setShowAddModal(false);
    resetForm();
    toast.success('Babysitter added successfully');
  };

  // Handle edit babysitter
  const handleEditBabysitter = () => {
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, this would be an API call to update the babysitter
    const updatedBabysitters = babysitters.map(babysitter => 
      babysitter.id === currentBabysitter.id ? { ...babysitter, ...formData } : babysitter
    );

    setBabysitters(updatedBabysitters);
    setShowEditModal(false);
    resetForm();
    toast.success('Babysitter updated successfully');
  };

  // Handle delete babysitter
  const handleDeleteBabysitter = () => {
    // In a real app, this would be an API call to delete the babysitter
    const updatedBabysitters = babysitters.filter(babysitter => 
      babysitter.id !== currentBabysitter.id
    );

    setBabysitters(updatedBabysitters);
    setShowDeleteModal(false);
    toast.success('Babysitter removed successfully');
  };

  // Open edit modal and set current babysitter
  const openEditModal = (babysitter) => {
    setCurrentBabysitter(babysitter);
    setFormData({
      name: babysitter.name,
      email: babysitter.email,
      phone: babysitter.phone,
      address: babysitter.address,
      dob: babysitter.dob,
      startDate: babysitter.startDate,
      certifications: babysitter.certifications,
      hourlyRate: babysitter.hourlyRate,
      status: babysitter.status
    });
    setShowEditModal(true);
  };

  // Open delete modal and set current babysitter
  const openDeleteModal = (babysitter) => {
    setCurrentBabysitter(babysitter);
    setShowDeleteModal(true);
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
      startDate: '',
      certifications: '',
      hourlyRate: '',
      status: 'active'
    });
  };

  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort babysitters
  const filteredBabysitters = babysitters
    .filter(babysitter => {
      // Apply search filter
      const matchesSearch = babysitter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           babysitter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           babysitter.phone.includes(searchTerm);
      
      // Apply status filter
      const matchesStatus = filterStatus === 'all' || babysitter.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortField === 'hourlyRate') {
        return sortDirection === 'asc' 
          ? a.hourlyRate - b.hourlyRate 
          : b.hourlyRate - a.hourlyRate;
      } else if (sortField === 'startDate') {
        return sortDirection === 'asc' 
          ? new Date(a.startDate) - new Date(b.startDate) 
          : new Date(b.startDate) - new Date(a.startDate);
      }
      return 0;
    });

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'on leave':
        return <Badge bg="warning">On Leave</Badge>;
      case 'terminated':
        return <Badge bg="danger">Terminated</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="babysitter-page">
      <Container fluid>
        {/* Page Header */}
        <div className="page-header">
          <div className="header-title">
            <h1><FaUserNurse className="page-icon" /> Babysitters</h1>
            <p>Manage your daycare center's babysitters</p>
          </div>
          <div className="header-actions">
            <Button 
              variant="primary" 
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
            >
              <FaPlus className="me-2" /> Add Babysitter
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-4 filter-card">
          <Card.Body>
            <Row>
              <Col md={6} lg={4}>
                <InputGroup className="mb-3 mb-md-0">
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search babysitters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={6} lg={4} className="d-flex align-items-center">
                <div className="d-flex align-items-center me-3">
                  <FaFilter className="me-2 text-secondary" />
                  <Form.Select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="status-filter"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="on leave">On Leave</option>
                    <option value="terminated">Terminated</option>
                  </Form.Select>
                </div>
              </Col>
              <Col lg={4} className="d-flex align-items-center mt-3 mt-lg-0">
                <div className="ms-auto d-flex align-items-center">
                  <span className="me-2 text-secondary">Sort by:</span>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    className={`me-2 ${sortField === 'name' ? 'active' : ''}`}
                    onClick={() => handleSort('name')}
                  >
                    Name {sortField === 'name' && (
                      sortDirection === 'asc' ? <FaSortAmountUp className="ms-1" /> : <FaSortAmountDown className="ms-1" />
                    )}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    className={`me-2 ${sortField === 'hourlyRate' ? 'active' : ''}`}
                    onClick={() => handleSort('hourlyRate')}
                  >
                    Rate {sortField === 'hourlyRate' && (
                      sortDirection === 'asc' ? <FaSortAmountUp className="ms-1" /> : <FaSortAmountDown className="ms-1" />
                    )}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    className={sortField === 'startDate' ? 'active' : ''}
                    onClick={() => handleSort('startDate')}
                  >
                    Date {sortField === 'startDate' && (
                      sortDirection === 'asc' ? <FaSortAmountUp className="ms-1" /> : <FaSortAmountDown className="ms-1" />
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Babysitters Table */}
        <Card className="table-card">
          <Card.Body>
            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading babysitters...</p>
              </div>
            ) : error ? (
              <div className="text-center my-5 text-danger">
                <p>{error}</p>
                <Button variant="primary" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            ) : filteredBabysitters.length === 0 ? (
              <div className="text-center my-5">
                <p>No babysitters found matching your search criteria.</p>
                <Button variant="outline-primary" onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="babysitter-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Certifications</th>
                      <th>Hourly Rate</th>
                      <th>Start Date</th>
                      <th>Status</th>
                      <th>Children</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBabysitters.map(babysitter => (
                      <tr key={babysitter.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="babysitter-circle">
                              {babysitter.name.charAt(0)}
                            </div>
                            <div className="ms-2">
                              <div className="fw-semibold">{babysitter.name}</div>
                              <div className="text-muted small">{babysitter.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {babysitter.phone}<br />
                          <span className="text-muted small">{babysitter.address}</span>
                        </td>
                        <td>
                          {babysitter.certifications.split(',').map((cert, index) => (
                            <Badge bg="info" key={index} className="me-1 mb-1">{cert.trim()}</Badge>
                          ))}
                        </td>
                        <td>${babysitter.hourlyRate}/hr</td>
                        <td>{new Date(babysitter.startDate).toLocaleDateString()}</td>
                        <td>{getStatusBadge(babysitter.status)}</td>
                        <td>{babysitter.childrenAssigned}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => openEditModal(babysitter)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => openDeleteModal(babysitter)}
                              disabled={babysitter.childrenAssigned > 0}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
        
        {/* Summary Cards */}
        <Row className="mt-4 mb-4">
          <Col md={4}>
            <Card className="summary-card active-card">
              <Card.Body>
                <h3>{babysitters.filter(b => b.status === 'active').length}</h3>
                <p>Active Babysitters</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="summary-card on-leave-card">
              <Card.Body>
                <h3>{babysitters.filter(b => b.status === 'on leave').length}</h3>
                <p>Babysitters On Leave</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="summary-card terminated-card">
              <Card.Body>
                <h3>{babysitters.filter(b => b.status === 'terminated').length}</h3>
                <p>Terminated Babysitters</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Add Babysitter Modal */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add New Babysitter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Hourly Rate ($)</Form.Label>
                    <Form.Control
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Certifications (comma separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="e.g. CPR, First Aid, Child Development"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="on leave">On Leave</option>
                  <option value="terminated">Terminated</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddBabysitter}>
              Add Babysitter
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Babysitter Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Babysitter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Hourly Rate ($)</Form.Label>
                    <Form.Control
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Certifications (comma separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="e.g. CPR, First Aid, Child Development"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="on leave">On Leave</option>
                  <option value="terminated">Terminated</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditBabysitter}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentBabysitter && (
              <>
                <p>Are you sure you want to remove <strong>{currentBabysitter.name}</strong> from the system?</p>
                <p className="text-danger">This action cannot be undone.</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteBabysitter}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default BabysitterPage; 