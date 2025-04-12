import React, { useState, useEffect } from 'react';
import { Card, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { FaMoneyBillWave, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import Chart from 'react-apexcharts';
import './FinanceComponents.css';

const BudgetDashboard = () => {
  const [budgetData, setBudgetData] = useState({
    totalBudget: 25000,
    totalSpent: 18750,
    remaining: 6250,
    categories: [
      { id: 1, name: 'Salaries', allocated: 15000, spent: 13500, color: '#4361ee' },
      { id: 2, name: 'Supplies', allocated: 3500, spent: 2100, color: '#3a0ca3' },
      { id: 3, name: 'Food', allocated: 2500, spent: 1950, color: '#7209b7' },
      { id: 4, name: 'Utilities', allocated: 1800, spent: 1200, color: '#f72585' },
      { id: 5, name: 'Maintenance', allocated: 1200, spent: 0, color: '#4cc9f0' },
      { id: 6, name: 'Miscellaneous', allocated: 1000, spent: 0, color: '#560bad' }
    ],
    monthlyData: [
      { month: 'Jan', income: 28000, expenses: 24000 },
      { month: 'Feb', income: 27500, expenses: 23000 },
      { month: 'Mar', income: 29000, expenses: 25000 },
      { month: 'Apr', income: 28500, expenses: 26000 },
      { month: 'May', income: 30000, expenses: 25500 },
      { month: 'Jun', income: 29500, expenses: 24500 }
    ]
  });

  const calculatePercentage = (spent, allocated) => {
    return Math.round((spent / allocated) * 100);
  };

  const spendingChartOptions = {
    chart: {
      type: 'donut',
      height: 350,
    },
    labels: budgetData.categories.map(cat => cat.name),
    colors: budgetData.categories.map(cat => cat.color),
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
  
  const spendingChartSeries = budgetData.categories.map(cat => cat.spent);

  const monthlyComparisonOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
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
      categories: budgetData.monthlyData.map(item => item.month),
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
          return "$ " + val
        }
      }
    },
    colors: ['#4361ee', '#f72585']
  };

  const monthlyComparisonSeries = [
    {
      name: 'Income',
      data: budgetData.monthlyData.map(item => item.income)
    },
    {
      name: 'Expenses',
      data: budgetData.monthlyData.map(item => item.expenses)
    }
  ];

  return (
    <div className="budget-dashboard">
      <h3 className="section-title mb-4">Budget Dashboard</h3>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="finance-summary-card h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="card-subtitle text-muted">Total Budget</h5>
                  <h3 className="card-title mb-0">${budgetData.totalBudget.toLocaleString()}</h3>
                </div>
                <FaMoneyBillWave size={24} className="text-primary" />
              </div>
              <p className="text-muted">Monthly budget allocation</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="finance-summary-card h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="card-subtitle text-muted">Spent</h5>
                  <h3 className="card-title mb-0">${budgetData.totalSpent.toLocaleString()}</h3>
                </div>
                <FaChartLine size={24} className="text-danger" />
              </div>
              <ProgressBar 
                now={calculatePercentage(budgetData.totalSpent, budgetData.totalBudget)} 
                variant={calculatePercentage(budgetData.totalSpent, budgetData.totalBudget) > 80 ? "danger" : "success"}
                className="mb-2"
              />
              <p className="text-muted">
                {calculatePercentage(budgetData.totalSpent, budgetData.totalBudget)}% of total budget
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="finance-summary-card h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="card-subtitle text-muted">Remaining</h5>
                  <h3 className="card-title mb-0">${budgetData.remaining.toLocaleString()}</h3>
                </div>
                <FaCalendarAlt size={24} className="text-success" />
              </div>
              <p className="text-muted">
                {calculatePercentage(budgetData.remaining, budgetData.totalBudget)}% of budget remaining
              </p>
              <Button variant="outline-primary" size="sm">Adjust Budget</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="finance-chart-card h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Spending by Category</h5>
            </Card.Header>
            <Card.Body>
              <Chart
                options={spendingChartOptions}
                series={spendingChartSeries}
                type="donut"
                height={300}
              />
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6} className="mb-4">
          <Card className="finance-chart-card h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Monthly Comparison</h5>
            </Card.Header>
            <Card.Body>
              <Chart
                options={monthlyComparisonOptions}
                series={monthlyComparisonSeries}
                type="bar"
                height={300}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card className="finance-table-card">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Budget Allocation by Category</h5>
            </Card.Header>
            <Card.Body>
              {budgetData.categories.map(category => (
                <div key={category.id} className="budget-category-item mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6>{category.name}</h6>
                    <div className="d-flex">
                      <span className="text-muted me-3">
                        ${category.spent.toLocaleString()} of ${category.allocated.toLocaleString()}
                      </span>
                      <span className={`fw-bold ${calculatePercentage(category.spent, category.allocated) > 90 ? 'text-danger' : 'text-success'}`}>
                        {calculatePercentage(category.spent, category.allocated)}%
                      </span>
                    </div>
                  </div>
                  <ProgressBar 
                    now={calculatePercentage(category.spent, category.allocated)} 
                    variant={calculatePercentage(category.spent, category.allocated) > 90 ? "danger" : "success"}
                    style={{ height: "8px" }}
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BudgetDashboard; 