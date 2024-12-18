import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faMoneyBillWave, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { API_URL } from './config';

const App = () => {
  /*
  Form fields and method to update the field after they
  have been initiated with useState('')
  */
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]); // New state for categories
  const [form, setForm] = useState({
    id: '',
    description:'',
    type: '',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0] // Set current date in YYYY-MM-DD format
  });

  /*
  Variable for calculation
  totalExpenses: store the addition of all expenses
  totalIncomes: store the addition of all incomes
  balance: store the value of the subtraction between totalIncomes - totalExpenses
   */
  const [selectedCategoryId, setSelectedCategoryId] = useState(''); // New state for selected category ID
  const [balance, setBalance] = useState(0); // New state for balance
  const [totalExpenses, setTotalExpenses] = useState(0); // New state for total expenses
  const [totalIncomes, setTotalIncomes] = useState(0); // New state for total incomes


  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  useEffect(() => {
    calculateBalance();
    calculateTotalExpenses();
    calculateTotalIncomes();
  }, [transactions]);


/*
Getting all transaction from the backend and returning the result in json format
 */
  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_URL}/api/transactions`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  /*
  Getting all categories in json format to load the category dropdown of the form
 */
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`); // Adjust the endpoint as needed
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  /*
  Create a transaction getting the values from the transaction form.
 */
  const createTransaction = async () => {
    try {
      const response = await fetch(`${API_URL}/api/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setTransactions([...transactions, data]);
      setForm({
        id: '',
        description:'',
        type: '',
        category: '',
        amount: '',
        date: new Date().toISOString().split('T')[0] // Reset to current date
      });
      setSelectedCategoryId(''); // Reset selected category ID
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };
/*
Update transaction getting the data from the transaction form
 */
  const updateTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setTransactions(transactions.map(tx => (tx.id === id ? data : tx)));
      setForm({
        id: '',
        description:'',
        type: '',
        category: '',
        amount: '',
        date: new Date().toISOString().split('T')[0] // Reset to current date
      });
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };
  /*
  Getting the id from the URL to get the transaction to delete.
 */
  const deleteTransaction = async (id) => {
    try {
      await fetch(`${API_URL}/api/transactions/${id}`, {
        method: 'DELETE',
      });
      setTransactions(transactions.filter(tx => tx.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const selectedCategory = categories.find(cat => cat.id === parseInt(value));
      setSelectedCategoryId(value);
      setForm({ ...form, [name]: selectedCategory });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  /*const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };*/


  const handleSubmit = (e) => {
    e.preventDefault();
    form.id ? updateTransaction(form.id) : createTransaction();
  };

  /*
  Method to calculate the balance
  type 1 = Income
  type 2 = Expense
 Getting balance subtracting income - expense
   */
  const calculateBalance = () => {
    const income = transactions.filter(tx => tx.type === 1).reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
    const expense = transactions.filter(tx => tx.type === 2).reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
    const balance = income - expense;
    setBalance(balance.toFixed(2)); // Round to two decimal places
  };

  /*
  Adding of expenses
  Type 2 = expenses
   */
  const calculateTotalExpenses = () => {
    const expense = transactions.filter(tx => tx.type === 2).reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
    setTotalExpenses(expense.toFixed(2)); // Round to two decimal places
  };

/*
Adding of incomes
Type 1 = incomes
 */
  const calculateTotalIncomes = () => {
    const income = transactions.filter(tx => tx.type === 1).reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
    setTotalIncomes(income.toFixed(2)); // Round to two decimal places
  };

  return (
      <div className="container">
        <div className="section left">
          <h1>Incomes</h1>
          <FontAwesomeIcon icon={faMoneyBillWave} size="4x" style={{ color: 'green' }} />
          <p className="income-amount">${totalIncomes}</p>
        </div>
        <div className="section middle">
          <h1>Expense Tracker</h1>
          <h3>Balance</h3>
          <p className="balance-amount">${balance}</p>
          <table>
            <tbody>
            {transactions.map(tx => (
                <tr key={tx.id}>
                  <td>
                    <Link to={`/edit-transaction/${tx.id}`}>
                    <FontAwesomeIcon icon={tx.type === 1 ? faPlus : faMinus} style={{ color: tx.type === 1 ? 'green' : 'red',cursor: 'pointer' }} />
                    </Link>
                    </td>
                  <td>${tx.amount}</td>
                  <td>{tx.description}</td>
                  <td>{new Date(tx.date).toISOString().split('T')[0]}</td>
                  <td><FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} onClick={() => deleteTransaction(tx.id)} /></td>
                </tr>
            ))}
            </tbody>
          </table>
          <form className="form-separation" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description:</label>
              <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="type" className="form-label">Type:</label>
              <select id="type" name="type" value={form.type} onChange={handleChange} className="form-select">
                <option value="">Select Type</option>
                <option value="1">Income</option>
                <option value="2">Expense</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category:</label>
              <select id="category" name="category" value={selectedCategoryId} onChange={handleChange} className="form-select">
                <option value="">Select Category</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount" className="form-label">Amount:</label>
              <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="form-input"
              />
            </div>
            <button type="submit" className="form-button">Add New Item</button>
          </form>
        </div>
        <div className="section right">
          <h1>Expenses</h1>
          <FontAwesomeIcon icon={faCreditCard} size="4x" style={{color: 'red'}}/>
          <p className="expense-amount">${totalExpenses}</p>
        </div>
      </div>
  );
};

export default App;
