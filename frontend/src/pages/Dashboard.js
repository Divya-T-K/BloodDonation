import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDashboardStats } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import {
  IconUsers, IconCheck, IconClipboard, IconClock, IconHandshake,
  IconUserPlus, IconPlusCircle,
} from '../components/Icons';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const StatCard = ({ icon, label, value, tone }) => (
  <div className="card stat">
    <div className="stat-top">
      <span className="stat-label">{label}</span>
      <span className={`stat-icon ${tone}`}>{icon}</span>
    </div>
    <div className="stat-value">{value ?? 0}</div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Spinner message="Loading dashboard..." />;

  const groupMap = {};
  (stats?.donorsByBloodGroup || []).forEach((item) => {
    groupMap[item._id] = item.count;
  });
  const maxCount = Math.max(1, ...BLOOD_GROUPS.map((bg) => groupMap[bg] || 0));

  return (
    <>
      <div className="hero">
        <div>
          <h1>Welcome back, {user?.name}</h1>
          <p>Here is a snapshot of your donor registry and blood requests.</p>
        </div>
        <div className="hero-actions">
          <Link to="/donors/add" className="btn btn-primary"><IconUserPlus size={18} /> Add donor</Link>
          <Link to="/requests/create" className="btn btn-ghost"><IconPlusCircle size={18} /> New request</Link>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard label="Total donors" value={stats?.totalDonors} tone="tone-red" icon={<IconUsers size={19} />} />
        <StatCard label="Available donors" value={stats?.availableDonors} tone="tone-green" icon={<IconCheck size={19} />} />
        <StatCard label="Total requests" value={stats?.totalRequests} tone="tone-blue" icon={<IconClipboard size={19} />} />
        <StatCard label="Pending" value={stats?.pendingRequests} tone="tone-amber" icon={<IconClock size={19} />} />
        <StatCard label="Accepted" value={stats?.acceptedRequests} tone="tone-slate" icon={<IconHandshake size={19} />} />
      </div>

      <div className="dash-grid">
        <div className="card card-pad">
          <h3 className="card-title">Donors by blood group</h3>
          <p className="card-sub">Distribution across all registered donors</p>
          <div className="bar-list">
            {BLOOD_GROUPS.map((bg) => {
              const count = groupMap[bg] || 0;
              return (
                <div className="bar-row" key={bg}>
                  <span className="bar-group">{bg}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${(count / maxCount) * 100}%` }} />
                  </div>
                  <span className="bar-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card card-pad">
          <h3 className="card-title">Quick actions</h3>
          <p className="card-sub">Jump straight to common tasks</p>
          <div className="quick-list">
            <Link to="/donors" className="quick-item">
              <span className="quick-icon tone-red"><IconUsers size={19} /></span>
              <div><strong>Browse donors</strong><span>Search and filter the registry</span></div>
            </Link>
            <Link to="/donors/add" className="quick-item">
              <span className="quick-icon tone-green"><IconUserPlus size={19} /></span>
              <div><strong>Register a donor</strong><span>Add a new donor record</span></div>
            </Link>
            <Link to="/requests" className="quick-item">
              <span className="quick-icon tone-blue"><IconClipboard size={19} /></span>
              <div><strong>Review requests</strong><span>Accept pending blood requests</span></div>
            </Link>
            <Link to="/requests/create" className="quick-item">
              <span className="quick-icon tone-amber"><IconPlusCircle size={19} /></span>
              <div><strong>Raise a request</strong><span>Submit a new blood request</span></div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
