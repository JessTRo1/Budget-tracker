// Header.jsx
import { useBudget } from "../context/BudgetContext"    


export default function Header () {
    const { state, isLoading } = useBudget();
  
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="header">
            <h1 className="header__title">J's Budget Tracker</h1>
            <h2 className="header__title">Your budget at a glance</h2>
            <h3 className="header__title">Current Balance: {state.stats.balance}€ </h3>
        </div>
    )
}