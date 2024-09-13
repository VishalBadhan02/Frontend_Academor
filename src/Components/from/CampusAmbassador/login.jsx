import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { FaGithub, FaApple, FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import Config from '../../../config';
import toast from 'react-hot-toast';
import MovingLogos from '../../logoFloating/draggableLogos';

const Login = () => {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conformPassword, setconformPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};

        // Check if fields are empty
        if (!fullname) formErrors.fullname = "Full name is required";
        if (!email) formErrors.email = "Email is required";
        if (!password) formErrors.password = "Password is required";
        if (!conformPassword) formErrors.conformPassword = "Confirm Password is required";

        // Check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            formErrors.email = "Email format is invalid";
        }

        // Check if passwords match
        if (password && conformPassword && password !== conformPassword) {
            formErrors.conformPassword = "Passwords do not match";
        }

        return formErrors;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            const data = {
                fullname,
                email,
                password,
                conformPassword
            };

            try {
                const res = await axios.post(`http://${Config['PUBLIC-IP']}:5050/user/registerCA`, data);

                if (res.data.status === true) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong. Please try again later.");
            }
        } else {
            setErrors(formErrors);
        }
    };

    const handleGoogleSuccess = (response) => {
        console.log("Google Login Successful", response);
    };

    const handleGoogleFailure = (error) => {
        console.error("Google Login Failed", error);
    };

    const handleAppleLogin = () => {
        window.location.href = `https://appleid.apple.com/auth/authorize?client_id=YOUR_APPLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=name%20email`;
    };

    const handleGitHubLogin = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user:email`;
    };

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <div className="position-relative col-md-6 mx-auto mt-2">
                <h4 className="text-center mb-4 fw-bold fs-1">Log in</h4>
                <div className="card p-4 shadow-sm">
                    <form className="needs-validation" noValidate>
                        {/* Full Name */}
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">Full name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="text"
                                placeholder="Enter your full name"
                                onKeyUp={(e) => setFullName(e.target.value)}
                                required
                            />
                            {errors.fullname && <small className="text-danger">{errors.fullname}</small>}
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                onKeyUp={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                onKeyUp={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-3">
                            <label htmlFor="conformPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="conformPassword"
                                placeholder="Confirm your password"
                                onKeyUp={(e) => setconformPassword(e.target.value)}
                                required
                            />
                            {errors.conformPassword && <small className="text-danger">{errors.conformPassword}</small>}
                        </div>

                        <button type="submit" onClick={handleRegister} className="btn btn-primary w-100 mb-3">
                            Register
                        </button>

                        <div className="text-center">
                            <p>Or log in with:</p>

                            {/* Google Login */}
                            <button type='button' className='rounded-circle btn'>
                                <i className='pi pi-google fs-2'></i>
                            </button>

                            {/* Apple Login */}
                            <button type="button" className="rounded-circle btn" onClick={handleAppleLogin}>
                                <i className='pi pi-apple fs-2'></i>
                            </button>

                            {/* GitHub Login */}
                            <button type="button" className="rounded-circle btn" onClick={handleGitHubLogin}>
                                <i className='pi pi-github fs-2'></i>
                            </button>
                        </div>
                    </form>
                </div>
                {/* <div className='position-absolute top-0'>
                    <MovingLogos />
                </div> */}

            </div>


        </GoogleOAuthProvider>
    );
};

export default Login;
