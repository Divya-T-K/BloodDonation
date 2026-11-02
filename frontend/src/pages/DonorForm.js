import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDonor, getDonorById, updateDonor } from '../services/api';
import Spinner from '../components/Spinner';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const initialForm = {
  name: '', bloodGroup: '', age: '', phone: '',
  email: '', address: '', city: '', lastDonationDate: '', isAvailable: true,
};

const Field = ({ label, name, type = 'text', value, onChange, placeholder, required, min, max }) => (
  <div className="field">
    <label className="label" htmlFor={name}>{label}</label>
    <input id={name} className="input" type={type} name={name} value={value} onChange={onChange}
      placeholder={placeholder} required={required} min={min} max={max} />
  </div>
);

const DonorForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // id present = edit mode
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!id) return;
    const loadDonor = async () => {
      setFetching(true);
      try {
        const donor = await getDonorById(id);
        setFormData({
          name: donor.name || '',
          bloodGroup: donor.bloodGroup || '',
          age: donor.age || '',
          phone: donor.phone || '',
          email: donor.email || '',
          address: donor.address || '',
          city: donor.city || '',
          lastDonationDate: donor.lastDonationDate
            ? new Date(donor.lastDonationDate).toISOString().split('T')[0]
            : '',
          isAvailable: donor.isAvailable,
        });
      } catch (error) {
        toast.error('Failed to load donor data');
        navigate('/donors');
      } finally {
        setFetching(false);
      }
    };
    loadDonor();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await updateDonor(id, formData);
        toast.success('Donor updated successfully');
      } else {
        await addDonor(formData);
        toast.success('Donor added successfully');
      }
      navigate('/donors');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Spinner message="Loading donor..." />;

  return (
    <div className="narrow">
      <div className="page-header">
        <div>
          <div className="eyebrow">{isEditMode ? 'Edit record' : 'New record'}</div>
          <h1 className="page-title">{isEditMode ? 'Edit donor' : 'Add a donor'}</h1>
          <p className="page-sub">
            {isEditMode ? 'Update the donor details below.' : 'Enter the details to register a new blood donor.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card card-pad">
        <div className="form-grid">
          <Field label="Full name *" name="name" value={formData.name} onChange={handleChange} placeholder="Donor's full name" required />
          <div className="field">
            <label className="label" htmlFor="bloodGroup">Blood group *</label>
            <select id="bloodGroup" className="select" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
              <option value="">Select blood group</option>
              {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
          <Field label="Age *" name="age" type="number" value={formData.age} onChange={handleChange} placeholder="18 – 65" min="18" max="65" required />
          <Field label="Phone number *" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 9876543210" required />
          <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Optional" />
          <Field label="City" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Chennai" />
          <Field label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Street address" />
          <Field label="Last donation date" name="lastDonationDate" type="date" value={formData.lastDonationDate} onChange={handleChange} />
        </div>

        <label className="check-row" htmlFor="isAvailable">
          <input type="checkbox" id="isAvailable" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
          Donor is currently available to donate
        </label>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/donors')}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEditMode ? 'Update donor' : 'Add donor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonorForm;
