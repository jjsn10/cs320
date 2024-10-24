import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faMoneyBillWave, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
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

  const [balance, setBalance] = useState(0); // New state for balance

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);



  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories'); // Adjust the endpoint as needed
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const createTransaction = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/transactions', {
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
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const updateTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/transactions/${id}`, {
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

  const deleteTransaction = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/transactions/${id}`, {
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

  const calculateBalance = () => {
    const income = transactions.filter(tx => tx.type === 1).reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
    const expense = transactions.filter(tx => tx.type === 2).reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
    const balance = income - expense;
    setBalance(balance.toFixed(2)); // Round to two decimal places
  };

  return (
      <div className="container">
        <div className="section left">
          <h1>Incomes</h1>
          <FontAwesomeIcon icon={faMoneyBillWave} size="4x" style={{ color: 'green' }} />
          <p className="income-amount">$500</p>
        </div>
        <div className="section middle">
          <h1>Expense Tracker</h1>
          <h3>Balance</h3>
          <p className="balance-amount">${balance}</p>
          <table>
            <tbody>
            {transactions.map(tx => (
                <tr key={tx.id}>
                  <td><FontAwesomeIcon icon={tx.type === 1 ? faPlus : faMinus} style={{ color: tx.type === 1 ? 'green' : 'red' }} /></td>
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
              <select id="category" name="category" value={form.category} onChange={handleChange} className="form-select">
                <option value="">Select Category</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount" className="form-label">Amount:</label>
              <input
                  type="text"
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
          <p className="expense-amount">$200</p>
        </div>
      </div>
  );
};

export default App;
