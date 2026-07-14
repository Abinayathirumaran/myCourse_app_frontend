import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/apiInstance";

const Register = () => {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user"
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Consolidated handler that updates the form data and clears errors as you type
    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
        if (errorMessage) setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", registerData);
            setSuccessMessage("Registration successful! Redirecting to login...");
            setErrorMessage("");

            // Wait 2 seconds to show the success banner before moving to the login page
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error("Registration failed:", err);
            setSuccessMessage("");

            if (err.response && err.response.data) {
                const serverMessage = err.response.data.message || JSON.stringify(err.response.data);

                if (serverMessage.toLowerCase().includes("exist")) {
                    setErrorMessage("An account with this email already exists.");
                } else {
                    setErrorMessage(serverMessage);
                }
            } else {
                setErrorMessage("Unable to connect to the server.");
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
                        Create an <span className="text-emerald-500">Account</span>
                    </h2>

                    {/* Error  Notification */}
                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-950/50 border border-red-800 text-red-400 rounded-lg text-sm font-semibold">
                            {errorMessage}
                        </div>
                    )}

                    {/* Success Message Notification */}
                    {successMessage && (
                        <div className="mb-4 p-3 bg-emerald-950/50 border border-emerald-800 text-emerald-400 rounded-lg text-sm font-semibold">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block mb-2 font-medium text-zinc-300">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={registerData.username}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-750 text-zinc-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 placeholder-zinc-600 transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-zinc-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={registerData.email}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-750 text-zinc-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 placeholder-zinc-600 transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-zinc-300">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={registerData.password}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-750 text-zinc-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 placeholder-zinc-600 transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-zinc-300">Account Type</label>
                            <select
                                name="role"
                                value={registerData.role}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-750 text-zinc-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition"
                            >
                                <option value="user" className="bg-zinc-950 text-zinc-100">User / Student</option>
                                <option value="admin" className="bg-zinc-950 text-zinc-100">Administrator (Can Create Courses)</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-emerald-600 text-zinc-950 py-3 rounded-lg font-bold hover:bg-emerald-500 transition active:scale-[0.99]">
                            Register
                        </button>
                    </form>
                    
                    <p className="text-center mt-6 text-zinc-400">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-emerald-400 font-semibold hover:text-emerald-300 bg-transparent border-none p-0 cursor-pointer transition"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;