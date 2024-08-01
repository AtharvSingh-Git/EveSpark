import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Axios from 'axios';
import Modal from './modal'; // Import the Modal component
import Landing from './landingpage';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    role:'user',
  });
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    Axios.defaults.withCredentials = true;

    try {
      const res = await Axios.post('http://localhost:8000/login', loginInfo);
      if (res.data && res.status === 201) {
            // Redirect based on user role
            console.log(res);
            console.log(loginInfo.role);
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            if (loginInfo.role === 'user') {
              window.location.href = '/';
            } else if (loginInfo.role === 'admin') {
              window.location.href = '/admin';
            }
      } else {
        // Show error message if login fails
        setErrorMessage('Incorrect email or password. Please try again.');
        setShowModal(true);
      }
    } catch (err) {
      console.error(err);
      // Show error message if there's an error with the request
      setErrorMessage('Incorrect email or password. Please try again.');
      setShowModal(true);
    }

    setLoginInfo({
      email: '',
      password: '',
      role:'',
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
        <div className="nav login">
          <div className="nav-links">
              <a href="/login" >Login</a>
              <a href="/sign-up" >Sign Up</a>    
          </div>  
        </div>
      <div className='login-container'>
        <form className='login-form' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label>Login as</label>
          <select name='role' className='login-button lgnbtn' onChange={event => setLoginInfo({ ...loginInfo, role: event.target.value })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <input className='login-input' type='email' name='email' placeholder='Email'
            id="email"
            value={loginInfo.email}
            onChange={event => setLoginInfo({ ...loginInfo, email: event.target.value })}
            required />
          <input className='login-input' type='password' name='password' placeholder='Password'
            id="password"
            value={loginInfo.password}
            onChange={event => setLoginInfo({ ...loginInfo, password: event.target.value })}
            required
          />
          <input className='login-button' type='submit' value="Login" />
        <div>
          <p>Don't have an account? <Link to="/sign-up">Create one</Link></p>
        </div>
      </form>
      </div>
      {showModal && <Modal message={errorMessage} onClose={closeModal} className="red-modal" />}
    </div>
  );
}

export default Login;