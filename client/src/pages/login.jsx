import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(emailOrUsername, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='emailOrUsername'>Email or Username:</label>
        <input
          type='text'
          id='emailOrUsername'
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required
          placeholder='Enter your email or username'
        />
        <br />
        <label htmlFor='password'>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        <br />
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <Link to='/register'>Register here</Link></p>
    </div>
  )
}
