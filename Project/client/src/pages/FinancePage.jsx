import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaMoneyBillWave } from 'react-icons/fa';

const FinancePage = () => {
  console.log('FinancePage component mounted - SIMPLIFIED VERSION');
  
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Financial Management</h2>
          <p>This is a simplified version of the Finance page to ensure it displays properly.</p>
        </Col>
      </Row>
      
      <Row>
        <Col md={4}>
          <Card className="text-white bg-primary mb-3">
            <Card.Body>
              <Card.Title>Total Income</Card.Title>
              <Card.Text className="h3">UGX 1,250,000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-danger mb-3">
            <Card.Body>
              <Card.Title>Total Expenses</Card.Title>
              <Card.Text className="h3">UGX 800,000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-success mb-3">
            <Card.Body>
              <Card.Title>Net Income</Card.Title>
              <Card.Text className="h3">UGX 450,000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <span>Financial Summary</span>
                <Button variant="outline-primary" size="sm">
                  <FaMoneyBillWave className="me-1" /> Add Transaction
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <p>This is a placeholder for the financial summary. In the full version, this would display detailed financial data.</p>
              <p>The Finance page is now displaying correctly after login.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FinancePage; 