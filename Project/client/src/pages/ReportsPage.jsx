import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Dropdown, DropdownButton, Alert } from 'react-bootstrap';
import { 
  FaFileAlt, 
  FaDownload, 
  FaPrint, 
  FaChartBar, 
  FaCalendarAlt,
  FaFilter,
  FaSearch
} from 'react-icons/fa';
import Chart from 'react-apexcharts';
import '../components/Finance/Finance.css';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('income');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const generateReportData = () => {
    setLoading(true);
    setError(null);
    
    // Simulating API request with timeout
    setTimeout(() => {
      try {
        const data = {
          income: {
            summary: {
              total: 125000,
              categories: {
                'Tuition': 98500,
                'Registration Fees': 12500,
                'Extra Activities': 8750,
                'Late Fees': 3250,
                'Donations': 2000
              },
              compareLastPeriod: 12.5
            },
            transactions: [
              { id: 1, date: '2023-07-01', category: 'Tuition', description: 'Monthly tuition - 20 students', amount: 15000 },
              { id: 2, date: '2023-07-05', category: 'Registration Fees', description: 'New registrations for fall', amount: 7500 },
              { id: 3, date: '2023-07-10', category: 'Extra Activities', description: 'Summer camp fees', amount: 4250 },
              { id: 4, date: '2023-07-15', category: 'Tuition', description: 'Monthly tuition - 18 students', amount: 13500 },
              { id: 5, date: '2023-07-20', category: 'Late Fees', description: 'Late payment penalties', amount: 1250 },
            ],
            monthlyTrend: [
              { month: 'Jan', value: 18500 },
              { month: 'Feb', value: 19200 },
              { month: 'Mar', value: 20100 },
              { month: 'Apr', value: 19800 },
              { month: 'May', value: 21500 },
              { month: 'Jun', value: 22400 },
              { month: 'Jul', value: 23500 }
            ]
          },
          expenses: {
            summary: {
              total: 82500,
              categories: {
                'Salaries': 45000,
                'Supplies': 12500,
                'Utilities': 8000,
                'Maintenance': 6500,
                'Food': 7500,
                'Insurance': 3000
              },
              compareLastPeriod: 8.2
            },
            transactions: [
              { id: 1, date: '2023-07-02', category: 'Salaries', description: 'Staff salaries - 8 employees', amount: 32000 },
              { id: 2, date: '2023-07-05', category: 'Utilities', description: 'Electricity and water bills', amount: 3500 },
              { id: 3, date: '2023-07-08', category: 'Supplies', description: 'Educational materials', amount: 4500 },
              { id: 4, date: '2023-07-12', category: 'Food', description: 'Weekly grocery orders', amount: 2800 },
              { id: 5, date: '2023-07-18', category: 'Maintenance', description: 'Air conditioning repair', amount: 1500 },
            ],
            monthlyTrend: [
              { month: 'Jan', value: 10200 },
              { month: 'Feb', value: 11500 },
              { month: 'Mar', value: 12100 },
              { month: 'Apr', value: 11800 },
              { month: 'May', value: 12700 },
              { month: 'Jun', value: 11900 },
              { month: 'Jul', value: 12300 }
            ]
          },
          profitLoss: {
            summary: {
              totalIncome: 125000,
              totalExpenses: 82500,
              netProfit: 42500,
              profitMargin: 34,
              compareLastPeriod: 15.3
            },
            monthlyComparison: [
              { month: 'Jan', income: 18500, expenses: 10200, profit: 8300 },
              { month: 'Feb', income: 19200, expenses: 11500, profit: 7700 },
              { month: 'Mar', income: 20100, expenses: 12100, profit: 8000 },
              { month: 'Apr', income: 19800, expenses: 11800, profit: 8000 },
              { month: 'May', income: 21500, expenses: 12700, profit: 8800 },
              { month: 'Jun', income: 22400, expenses: 11900, profit: 10500 },
              { month: 'Jul', income: 23500, expenses: 12300, profit: 11200 }
            ]
          }
        };
        
        setReportData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error generating report:', err);
        setError('Failed to generate report. Please try again later.');
        setLoading(false);
      }
    }, 1200);
  };
  
  // Call once on mount to populate with default data
  useEffect(() => {
    generateReportData();
  }, []);
  
  const handleGenerateReport = () => {
    generateReportData();
  };
  
  const handlePrintReport = () => {
    window.print();
  };
  
  const handleExportReport = () => {
    // In a real app, this would generate a PDF or Excel export
    alert('Export functionality would be implemented here in a real application.');
  };
  
  const renderChart = () => {
    if (!reportData) return null;
    
    let chartOptions = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Amount ($)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val.toLocaleString()
          }
        }
      },
      colors: ['#4e73df', '#e74a3b', '#1cc88a']
    };
    
    let series = [];
    
    if (reportType === 'income') {
      chartOptions.xaxis.categories = reportData.income.monthlyTrend.map(item => item.month);
      series = [{
        name: 'Income',
        data: reportData.income.monthlyTrend.map(item => item.value)
      }];
      chartOptions.colors = ['#1cc88a'];
    } else if (reportType === 'expenses') {
      chartOptions.xaxis.categories = reportData.expenses.monthlyTrend.map(item => item.month);
      series = [{
        name: 'Expenses',
        data: reportData.expenses.monthlyTrend.map(item => item.value)
      }];
      chartOptions.colors = ['#e74a3b'];
    } else if (reportType === 'profitLoss') {
      chartOptions.xaxis.categories = reportData.profitLoss.monthlyComparison.map(item => item.month);
      series = [
        {
          name: 'Income',
          data: reportData.profitLoss.monthlyComparison.map(item => item.income)
        },
        {
          name: 'Expenses',
          data: reportData.profitLoss.monthlyComparison.map(item => item.expenses)
        },
        {
          name: 'Profit',
          data: reportData.profitLoss.monthlyComparison.map(item => item.profit)
        }
      ];
    }
    
    return (
      <Chart
        options={chartOptions}
        series={series}
        type="bar"
        height={350}
      />
    );
  };
  
  const renderDonutChart = () => {
    if (!reportData) return null;
    
    let categories = [];
    let values = [];
    let colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'];
    
    if (reportType === 'income') {
      categories = Object.keys(reportData.income.summary.categories);
      values = Object.values(reportData.income.summary.categories);
    } else if (reportType === 'expenses') {
      categories = Object.keys(reportData.expenses.summary.categories);
      values = Object.values(reportData.expenses.summary.categories);
    } else {
      return null; // No donut chart for profit/loss report
    }
    
    const chartOptions = {
      chart: {
        type: 'donut',
      },
      labels: categories,
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
      }],
      colors: colors,
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + "%"
        }
      }
    };
    
    return (
      <Chart
        options={chartOptions}
        series={values}
        type="donut"
        height={350}
      />
    );
  };
  
  const renderReportContent = () => {
    if (loading) {
      return <div className="text-center py-5"><p>Loading report data...</p></div>;
    }
    
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }
    
    if (!reportData) {
      return <div className="text-center py-5"><p>No report data available. Please generate a report.</p></div>;
    }
    
    const data = reportData[reportType];
    
    if (reportType === 'income') {
      return (
        <>
          <Row className="mb-4">
            <Col lg={4}>
              <Card className="report-summary-item income">
                <Card.Body>
                  <h5>Total Income</h5>
                  <p>${data.summary.total.toLocaleString()}</p>
                  <small className="text-success">
                    +{data.summary.compareLastPeriod}% from previous period
                  </small>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={8}>
              <Card className="h-100">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Income Trend</h5>
                </Card.Header>
                <Card.Body>
                  {renderChart()}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col lg={5}>
              <Card className="h-100">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Income Sources</h5>
                </Card.Header>
                <Card.Body>
                  {renderDonutChart()}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={7}>
              <Card>
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Income Transactions</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <Table hover className="mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th>Date</th>
                          <th>Category</th>
                          <th>Description</th>
                          <th className="text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.transactions.map(transaction => (
                          <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.description}</td>
                            <td className="text-right">${transaction.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      );
    } else if (reportType === 'expenses') {
      return (
        <>
          <Row className="mb-4">
            <Col lg={4}>
              <Card className="report-summary-item expense">
                <Card.Body>
                  <h5>Total Expenses</h5>
                  <p>${data.summary.total.toLocaleString()}</p>
                  <small className="text-danger">
                    +{data.summary.compareLastPeriod}% from previous period
                  </small>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={8}>
              <Card className="h-100">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Expense Trend</h5>
                </Card.Header>
                <Card.Body>
                  {renderChart()}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col lg={5}>
              <Card className="h-100">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Expense Categories</h5>
                </Card.Header>
                <Card.Body>
                  {renderDonutChart()}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={7}>
              <Card>
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Expense Transactions</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <Table hover className="mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th>Date</th>
                          <th>Category</th>
                          <th>Description</th>
                          <th className="text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.transactions.map(transaction => (
                          <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.description}</td>
                            <td className="text-right">${transaction.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      );
    } else if (reportType === 'profitLoss') {
      return (
        <>
          <Row className="mb-4">
            <Col lg={4}>
              <Card className="report-summary-item income mb-3">
                <Card.Body>
                  <h5>Total Income</h5>
                  <p>${data.summary.totalIncome.toLocaleString()}</p>
                </Card.Body>
              </Card>
              <Card className="report-summary-item expense mb-3">
                <Card.Body>
                  <h5>Total Expenses</h5>
                  <p>${data.summary.totalExpenses.toLocaleString()}</p>
                </Card.Body>
              </Card>
              <Card className="report-summary-item profit">
                <Card.Body>
                  <h5>Net Profit</h5>
                  <p>${data.summary.netProfit.toLocaleString()}</p>
                  <small className="text-success">
                    Profit Margin: {data.summary.profitMargin}%
                  </small>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={8}>
              <Card className="h-100">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Income vs Expenses</h5>
                </Card.Header>
                <Card.Body>
                  {renderChart()}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Monthly Breakdown</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <Table hover className="mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th>Month</th>
                          <th>Income</th>
                          <th>Expenses</th>
                          <th>Profit</th>
                          <th>Margin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.monthlyComparison.map((month, index) => (
                          <tr key={index}>
                            <td>{month.month}</td>
                            <td>${month.income.toLocaleString()}</td>
                            <td>${month.expenses.toLocaleString()}</td>
                            <td>${month.profit.toLocaleString()}</td>
                            <td>{((month.profit / month.income) * 100).toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      );
    }
    
    return null;
  };
  
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Financial Reports</h1>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={handlePrintReport}>
            <FaPrint className="me-2" /> Print
          </Button>
          <Button variant="outline-primary" onClick={handleExportReport}>
            <FaDownload className="me-2" /> Export
          </Button>
        </div>
      </div>
      
      <Card className="mb-4 report-filter-section">
        <Card.Body>
          <Row>
            <Col md={4} className="mb-3 mb-md-0">
              <Form.Group>
                <Form.Label>Report Type</Form.Label>
                <Form.Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="income">Income Report</option>
                  <option value="expenses">Expense Report</option>
                  <option value="profitLoss">Profit & Loss Statement</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button variant="primary" className="w-100" onClick={handleGenerateReport}>
                <FaSearch className="me-2" /> Generate
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {renderReportContent()}
    </Container>
  );
};

export default ReportsPage; 