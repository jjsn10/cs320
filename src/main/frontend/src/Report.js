import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import './App.css'; // Import the CSS file
import { API_URL } from './config';

const Report = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch(`${API_URL}/api/transactions`)
            .then(response => response.json())
            .then(data => {
                // Separate incomes and expenses
                const incomes = data.filter(transaction => transaction.type === 1);
                const expenses = data.filter(transaction => transaction.type === 2);

                // Process the data to group by category and sum the amounts
                const groupData = (transactions) => {
                    return transactions.reduce((acc, transaction) => {
                        const category = transaction.category.name;
                        if (!acc[category]) {
                            acc[category] = 0;
                        }
                        acc[category] += transaction.amount;
                        return acc;
                    }, {});
                };

                const incomeGroupedData = groupData(incomes);
                const expenseGroupedData = groupData(expenses);

                // Convert the grouped data into an array format suitable for recharts
                const formatChartData = (groupedData) => {
                    return Object.keys(groupedData).map(category => ({
                        name: category,
                        amount: groupedData[category]
                    }));
                };

                setIncomeData(formatChartData(incomeGroupedData));
                setExpenseData(formatChartData(expenseGroupedData));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="container">
            <div className="chart-container section middle">
                <h2>Incomes by Category</h2>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={incomeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#82ca9d">
                        <LabelList dataKey="amount" position="top" />
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container section middle">
                <h2>Expenses by Category</h2>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expenseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8">
                        <LabelList dataKey="amount" position="top" />
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Report;
