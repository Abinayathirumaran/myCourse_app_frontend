import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans flex flex-col justify-between">
            {/* Header */}
            <header className="bg-zinc-900 border-b border-zinc-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo  */}
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-zinc-950 font-bold text-xl shadow-md shadow-emerald-900/20">
                            C
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-100">
                            Course<span className="text-emerald-500">Aura</span>
                        </span>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="text-sm font-semibold bg-emerald-600 text-zinc-950 px-4 py-2 rounded-xl hover:bg-emerald-500 transition-all active:scale-95 text-center font-bold"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </header>

            {/*  Description Section */}
            <main className="flex-grow flex items-center justify-center px-6 py-20">
                <div className="max-w-2xl text-center space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-black text-zinc-100 leading-tight tracking-tight">
                        Step into a Brighter Educational <span className="text-emerald-500">Aura</span>
                    </h1>
                    <p className="text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto">
                        Discover a modern platform designed to make learning immersive, organized, and deeply engaging. Access top-tier courses, track your progress, and build your future.
                    </p>
                    <div className="pt-4 flex items-center justify-center gap-4">
                        <Link
                            to="/register"
                            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 hover:-translate-y-0.5 active:translate-y-0 text-center"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 border-t border-zinc-900 text-center text-xs text-zinc-600">
                © {new Date().getFullYear()} CourseAura. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;