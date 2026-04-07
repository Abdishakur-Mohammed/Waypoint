// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    // 1. Ask the browser for the VIP Ticket
    const token = localStorage.getItem('token');

    // 2. No ticket? Throw them into the Login hallway.
    if (!token) {
        return <Navigate to="/login" replace />; // 'replace' removes the dashboard from the browser's back button history!
    }

    // 3. They have a ticket! Let them into the room.
    return children;
}

export default ProtectedRoute;
