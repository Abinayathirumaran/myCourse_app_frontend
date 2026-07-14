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
        <div className="min-h-screen flex bg-zinc-950 text-zinc-100">
            {/* Image Section */}
            <div className="hidden lg:flex w-1/2 relative opacity-80 mix-blend-luminosity">
                <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                    alt="Learning Portal"
                    className="w-full h-screen object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950 w-full h-full" />
            </div>

            {/* Form Container */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-xl">
                    <h2 className="text-3xl font-bold text-center mb-8 text-zinc-100">
                        Course Portal <span className="text-emerald-500">Login</span>
                    </h2>
                    
                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-950/50 border border-red-800 text-red-400 rounded-lg text-sm font-semibold">
                            {errorMessage}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block mb-2 font-medium text-zinc-300">Email</label>
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-750 text-zinc-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 placeholder-zinc-600 transition"
                                required 
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-zinc-300">Password</label>
                            <input 
                                type="password"  
                                placeholder="Enter your password" 
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-750 text-zinc-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 placeholder-zinc-600 transition"
                                required  
                            />
                        </div>
                        <button type="submit" className="w-full bg-emerald-600 text-zinc-950 py-3 rounded-lg font-bold hover:bg-emerald-500 transition active:scale-[0.99]">
                            Login
                        </button>
                    </form>
                    
                    <p className="text-center mt-6 text-zinc-400">
                        New here? <Link to="/register" className="text-emerald-400 font-semibold hover:text-emerald-300 transition">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;