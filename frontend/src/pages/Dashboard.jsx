import { useState, useEffect } from 'react';


import DashboardNav from "../components/DashboardNav";
import Sidebar from "../components/Sidebar"; // IMPORT THE SIDEBAR
import '../styles/Dashboard.css';

function Dashboard() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // 1. Get the ticket from the browser memory
                const token = localStorage.getItem('token');

                // 2. Knock on the backend door, but attach the ticket in the "Headers"
                const response = await fetch('http://localhost:5000/api/applications', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}` // THIS IS THE VIP PASS!
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setJobs(data); // Save the database jobs into our React memory!
                }

            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs(); // Fire the function instantly!
    }, []); // The empty brackets [] mean "Only run this one single time when the page loads"

    // 1. Picking up the cargo
    const handleDragStart = (e, jobId) => {
        e.dataTransfer.setData('jobId', jobId); // Save the ID in the browser's drag memory!
    };

    // 2. Dropping the cargo
    const handleDrop = async (e, newStatus) => {
        e.preventDefault();
        const jobId = e.dataTransfer.getData('jobId'); // Retrieve the ID

        // Find the full job object in our React memory
        const jobToUpdate = jobs.find(job => job._id === jobId);
        if (!jobToUpdate || jobToUpdate.status === newStatus) return;

        // Immediately update the UI so it feels lightning fast (Optimistic UI update)
        setJobs(jobs.map(job => job._id === jobId ? { ...job, status: newStatus } : job));

        try {
            const token = localStorage.getItem('token');

            // Send the FULL job object back to the server, but with the new status
            await fetch(`http://localhost:5000/api/applications/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...jobToUpdate, status: newStatus })
            });

        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    // Deleting the cargo
    const handleDelete = async (e, jobId) => {
        // e.stopPropagation() prevents the browser from accidentally triggering a drag when we just wanted to click the trash button!
        e.stopPropagation();

        if (!window.confirm("Are you sure you want to delete this application?")) return;

        // 1. Instantly remove it from the UI
        setJobs(jobs.filter(job => job._id !== jobId));

        // 2. Tell the backend to delete it forever
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5000/api/applications/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Failed to delete job", error);
        }
    };


    return (
        /* The giant Flexbox wrapper */
        <div className="dashboard-layout">

            {/* The Left Side */}
            <Sidebar />

            {/* The Right Side */}
            <div className="dashboard-main">
                <DashboardNav />

                <div className="dashboard-board">

                    {/* Column 1 */}
                    <div className="kanban-column">
                        <div className="kanban-column-header">Applied ({jobs.filter(job => job.status === 'applied').length})</div>
                        <div className="kanban-column-content" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'applied')}>

                            {/* THIS IS THE ASSEMBLY MACHINE */}

                            {jobs.filter(job => job.status === 'applied').map(job => (
                                <div className="job-card" key={job._id} draggable={true} onDragStart={(e) => handleDragStart(e, job._id)}>
                                    <h3>{job.jobTitle}</h3>
                                    <p style={{ color: 'gray', fontSize: '14px', marginTop: '4px' }}>{job.company_name} - {job.locationType}</p>
                                    <button onClick={(e) => handleDelete(e, job._id)} style={{ marginTop: '10px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>🗑️ Delete</button>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="kanban-column">
                        <div className="kanban-column-header">interview ({jobs.filter(job => job.status === 'interview').length})</div>
                        <div className="kanban-column-content" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'interview')}>

                            {/* THIS IS THE ASSEMBLY MACHINE */}
                            {jobs.filter(job => job.status === 'interview').map(job => (
                                <div className="job-card" key={job._id} draggable={true} onDragStart={(e) => handleDragStart(e, job._id)}>
                                    <h3>{job.jobTitle}</h3>
                                    <p style={{ color: 'gray', fontSize: '14px', marginTop: '4px' }}>{job.company_name} - {job.locationType}</p>
                                    <button onClick={(e) => handleDelete(e, job._id)} style={{ marginTop: '10px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>🗑️ Delete</button>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="kanban-column">
                        <div className="kanban-column-header">offer ({jobs.filter(job => job.status === 'offer').length})</div>
                        <div className="kanban-column-content" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'offer')}>

                            {/* THIS IS THE ASSEMBLY MACHINE */}
                            {jobs.filter(job => job.status === 'offer').map(job => (
                                <div className="job-card" key={job._id} draggable={true} onDragStart={(e) => handleDragStart(e, job._id)}>
                                    <h3>{job.jobTitle}</h3>
                                    <p style={{ color: 'gray', fontSize: '14px', marginTop: '4px' }}>{job.company_name} - {job.locationType}</p>
                                    <button onClick={(e) => handleDelete(e, job._id)} style={{ marginTop: '10px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>🗑️ Delete</button>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Column 4 */}
                    <div className="kanban-column">
                        <div className="kanban-column-header">rejected ({jobs.filter(job => job.status === 'rejected').length})</div>
                        <div className="kanban-column-content" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'rejected')}>

                            {/* THIS IS THE ASSEMBLY MACHINE */}
                            {jobs.filter(job => job.status === 'rejected').map(job => (
                                <div className="job-card" key={job._id} draggable={true} onDragStart={(e) => handleDragStart(e, job._id)}>
                                    <h3>{job.jobTitle}</h3>
                                    <p style={{ color: 'gray', fontSize: '14px', marginTop: '4px' }}>{job.company_name} - {job.locationType}</p>
                                    <button onClick={(e) => handleDelete(e, job._id)} style={{ marginTop: '10px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>🗑️ Delete</button>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Dashboard;