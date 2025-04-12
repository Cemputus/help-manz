import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Table, Badge, InputGroup } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaSearch, FaMoneyBillWave } from 'react-icons/fa';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([
    { 
      id: 1, 
      date: '2023-07-10', 
      category: 'Supplies', 
      amount: 250.50, 
      description: 'Art supplies and educational materials', 
      paymentMethod: 'Credit Card',
      vendor: 'Educational Supplies Inc.'
    },
    { 
      id: 2, 
      date: '2023-07-14', 
      category: 'Utilities', 
      amount: 175.30, 
      description: 'Electricity bill for June', 
      paymentMethod: 'Bank Transfer',
      vendor: 'City Power & Light'
    },
    { 
      id: 3, 
      date: '2023-07-16', 
      category: 'Salary', 
      amount: 2500, 
      description: 'Staff payroll - first half of July', 
      paymentMethod: 'Bank Transfer',
      vendor: 'Internal'
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [formData, setFormData] = useState({
    date: '',
    category: 'Supplies',
    amount: '',
    description: '',
    paymentMethod: 'Credit Card',
    vendor: ''
  });

  const categories = ['Supplies', 'Utilities', 'Rent', 'Salary', 'Food', 'Maintenance', 'Equipment', 'Marketing', 'Insurance', 'Taxes', 'Other'];
  const paymentMethods = ['Cash', 'Credit Card', 'Bank Transfer', 'Check', 'Mobile Payment'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      date: '',
      category: 'Supplies',
      amount: '',
      description: '',
      paymentMethod: 'Credit Card',
      vendor: ''
    });
    setEditingId(null);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      resetForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing expense
      setExpenses(expenses.map(expense => 
        expense.id === editingId ? { ...formData, id: editingId } : expense
      ));
    } else {
      // Add new expense
      const newExpense = {
        ...formData,
        id: Date.now()
      };
      setExpenses([...expenses, newExpense]);
    }
    
    toggleForm();
    resetForm();
  };

  const handleEdit = (expense) => {
    setFormData(expense);
    setEditingId(expense.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense record?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const calculateTotal = (expenseList) => {
    return expenseList.reduce((sum, expense) => sum + Number(expense.amount), 0);
  };

  const filteredExpenses = expenses.filter(expense => {
    // Text filter
    const matchesText = filter === '' || 
      expense.description.toLowerCase().includes(filter.toLowerCase()) ||
      expense.category.toLowerCase().includes(filter.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(filter.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === 'All' || expense.category === categoryFilter;
    
    // Date range filter
    const matchesDateRange = 
      (dateRange.start === '' || expense.date >= dateRange.start) &&
      (dateRange.end === '' || expense.date <= dateRange.end);
    
    return matchesText && matchesCategory && matchesDateRange;
  });

  // Group expenses by category for the summary
  const expensesByCategory = categories.map(category => {
    const categoryExpenses = expenses.filter(expense => expense.category === category);
    const total = calculateTotal(categoryExpenses);
    return { category, total };
  }).filter(item => item.total > 0).sort((a, b) => b.total - a.total);

  return (
    <div className="expense-tracker">
      <div className="expense-header">
        <h2 className="tracker-title">
          <FaMoneyBillWave className="title-icon"/> Expense Tracker
        </h2>
        <Button 
          variant="primary" 
          className="add-btn" 
          onClick={toggleForm}
        >
          {showForm ? 'Cancel' : <><FaPlus /> Add Expense</>}
        </Button>
      </div>

      {showForm && (
        <Card className="expense-form-card mb-4">
          <Card.Body>
            <h3 className="form-title">{editingId ? 'Edit Expense Record' : 'Add New Expense'}</h3>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                      type="date" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleInputChange}
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleInputChange}
                      required
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Amount ($)</Form.Label>
                    <Form.Control 
                      type="number" 
                      name="amount" 
                      min="0" 
                      step="0.01" 
                      value={formData.amount} 
                      onChange={handleInputChange}
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Select 
                      name="paymentMethod" 
                      value={formData.paymentMethod} 
                      onChange={handleInputChange}
                      required
                    >
                      {paymentMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Vendor/Recipient</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="vendor" 
                      value={formData.vendor} 
                      onChange={handleInputChange}
                      required 
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={2} 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  required 
                />
              </Form.Group>

              <div className="form-actions">
                <Button variant="secondary" type="button" onClick={toggleForm}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingId ? 'Update' : 'Save'} Expense
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Card className="mb-4">
        <Card.Body>
          <div className="filters-header">
            <InputGroup className="search-container">
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control 
                type="text" 
                placeholder="Search expenses..." 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </InputGroup>
            <Button 
              variant="outline-secondary" 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filters
            </Button>
          </div>

          {showFilters && (
            <div className="advanced-filters mt-3">
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select 
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control 
                      type="date" 
                      value={dateRange.start}
                      onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control 
                      type="date" 
                      value={dateRange.end}
                      onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="filter-actions">
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => {
                    setCategoryFilter('All');
                    setDateRange({ start: '', end: '' });
                    setFilter('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      <Card className="expense-table-card">
        <Card.Body>
          {filteredExpenses.length > 0 ? (
            <>
              <Table hover responsive className="expense-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Vendor/Recipient</th>
                    <th>Description</th>
                    <th>Payment Method</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map(expense => (
                    <tr key={expense.id}>
                      <td>{expense.date}</td>
                      <td>
                        <Badge bg="secondary" className="category-badge">{expense.category}</Badge>
                      </td>
                      <td className="amount-cell">${Number(expense.amount).toFixed(2)}</td>
                      <td>{expense.vendor}</td>
                      <td>{expense.description}</td>
                      <td>{expense.paymentMethod}</td>
                      <td className="actions-cell">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="action-btn"
                          onClick={() => handleEdit(expense)}
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          className="action-btn"
                          onClick={() => handleDelete(expense.id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="total-row">
                    <td colSpan={2} className="total-label">Total</td>
                    <td className="total-amount">${calculateTotal(filteredExpenses).toFixed(2)}</td>
                    <td colSpan={4}></td>
                  </tr>
                </tfoot>
              </Table>
            </>
          ) : (
            <div className="no-data">
              <FaMoneyBillWave className="no-data-icon" />
              <p>No expense records found.</p>
            </div>
          )}
        </Card.Body>
      </Card>

      <Row className="expense-summary">
        <Col md={4}>
          <Card className="summary-card">
            <Card.Body>
              <h4 className="summary-title">Total Expenses</h4>
              <div className="summary-value">${calculateTotal(expenses).toFixed(2)}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card">
            <Card.Body>
              <h4 className="summary-title">This Month</h4>
              <div className="summary-value">
                ${calculateTotal(
                  expenses.filter(expense => {
                    const currentMonth = new Date().getMonth() + 1;
                    const currentYear = new Date().getFullYear();
                    const expenseDate = new Date(expense.date);
                    return (
                      expenseDate.getMonth() + 1 === currentMonth &&
                      expenseDate.getFullYear() === currentYear
                    );
                  })
                ).toFixed(2)}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card">
            <Card.Body>
              <h4 className="summary-title">Last Month</h4>
              <div className="summary-value">
                ${calculateTotal(
                  expenses.filter(expense => {
                    const date = new Date();
                    date.setMonth(date.getMonth() - 1);
                    const lastMonth = date.getMonth() + 1;
                    const lastMonthYear = date.getFullYear();
                    const expenseDate = new Date(expense.date);
                    return (
                      expenseDate.getMonth() + 1 === lastMonth &&
                      expenseDate.getFullYear() === lastMonthYear
                    );
                  })
                ).toFixed(2)}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="category-breakdown mt-4">
        <Card.Header>
          <h4 className="mb-0">Expense Breakdown by Category</h4>
        </Card.Header>
        <Card.Body>
          {expensesByCategory.length > 0 ? (
            <Row>
              {expensesByCategory.map(item => (
                <Col md={4} key={item.category} className="category-stat mb-3">
                  <div className="category-name">{item.category}</div>
                  <div className="category-amount">${item.total.toFixed(2)}</div>
                  <div className="category-percent">
                    {((item.total / calculateTotal(expenses)) * 100).toFixed(1)}%
                  </div>
                  <div className="progress">
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: `${(item.total / calculateTotal(expenses)) * 100}%` }}
                      aria-valuenow={(item.total / calculateTotal(expenses)) * 100} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="no-data">
              <p>No expense data available for breakdown.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExpenseTracker; 