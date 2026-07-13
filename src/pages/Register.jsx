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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", registerData);
            alert("Registration successful! Please login.");
            navigate("/");
        } catch (err) {
            console.error("Registration failed:", err);

            //error msg
            if (err.response && err.response.data) {
                const serverMessage = err.response.data.message || JSON.stringify(err.response.data);

                if (serverMessage.toLowerCase().includes("exist")) {
                    alert("Registration failed: An account with this email already exists.");
                } else {
                    alert(`Registration failed: ${serverMessage}`);
                }
            } else {
                alert("Registration failed: Unable to connect to the server.");
            }
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="hidden lg:flex w-1/2 relative">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                    alt="Learning Portal" className="w-full h-screen object-cover" />

            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Register</h2>
                    {/* 
                    Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block mb-2 font-medium">Username</label>
                            <input type="text" placeholder="Enter your username" value={registerData.username}
                                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Email</label>
                            <input  type="email" placeholder="Enter your email"  value={registerData.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Password</label>
                            <input type="password" placeholder="Enter your password" value={registerData.password}
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Account Type</label>
                            <select
                                value={registerData.role}
                                onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="user"> User</option>
                                <option value="admin">Administrator (Can Create Courses)</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-6 text-gray-600">
                        Already have an account? <Link to="/" className="text-black font-semibold">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;