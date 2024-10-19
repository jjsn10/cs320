import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faMoneyBillWave,faCreditCard } from '@fortawesome/free-solid-svg-icons';
import './App.css'; // Make sure to create and import the CSS file

const App = () => {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
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
          <p className="balance-amount">$300</p>
          <table>
            <tbody>
            <tr>
              <td><FontAwesomeIcon icon={faPlus} style={{ color: 'green' }} /></td>
              <td>$500</td>
              <td>Salary</td>
              <td>2020-11-16</td>
              <td><FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /></td>
            </tr>
            <tr>
              <td><FontAwesomeIcon icon={faMinus} style={{ color: 'red' }} /></td>
              <td>$75</td>
              <td>Shopping</td>
              <td>2020-11-16</td>
              <td><FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /></td>
            </tr>
            <tr>
              <td><FontAwesomeIcon icon={faMinus} style={{ color: 'red' }} /></td>
              <td>$125</td>
              <td>Car</td>
              <td>2020-11-16</td>
              <td><FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /></td>
            </tr>
            </tbody>
          </table>
          <form className="form-separation">
            <div className="form-group">
              <label htmlFor="type" className="form-label">Type:</label>
              <select id="type" value={type} onChange={handleTypeChange} className="form-select">
                <option value="">Select Type</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category:</label>
              <select id="category" value={category} onChange={handleCategoryChange} className="form-select">
                <option value="">Select Category</option>
                <option value="Salary">Salary</option>
                <option value="Shopping">Shopping</option>
                <option value="Car">Car</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount" className="form-label">Amount:</label>
              <input
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  value={amount}
                  onChange={handleAmountChange}
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
