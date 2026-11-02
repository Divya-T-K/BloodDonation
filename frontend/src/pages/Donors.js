import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllDonors, deleteDonor } from '../services/api';
import Spinner from '../components/Spinner';
import { IconSearch, IconUserPlus, IconUsers } from '../components/Icons';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [deleting, setDeleting] = useState(null);

  const loadDonors = useCallback(async (search, bloodGroup) => {
    setLoading(true);
    try {
      const params = {};
      if (bloodGroup) params.bloodGroup = bloodGroup;
      if (search) params.search = search;
      const data = await getAllDonors(params);
      setDonors(data);
    } catch (error) {
      toast.error('Failed to load donors');
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload when the blood group filter changes
  useEffect(() => {
    loadDonors(searchText, bloodGroupFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bloodGroupFilter, loadDonors]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadDonors(searchText, bloodGroupFilter);
  };

  const handleClear = () => {
    setSearchText('');
    setBloodGroupFilter('');
    loadDonors('', '');
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete donor "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteDonor(id);
      toast.success('Donor deleted');
      setDonors((prev) => prev.filter((d) => d._id !== id));
    } catch (error) {
      toast.error('Failed to delete donor');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <div className="eyebrow">Donor registry</div>
          <h1 className="page-title">Donors</h1>
          <p className="page-sub">{donors.length} donor{donors.length === 1 ? '' : 's'} found</p>
        </div>
        <Link to="/donors/add" className="btn btn-primary"><IconUserPlus size={18} /> Add donor</Link>
      </div>

      <form onSubmit={handleSearch} className="card toolbar">
        <div className="search-wrap">
          <IconSearch size={18} />
          <input className="input" type="text" placeholder="Search by name, city or phone"
            value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <select className="select" style={{ width: 190 }} value={bloodGroupFilter}
          onChange={(e) => setBloodGroupFilter(e.target.value)}>
          <option value="">All blood groups</option>
          {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
        </select>
        <button type="submit" className="btn btn-primary">Search</button>
        <button type="button" className="btn btn-ghost" onClick={handleClear}>Reset</button>
      </form>

      <div className="card">
        {loading ? (
          <Spinner message="Loading donors..." />
        ) : donors.length === 0 ? (
          <div className="empty">
            <div className="empty-icon"><IconUsers size={26} /></div>
            <h3>No donors found</h3>
            <p>Try a different search, or <Link to="/donors/add">add a new donor</Link>.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Blood group</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor) => (
                  <tr key={donor._id}>
                    <td>
                      <div className="cell-name">{donor.name}</div>
                      {donor.email && <div className="cell-sub">{donor.email}</div>}
                    </td>
                    <td><span className="badge badge-blood">{donor.bloodGroup}</span></td>
                    <td>{donor.age}</td>
                    <td>{donor.phone}</td>
                    <td>{donor.city || '—'}</td>
                    <td>
                      <span className={`badge ${donor.isAvailable ? 'badge-green' : 'badge-gray'}`}>
                        <span className="dot" /> {donor.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions" style={{ justifyContent: 'flex-end' }}>
                        <Link to={`/donors/edit/${donor._id}`} className="btn btn-ghost btn-sm">Edit</Link>
                        <button className="btn btn-danger-ghost btn-sm" disabled={deleting === donor._id}
                          onClick={() => handleDelete(donor._id, donor.name)}>
                          {deleting === donor._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Donors;
