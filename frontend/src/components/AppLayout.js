import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { IconDrop, IconMenu } from './Icons';

// Authenticated layout: sidebar + content area
const AppLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar open={open} onNavigate={() => setOpen(false)} />
      <div className="main">
        <div className="mobile-bar">
          <div className="brand">
            <div className="brand-mark"><IconDrop size={20} /></div>
            <div className="brand-name">LifeLine</div>
          </div>
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <IconMenu />
          </button>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
