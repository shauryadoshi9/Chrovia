import React, { useState } from "react";
import { Lock, Mail, User, ShieldCheck, ArrowRight, X, Sparkles, CheckCircle2 } from "lucide-react";

export default function AuthModal({ onAuthenticate, onClose }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("analyst@chrovia.internal");
  const [password, setPassword] = useState("••••••••••••");
  const [name, setName] = useState("Aarav Shah");
  const [role, setRole] = useState("Lead Journey Analyst");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthenticate({
      name: mode === "login" ? (email.includes("analyst") ? "Lead Analyst" : "Ops Supervisor") : name,
      email,
      role,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
    });
  };

  const handlePresetLogin = (presetRole, presetName, presetEmail) => {
    onAuthenticate({
      name: presetName,
      email: presetEmail,
      role: presetRole,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-8 max-w-md w-full space-y-6 bg-[#0F172A] border-indigo-500/40 shadow-2xl relative animate-fade-in rounded-2xl">
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <img
            src="/chrovia-logo.jpeg"
            alt="Chrovia Logo"
            className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/70 shadow-lg shadow-indigo-500/30 mx-auto"
          />
          <h2 className="text-xl font-extrabold text-white">
            {mode === "login" ? "Sign In to Chrovia" : "Create Analyst Account"}
          </h2>
          <p className="text-xs text-gray-400">
            Cross-Channel Customer Journey Intelligence Engine
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="grid grid-cols-2 p-1 bg-gray-900 rounded-xl border border-white/10 text-xs font-bold">
          <button
            onClick={() => setMode("login")}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              mode === "login" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-gray-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              mode === "signup" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-gray-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {/* 1-Click Demo Presets */}
        <div className="space-y-2">
          <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">
            ⚡ Quick Demo Access Presets:
          </span>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <button
              onClick={() => handlePresetLogin("Lead Journey Analyst", "Aarav Shah", "aarav@chrovia.internal")}
              className="p-2.5 rounded-lg bg-gray-900/90 hover:bg-gray-800 border border-white/10 hover:border-indigo-500/50 text-left flex items-center justify-between transition-all cursor-pointer group"
            >
              <div>
                <span className="font-bold text-white group-hover:text-indigo-300">Lead Analyst View</span>
                <span className="text-[10px] text-gray-400 block">Identity Graph & Gemini AI Analyst</span>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => handlePresetLogin("Operations Supervisor", "Ananya M.", "ananya.m@chrovia.internal")}
              className="p-2.5 rounded-lg bg-gray-900/90 hover:bg-gray-800 border border-white/10 hover:border-rose-500/50 text-left flex items-center justify-between transition-all cursor-pointer group"
            >
              <div>
                <span className="font-bold text-white group-hover:text-rose-300">Operations Supervisor View</span>
                <span className="text-[10px] text-gray-400 block">SLA Breaches & Escalation Queue</span>
              </div>
              <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === "signup" && (
            <div>
              <label className="text-gray-400 block text-[10px] font-bold uppercase mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-white/20 text-white rounded-lg focus:outline-none focus:border-indigo-500"
                  placeholder="Enter full name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-gray-400 block text-[10px] font-bold uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-white/20 text-white rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="analyst@chrovia.internal"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 block text-[10px] font-bold uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-white/20 text-white rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 block text-[10px] font-bold uppercase mb-1">Platform Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full bg-gray-900 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="Lead Journey Analyst">Lead Journey Analyst</option>
              <option value="Customer Operations Supervisor">Customer Operations Supervisor</option>
              <option value="Platform Administrator">Platform Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer mt-2"
          >
            <span>{mode === "login" ? "Sign In to Dashboard" : "Register & Launch Platform"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
