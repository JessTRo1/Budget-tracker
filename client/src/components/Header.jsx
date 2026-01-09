// Header.jsx
import { useBudget } from "../context/BudgetContext"
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faSun, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faMoon, faSun, faRightFromBracket);

export default function Header() {
    const { state, isLoading } = useBudget();
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuOpen]);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/login');
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="header">
            <div className="header_menu" ref={menuRef}>
                <button 
                    className={`header_menu-button ${menuOpen ? "active" : ""}`} 
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className="header_menu-ham"></span>
                    <span className="header_menu-ham"></span>
                    <span className="header_menu-ham"></span>
                </button>
                
                {menuOpen && <div className="header_menu_overlay" onClick={() => setMenuOpen(false)}></div>}
                
                <nav className={`header_menu_items ${menuOpen ? "active" : ""}`}>
                    <Link to="/" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    
                    {/* Show login/register only if NOT logged in */}
                    {!isAuthenticated && (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                        </>
                    )}
                    
                    {/* Show logout only if logged in */}
                    {isAuthenticated && (
                        <button 
                            className="header_menu-logout"
                            onClick={handleLogout}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </button>
                    )}
                    
                    <button 
                        className={`header_menu-theme ${isDarkMode ? "sun-mode" : "moon-mode"}`}
                        onClick={() => setIsDarkMode(!isDarkMode)} 
                        aria-label="Toggle dark mode"
                    >
                        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                    </button>
                </nav>
            </div>

            <h1 className="header__title">Budget Tracker</h1>
            <h2 className="header__title">Your budget at a glance</h2>
            <h3 className="header__title">Current Balance: {state.stats.balance}€ </h3>
        </div>
    )
}