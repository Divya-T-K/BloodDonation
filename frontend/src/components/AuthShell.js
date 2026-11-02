import React from 'react';
import { IconDrop, IconCheck } from './Icons';

// Split-screen wrapper shared by Login and Register
const AuthShell = ({ children }) => (
  <div className="auth-page">
    <div className="auth-aside">
      <div className="brand" style={{ padding: 0 }}>
        <div className="brand-mark"><IconDrop size={22} /></div>
        <div>
          <div className="brand-name">LifeLine</div>
          <div className="brand-tag">Blood Donation</div>
        </div>
      </div>

      <div>
        <h2>Connecting donors with the patients who need them.</h2>
        <p>
          One secure workspace to manage your donor registry and respond to
          blood requests in real time.
        </p>
        <div className="auth-points">
          <div className="auth-point"><IconCheck size={18} /> Searchable donor registry by blood group</div>
          <div className="auth-point"><IconCheck size={18} /> Prioritised requests: normal, urgent, critical</div>
          <div className="auth-point"><IconCheck size={18} /> Live dashboard with availability insights</div>
        </div>
      </div>

      <p style={{ fontSize: 13 }}>© {new Date().getFullYear()} LifeLine. Every donation saves lives.</p>
    </div>

    <div className="auth-main">
      <div className="auth-box">{children}</div>
    </div>
  </div>
);

export default AuthShell;
