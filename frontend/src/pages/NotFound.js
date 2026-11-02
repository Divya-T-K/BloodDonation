import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="notfound">
    <div className="code">404</div>
    <h2>Page not found</h2>
    <p>The page you are looking for does not exist or has been moved.</p>
    <Link to="/dashboard" className="btn btn-primary">Back to dashboard</Link>
  </div>
);

export default NotFound;
