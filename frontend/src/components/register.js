import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';    
    if (!aadhar) errors.aadhar = 'Aadhar number is required';    
    if (!phoneNumber) errors.phoneNumber = 'Phonenumber is required';    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    setLoading(true);
    try {
      const response = await axios.post('http://10.151.40.89:5000/api/auth/register', { name, email, password ,aadhaar:aadhar,mobile:phoneNumber});
      setMessage('Registration successful!');
      setLoading(false);
      
    } catch (err) {
      setMessage('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 col-md-6 col-lg-4">
      <h2 className="text-center">Register</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="shadow p-4 rounded border">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label>Aadhar Number</label>
          <input
            type="number"
            className={`form-control ${errors.aadhar ? 'is-invalid' : ''}`}
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            placeholder="Enter your Aadhar number"
          />
          {errors.aadhar && <div className="invalid-feedback">{errors.aadhar}</div>}
        </div>
        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="number"
            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
          {errors.aadhar && <div className="invalid-feedback">{errors.phoneNumber}</div>}
        </div>
        <button type="submit" className="btn btn-success btn-block" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="mt-3 text-center">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
