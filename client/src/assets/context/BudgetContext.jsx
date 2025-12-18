// BudgetContext.jsx
import React, { createContext, useEffect, useReducer, useState, useCallback} from 'react';
import BudgetReducer, { initialState } from '../reducers/BudgetReducer';

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [state, dispatch] = useReducer(BudgetReducer, initialState);

    useEffect(() => {
        calculateStats();
    }, [state.transactions]);


    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
        if (storedTransactions) {
            loadTransactions(storedTransactions);
        }
        setIsLoading(false); 
    }, []);

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
        setShowForm(false);
    }

    const removeTransaction = (id) => {
        dispatch({ type: 'REMOVE_TRANSACTION', payload: { id } });
    }

    const updateTransaction = (id, updatedData) => {
        dispatch({ type: 'UPDATE_TRANSACTION', payload: { id, updatedData } });
    }

    const addCategory = (category) => {
        dispatch({ type: 'ADD_CATEGORY', payload: { category } });
    }

    const setBudget = (amount) => {
        dispatch({ type: 'SET_BUDGET', payload: { amount } });
    }

    const setLimit = (category, limit) => {
        dispatch({ type: 'SET_LIMIT', payload: { category, limit } });
    }

    const setFilter = (field, value) => {
        dispatch({ type: 'SET_FILTER', payload: { field, value } });
    }

    const calculateStats = () => {
        dispatch({ type: 'CALCULATE_STATS' });
    }

    const loadTransactions = useCallback((transactions) => {
        dispatch({ type: 'LOAD_TRANSACTIONS', payload: { transactions } });
    }, []);
    
    return (
        <BudgetContext.Provider
            value={{
                state,
                isLoading,
                showForm,
                setShowForm,
                addTransaction,
                removeTransaction,
                updateTransaction,
                addCategory,
                setBudget,
                setLimit,
                setFilter,
                calculateStats,
                loadTransactions
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
}

export const useBudget = () => {
    const context = React.useContext(BudgetContext);
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }
    return context;
}