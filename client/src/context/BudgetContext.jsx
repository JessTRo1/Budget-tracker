// BudgetContext.jsx
import React, { createContext, useEffect, useReducer, useState, useCallback} from 'react';
import BudgetReducer, { initialState } from '../reducers/BudgetReducer';
import { fetchTransactions, createTransaction as apiCreateTransaction, updateTransaction as apiUpdateTransaction, deleteTransaction as apiDeleteTransaction } from '../services/transactionService';
import { useAuth } from './AuthContext';  

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();  // Check if authenticated
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useReducer(BudgetReducer, initialState);

    // Load transactions from server when authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            setIsLoading(false);
            return;
        }

        const loadTransactionsFromServer = async () => {
            setIsLoading(true);
            try {
                const serverTransactions = await fetchTransactions();
                loadTransactions(serverTransactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
            setIsLoading(false);
        };

        loadTransactionsFromServer();
    }, [isAuthenticated]);  // Reload when authentication changes

    useEffect(() => {
        calculateStats();
    }, [state.transactions]);

    const addTransaction = async (transaction) => {
        try {
            const newTransaction = await apiCreateTransaction(transaction);
            dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
            setShowForm(false);
        } catch (error) {
            console.error('Failed to add transaction:', error);
            throw error;
        }
    }

    const removeTransaction = async (id) => {
        try {
            await apiDeleteTransaction(id);
            dispatch({ type: 'REMOVE_TRANSACTION', payload: { id } });
        } catch (error) {
            console.error('Failed to delete transaction:', error);
            throw error;
        }
    }

    const updateTransaction = async (id, updatedData) => {
        try {
            const updated = await apiUpdateTransaction(id, updatedData);
            dispatch({ type: 'UPDATE_TRANSACTION', payload: { id, updatedData: updated } });
        } catch (error) {
            console.error('Failed to update transaction:', error);
            throw error;
        }
    }

    const addCategory = (category) => {
        dispatch({ type: 'ADD_CATEGORY', payload: { category } });
    }

    const setBudget = (amount) => {
        dispatch({ type: 'SET_BUDGET', payload: amount });
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