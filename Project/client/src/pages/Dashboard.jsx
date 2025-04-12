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
import { dashboard } from '../services/api';

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

  const { token } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboard.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

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
        <h1 className="mb-4">Dashboard</h1>
        
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-4">
            <Card>
              <CardHeader>Total Children</CardHeader>
              <CardBody>
                <h2>{stats.totalChildren}</h2>
              </CardBody>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <Card>
              <CardHeader>Total Babysitters</CardHeader>
              <CardBody>
                <h2>{stats.totalBabysitters}</h2>
              </CardBody>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <Card>
              <CardHeader>Total Income</CardHeader>
              <CardBody>
                <h2>${stats.totalEarnings.toFixed(2)}</h2>
              </CardBody>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <Card>
              <CardHeader>Total Expenses</CardHeader>
              <CardBody>
                <h2>${stats.totalExpenses.toFixed(2)}</h2>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={12} className="mb-4">
            <Card>
              <CardHeader>Recent Attendance</CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Child</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentAttendance.map((record) => (
                      <tr key={record._id}>
                        <td>{record.childName}</td>
                        <td>{new Date(record.date).toLocaleDateString()}</td>
                        <td>{record.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col lg={6} md={12} className="mb-4">
            <Card>
              <CardHeader>Upcoming Schedules</CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Child</th>
                      <th>Babysitter</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.upcomingSchedules.map((schedule) => (
                      <tr key={schedule._id}>
                        <td>{schedule.childName}</td>
                        <td>{schedule.babysitterName}</td>
                        <td>{new Date(schedule.date).toLocaleDateString()}</td>
                        <td>{schedule.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard; 