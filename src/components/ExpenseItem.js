import React, { useContext, useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';
import '../ExpenseItem.css'; // Import CSS file for styling

const ExpenseItem = ({ id, name, cost }) => {
    const { currency, dispatch } = useContext(AppContext);
    const [formattedCost, setFormattedCost] = useState('');

    useEffect(() => {
        // Format cost based on currency
        const formatCost = (cost, currency) => {
            switch (currency) {
                case 'USD':
                    return `$${cost}`;
                case 'GBP':
                    return `£${cost}`;
                case 'EUR':
                    return `€${cost}`;
                case 'INR':
                    return `₹${cost}`;
                default:
                    return `£${cost}`;
            }
        };

        setFormattedCost(formatCost(cost, currency));
    }, [cost, currency]);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: id,
        });
    };

    const increaseAllocation = () => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    };

    const decreaseAllocation = () => {
        const expense = {
            name: name,
            cost: -10, // Decrease the cost by 10
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{formattedCost}</td>
            <td>
                <button className="increase-button" onClick={increaseAllocation}>+</button>
            </td>
            <td>
                <button className="decrease-button" onClick={decreaseAllocation}>-</button>
            </td>
            <td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseItem;
