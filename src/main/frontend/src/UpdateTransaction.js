import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';
import { API_URL } from './config';

/*
Getting data from App.js to update a specific transaction
 */
const UpdateTransaction = () => {
    const { id } = useParams(); // Getting data from url
    const navigate = useNavigate(); // use to redirect to main page App.js

    /*
    Store the values of the form
     */
    const [form, setForm] = useState({
        description: '',
        type: '',
        category: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
    });

    const [categories, setCategories] = useState([]); // Store the values of the categories retrieved
    const [selectedCategoryId, setSelectedCategoryId] = useState(''); // Store the selected value from the form

    useEffect(() => {
        fetchCategories();
        if (id) {
            fetchTransaction(id);
        }
    }, [id]);

    /*
    getting a specific transaction to fill out the transaction form
    Parameter: id
     */
    const fetchTransaction = async (transactionId) => {
        try {
            const response = await fetch(`${API_URL}/api/transactions/${transactionId}`);
            const transaction = await response.json();
            setForm({
                description: transaction.description,
                type: transaction.type,
                category: transaction.category,
                amount: transaction.amount,
                date: new Date(transaction.date).toISOString().split('T')[0]
            });
            setSelectedCategoryId(transaction.category.id);
        } catch (error) {
            console.error('Error fetching transaction:', error);
        }
    };

    /*
    Getting all categories to load the dropdown categories of the form
     */
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/api/categories`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            /*
            Find the category select from the category dropdown. Transaction has associated a Category object.
             */
            const selectedCategory = categories.find(cat => cat.id === parseInt(value));
            setSelectedCategoryId(value);
            setForm({ ...form, [name]: selectedCategory });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTransaction(id, form); // calling the function to update a transaction
        navigate('/');
    };

    /*
    This function send the transaction form converted to json to update a transaction
     */
    const updateTransaction = async (id, form) => {
        try {
            const response = await fetch(`${API_URL}/api/transactions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: form.description,
                    type: form.type,
                    category: form.category,
                    amount: form.amount,
                    date: form.date
                }), // Send the transaction object without the ID
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error updating transaction: ${errorText}`);
            }

            await response.json();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="container">
            <div className="section middle updateTx">
                <h1>Expense Tracker</h1>
                <h3>Update Transaction</h3>
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
                        <select id="category" name="category" value={selectedCategoryId} onChange={handleChange}
                                className="form-select">
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
                    <button type="submit" className="form-button">Save</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTransaction;
