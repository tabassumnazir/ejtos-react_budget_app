// CurrencySelector.js

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../CurrencySelector.css';

const CurrencySelector = () => {
    const { currency, dispatch } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: event.target.value,
        });
    }

    return (
        <div className="currency-selector-container">
            <select id="currency" value={currency} onChange={handleCurrencyChange} className="currency-selector">
                <option value="USD">$ Dollar</option>
                <option value="GBP">£ Pound </option>
                <option value="EUR">€ Euro </option>
                <option value="INR">₹ Rupee </option>
            </select>
        </div>
    );
};

export default CurrencySelector;
