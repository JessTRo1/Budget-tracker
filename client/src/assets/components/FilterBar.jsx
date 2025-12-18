// FilterBar.jsx
import { useBudget } from '../context/BudgetContext'
import { useState } from 'react'

export default function FilterBar() {
    const { setFilter,  state } = useBudget();
    const { filters, categories } = state;
    
    // Track which submenus are open
    const [openSubmenus, setOpenSubmenus] = useState({
        categories: false,
        type: false,
        dateRange: false
    });

    const handleCategoryClick = (categoryId) => {
        setFilter('category', categoryId);
    };

    const handleTypeClick = (type) => {
        setFilter('type', type);
    };

    const handleDateRangeClick = (dateRange) => {
        setFilter('dateRange', dateRange);
    };
    
    const toggleSubmenu = (submenuName) => {
        setOpenSubmenus(prev => ({
            ...prev,
            [submenuName]: !prev[submenuName]
        }));
    }; 

    return (
        <div className="filterbar__container">
            <nav className="filterbar__nav">
                <ul className="filterbar__list">
                    <li className='filterbar__item'>
                        <span onClick={() => toggleSubmenu('categories')}>
                            Categories {openSubmenus.categories ? '▼' : '▶'}
                        </span>
                        <ul className={`filterbar__sublist ${openSubmenus.categories ? 'show' : ''}`}>
                            <li className={filters.category === 'all' ? 'active' : ''} onClick={() => handleCategoryClick('all')}>All Categories</li>
                            {categories.map((category) => (
                                <li className={filters.category === category ? 'active' : ''} key={category} onClick={handleCategoryClick.bind(null, category)}>
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className='filterbar__item'>
                        <span onClick={() => toggleSubmenu('type')}>
                            Type {openSubmenus.type ? '▼' : '▶'}
                        </span>
                        <ul className={`filterbar__sublist ${openSubmenus.type ? 'show' : ''}`}>
                            <li className={filters.type === 'all' ? 'active' : ''} onClick={handleTypeClick.bind(null, 'all')}>All</li>
                            <li className={filters.type === 'income' ? 'active' : ''} onClick={handleTypeClick.bind(null, 'income')}>Income</li>
                            <li className={filters.type === 'expense' ? 'active' : ''} onClick={handleTypeClick.bind(null, 'expense')}>Expense</li>
                        </ul>
                    </li>
                    <li className='filterbar__item'>
                        <span onClick={() => toggleSubmenu('dateRange')}>
                            Date Range {openSubmenus.dateRange ? '▼' : '▶'}
                        </span>
                        <ul className={`filterbar__sublist ${openSubmenus.dateRange ? 'show' : ''}`}>
                            <li className={filters.dateRange === 'all' ? 'active' : ''} onClick={handleDateRangeClick.bind(null, 'all')}>All Time</li>
                            <li className={filters.dateRange === 'month' ? 'active' : ''} onClick={handleDateRangeClick.bind(null, 'month')}>This Month</li>
                            <li className={filters.dateRange === 'week' ? 'active' : ''} onClick={handleDateRangeClick.bind(null, 'week')}>This Week</li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div >

    )
}