// frontend/src/pages/Setting.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNav from '../components/DashboardNav';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';
import '../styles/Setting.css'; // Add this import!

function Setting() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main-content">
                <DashboardNav />

                <div className="settings-container">
                    <h2 className="settings-header">Account Settings</h2>

                    {/* Profile Section */}
                    <div className="settings-card">
                        <h3 className="settings-title">Profile Information</h3>
                        <p className="settings-subtitle">Update your account details and preferences.</p>

                        <div className="settings-form">
                            <input type="text" placeholder="Full Name" className="settings-input" disabled />
                            <input type="email" placeholder="Email Address" className="settings-input" disabled />
                            <button className="settings-save-btn" disabled>Save Changes (Coming Soon)</button>
                        </div>
                    </div>

                    {/* Danger Zone (Logout) */}
                    <div className="danger-zone-card">
                        <h3 className="danger-zone-title">Danger Zone</h3>
                        <p className="settings-subtitle">Securely log out of your JobTrackr account on this device.</p>

                        <button className="logout-btn" onClick={handleLogout}>
                            🚪 Log Out
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Setting;
