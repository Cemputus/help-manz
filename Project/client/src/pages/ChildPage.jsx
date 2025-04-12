import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Modal, Badge, InputGroup, Tabs, Tab } from 'react-bootstrap';
import { FaChild, FaPlus, FaSearch, FaEdit, FaTrash, FaFilter, FaSortAmountDown, FaSortAmountUp, FaCalendarAlt, FaNotesMedical } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './ChildPage.css';

const ChildPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentChild, setCurrentChild] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAgeGroup, setFilterAgeGroup] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    ageGroup: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
    emergencyContact: '',
    allergies: '',
    medicalNotes: '',
    registrationDate: '',
    status: 'active'
  });

  // Fetch children data
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setLoading(true);
        
        // Mock data for demonstration
        const mockData = [
          {
            id: 1,
            name: 'Emma Johnson',
            gender: 'Female',
            dob: '2020-03-15',
            ageGroup: 'Toddler',
            parentName: 'Sarah Johnson',
            parentEmail: 'sarah.johnson@example.com',
            parentPhone: '(555) 123-4567',
            address: '123 Main St, Anytown, USA',
            emergencyContact: 'David Johnson (555) 987-6543',
            allergies: 'Peanuts',
            medicalNotes: 'None',
            registrationDate: '2023-01-10',
            assignedBabysitter: 'Mary Williams',
            status: 'active',
            attendanceRate: 95
          },
          {
            id: 2,
            name: 'Noah Smith',
            gender: 'Male',
            dob: '2019-07-22',
            ageGroup: 'Preschool',
            parentName: 'Jessica Smith',
            parentEmail: 'jessica.smith@example.com',
            parentPhone: '(555) 234-5678',
            address: '456 Oak Ave, Sometown, USA',
            emergencyContact: 'Michael Smith (555) 876-5432',
            allergies: 'None',
            medicalNotes: 'Asthma, carries inhaler',
            registrationDate: '2022-08-15',
            assignedBabysitter: 'John Davis',
            status: 'active',
            attendanceRate: 88
          },
          {
            id: 3,
            name: 'Olivia Brown',
            gender: 'Female',
            dob: '2021-11-08',
            ageGroup: 'Infant',
            parentName: 'Michael Brown',
            parentEmail: 'michael.brown@example.com',
            parentPhone: '(555) 345-6789',
            address: '789 Pine St, Othertown, USA',
            emergencyContact: 'Emily Brown (555) 765-4321',
            allergies: 'Milk, Eggs',
            medicalNotes: 'Eczema',
            registrationDate: '2023-02-01',
            assignedBabysitter: 'Patricia Moore',
            status: 'active',
            attendanceRate: 98
          },
          {
            id: 4,
            name: 'William Davis',
            gender: 'Male',
            dob: '2018-05-30',
            ageGroup: 'Preschool',
            parentName: 'James Davis',
            parentEmail: 'james.davis@example.com',
            parentPhone: '(555) 456-7890',
            address: '101 Elm St, Anycity, USA',
            emergencyContact: 'Lisa Davis (555) 654-3210',
            allergies: 'None',
            medicalNotes: 'None',
            registrationDate: '2022-06-20',
            assignedBabysitter: 'Robert Johnson',
            status: 'inactive',
            attendanceRate: 75
          },
          {
            id: 5,
            name: 'Sophia Wilson',
            gender: 'Female',
            dob: '2020-09-17',
            ageGroup: 'Toddler',
            parentName: 'David Wilson',
            parentEmail: 'david.wilson@example.com',
            parentPhone: '(555) 567-8901',
            address: '202 Maple Dr, Somewhere, USA',
            emergencyContact: 'Amanda Wilson (555) 543-2109',
            allergies: 'Gluten',
            medicalNotes: 'Celiac disease',
            registrationDate: '2023-01-25',
            assignedBabysitter: 'Jennifer Smith',
            status: 'active',
            attendanceRate: 92
          }
        ];
        
        setChildren(mockData);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError('Failed to load children data');
        setLoading(false);
        toast.error('Failed to load children data');
        console.error(err);
      }
    };

    fetchChildren();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle add child
  const handleAddChild = () => {
    // Validate form data
    if (!formData.name || !formData.parentName || !formData.parentPhone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, this would be an API call to add the child
    const newChild = {
      id: children.length + 1,
      ...formData,
      attendanceRate: 0,
      assignedBabysitter: 'Unassigned'
    };

    setChildren([...children, newChild]);
    setShowAddModal(false);
    resetForm();
    toast.success('Child added successfully');
  };

  // Handle edit child
  const handleEditChild = () => {
    // Validate form data
    if (!formData.name || !formData.parentName || !formData.parentPhone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, this would be an API call to update the child
    const updatedChildren = children.map(child => 
      child.id === currentChild.id ? { ...child, ...formData } : child
    );

    setChildren(updatedChildren);
    setShowEditModal(false);
    resetForm();
    toast.success('Child information updated successfully');
  };

  // Handle delete child
  const handleDeleteChild = () => {
    // In a real app, this would be an API call to delete/deactivate the child
    const updatedChildren = children.filter(child => 
      child.id !== currentChild.id
    );

    setChildren(updatedChildren);
    setShowDeleteModal(false);
    toast.success('Child removed successfully');
  };

  // Open edit modal and set current child
  const openEditModal = (child) => {
    setCurrentChild(child);
    setFormData({
      name: child.name,
      gender: child.gender,
      dob: child.dob,
      ageGroup: child.ageGroup,
      parentName: child.parentName,
      parentEmail: child.parentEmail,
      parentPhone: child.parentPhone,
      address: child.address,
      emergencyContact: child.emergencyContact,
      allergies: child.allergies,
      medicalNotes: child.medicalNotes,
      registrationDate: child.registrationDate,
      status: child.status
    });
    setShowEditModal(true);
  };

  // Open delete modal and set current child
  const openDeleteModal = (child) => {
    setCurrentChild(child);
    setShowDeleteModal(true);
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: '',
      gender: '',
      dob: '',
      ageGroup: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      address: '',
      emergencyContact: '',
      allergies: '',
      medicalNotes: '',
      registrationDate: '',
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

  // Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    // Display months for children under 2 years old
    if (age < 2) {
      const months = (today.getFullYear() - birthDate.getFullYear()) * 12 + today.getMonth() - birthDate.getMonth();
      return `${months} months`;
    }
    
    return `${age} years`;
  };

  // Filter and sort children
  const filteredChildren = children
    .filter(child => {
      // Apply search filter
      const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           child.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           child.parentPhone.includes(searchTerm);
      
      // Apply age group filter
      const matchesAgeGroup = filterAgeGroup === 'all' || child.ageGroup === filterAgeGroup;
      
      return matchesSearch && matchesAgeGroup;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortField === 'age') {
        return sortDirection === 'asc' 
          ? new Date(a.dob) - new Date(b.dob) 
          : new Date(b.dob) - new Date(a.dob);
      } else if (sortField === 'registration') {
        return sortDirection === 'asc' 
          ? new Date(a.registrationDate) - new Date(b.registrationDate) 
          : new Date(b.registrationDate) - new Date(a.registrationDate);
      }
      return 0;
    });

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'inactive':
        return <Badge bg="secondary">Inactive</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="child-page">
      <Container fluid>
        {/* Page Header */}
        <div className="page-header">
          <div className="header-title">
            <h1><FaChild className="page-icon" /> Children</h1>
            <p>Manage children information and records</p>
          </div>
          <div className="header-actions">
            <Button 
              variant="primary" 
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
            >
              <FaPlus className="me-2" /> Add Child
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
                    placeholder="Search children or parents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={6} lg={4} className="d-flex align-items-center">
                <div className="d-flex align-items-center me-3">
                  <FaFilter className="me-2 text-secondary" />
                  <Form.Select 
                    value={filterAgeGroup}
                    onChange={(e) => setFilterAgeGroup(e.target.value)}
                    className="age-filter"
                  >
                    <option value="all">All Age Groups</option>
                    <option value="Infant">Infant</option>
                    <option value="Toddler">Toddler</option>
                    <option value="Preschool">Preschool</option>
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
                    className={`me-2 ${sortField === 'age' ? 'active' : ''}`}
                    onClick={() => handleSort('age')}
                  >
                    Age {sortField === 'age' && (
                      sortDirection === 'asc' ? <FaSortAmountUp className="ms-1" /> : <FaSortAmountDown className="ms-1" />
                    )}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    className={sortField === 'registration' ? 'active' : ''}
                    onClick={() => handleSort('registration')}
                  >
                    Registration {sortField === 'registration' && (
                      sortDirection === 'asc' ? <FaSortAmountUp className="ms-1" /> : <FaSortAmountDown className="ms-1" />
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Children Table */}
        <Card className="table-card">
          <Card.Body>
            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading children data...</p>
              </div>
            ) : error ? (
              <div className="text-center my-5 text-danger">
                <p>{error}</p>
                <Button variant="primary" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            ) : filteredChildren.length === 0 ? (
              <div className="text-center my-5">
                <p>No children found matching your search criteria.</p>
                <Button variant="outline-primary" onClick={() => {
                  setSearchTerm('');
                  setFilterAgeGroup('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="child-table">
                  <thead>
                    <tr>
                      <th>Child</th>
                      <th>Parent Info</th>
                      <th>Age Group</th>
                      <th>Assigned To</th>
                      <th>Attendance</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredChildren.map(child => (
                      <tr key={child.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className={`child-circle ${child.gender === 'Female' ? 'female' : 'male'}`}>
                              {child.name.charAt(0)}
                            </div>
                            <div className="ms-2">
                              <div className="fw-semibold">{child.name}</div>
                              <div className="text-muted small">
                                <FaCalendarAlt className="me-1" size={12} />
                                {calculateAge(child.dob)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="fw-semibold">{child.parentName}</div>
                          <div className="text-muted small">{child.parentPhone}</div>
                          <div className="text-muted small">{child.parentEmail}</div>
                        </td>
                        <td>{child.ageGroup}</td>
                        <td>{child.assignedBabysitter}</td>
                        <td>
                          <div className="attendance-bar">
                            <div 
                              className="attendance-fill"
                              style={{ width: `${child.attendanceRate}%` }}
                            ></div>
                            <span className="attendance-text">{child.attendanceRate}%</span>
                          </div>
                        </td>
                        <td>{getStatusBadge(child.status)}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => openEditModal(child)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => openDeleteModal(child)}
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
          <Col md={3}>
            <Card className="summary-card infant-card">
              <Card.Body>
                <h3>{children.filter(c => c.ageGroup === 'Infant' && c.status === 'active').length}</h3>
                <p>Infants</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="summary-card toddler-card">
              <Card.Body>
                <h3>{children.filter(c => c.ageGroup === 'Toddler' && c.status === 'active').length}</h3>
                <p>Toddlers</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="summary-card preschool-card">
              <Card.Body>
                <h3>{children.filter(c => c.ageGroup === 'Preschool' && c.status === 'active').length}</h3>
                <p>Preschoolers</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="summary-card total-card">
              <Card.Body>
                <h3>{children.filter(c => c.status === 'active').length}</h3>
                <p>Total Active Children</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Add Child Modal */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add New Child</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Tabs defaultActiveKey="child-info" className="mb-4">
                <Tab eventKey="child-info" title="Child Information">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Child's Full Name *</Form.Label>
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
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
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
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Age Group</Form.Label>
                        <Form.Select
                          name="ageGroup"
                          value={formData.ageGroup}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Age Group</option>
                          <option value="Infant">Infant (0-12 months)</option>
                          <option value="Toddler">Toddler (1-2 years)</option>
                          <option value="Preschool">Preschool (3-5 years)</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Registration Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="registrationDate"
                      value={formData.registrationDate}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Tab>
                <Tab eventKey="parent-info" title="Parent Information">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Parent/Guardian Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number *</Form.Label>
                        <Form.Control
                          type="text"
                          name="parentPhone"
                          value={formData.parentPhone}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Home Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Emergency Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      placeholder="Name and phone number"
                    />
                  </Form.Group>
                </Tab>
                <Tab eventKey="medical-info" title="Medical Information">
                  <Form.Group className="mb-3">
                    <Form.Label>Allergies</Form.Label>
                    <Form.Control
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      placeholder="List any allergies or 'None'"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Medical Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="medicalNotes"
                      value={formData.medicalNotes}
                      onChange={handleInputChange}
                      placeholder="Any medical conditions, medications, or special needs"
                    />
                  </Form.Group>
                </Tab>
              </Tabs>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddChild}>
              Add Child
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Child Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Child</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Tabs defaultActiveKey="child-info" className="mb-4">
                <Tab eventKey="child-info" title="Child Information">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Child's Full Name *</Form.Label>
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
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
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
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Age Group</Form.Label>
                        <Form.Select
                          name="ageGroup"
                          value={formData.ageGroup}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Age Group</option>
                          <option value="Infant">Infant (0-12 months)</option>
                          <option value="Toddler">Toddler (1-2 years)</option>
                          <option value="Preschool">Preschool (3-5 years)</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Registration Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="registrationDate"
                          value={formData.registrationDate}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="parent-info" title="Parent Information">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Parent/Guardian Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number *</Form.Label>
                        <Form.Control
                          type="text"
                          name="parentPhone"
                          value={formData.parentPhone}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Home Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Emergency Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      placeholder="Name and phone number"
                    />
                  </Form.Group>
                </Tab>
                <Tab eventKey="medical-info" title="Medical Information">
                  <Form.Group className="mb-3">
                    <Form.Label>Allergies</Form.Label>
                    <Form.Control
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      placeholder="List any allergies or 'None'"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Medical Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="medicalNotes"
                      value={formData.medicalNotes}
                      onChange={handleInputChange}
                      placeholder="Any medical conditions, medications, or special needs"
                    />
                  </Form.Group>
                </Tab>
              </Tabs>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditChild}>
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
            {currentChild && (
              <>
                <p>Are you sure you want to remove <strong>{currentChild.name}</strong> from the system?</p>
                <p className="text-danger">This action cannot be undone.</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteChild}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ChildPage; 