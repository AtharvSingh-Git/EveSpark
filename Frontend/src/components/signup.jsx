import React, { useState } from 'react';
import Axios from 'axios';

const Signup = () => {
    const [SignupInfo, setSignupInfo] = useState({
        name: '',
        reg_num: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user', // Default role is user
    });

    const [passwordError, setPasswordError] = useState('');

    const HandleSubmit = (event) => {
        event.preventDefault();

        // Check if password and confirm password match
        if (SignupInfo.password !== SignupInfo.confirmPassword) {
            setPasswordError('Passwords do not match');
            return; // Stop form submission if passwords don't match
        }

        Axios.post('http://localhost:8000/sign-up', SignupInfo)
            .then(res => {
                console.log(res);
                if (res.data && res.data.status === 'Success') {
                    // Redirect to login page upon successful signup
                    window.location.href = '/login';
                }
            })
            .catch(err => console.error(err));

        // Reset form fields after submission
        setSignupInfo({
            name: '',
            reg_num: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'user', // Reset role to default after submission
        });
    };

    return (
        <div onSubmit={HandleSubmit}>
            <div className="nav login">
                <div className="nav-links">
                    <a href="/login" >Login</a>
                    <a href="/sign-up" >Sign Up</a>    
                </div>  
            </div>
            <div className='login-container'>
                <form className='signup-form' method=''>
                    <h1>Sign Up</h1>
                    <label>Sign up as</label>
                    <select
                        name='role'
                        className='login-button lgnbtn'
                        value={SignupInfo.role}
                        onChange={event => setSignupInfo({ ...SignupInfo, role: event.target.value })}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input
                        className='login-input'
                        type='text'
                        name='user_name'
                        placeholder='Name'
                        id="name"
                        value={SignupInfo.name}
                        onChange={event => setSignupInfo({ ...SignupInfo, name: event.target.value })}
                        required
                    />
                    <input
                        className='login-input'
                        type='email'
                        name='email'
                        placeholder='Email'
                        id="email"
                        value={SignupInfo.email}
                        onChange={event => setSignupInfo({ ...SignupInfo, email: event.target.value })}
                        required
                    />
                    <input
                        className='login-input'
                        type='text'
                        name='reg_num'
                        placeholder='Registration Number'
                        id="reg"
                        value={SignupInfo.reg_num}
                        onChange={event => setSignupInfo({ ...SignupInfo, reg_num: event.target.value })}
                        required
                    />
                    <input
                        className='login-input'
                        type='password'
                        name='password'
                        placeholder='Password'
                        id="password"
                        value={SignupInfo.password}
                        onChange={event => setSignupInfo({ ...SignupInfo, password: event.target.value })}
                        required
                    />
                    <input
                        className='login-input'
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        id='confirmPassword'
                        value={SignupInfo.confirmPassword}
                        onChange={event => setSignupInfo({ ...SignupInfo, confirmPassword: event.target.value })}
                        required
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    <input className='login-button' type='submit' value="Sign Up" />
                </form>
            </div>
        </div>
    );
};

export default Signup;