import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ExpenseTotal = () => {
    const { expenses, currency } = useContext(AppContext);
    const [formattedTotalExpenses, setFormattedTotalExpenses] = useState('');

    useEffect(() => {
        // Calculate total expenses
        const calculatedTotalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

        // Format total expenses based on currency
        const formatTotalExpenses = (totalExpenses, currency) => {
            switch (currency) {
                case 'USD':
                    return `$${totalExpenses}`;
                case 'GBP':
                    return `£${totalExpenses}`;
                case 'EUR':
                    return `€${totalExpenses}`;
                case 'INR':
                    return `₹${totalExpenses}`;
                default:
                    return `£${totalExpenses}`;
            }
        };

        setFormattedTotalExpenses(formatTotalExpenses(calculatedTotalExpenses, currency));
    }, [expenses, currency]);

    return (
        <div className='alert alert-primary'>
            <span>Spent so far: {formattedTotalExpenses}</span>
        </div>
    );
};

export default ExpenseTotal;
