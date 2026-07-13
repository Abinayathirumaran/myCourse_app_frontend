import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/apiInstance";

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    
    // Safety decode check
    const decoded = token ? jwtDecode(token) : null;
    const userRole = decoded?.role || "user";
    const currentUserId = decoded?.userId || null;

    const [courses, setCourses] = useState([]);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [viewTab, setViewTab] = useState("all"); 
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
    });
    const [editingId, setEditingId] = useState(null);

    // fetch all directory courses
    const fetchCourses = async () => {
        try {
            const response = await api.get("/courses", {
                headers: { authorization: `Bearer ${token}` }
            });
            setCourses(response.data);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

    // fetch logged in student's specific purchases
    const fetchMyPurchasedCourses = async () => {
        try {
            const response = await api.get("/courses/my-purchased/all", {
                headers: { authorization: `Bearer ${token}` }
            });
            setPurchasedCourses(response.data);
        } catch (err) {
            console.error("Error fetching purchased courses:", err);
        }
    };

    const loadDashboardData = () => {
        fetchCourses();
        if (userRole === "user") {
            fetchMyPurchasedCourses();
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
        loadDashboardData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: Number(formData.price)
            };
            await api.post("/courses/create", payload, {
                headers: { authorization: `Bearer ${token}` }
            });
            resetForm();
            loadDashboardData();
            alert("Course created successfully!");
        } catch (err) {
            console.error("Server Error Details:", err.response?.data || err.message);
            alert(`Could not save course: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: Number(formData.price)
            };
            await api.put(`/courses/${editingId}`, payload, {
                headers: { authorization: `Bearer ${token}` }
            });
            setEditingId(null);
            resetForm();
            loadDashboardData();
            alert("Course updated successfully!");
        } catch (err) {
            console.error("Error updating course:", err.response?.data || err);
            alert(`Failed to update course: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleDeleteCourse = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await api.delete(`/courses/${id}`, {
                headers: { authorization: `Bearer ${token}` }
            });
            loadDashboardData();
            alert("Course deleted cleanly.");
        } catch (err) {
            console.error("Error deleting course:", err.response?.data || err);
            alert(`Failed to delete: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleEnrollInCourse = async (courseId) => {
        try {
            const response = await api.post(`/courses/${courseId}/enroll`, {}, {
                headers: { authorization: `Bearer ${token}` }
            });
            alert(response.data.message || "Purchased successfully!");
            loadDashboardData(); // Refresh list to update array status
        } catch (err) {
            console.error("Enrollment error:", err.response?.data || err);
            alert(`Purchase failed: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleEditCourse = (course) => {
        setEditingId(course._id);
        setFormData({
            title: course.title,
            description: course.description,
            price: course.price || "",
        });
    };

    const resetForm = () => {
        setFormData({ title: "", description: "", price: "" });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Determine what array grid to visualize based on current view tab selection
    const visibleCourses = viewTab === "all" ? courses : purchasedCourses;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md px-6 py-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-indigo-600">
                            {userRole === "admin" ? "Course Administration Hub" : "Student Learning Portal"}
                        </h1>
                        <p className="text-sm text-gray-600">Logged in as: <span className="font-semibold">{decoded?.username || "User"}</span> ({userRole})</p>
                    </div>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                        Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-6">
                
                {/* ADMIN  ONLY: Form Controls */}
                {userRole === "admin" && (
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-200">
                        <h2 className="text-2xl font-bold mb-6">{editingId ? "Update Course Details" : "Add New Course"}</h2>
                        <form onSubmit={editingId ? handleUpdateCourse : handleCreateCourse} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Course Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price ($)"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                    min="0"
                                    required
                                />
                            </div>

                            <textarea
                                name="description"
                                placeholder="Course Description Summary..."
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />

                            <div className="flex justify-end gap-3">
                                {editingId && (
                                    <button type="button" onClick={() => { setEditingId(null); resetForm(); }} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition">
                                        Cancel
                                    </button>
                                )}
                                <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                                    {editingId ? "Save Changes" : "Publish Course"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* USER ONLY: Filter Tabs for Dashboard Control */}
                {userRole === "user" && (
                    <div className="flex gap-4 mb-6">
                        <button 
                            onClick={() => setViewTab("all")} 
                            className={`px-5 py-2.5 rounded-lg font-semibold shadow-sm transition ${viewTab === "all" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
                        >
                            All Available Courses
                        </button>
                        <button 
                            onClick={() => setViewTab("purchased")} 
                            className={`px-5 py-2.5 rounded-lg font-semibold shadow-sm transition ${viewTab === "purchased" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
                        >
                            My Purchased Courses ({purchasedCourses.length})
                        </button>
                    </div>
                )}

                <h2 className="text-xl font-bold mb-4 text-gray-800">
                    {userRole === "admin" ? "All Platform Courses" : viewTab === "all" ? "Browse Courses" : "Your Subscriptions"}
                </h2>

                {/* Course Directory Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleCourses.length > 0 ? (
                        visibleCourses.map((course) => {
                            // Check if student user is already in array
                            const isEnrolled = course.studentsEnrolled?.includes(currentUserId);
                            // Verify Admin owner ID matching
                            const isCourseOwner = course.adminId === currentUserId || course.adminId?._id === currentUserId;

                            return (
                                <div key={course._id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between border border-gray-200">
                                    <div>
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-xl font-bold text-gray-800 break-words max-w-[75%]">{course.title}</h3>
                                            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">${course.price}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-3">By: {course.adminId?.username || "Instructor"}</p>
                                        <p className="text-gray-600 text-sm line-clamp-4 mb-6">{course.description}</p>
                                    </div>

                                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                                        {/* admin actions: Show only if current user is admin AND owns this course */}
                                        {userRole === "admin" && (
                                            <>
                                                {isCourseOwner ? (
                                                    <>
                                                        <button onClick={() => handleEditCourse(course)} className="flex-1 bg-amber-400 text-black py-2 rounded-lg font-semibold hover:bg-amber-500 transition text-sm">
                                                            Edit
                                                        </button>
                                                        <button onClick={() => handleDeleteCourse(course._id)} className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition text-sm">
                                                            Delete
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic py-2 text-center w-full bg-gray-50 rounded">Managed by another administrator</span>
                                                )}
                                            </>
                                        )}

                                        {/* user actions: Show purchase workflow option fields */}
                                        {userRole === "user" && (
                                            <button 
                                                disabled={isEnrolled}
                                                onClick={() => handleEnrollInCourse(course._id)} 
                                                className={`w-full py-2.5 rounded-lg font-semibold transition text-sm ${isEnrolled ? "bg-green-100 text-green-700 cursor-not-allowed border border-green-300" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                                            >
                                                {isEnrolled ? "✓ Enrolled" : "Purchase Course"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-200">
                            {userRole === "admin" 
                                ? "No courses found. Add your first course above!" 
                                : viewTab === "all" ? "No courses currently open for enrollment." : "You haven't purchased any courses yet."
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;