// TransactionForm.jsx
import { useBudget } from "../context/BudgetContext";
import { useEffect, useState } from "react";
import  AddCategoryForm  from "./AddCategoryForm";

export default function TransactionForm({ transaction = null, onCancel }) {
    const isUpdating = !!transaction;
    const { state, addTransaction, setShowForm, updateTransaction } = useBudget();
    const { categories } = state;
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        description: ''
    });

    // Pre-fill form if updating 
    useEffect(() => {
        if (transaction) {
            setFormData({
                name: transaction.name,
                amount: transaction.amount,
                category: transaction.category,
                type: transaction.type,
                date: transaction.date.split('T')[0],
                description: transaction.description
            });
        }
    }, [transaction]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const transactionData = {
            ...formData,
            amount: Number(formData.amount)
        };

        if (isUpdating) {
            updateTransaction(transaction._id, transactionData);
        } else {
            addTransaction(transactionData);
        }

        if (onCancel) {
            onCancel();
        } else {
            setShowForm(false);
        }
    };

    return (
        <div className="transaction-form">
            <button
                type="button"
                className="transaction-form__cancel"
                onClick={() => onCancel ? onCancel() : setShowForm(false)}
            >❌</button>

            <h2 className="transaction-form__title">
                {isUpdating ? 'Update Transaction' : 'Add New Transaction'}
            </h2>
             {showAddCategoryForm && <AddCategoryForm onCancel={() => setShowAddCategoryForm(false)} />}

            <form className="transaction-form__form" onSubmit={handleSubmit}>
                <label htmlFor="name">Transaction Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="amount">Amount (€):</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button 
                type="button" 
                onClick={() => setShowAddCategoryForm(true)}
                className="transaction-form__add-category">
                    + Add Category
                </button>
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>

                <button type="submit" className="transaction-form__submit">
                    {isUpdating ? 'Update Transaction' : 'Add Transaction'}
                </button>
            </form>
        </div>
    );
}