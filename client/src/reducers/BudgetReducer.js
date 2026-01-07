// BudgetReducer.js
import { useReducer } from 'react';

const initialState = {
    transactions: [],
    categories: ['Food', 'Transport', 'Leisure', 'Health', 'Others'],
    budget: 1000,
    limits: { Food: 200, Transport: 150, Leisure: 100 },
    filters: { category: 'all', dateRange: 'month', type: 'all' },
    stats: {
        totalExpenses: 0,
        totalIncome: 0,
        balance: 0,
    }
};
export { initialState };

export default function BudgetReducer(state, action) {
    switch (action.type) {
        case 'ADD_TRANSACTION': {
            const { _id, name, amount, category, type, date, description } = action.payload;
            
            if (!name || !amount || !category || !type || !date) {
                throw new Error("All fields are required");
            }

            const newTransaction = {
                _id: _id || Date.now(), // Temporary ID if not provided
                name,
                amount: Number(amount),
                category,
                type,
                date: new Date(date).toISOString(),
                description: description || '',
            }
            
            return {
                ...state,
                transactions: [...state.transactions, newTransaction],
            };
        }
        case 'REMOVE_TRANSACTION': {
            const { id } = action.payload;
            return {
                ...state,
                transactions: state.transactions.filter(txn => txn._id !== id),
            };
        }
        case 'UPDATE_TRANSACTION': {
            const { id, updatedData } = action.payload;
            return {
                ...state,
                transactions: state.transactions.map(txn =>
                    txn._id === id ? { ...txn, ...updatedData } : txn
                ),
            };
        }
        case 'ADD_CATEGORY': {
            const { category } = action.payload;
            if (state.categories.includes(category)) {
                return state; // Prevent duplicate categories
            }
            return {
                ...state,
                categories: [...state.categories, category],
            };
        }
        case 'SET_BUDGET':
            if (action.payload < 0) {
                return state; // Prevent setting a negative budget
            }
            return {
                ...state,
                budget: action.payload,
            };
        case 'SET_LIMIT': {
            const checkLimit = action.payload.limit;
            if (checkLimit < 0) {
                return state; // Prevent setting a negative limit
            }
            return {
                ...state,
                limits: {
                    ...state.limits,
                    [action.payload.category]: action.payload.limit,
                },
            };
        }
        case 'SET_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.field]: action.payload.value,
                },
            };
        case 'CALCULATE_STATS': {
            const totalExpenses = state.transactions
                .filter(txn => txn.type === 'expense')
                .reduce((sum, txn) => sum + txn.amount, 0);
            const totalIncome = state.transactions
                .filter(txn => txn.type === 'income')
                .reduce((sum, txn) => sum + txn.amount, 0);
            return {
                ...state,
                stats: {
                    totalExpenses,
                    totalIncome,
                    balance: totalIncome - totalExpenses,
                },
            };
        }
        case 'LOAD_TRANSACTIONS': {
            const { transactions } = action.payload;
            return {
                ...state,
                transactions: transactions || [],
            };
        }
        default:
            return state;
    };
};

export const useBudgetReducer = () => {
    const [state, dispatch] = useReducer(BudgetReducer, initialState);
    if (!state || !dispatch) {
        throw new Error('useBudgetReducer must be used within a BudgetProvider');
    }
    return { state, dispatch };
};
