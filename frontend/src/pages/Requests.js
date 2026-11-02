import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllRequests, acceptRequest } from '../services/api';
import Spinner from '../components/Spinner';
import { IconPlusCircle, IconInbox, IconHandshake } from '../components/Icons';

const urgencyBadge = { normal: 'badge-blue', urgent: 'badge-amber', critical: 'badge-red' };
const statusBadge = {
  pending: 'badge-amber',
  accepted: 'badge-green',
  fulfilled: 'badge-blue',
  cancelled: 'badge-gray',
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const params = {};
        if (statusFilter) params.status = statusFilter;
        const data = await getAllRequests(params);
        setRequests(data);
      } catch (error) {
        toast.error('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [statusFilter]);

  const handleAccept = async (id) => {
    if (!window.confirm('Accept this blood request?')) return;
    setAccepting(id);
    try {
      const updated = await acceptRequest(id);
      setRequests((prev) => prev.map((r) => (r._id === id ? updated : r)));
      toast.success('Request accepted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to accept request');
    } finally {
      setAccepting(null);
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <div className="eyebrow">Blood requests</div>
          <h1 className="page-title">Requests</h1>
          <p className="page-sub">{requests.length} request{requests.length === 1 ? '' : 's'}</p>
        </div>
        <Link to="/requests/create" className="btn btn-primary"><IconPlusCircle size={18} /> New request</Link>
      </div>

      <div className="card toolbar">
        <label className="label" htmlFor="statusFilter">Status</label>
        <select id="statusFilter" className="select" style={{ width: 200 }} value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <Spinner message="Loading requests..." />
      ) : requests.length === 0 ? (
        <div className="card empty">
          <div className="empty-icon"><IconInbox size={26} /></div>
          <h3>No requests found</h3>
          <p><Link to="/requests/create">Create a blood request</Link> to get started.</p>
        </div>
      ) : (
        <div className="req-grid">
          {requests.map((req) => (
            <div key={req._id} className={`card req-card urgency-${req.urgency}`}>
              <div className="req-head">
                <span className={`badge ${urgencyBadge[req.urgency] || 'badge-gray'}`}>
                  {req.urgency?.toUpperCase()}
                </span>
                <span className={`badge ${statusBadge[req.status] || 'badge-gray'}`}>
                  <span className="dot" /> {req.status?.toUpperCase()}
                </span>
              </div>

              <div className="req-top">
                <div className="req-group">{req.bloodGroup}</div>
                <div>
                  <h3 className="req-patient">{req.patientName}</h3>
                  <div className="req-hospital">{req.hospital}</div>
                </div>
              </div>

              <div className="detail-list">
                <div className="detail"><span>Units needed</span><span>{req.units}</span></div>
                <div className="detail"><span>Contact</span><span>{req.contactNumber}</span></div>
                <div className="detail"><span>Requested by</span><span>{req.requestedBy?.name || 'Unknown'}</span></div>
                <div className="detail"><span>Date</span><span>{formatDate(req.createdAt)}</span></div>
                {req.acceptedBy && <div className="detail"><span>Accepted by</span><span>{req.acceptedBy?.name}</span></div>}
                {req.notes && <div className="detail"><span>Notes</span><span>{req.notes}</span></div>}
              </div>

              {req.status === 'pending' && (
                <div className="req-foot">
                  <button className="btn btn-success btn-block" disabled={accepting === req._id}
                    onClick={() => handleAccept(req._id)}>
                    <IconHandshake size={18} /> {accepting === req._id ? 'Accepting...' : 'Accept request'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Requests;
