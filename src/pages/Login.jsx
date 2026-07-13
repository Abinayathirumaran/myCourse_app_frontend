import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import api from '../api/apiinstance';

const Login = () => {

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        if (errorMessage) setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("auth/login", loginData);

            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/home")
        }
        catch (err) {
            console.error("Login error details:", err.response?.data || err);

            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="hidden lg:flex w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                    alt="Learning Portal"
                    className="w-full h-screen object-cover"
                />
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Course Portal Login</h2>
                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-semibold">
                            {errorMessage}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block mb-2 font-medium">Email</label>
                            <input  type="email" placeholder="Enter your email" value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                required />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Password</label>
                            <input  type="password"  placeholder="Enter your password" value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                required  />
                        </div>
                        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                            Login
                        </button>
                    </form>
                    <p className="text-center mt-6 text-gray-600">
                        New here? <Link to="/register" className="text-black font-semibold">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login