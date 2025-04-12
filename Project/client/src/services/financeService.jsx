import api from './api';

/**
 * Service for handling API calls related to finance
 */
const financeService = {
  /**
   * Get financial summary
   * @param {Object} params - Query parameters (startDate, endDate, etc.)
   * @returns {Promise} Promise with financial summary
   */
  getFinancialSummary: async (params = {}) => {
    try {
      const response = await api.get('/finance/summary', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching financial summary:', error);
      throw error;
    }
  },

  /**
   * Get revenue data
   * @param {Object} params - Query parameters (period, month, year, etc.)
   * @returns {Promise} Promise with revenue data
   */
  getRevenueData: async (params = {}) => {
    try {
      const response = await api.get('/finance/revenue', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      throw error;
    }
  },

  /**
   * Get expense data
   * @param {Object} params - Query parameters (period, month, year, etc.)
   * @returns {Promise} Promise with expense data
   */
  getExpenseData: async (params = {}) => {
    try {
      const response = await api.get('/finance/expenses', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching expense data:', error);
      throw error;
    }
  },

  /**
   * Get profit and loss data
   * @param {Object} params - Query parameters (period, month, year, etc.)
   * @returns {Promise} Promise with profit and loss data
   */
  getProfitLossData: async (params = {}) => {
    try {
      const response = await api.get('/finance/profit-loss', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching profit and loss data:', error);
      throw error;
    }
  },

  /**
   * Get all expenses
   * @param {Object} params - Query parameters (page, limit, sortBy, etc.)
   * @returns {Promise} Promise with expenses data
   */
  getAllExpenses: async (params = {}) => {
    try {
      const response = await api.get('/finance/expenses/all', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching all expenses:', error);
      throw error;
    }
  },

  /**
   * Get expense categories
   * @returns {Promise} Promise with expense categories
   */
  getExpenseCategories: async () => {
    try {
      const response = await api.get('/finance/expenses/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching expense categories:', error);
      throw error;
    }
  },

  /**
   * Create a new expense
   * @param {Object} expenseData - Expense data to create
   * @returns {Promise} Promise with created expense
   */
  createExpense: async (expenseData) => {
    try {
      const response = await api.post('/finance/expenses', expenseData);
      return response.data;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  },

  /**
   * Update an expense
   * @param {string} id - Expense ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} Promise with updated expense
   */
  updateExpense: async (id, updateData) => {
    try {
      const response = await api.put(`/finance/expenses/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating expense ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete an expense
   * @param {string} id - Expense ID
   * @returns {Promise} Promise with operation result
   */
  deleteExpense: async (id) => {
    try {
      const response = await api.delete(`/finance/expenses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting expense ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get all income entries
   * @param {Object} params - Query parameters (page, limit, sortBy, etc.)
   * @returns {Promise} Promise with income data
   */
  getAllIncome: async (params = {}) => {
    try {
      const response = await api.get('/finance/income/all', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching all income entries:', error);
      throw error;
    }
  },

  /**
   * Get income categories
   * @returns {Promise} Promise with income categories
   */
  getIncomeCategories: async () => {
    try {
      const response = await api.get('/finance/income/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching income categories:', error);
      throw error;
    }
  },

  /**
   * Create a new income entry
   * @param {Object} incomeData - Income data to create
   * @returns {Promise} Promise with created income entry
   */
  createIncome: async (incomeData) => {
    try {
      const response = await api.post('/finance/income', incomeData);
      return response.data;
    } catch (error) {
      console.error('Error creating income entry:', error);
      throw error;
    }
  },

  /**
   * Update an income entry
   * @param {string} id - Income ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} Promise with updated income entry
   */
  updateIncome: async (id, updateData) => {
    try {
      const response = await api.put(`/finance/income/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating income entry ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete an income entry
   * @param {string} id - Income ID
   * @returns {Promise} Promise with operation result
   */
  deleteIncome: async (id) => {
    try {
      const response = await api.delete(`/finance/income/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting income entry ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get budget data
   * @param {Object} params - Query parameters (month, year, etc.)
   * @returns {Promise} Promise with budget data
   */
  getBudget: async (params = {}) => {
    try {
      const response = await api.get('/finance/budget', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching budget data:', error);
      throw error;
    }
  },

  /**
   * Create or update budget
   * @param {Object} budgetData - Budget data to create or update
   * @returns {Promise} Promise with budget data
   */
  saveBudget: async (budgetData) => {
    try {
      const response = await api.post('/finance/budget', budgetData);
      return response.data;
    } catch (error) {
      console.error('Error saving budget:', error);
      throw error;
    }
  },

  /**
   * Get payment records
   * @param {Object} params - Query parameters (page, limit, status, etc.)
   * @returns {Promise} Promise with payment records
   */
  getPayments: async (params = {}) => {
    try {
      const response = await api.get('/finance/payments', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching payment records:', error);
      throw error;
    }
  },

  /**
   * Create a payment record
   * @param {Object} paymentData - Payment data to create
   * @returns {Promise} Promise with created payment record
   */
  createPayment: async (paymentData) => {
    try {
      const response = await api.post('/finance/payments', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error creating payment record:', error);
      throw error;
    }
  },

  /**
   * Update a payment record
   * @param {string} id - Payment ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} Promise with updated payment record
   */
  updatePayment: async (id, updateData) => {
    try {
      const response = await api.put(`/finance/payments/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating payment record ${id}:`, error);
      throw error;
    }
  },

  /**
   * Generate a financial report
   * @param {string} reportType - Type of report to generate
   * @param {Object} params - Report parameters
   * @returns {Promise} Promise with report data
   */
  generateReport: async (reportType, params = {}) => {
    try {
      const response = await api.get(`/finance/reports/${reportType}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error generating ${reportType} report:`, error);
      throw error;
    }
  },

  /**
   * Export a financial report
   * @param {string} reportType - Type of report to export
   * @param {string} format - Export format (pdf, csv, etc.)
   * @param {Object} params - Report parameters
   * @returns {Promise} Promise with export data
   */
  exportReport: async (reportType, format, params = {}) => {
    try {
      const response = await api.get(`/finance/reports/${reportType}/export/${format}`, {
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error(`Error exporting ${reportType} report:`, error);
      throw error;
    }
  }
};

export default financeService; 