import React, { useState } from 'react';
import { FaCalendarAlt, FaMoneyBillWave, FaPrint } from 'react-icons/fa';
import { format } from 'date-fns';
import './PaymentSummary.css';

const PaymentSummary = ({ babysitter }) => {
  // This would come from props or API in a real app
  const defaultPayments = [
    { id: 1, date: new Date(2023, 5, 15), hours: 8, rate: 15000, total: 120000, status: 'Paid' },
    { id: 2, date: new Date(2023, 5, 22), hours: 6, rate: 15000, total: 90000, status: 'Paid' },
    { id: 3, date: new Date(2023, 6, 1), hours: 10, rate: 15000, total: 150000, status: 'Pending' },
    { id: 4, date: new Date(2023, 6, 8), hours: 8, rate: 15000, total: 120000, status: 'Pending' },
  ];
  
  const [payments, setPayments] = useState(defaultPayments);
  const [dateRange, setDateRange] = useState('all');
  
  // Filter payments based on date range
  const filteredPayments = payments.filter(payment => {
    if (dateRange === 'all') return true;
    
    const today = new Date();
    const paymentDate = new Date(payment.date);
    
    if (dateRange === 'thisMonth') {
      return paymentDate.getMonth() === today.getMonth() && 
             paymentDate.getFullYear() === today.getFullYear();
    }
    
    if (dateRange === 'lastMonth') {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);
      return paymentDate.getMonth() === lastMonth.getMonth() && 
             paymentDate.getFullYear() === lastMonth.getFullYear();
    }
    
    return true;
  });
  
  // Calculate totals
  const totalHours = filteredPayments.reduce((sum, payment) => sum + payment.hours, 0);
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.total, 0);
  const pendingAmount = filteredPayments
    .filter(payment => payment.status === 'Pending')
    .reduce((sum, payment) => sum + payment.total, 0);
  
  // Date range change handler
  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };
  
  // Mark a payment as paid
  const handleMarkAsPaid = (id) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status: 'Paid' } : payment
    ));
  };
  
  return (
    <div className="payment-summary">
      <div className="payment-header">
        <h2 className="payment-title">Payment Summary</h2>
        
        <div className="payment-filter">
          <label htmlFor="dateRange">Period:</label>
          <select 
            id="dateRange" 
            value={dateRange} 
            onChange={handleDateRangeChange}
            className="date-range-select"
          >
            <option value="all">All Time</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>
      </div>
      
      <div className="payment-cards">
        <div className="payment-stat-card">
          <div className="payment-stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="payment-stat-info">
            <span className="payment-stat-label">Total Hours</span>
            <span className="payment-stat-value">{totalHours} hours</span>
          </div>
        </div>
        
        <div className="payment-stat-card">
          <div className="payment-stat-icon">
            <FaMoneyBillWave />
          </div>
          <div className="payment-stat-info">
            <span className="payment-stat-label">Total Amount</span>
            <span className="payment-stat-value">UGX {totalAmount.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="payment-stat-card">
          <div className="payment-stat-icon payment-pending-icon">
            <FaMoneyBillWave />
          </div>
          <div className="payment-stat-info">
            <span className="payment-stat-label">Pending Amount</span>
            <span className="payment-stat-value payment-pending-value">
              UGX {pendingAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="payment-table-container">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Hours</th>
              <th>Rate (UGX)</th>
              <th>Total (UGX)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{format(new Date(payment.date), 'MMM dd, yyyy')}</td>
                  <td>{payment.hours}</td>
                  <td>{payment.rate.toLocaleString()}</td>
                  <td>{payment.total.toLocaleString()}</td>
                  <td>
                    <span className={`payment-status payment-status-${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    {payment.status === 'Pending' ? (
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => handleMarkAsPaid(payment.id)}
                      >
                        Mark as Paid
                      </button>
                    ) : (
                      <button className="btn btn-sm btn-secondary">
                        <FaPrint /> Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-payments">No payments found for the selected period.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentSummary; 