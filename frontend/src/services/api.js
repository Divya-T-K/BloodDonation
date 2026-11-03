import axios from 'axios';

// Base URL - using proxy from package.json (points to localhost:5000)
const API_BASE = import.meta.env.VITE_API_URL + '/api';

// =====================
// AUTH SERVICES
// =====================
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE}/auth/login`, credentials);
  return response.data;
};

export const getMe = async () => {
  const response = await axios.get(`${API_BASE}/auth/me`);
  return response.data;
};

// =====================
// DONOR SERVICES
// =====================
export const getAllDonors = async (params = {}) => {
  const response = await axios.get(`${API_BASE}/donors`, { params });
  return response.data;
};

export const getDonorById = async (id) => {
  const response = await axios.get(`${API_BASE}/donors/${id}`);
  return response.data;
};

export const addDonor = async (donorData) => {
  const response = await axios.post(`${API_BASE}/donors`, donorData);
  return response.data;
};

export const updateDonor = async (id, donorData) => {
  const response = await axios.put(`${API_BASE}/donors/${id}`, donorData);
  return response.data;
};

export const deleteDonor = async (id) => {
  const response = await axios.delete(`${API_BASE}/donors/${id}`);
  return response.data;
};

// =====================
// REQUEST SERVICES
// =====================
export const getAllRequests = async (params = {}) => {
  const response = await axios.get(`${API_BASE}/requests`, { params });
  return response.data;
};

export const createRequest = async (requestData) => {
  const response = await axios.post(`${API_BASE}/requests`, requestData);
  return response.data;
};

export const acceptRequest = async (id) => {
  const response = await axios.put(`${API_BASE}/requests/${id}/accept`);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_BASE}/requests/stats`);
  return response.data;
};
