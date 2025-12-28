import React from "react";
import { useBudget } from "../context/BudgetContext";
import TransactionForm from "../components/TransactionForm";
import Dashboard from "../components/Dashboard";
import BudgetProgress from "../components/BudgetProgress";

function HomePage() {
    const { showForm, setShowForm } = useBudget();
    
    return (
        <>
            <button className="add-transaction-button" onClick={() => setShowForm(!showForm)}>
                { showForm ? 'Close Form' : 'Add Transaction' }
            </button>
            {showForm && <TransactionForm onCancel={() => setShowForm(false)} />}
            <Dashboard/>
            <BudgetProgress/>
        </>
    );
}

export default HomePage;