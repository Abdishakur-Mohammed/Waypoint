import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/Auth.css';
import '../styles/AddJob.css'; // INJECT OUR NEW STYLES

function AddJob() {
    const navigate = useNavigate();

    // 1. THE SINGLE STATE OBJECT
    const [formData, setFormData] = useState({
        company_name: '',
        jobTitle: '',
        status: 'applied',
        appliedIn: '',
        locationType: 'Remote',
        salary: '',
        notes: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 2. THE UNIVERSAL SCANNER
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add job");
            }

            // Success! Redirect to dashboard
            navigate('/dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-main add-job-container">

                <div className="auth-card add-job-card">
                    <h2 style={{ marginBottom: '24px' }}>Add New Application</h2>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>

                        <div className="form-row">
                            <div className="form-group form-column">
                                <label>Company Name</label>
                                <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} required />
                            </div>
                            <div className="form-group form-column">
                                <label>Job Title</label>
                                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group form-column">
                                <label>Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="form-extended-input">
                                    <option value="wishlist">Wishlist</option>
                                    <option value="applied">Applied</option>
                                    <option value="interview">Interviewing</option>
                                    <option value="offer">Offer</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>

                            <div className="form-group form-column">
                                <label>Location Type</label>
                                <select name="locationType" value={formData.locationType} onChange={handleChange} className="form-extended-input">
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="On-site">On-site</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group form-column">
                                <label>Where did you apply?</label>
                                <input type="text" name="appliedIn" placeholder="LinkedIn, direct site..." value={formData.appliedIn} onChange={handleChange} required />
                            </div>
                            <div className="form-group form-column">
                                <label>Salary (Optional)</label>
                                <input type="text" name="salary" placeholder="$100k" value={formData.salary} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Notes</label>
                            <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} className="form-extended-input"></textarea>
                        </div>

                        <button type="submit" className="btn-primary auth-btn" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Job Application'}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddJob;
