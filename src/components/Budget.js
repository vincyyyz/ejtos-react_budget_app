import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

    const handleBudgetChange = (event) => {
        setNewBudget(event.target.value);
    }

    const handleBudgetBlur = () => {
        const value = parseInt(newBudget, 10);

        if (value > 20000) {
            alert("Budget cannot exceed £20,000");
            setNewBudget(budget);
            return;
        }

        if (value <= totalExpenses) {
            alert("You cannot reduce budget value lower than the spending");
            setNewBudget(budget);
            return;
        }

        dispatch({ type: 'SET_BUDGET', payload: value });
    };

    return (
<div className='alert alert-secondary'>
<span>Budget: {currency}</span>
<input type="number" step="10" value={newBudget} onChange={handleBudgetChange}
                onBlur={handleBudgetBlur}></input>
</div>
    );
};
export default Budget;