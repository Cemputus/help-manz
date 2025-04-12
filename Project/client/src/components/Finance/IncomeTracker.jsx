import React, { useState } from 'react';
import { Card, Table, Button, Form, Row, Col, Modal, Badge, InputGroup } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaSearch, FaSortAmountDown, FaDownload } from 'react-icons/fa';
import './FinanceComponents.css';

const IncomeTracker = () => {
  const [incomeEntries, setIncomeEntries] = useState([
    { id: 1, date: '2023-06-01', category: 'Tuition', description: 'Monthly tuition - 15 students', amount: 7500, status: 'received' },
    { id: 2, date: '2023-06-02', category: 'Registration', description: 'New registration fees', amount: 1200, status: 'received' },
    { id: 3, date: '2023-06-05', category: 'Tuition', description: 'Monthly tuition - 10 students', amount: 5000, status: 'received' },
    { id: 4, date: '2023-06-10', category: 'Extra Activities', description: 'Swimming classes', amount: 800, status: 'received' },
    { id: 5, date: '2023-06-15', category: 'Tuition', description: 'Monthly tuition - 5 students', amount: 2500, status: 'pending' },
    { id: 6, date: '2023-06-20', category: 'Donation', description: 'Annual fundraiser', amount: 5000, status: 'received' },
    { id: 7, date: '2023-06-25', category: 'Extra Activities', description: 'Art supplies reimbursement', amount: 350, status: 'pending' },
    { id: 8, date: '2023-06-30', category: 'Late Fees', description: 'Late payment penalties', amount: 250, status: 'pending' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: '',
    status: 'pending'
  });

  const categories = ['Tuition', 'Registration', 'Extra Activities', 'Donation', 'Late Fees', 'Grants', 'Other'];
  const statuses = ['pending', 'received', 'cancelled'];

  const handleClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handleAddShow = () => {
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      category: '',
      description: '',
      amount: '',
      status: 'pending'
    });
    setShowAddModal(true);
  };

  const handleEditShow = (entry) => {
    setCurrentEntry(entry);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({
      ...newEntry,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentEntry({
      ...currentEntry,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    });
  };

  const handleAddSubmit = () => {
    const entry = {
      ...newEntry,
      id: incomeEntries.length + 1,
    };
    setIncomeEntries([...incomeEntries, entry]);
    setShowAddModal(false);
  };

  const handleEditSubmit = () => {
    const updatedEntries = incomeEntries.map(entry =>
      entry.id === currentEntry.id ? currentEntry : entry
    );
    setIncomeEntries(updatedEntries);
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this income entry?')) {
      setIncomeEntries(incomeEntries.filter(entry => entry.id !== id));
    }
  };

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status) => {
    const badgeMap = {
      'received': <Badge bg="success">Received</Badge>,
      'pending': <Badge bg="warning">Pending</Badge>,
      'cancelled': <Badge bg="danger">Cancelled</Badge>
    };
    return badgeMap[status] || <Badge bg="secondary">{status}</Badge>;
  };

  const filteredAndSortedEntries = incomeEntries
    .filter(entry => 
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(entry => filterCategory ? entry.category === filterCategory : true)
    .filter(entry => filterStatus ? entry.status === filterStatus : true)
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'amount') {
        comparison = a.amount - b.amount;
      } else if (sortField === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else {
        comparison = a[sortField].localeCompare(b[sortField]);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const totalIncome = filteredAndSortedEntries.reduce((sum, entry) => 
    entry.status !== 'cancelled' ? sum + entry.amount : sum, 0);
  
  const receivedIncome = filteredAndSortedEntries.reduce((sum, entry) => 
    entry.status === 'received' ? sum + entry.amount : sum, 0);
  
  const pendingIncome = filteredAndSortedEntries.reduce((sum, entry) => 
    entry.status === 'pending' ? sum + entry.amount : sum, 0);

  return (
    <div className="income-tracker">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="section-title">Income Tracker</h3>
        <Button variant="primary" onClick={handleAddShow}>
          <FaPlus className="me-2" /> Add Income
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="finance-summary-card">
            <Card.Body>
              <h6 className="card-subtitle text-muted">Total Income</h6>
              <h3 className="card-title">${totalIncome.toLocaleString()}</h3>
              <p className="text-muted">All income entries</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="finance-summary-card">
            <Card.Body>
              <h6 className="card-subtitle text-muted">Received</h6>
              <h3 className="card-title">${receivedIncome.toLocaleString()}</h3>
              <p className="text-muted">Income received</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="finance-summary-card">
            <Card.Body>
              <h6 className="card-subtitle text-muted">Pending</h6>
              <h3 className="card-title">${pendingIncome.toLocaleString()}</h3>
              <p className="text-muted">Income pending</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="finance-table-card mb-4">
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col lg={4} className="mb-2 mb-lg-0">
              <InputGroup>
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Search by description or category"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col lg={7} className="mb-2 mb-lg-0">
              <div className="d-flex flex-wrap gap-2">
                <Form.Select 
                  className="w-auto"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Form.Select>
                <Form.Select
                  className="w-auto"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </Form.Select>
                <Button variant="outline-secondary" title="Sort by Date" onClick={() => handleSortChange('date')}>
                  <FaSortAmountDown /> Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Button>
                <Button variant="outline-secondary" title="Sort by Amount" onClick={() => handleSortChange('amount')}>
                  <FaSortAmountDown /> Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Button>
              </div>
            </Col>
            <Col lg={1} className="text-end">
              <Button variant="outline-secondary" title="Export to CSV">
                <FaDownload />
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedEntries.length > 0 ? (
                  filteredAndSortedEntries.map(entry => (
                    <tr key={entry.id}>
                      <td>{new Date(entry.date).toLocaleDateString()}</td>
                      <td>{entry.category}</td>
                      <td>{entry.description}</td>
                      <td>${entry.amount.toLocaleString()}</td>
                      <td>{getStatusBadge(entry.status)}</td>
                      <td className="text-end">
                        <Button variant="link" className="p-0 me-2" onClick={() => handleEditShow(entry)}>
                          <FaEdit className="text-primary" />
                        </Button>
                        <Button variant="link" className="p-0" onClick={() => handleDelete(entry.id)}>
                          <FaTrash className="text-danger" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-3">
                      No income entries found. Add a new entry to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Add Income Modal */}
      <Modal show={showAddModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Income Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newEntry.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={newEntry.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newEntry.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount ($)</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={newEntry.amount}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={newEntry.status}
                onChange={handleInputChange}
                required
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddSubmit}>
            Add Income
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Income Modal */}
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Income Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentEntry && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={currentEntry.date}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={currentEntry.category}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={currentEntry.description}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={currentEntry.amount}
                  onChange={handleEditChange}
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={currentEntry.status}
                  onChange={handleEditChange}
                  required
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IncomeTracker; 