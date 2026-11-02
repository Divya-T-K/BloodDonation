import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createRequest } from '../services/api';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const initialForm = {
  patientName: '', bloodGroup: '', units: 1,
  hospital: '', contactNumber: '', urgency: 'normal', notes: '',
};

const Field = ({ label, name, type = 'text', value, onChange, placeholder, required, min }) => (
  <div className="field">
    <label className="label" htmlFor={name}>{label}</label>
    <input id={name} className="input" type={type} name={name} value={value} onChange={onChange}
      placeholder={placeholder} required={required} min={min} />
  </div>
);

const CreateRequest = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createRequest(formData);
      toast.success('Blood request created');
      navigate('/requests');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="narrow">
      <div className="page-header">
        <div>
          <div className="eyebrow">New request</div>
          <h1 className="page-title">Create blood request</h1>
          <p className="page-sub">Provide the patient details so donors can be matched quickly.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card card-pad">
        <div className="form-grid">
          <Field label="Patient name *" name="patientName" value={formData.patientName} onChange={handleChange} placeholder="Full name of patient" required />
          <div className="field">
            <label className="label" htmlFor="bloodGroup">Blood group required *</label>
            <select id="bloodGroup" className="select" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
              <option value="">Select blood group</option>
              {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
          <Field label="Units required *" name="units" type="number" value={formData.units} onChange={handleChange} placeholder="e.g. 2" min="1" required />
          <Field label="Hospital *" name="hospital" value={formData.hospital} onChange={handleChange} placeholder="Hospital name" required />
          <Field label="Contact number *" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Mobile number" required />
          <div className="field">
            <label className="label" htmlFor="urgency">Urgency level</label>
            <select id="urgency" className="select" name="urgency" value={formData.urgency} onChange={handleChange}>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="field" style={{ marginTop: 20 }}>
          <label className="label" htmlFor="notes">Additional notes</label>
          <textarea id="notes" className="textarea" name="notes" value={formData.notes}
            onChange={handleChange} placeholder="Anything donors or staff should know" rows={3} />
        </div>

        {formData.urgency === 'critical' && (
          <div className="notice notice-critical">
            <strong>Critical request.</strong> This will be flagged with the highest priority.
          </div>
        )}
        {formData.urgency === 'urgent' && (
          <div className="notice notice-urgent">
            <strong>Urgent request.</strong> This will be flagged for quick attention.
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/requests')}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
