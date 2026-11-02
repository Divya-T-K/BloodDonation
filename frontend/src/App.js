import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AppLayout from './components/AppLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Donors from './pages/Donors';
import DonorForm from './pages/DonorForm';
import Requests from './pages/Requests';
import CreateRequest from './pages/CreateRequest';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (share the sidebar layout) */}
          <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/donors/add" element={<DonorForm />} />
            <Route path="/donors/edit/:id" element={<DonorForm />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/requests/create" element={<CreateRequest />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} newestOnTop closeOnClick pauseOnHover theme="colored" />
    </AuthProvider>
  );
}

export default App;
