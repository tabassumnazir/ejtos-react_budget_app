// Budget.js

import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, expenses, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [formattedBudget, setFormattedBudget] = useState('');

    useEffect(() => {
        // Format budget based on currency
        const formatBudget = (budget, currency) => {
            switch (currency) {
                case 'USD':
                    return `$`;
                case 'GBP':
                    return `£`;
                case 'EUR':
                    return `€`;
                case 'INR':
                    return `₹`;
                default:
                    return `£`;
            }
        };

        setFormattedBudget(formatBudget(newBudget, currency));
    }, [newBudget, currency]);

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value);
        // Check if the entered value exceeds the upper limit (20000)
        if (value > 20000) {
            alert("The budget cannot exceed £20,000");
            return;
        }
        setNewBudget(value);
    }

    const saveBudget = () => {
        // Calculate total spending
        const totalSpending = expenses.reduce((total, item) => total + item.cost, 0);
        // Check if the new budget is lower than the spending
        if (newBudget < totalSpending) {
            alert("You cannot reduce the budget value lower than the spending.");
            return;
        }
        dispatch({
            type: 'SET_BUDGET',
            payload: newBudget,
        });
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {formattedBudget}</span>
            <input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
            <button onClick={saveBudget}>Save</button>
        </div>
    );
};

export default Budget;
