// App.jsx
import React from "react";
import Header from "./assets/components/Header"
import { BudgetProvider, useBudget } from "./assets/context/BudgetContext";
import TransactionForm from "./assets/components/TransactionForm";
import Dashboard from "./assets/components/Dashboard";
import BudgetProgress from "./assets/components/BudgetProgress";


function AppContent() {
    const { showForm, setShowForm } = useBudget();
    
    return (
        <>
            <Header/>
            <button className="add-transaction-button" onClick={() => setShowForm(!showForm)}>
                { showForm ? 'Close Form' : 'Add Transaction' }
            </button>
            {showForm && <TransactionForm onCancel={() => setShowForm(false)} />}
            <Dashboard/>
            <BudgetProgress/>
        </>
    );
}

export default function App() {
    return (
        <BudgetProvider>
            <AppContent />
        </BudgetProvider>
    );
}