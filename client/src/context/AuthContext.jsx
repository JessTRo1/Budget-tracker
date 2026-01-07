import { createContext, useState, useContext } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const login = async (emailOrUsername, password) => {
        const data = await apiLogin(emailOrUsername, emailOrUsername, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        setIsAuthenticated(true);
        setUser(data);
        return data;
    }

    const register = async (username, email, password) => {
        const data = await apiRegister(username, email, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        setIsAuthenticated(true);
        setUser(data);
        return data;
    }

    const logout = () => {
        apiLogout();
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}