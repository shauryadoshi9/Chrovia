import React from "react";
import { Activity, ShieldCheck, Sparkles, PlusCircle, Search, Cpu, LogOut, Home } from "lucide-react";

export default function Header({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  onOpenSimulator, 
  eventsCount,
  userSession,
  onLogout,
  onGoHome
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/10 px-6 py-3 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Platform Identity with Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onGoHome}>
          <img
            src="/chrovia-logo.jpeg"
            alt="Chrovia Logo"
            className="w-10 h-10 rounded-xl object-cover border-2 border-indigo-500/60 shadow-lg shadow-indigo-500/30"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black tracking-wider text-white">CHROVIA</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PS-4 PLATFORM
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium hidden sm:block">
              Cross-Channel Customer Journey Intelligence Engine
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-3 flex-1 max-w-xl mx-0 md:mx-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customer name, email, phone, session ID or issue ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-gray-900/80 border border-white/10 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold whitespace-nowrap">
            <span className="pulse-live"></span>
            <span>STITCHING ENGINE ONLINE</span>
            <span className="text-emerald-500/70">({eventsCount} events)</span>
          </div>
        </div>

        {/* Quick Action Buttons & User Profile */}
        <div className="flex items-center space-x-2">
          
          <button
            onClick={() => setActiveTab("ai_analyst")}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Journey Analyst</span>
          </button>

          <button
            onClick={onOpenSimulator}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Simulate Event</span>
          </button>

          {/* User Session Profile Badge */}
          {userSession && (
            <div className="flex items-center space-x-2 pl-2 border-l border-white/10">
              <img
                src={userSession.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"}
                alt={userSession.name}
                className="w-8 h-8 rounded-full object-cover border border-indigo-500/50"
              />
              <div className="hidden xl:block text-left text-xs">
                <span className="font-extrabold text-white block leading-tight">{userSession.name}</span>
                <span className="text-[10px] text-indigo-300 block">{userSession.role}</span>
              </div>

              <button
                onClick={onLogout}
                className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer ml-1"
                title="Sign Out / Back to Home"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
