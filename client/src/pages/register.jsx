import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await register(username, email, password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='form-page'>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} className='form-page__container'>
                <label htmlFor='username'>Username:</label>
                <input
                    className='form-page__container-input' 
                    type='text' 
                    id='username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                    placeholder='Enter your username' 
                />
                <br />
                <label htmlFor='email'>Email:</label>
                <input 
                    className='form-page__container-input' 
                    type='email' 
                    id='email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    placeholder='Enter your email' 
                />
                <br />
                <label htmlFor='password'>Password:</label>
                <input 
                    className='form-page__container-input' 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    placeholder="Enter your password" 
                />
                <br />
                <button type='submit' disabled={isLoading} className='form-page__container-button'>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p>Already have an account? <Link className='form-page__container-link' to='/login'>Login here</Link></p>
        </div>
    )
}
