import { useNavigate } from 'react-router-dom';
import logo from '../assets/Waypointfv.png'

function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className="sidebar">

            <img src={logo} alt="logo" height={36} width={36} style={{ marginBottom: '32px' }} />

            <nav className="sidebar-nav">
                <a href="#" className="sidebar-link active" onClick={() => navigate('/dashboard')}>Board</a>
                <a href="#" className="sidebar-link">Analytics</a>
                <a href="#" className="sidebar-link">Settings</a>
            </nav>
        </div>
    )
}

export default Sidebar;
