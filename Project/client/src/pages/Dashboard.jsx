import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { FaBabyCarriage, FaUserNurse, FaCalendarCheck, FaDollarSign, FaChartLine, FaUsers, FaMoneyBillWave, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import { format } from 'date-fns';
import './Dashboard.css';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBabysitters: 0,
    activeBabysitters: 0,
    totalChildren: 0,
    registeredParents: 0,
    bookingsThisMonth: 0,
    revenueTrends: [],
    staffDistribution: {
      active: 0,
      onLeave: 0,
      terminated: 0
    },
    pendingBookings: [],
    recentPayments: [],
    upcomingSchedules: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    totalChildren: 0,
    activeBabysitters: 0,
    pendingRequests: 0,
    totalEarnings: 0
  });

  const [recentAttendance, setRecentAttendance] = useState([]);
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [financialData, setFinancialData] = useState({
    income: [],
    expenses: []
  });

  const { authToken } = useAuth();

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch statistics
        const statsResponse = await axios.get('/api/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setStats(statsResponse.data);

        // Fetch recent attendance
        const attendanceResponse = await axios.get('/api/attendance/recent');
        setRecentAttendance(attendanceResponse.data);

        // Fetch recent incidents
        const incidentsResponse = await axios.get('/api/incidents/recent');
        setRecentIncidents(incidentsResponse.data);

        // Fetch financial data
        const financialResponse = await axios.get('/api/finance/summary');
        setFinancialData(financialResponse.data);

        // Mock data for demonstration
        const mockData = {
          totalBabysitters: 15,
          activeBabysitters: 12,
          totalChildren: 48,
          registeredParents: 36,
          bookingsThisMonth: 78,
          revenueTrends: [
            { month: 'Jan', revenue: 12500 },
            { month: 'Feb', revenue: 14000 },
            { month: 'Mar', revenue: 15200 },
            { month: 'Apr', revenue: 16800 },
            { month: 'May', revenue: 18000 },
            { month: 'Jun', revenue: 19500 }
          ],
          staffDistribution: {
            active: 12,
            onLeave: 2,
            terminated: 1
          },
          pendingBookings: [
            { id: 1, childName: 'Emma Johnson', parentName: 'Sarah Johnson', date: '2025-04-12', time: '09:00 AM - 05:00 PM', babysitter: 'Mary Williams', status: 'pending' },
            { id: 2, childName: 'Noah Smith', parentName: 'Jessica Smith', date: '2025-04-13', time: '08:00 AM - 04:00 PM', babysitter: 'John Davis', status: 'pending' },
            { id: 3, childName: 'Olivia Brown', parentName: 'Michael Brown', date: '2025-04-14', time: '09:30 AM - 03:30 PM', babysitter: 'Patricia Moore', status: 'pending' }
          ],
          recentPayments: [
            { id: 1, parentName: 'Sarah Johnson', amount: 250, date: '2025-04-01', status: 'completed' },
            { id: 2, parentName: 'Jessica Smith', amount: 310, date: '2025-04-02', status: 'completed' },
            { id: 3, parentName: 'Michael Brown', amount: 180, date: '2025-04-03', status: 'pending' },
            { id: 4, parentName: 'David Wilson', amount: 280, date: '2025-04-04', status: 'completed' }
          ],
          upcomingSchedules: [
            { id: 1, babysitter: 'Mary Williams', childName: 'Emma Johnson', date: '2025-04-12', time: '09:00 AM - 05:00 PM', status: 'confirmed' },
            { id: 2, babysitter: 'John Davis', childName: 'Noah Smith', date: '2025-04-13', time: '08:00 AM - 04:00 PM', status: 'confirmed' }
          ]
        };
        
        setDashboardData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
        toast.error('Failed to load dashboard data');
        console.error(err);
      }
    };

    fetchDashboardData();
  }, [authToken]);

  // Approve booking handler
  const handleApproveBooking = (id) => {
    // In a real app, this would be an API call
    const updatedBookings = dashboardData.pendingBookings.filter(booking => booking.id !== id);
    setDashboardData({
      ...dashboardData,
      pendingBookings: updatedBookings
    });
    toast.success('Booking approved successfully');
  };

  // Reject booking handler
  const handleRejectBooking = (id) => {
    // In a real app, this would be an API call
    const updatedBookings = dashboardData.pendingBookings.filter(booking => booking.id !== id);
    setDashboardData({
      ...dashboardData,
      pendingBookings: updatedBookings
    });
    toast.success('Booking rejected');
  };

  // Chart options and series for revenue trends
  const revenueChartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      categories: Array.isArray(dashboardData.revenueTrends) ? dashboardData.revenueTrends.map(item => item.month) : [],
    },
    yaxis: {
      title: {
        text: 'Revenue ($)'
      }
    },
    colors: ['#4CAF50'],
    title: {
      text: 'Monthly Revenue',
      align: 'left'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    }
  };

  const revenueChartSeries = [
    {
      name: 'Revenue',
      data: Array.isArray(dashboardData.revenueTrends) ? dashboardData.revenueTrends.map(item => item.revenue) : []
    }
  ];

  // Chart options and series for staff distribution
  const staffDistributionOptions = {
    chart: {
      type: 'donut',
      height: 350
    },
    labels: ['Active', 'On Leave', 'Terminated'],
    colors: ['#4CAF50', '#FFC107', '#F44336'],
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const staffDistributionSeries = [
    dashboardData.staffDistribution.active,
    dashboardData.staffDistribution.onLeave,
    dashboardData.staffDistribution.terminated
  ];

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'confirmed':
        return <Badge bg="primary">Confirmed</Badge>;
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const incomeChartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      categories: Array.isArray(financialData.income) ? financialData.income.map(item => format(new Date(item.date), 'MMM dd')) : [],
    },
    yaxis: {
      title: { text: 'Amount (UGX)' }
    },
    tooltip: {
      y: {
        formatter: (value) => `UGX ${value.toLocaleString()}`
      }
    }
  };

  const incomeChartSeries = [{
    name: 'Income',
    data: Array.isArray(financialData.income) ? financialData.income.map(item => item.amount) : []
  }];

  const expenseChartOptions = {
    chart: {
      type: 'donut'
    },
    labels: Array.isArray(financialData.expenses) ? financialData.expenses.map(item => item.category) : [],
    tooltip: {
      y: {
        formatter: (value) => `UGX ${value.toLocaleString()}`
      }
    }
  };

  const expenseChartSeries = Array.isArray(financialData.expenses) ? financialData.expenses.map(item => item.amount) : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <Container fluid>
        {/* Page Header */}
        <div className="page-header">
          <div className="header-title">
            <h1><FaChartLine className="page-icon" /> Dashboard</h1>
            <p>Overview of your daycare center</p>
          </div>
          <div className="header-actions">
            <Button variant="outline-primary" className="me-2">Generate Report</Button>
            <Button variant="primary">View Analytics</Button>
          </div>
        </div>
        
        {/* Statistics Cards */}
        <Row className="stats-cards">
          <Col lg={3} md={6} sm={12} className="mb-4">
            <Card className="stats-card babysitter-card">
              <Card.Body>
                <div className="stats-icon">
                  <FaUserNurse />
                </div>
                <div className="stats-info">
                  <h3>{dashboardData.totalBabysitters || 0}</h3>
                  <p>Babysitters</p>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="stats-sub">
                  {dashboardData.activeBabysitters || 0} active babysitters
                </div>
              </Card.Footer>
            </Card>
          </Col>
          
          <Col lg={3} md={6} sm={12} className="mb-4">
            <Card className="stats-card child-card">
              <Card.Body>
                <div className="stats-icon">
                  <FaBabyCarriage />
                </div>
                <div className="stats-info">
                  <h3>{dashboardData.totalChildren || 0}</h3>
                  <p>Children</p>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="stats-sub">
                  {dashboardData.registeredParents || 0} registered parents
                </div>
              </Card.Footer>
            </Card>
          </Col>
          
          <Col lg={3} md={6} sm={12} className="mb-4">
            <Card className="stats-card booking-card">
              <Card.Body>
                <div className="stats-icon">
                  <FaCalendarCheck />
                </div>
                <div className="stats-info">
                  <h3>{dashboardData.bookingsThisMonth || 0}</h3>
                  <p>Bookings This Month</p>
                </div>
              </Card.Body>
              <Card.Footer>
                <a href="#bookings" className="stats-link">View all bookings</a>
              </Card.Footer>
            </Card>
          </Col>
          
          <Col lg={3} md={6} sm={12} className="mb-4">
            <Card className="stats-card revenue-card">
              <Card.Body>
                <div className="stats-icon">
                  <FaDollarSign />
                </div>
                <div className="stats-info">
                  <h3>UGX {(dashboardData.revenueTrends[dashboardData.revenueTrends.length - 1]?.revenue || 0).toLocaleString()}</h3>
                  <p>Revenue This Month</p>
                </div>
              </Card.Body>
              <Card.Footer>
                <a href="#finance" className="stats-link">View financial details</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        
        {/* Charts */}
        <Row>
          <Col lg={8} md={12} className="mb-4">
            <Card className="chart-card">
              <Card.Body>
                <h5 className="mb-4">Revenue Trends</h5>
                <Chart 
                  options={revenueChartOptions} 
                  series={revenueChartSeries} 
                  type="area" 
                  height={350} 
                />
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4} md={12} className="mb-4">
            <Card className="chart-card">
              <Card.Body>
                <h5 className="mb-4">Staff Distribution</h5>
                <Chart 
                  options={staffDistributionOptions} 
                  series={staffDistributionSeries} 
                  type="donut" 
                  height={350} 
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Pending Bookings */}
        <Row>
          <Col lg={6} md={12} className="mb-4">
            <Card className="table-card">
              <Card.Header>
                <h5><FaCalendarCheck className="me-2" /> Pending Bookings</h5>
              </Card.Header>
              <Card.Body>
                {Array.isArray(dashboardData.pendingBookings) && dashboardData.pendingBookings.length > 0 ? (
                  dashboardData.pendingBookings.map(booking => (
                    <div key={booking.id} className="booking-item">
                      <div className="booking-info">
                        <div className="booking-child">{booking.childName}</div>
                        <div className="booking-parent">Parent: {booking.parentName}</div>
                        <div className="booking-details">
                          <div className="booking-date">
                            <strong>Date:</strong> {booking.date}
                          </div>
                          <div className="booking-time">
                            <strong>Time:</strong> {booking.time}
                          </div>
                        </div>
                        <div className="booking-babysitter">
                          <strong>Babysitter:</strong> {booking.babysitter}
                        </div>
                      </div>
                      <div className="booking-actions">
                        <Button 
                          variant="success" 
                          size="sm" 
                          onClick={() => handleApproveBooking(booking.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => handleRejectBooking(booking.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center my-4">No pending bookings</p>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          {/* Recent Payments */}
          <Col lg={6} md={12} className="mb-4">
            <Card className="table-card">
              <Card.Header>
                <h5><FaDollarSign className="me-2" /> Recent Payments</h5>
              </Card.Header>
              <Card.Body>
                {Array.isArray(dashboardData.recentPayments) && dashboardData.recentPayments.length > 0 ? (
                  dashboardData.recentPayments.map(payment => (
                    <tr key={payment.id}>
                      <td>{payment.parentName}</td>
                      <td>UGX{payment.amount}</td>
                      <td>{payment.date}</td>
                      <td>
                        <Badge bg={payment.status === 'completed' ? 'success' : 'warning'}>
                          {payment.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No recent payments</td>
                  </tr>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <FaUsers className="text-primary" size={24} />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Total Children</h6>
                    <h3 className="mb-0">{stats.totalChildren || 0}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <FaMoneyBillWave className="text-success" size={24} />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Monthly Income</h6>
                    <h3 className="mb-0">UGX {stats.totalEarnings ? stats.totalEarnings.toLocaleString() : '0'}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="text-warning" size={24} />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Pending Requests</h6>
                    <h3 className="mb-0">{stats.pendingRequests || 0}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <FaCalendarCheck className="text-info" size={24} />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Today's Attendance</h6>
                    <h3 className="mb-0">{stats.todayAttendance || 0}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="card-title">Income Trend</h5>
                <ReactApexChart
                  options={incomeChartOptions}
                  series={incomeChartSeries}
                  type="area"
                  height={350}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="card-title">Expense Distribution</h5>
                <ReactApexChart
                  options={expenseChartOptions}
                  series={expenseChartSeries}
                  type="donut"
                  height={350}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity */}
        <Row>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="card-title">Recent Attendance</h5>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Child</th>
                      <th>Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(recentAttendance) && recentAttendance.length > 0 ? (
                      recentAttendance.map((record) => (
                        <tr key={record.id}>
                          <td>{record.child.firstName} {record.child.lastName}</td>
                          <td>{format(new Date(record.checkInTime), 'HH:mm')}</td>
                          <td>
                            <span className={`badge bg-${record.status === 'present' ? 'success' : 'warning'}`}>
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">No recent attendance records</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="card-title">Recent Incidents</h5>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Child</th>
                      <th>Type</th>
                      <th>Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(recentIncidents) && recentIncidents.length > 0 ? (
                      recentIncidents.map((incident) => (
                        <tr key={incident.id}>
                          <td>{incident.child.firstName} {incident.child.lastName}</td>
                          <td>{incident.type}</td>
                          <td>
                            <Badge bg={incident.severity === 'low' ? 'success' : incident.severity === 'medium' ? 'warning' : 'danger'}>
                              {incident.severity}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">No recent incidents</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard; 