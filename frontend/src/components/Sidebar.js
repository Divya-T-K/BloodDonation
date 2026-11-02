import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  IconDrop, IconGrid, IconUsers, IconUserPlus,
  IconClipboard, IconPlusCircle, IconLogout,
} from './Icons';

const Sidebar = ({ open, onNavigate }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;
  const initial = (user?.name || '?').charAt(0).toUpperCase();

  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><IconDrop size={22} /></div>
        <div>
          <div className="brand-name">LifeLine</div>
          <div className="brand-tag">Blood Donation</div>
        </div>
      </div>

      <div className="nav-label">Overview</div>
      <nav className="nav" onClick={onNavigate}>
        <NavLink to="/dashboard" className={linkClass}><IconGrid /> Dashboard</NavLink>

        <div className="nav-label">Donors</div>
        <NavLink to="/donors" end className={linkClass}><IconUsers /> All Donors</NavLink>
        <NavLink to="/donors/add" className={linkClass}><IconUserPlus /> Add Donor</NavLink>

        <div className="nav-label">Blood Requests</div>
        <NavLink to="/requests" end className={linkClass}><IconClipboard /> All Requests</NavLink>
        <NavLink to="/requests/create" className={linkClass}><IconPlusCircle /> New Request</NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="avatar">{initial}</div>
          <div>
            <div className="user-name">{user?.name}</div>
            <div className="user-mail">{user?.email}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <IconLogout size={18} /> Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
