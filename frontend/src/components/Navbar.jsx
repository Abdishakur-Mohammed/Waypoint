
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../assets/Waypoint.png'


function Navbar() {
    const navigate = useNavigate();
    return (
        <div className='navbar'>
            <img src={logo} alt="logo" height={36} />
            <nav>
                <ul>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">Resources</a></li>
                </ul>
            </nav>
            <div className="nav-actions">
                <button className="btn-login" onClick={() => navigate('/login')}>Sign in</button>
                <button className="btn-primary" onClick={() => navigate('/register')}>Get Started Free</button>
            </div>
        </div>
    )
}

export default Navbar