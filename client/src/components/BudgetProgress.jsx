// BudgetProgress.jsx
import { useBudget } from "../context/BudgetContext";



export default function BudgetProgress() {

    const { state } = useBudget();
    const { budget } = state;
    const { totalExpenses } = state.stats

    const percentageUsed = (totalExpenses / budget) * 100;

    return (
        <div className="budget-progress__container">
            <h3>Budget Progress</h3>
            <div className="budget-progress__bar">
                <div className="budget-progress__fill" style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                >

                </div>
                <p>{totalExpenses}€ of {budget}€ used ({Math.round(percentageUsed)}%)</p>
            </div>
        </div>
    )
}