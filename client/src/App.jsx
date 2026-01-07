import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';
import Layout from './layouts/mainlayout';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { AuthProvider } from './context/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <BudgetProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </BudgetProvider>
        </AuthProvider>
    );
}

