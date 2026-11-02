import React from 'react';

const Spinner = ({ message = 'Loading...' }) => (
  <div className="spinner-wrap" role="status">
    <div className="spinner"></div>
    <p>{message}</p>
  </div>
);

export default Spinner;
