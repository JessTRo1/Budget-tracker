// Dashboard.jsx
import { useBudget } from "../context/BudgetContext"
import TransactionForm from "./TransactionForm"
import { useState } from 'react';
import CategoryAlerts from "./CategoryAlerts";
import FilterBar from "./FilterBar";

export default function Dashboard() {
    const { state, removeTransaction } = useBudget();
    const [updatingId, setUpdatingId] = useState(null);
    
    const handleDelete = (id) => {
        removeTransaction(id);
    }

    // filtering logic
    const filteredTransactions = state.transactions.filter(transaction => {
        const matchesCategory = state.filters.category === 'all' || transaction.category === state.filters.category;
        const matchesType = state.filters.type === 'all' || transaction.type === state.filters.type;

        const matchesDate = (() => {
            if (state.filters.dateRange === 'all') return true;

            const transactionDate = new Date(transaction.date);
            const now = new Date();

            switch (state.filters.dateRange) {
                case 'week': {
                    const weekAgo = new Date(now);
                    weekAgo.setDate(now.getDate() - 7);
                    return transactionDate >= weekAgo;
                }
                case 'month': {
                    const monthAgo = new Date(now);
                    monthAgo.setMonth(now.getMonth() - 1);
                    return transactionDate >= monthAgo;
                }
                default:
                    return true;
            }
        })();

        return matchesCategory && matchesType && matchesDate;
    });

    return (
        <div className="dashboard">
            <h2 className="dashboard__title">Dashboard</h2>
            <div className="dashboard__filterbar">
                <FilterBar />
            </div>

            <div className="dashboard-alerts">
                <CategoryAlerts />
            </div>
            <ul className="dashboard__transactions">
                {filteredTransactions.map((transaction) => (
                    <li key={transaction._id} className="dashboard__transaction">
                        <span className="dashboard__transaction-name">{transaction.name}</span>
                        <span className="dashboard__transaction-amount">{transaction.amount}€</span>
                        <span className="dashboard__transaction-category">{transaction.category}</span>
                        <span className="dashboard__transaction-type" data-type={transaction.type}>{transaction.type}</span>
                        <span className="dashboard__transaction-date">{new Date(transaction.date).toLocaleDateString()}</span>
                        <span className="dashboard__transaction-description">{transaction.description}</span>
                        <div className="dashboard__transaction-actions">
                            <button className="dashboard__transaction-update" onClick={() => setUpdatingId(transaction._id)}>Update</button>
                            {updatingId === transaction._id && (
                                <TransactionForm
                                    transaction={transaction}
                                    onCancel={() => setUpdatingId(null)}
                                />
                            )}
                            <button className="dashboard__transaction-delete" onClick={() => handleDelete(transaction._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}