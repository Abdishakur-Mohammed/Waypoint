// frontend/src/pages/Analytics.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNav from '../components/DashboardNav';
import Sidebar from '../components/Sidebar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../styles/Dashboard.css';

function Analytics() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/applications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) setJobs(data);
        };
        fetchJobs();
    }, []);

    // --- MATHEMATICS ENGINE ---
    const totalJobs = jobs.length;
    const interviewCount = jobs.filter(j => j.status === 'interview').length;
    // Calculate the % of applications that result in an interview (rounded to a whole number)
    const interviewRate = totalJobs > 0 ? Math.round((interviewCount / totalJobs) * 100) : 0;

    const pipelineData = [
        { name: 'Applied', total: jobs.filter(j => j.status === 'applied').length },
        { name: 'Interview', total: interviewCount },
        { name: 'Offer', total: jobs.filter(j => j.status === 'offer').length },
        { name: 'Rejected', total: jobs.filter(j => j.status === 'rejected').length },
    ];

    const locationData = [
        { name: 'Remote', value: jobs.filter(j => j.locationType === 'Remote').length },
        { name: 'On-site', value: jobs.filter(j => j.locationType === 'On-site').length },
        { name: 'Hybrid', value: jobs.filter(j => j.locationType === 'Hybrid').length },
    ].filter(item => item.value > 0);

    // Colors for the donut chart pieces
    const COLORS = ['#4F46E5', '#10B981', '#F59E0B'];

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main-content">
                <DashboardNav />

                <div style={{ padding: '40px' }}>
                    <h2 style={{ marginBottom: '32px' }}>Application Analytics</h2>

                    {/* 1. KPI METRIC CARDS */}
                    <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                        <div style={{ flex: 1, background: '#1A1A2E', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '8px' }}>Total Applications</p>
                            <h3 style={{ fontSize: '36px', color: '#fff', margin: 0 }}>{totalJobs}</h3>
                        </div>

                        <div style={{ flex: 1, background: '#1A1A2E', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '8px' }}>Active Interviews</p>
                            <h3 style={{ fontSize: '36px', color: '#10B981', margin: 0 }}>{interviewCount}</h3>
                        </div>

                        <div style={{ flex: 1, background: '#1A1A2E', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '8px' }}>Interview Rate</p>
                            <h3 style={{ fontSize: '36px', color: '#F59E0B', margin: 0 }}>{interviewRate}%</h3>
                        </div>
                    </div>

                    {/* 2. CHARTS GRID */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

                        {/* Bar Chart (Pipeline) */}
                        <div style={{ background: '#1A1A2E', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', height: '380px' }}>
                            <h4 style={{ marginBottom: '24px', color: '#E2E8F0' }}>Job Pipeline</h4>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={pipelineData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                                    <XAxis dataKey="name" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 13 }} interval={0} />
                                    <YAxis stroke="#94A3B8" allowDecimals={false} tick={{ fill: '#94A3B8', fontSize: 13 }} />
                                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0F0F1A', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
                                    <Bar dataKey="total" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Donut Chart (Location) */}
                        <div style={{ background: '#1A1A2E', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', height: '380px' }}>
                            <h4 style={{ marginBottom: '24px', color: '#E2E8F0' }}>Work Style</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    {/* Using percentages prevents the Donut from drawing outside the box! */}
                                    <Pie data={locationData} cx="50%" cy="50%" innerRadius="50%" outerRadius="70%" paddingAngle={5} dataKey="value">
                                        {locationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#0F0F1A', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
