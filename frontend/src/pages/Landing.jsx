// frontend/src/pages/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css'; // We'll create this next!

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            {/* The Top Navigation Bar */}
            <nav className="landing-nav">
                <div className="landing-logo">JobTrackr.</div>
                <div className="landing-nav-links">
                    <button className="login-btn" onClick={() => navigate('/login')}>Log in</button>
                    <button className="signup-btn" onClick={() => navigate('/register')}>Sign up free</button>
                </div>
            </nav>

            {/* The Main Hero Section */}
            <main className="hero-section">
                <div className="hero-badge">✨ The #1 Tool for Job Seekers</div>
                <h1 className="hero-title">
                    Track your job applications.<br />
                    <span className="hero-highlight">Land your dream role.</span>
                </h1>
                <p className="hero-subtitle">
                    Stop using messy spreadsheets. Organize your job search, track interview stages, and analyze your success rate with our premium Kanban board.
                </p>
                <div className="hero-actions">
                    <button className="primary-btn" onClick={() => navigate('/register')}>Start Tracking Now</button>
                    <button className="secondary-btn" onClick={() => navigate('/login')}>View Live Demo</button>
                </div>
            </main>
            {/* --- NEW: The Features Section --- */}
            <section className="features-section">
                <h2 className="section-title">Everything you need to get hired.</h2>
                <div className="features-grid">

                    <div className="feature-card">
                        <div className="feature-icon">📋</div>
                        <h3>Visual Kanban Board</h3>
                        <p>Drag and drop your applications across stages. See your entire job pipeline at a single glance without messy rows.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Powerful Analytics</h3>
                        <p>Track your interview rates and identify bottlenecks with beautiful, real-time charts powered by Recharts.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure Storage</h3>
                        <p>All your application data is securely encrypted and stored in the cloud. Access your job hunt from anywhere.</p>
                    </div>
                </div>
            </section>

            {/* --- NEW: The Final Call To Action --- */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to take control of your career?</h2>
                    <p>Join developers who are organizing their search and landing offers faster.</p>
                    <button className="primary-btn" onClick={() => navigate('/register')}>Create Your Free Account</button>
                </div>
            </section>



            <footer className="landing-footer">
                <p>© 2026 JobTrackr. Built for developers.</p>
            </footer>
        </div>

    );
}

export default Landing;
