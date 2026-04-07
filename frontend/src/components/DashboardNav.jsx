
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';


function DashboardNav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className='navbar' style={{ justifyContent: 'flex-end' }}>

            <div className="nav-actions">
                <button className="btn-primary" onClick={() => navigate('/AddJob')} >New Application</button>
                <button className="btn-primary" onClick={handleLogout} >Logout</button>
            </div>
        </div>

    )
}

export default DashboardNav