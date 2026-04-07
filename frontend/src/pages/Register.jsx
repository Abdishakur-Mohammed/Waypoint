
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Auth.css';

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            console.log("registeration Success!", data);

            navigate('/login');

        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }


    };

    return (
        <div className="landing-page">
            <Navbar />

            <div className="auth-container">
                <div className="auth-card">
                    <h2>Welcome </h2>

                    {error && <div className="error-message">{error}</div>}


                    {/* 3. ATTACH YOUR SUBMIT HANDLER TO THIS FORM */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn-primary auth-btn" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Register;
