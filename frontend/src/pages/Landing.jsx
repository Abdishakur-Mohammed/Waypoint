import Navbar from '../components/Navbar';
import '../styles/Landing.css';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <Navbar />

            <main className="hero-section">
                <h1 className="hero-title">
                    Turn Your Job Search Into a<br />
                    Clear, Trackable System
                </h1>

                <p className="hero-subtitle">
                    Organize applications, track progress, and stay in control of every opportunity—<br />
                    all in one simple, powerful dashboard
                </p>

                {/* Here is our Grouping trick again for the buttons! */}
                <div className="hero-actions">
                    <button className="btn-primary btn-large" onClick={() => navigate('/register')}>Get Started Free</button>
                    <button className="btn-outline btn-large">Learn More</button>
                </div>
            </main>
        </div>
    );
}

export default Landing;
