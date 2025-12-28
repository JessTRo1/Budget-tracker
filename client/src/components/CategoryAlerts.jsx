// CategoryAlerts.jsx
import { useBudget } from '../context/BudgetContext'

export default function CategoryAlerts() {
    const { state } = useBudget();

    // Add this function inside the component
    const calculateCategorySpent = (category) => {
        return state.transactions
            .filter(txn => txn.category === category && txn.type === 'expense')
            .reduce((sum, txn) => sum + txn.amount, 0);
    };

    return Object.entries(state.limits).map(([category, limit]) => {
        const spent = calculateCategorySpent(category);
        const percentage = (spent / limit) * 100;
        
        if (percentage > 80) {
            return (
                <div key={category} className={`alert ${percentage >= 100 ? 'error' : 'warning'}`}>
                    ⚠️ {category} limit: {spent}€ of {limit}€ ({Math.round(percentage)}%)
                </div>
            );
        }
        return null;
    }).filter(alert => alert !== null);
}