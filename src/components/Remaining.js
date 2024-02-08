// Remaining.js

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Remaining = () => {
    const { expenses, budget, currency } = useContext(AppContext);
    const [remaining, setRemaining] = useState(0);
    const [formattedRemaining, setFormattedRemaining] = useState('');

    useEffect(() => {
        // Calculate total expenses
        const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
        // Calculate remaining budget
        const remainingBudget = budget - totalExpenses;

        // Format remaining budget based on currency
        const formatRemaining = (remainingBudget, currency) => {
            switch (currency) {
                case 'USD':
                    return `$${remainingBudget}`;
                case 'GBP':
                    return `£${remainingBudget}`;
                case 'EUR':
                    return `€${remainingBudget}`;
                case 'INR':
                    return `₹${remainingBudget}`;
                default:
                    return `£${remainingBudget}`;
            }
        };

        setRemaining(remainingBudget);
        setFormattedRemaining(formatRemaining(remainingBudget, currency));
    }, [expenses, budget, currency]);

    const alertType = remaining < 0 ? 'alert-danger' : 'alert-success';

    return (
        <div className={`alert ${alertType}`}>
            <span>Remaining: {formattedRemaining}</span>
        </div>
    );
};

export default Remaining;
