import React from "react";
import { Activity, ShieldCheck, Sparkles, PlusCircle, Search, Cpu, LogOut, Sun, Moon, UserPlus } from "lucide-react";

export default function Header({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  onOpenSimulator, 
  onOpenAddCustomer,
  eventsCount,
  userSession,
  onLogout,
  onGoHome,
  theme,
  onToggleTheme
}) {
  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-panel)] px-6 py-3 transition-colors">
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
              <h1 className="text-xl font-black tracking-wider text-[var(--text-main)]">CHROVIA</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-500 border border-indigo-500/30">
                INTELLIGENCE PLATFORM
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-medium hidden sm:block">
              Cross-Channel Customer Journey Intelligence Engine
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-3 flex-1 max-w-xl mx-0 md:mx-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-dim)]" />
            <input
              type="text"
              placeholder="Search customer name, email, phone, session ID or issue ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-[var(--bg-inner)] border border-[var(--border-panel)] rounded-lg text-sm text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold whitespace-nowrap">
            <span className="pulse-live"></span>
            <span>STITCHING ENGINE ONLINE</span>
            <span className="opacity-70">({eventsCount} events)</span>
          </div>
        </div>

        {/* Quick Action Buttons, Theme Switcher & User Profile */}
        <div className="flex items-center space-x-2">
          
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-[var(--bg-inner)] hover:bg-[var(--bg-panel-hover)] border border-[var(--border-panel)] text-[var(--text-main)] transition-all cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Add Customer Button */}
          <button
            onClick={onOpenAddCustomer}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            title="Add New Customer Profile"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">＋ Add Customer</span>
          </button>

          {/* Simulate Event Button */}
          <button
            onClick={onOpenSimulator}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-semibold transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Simulate Event</span>
          </button>

          <button
            onClick={() => setActiveTab("ai_analyst")}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Analyst</span>
          </button>

          {/* User Session Profile Badge */}
          {userSession && (
            <div className="flex items-center space-x-2 pl-2 border-l border-[var(--border-panel)]">
              <img
                src={userSession.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"}
                alt={userSession.name}
                className="w-8 h-8 rounded-full object-cover border border-indigo-500/50"
              />
              <div className="hidden xl:block text-left text-xs">
                <span className="font-extrabold text-[var(--text-main)] block leading-tight">{userSession.name}</span>
                <span className="text-[10px] text-indigo-500 dark:text-indigo-300 block">{userSession.role}</span>
              </div>

              <button
                onClick={onLogout}
                className="p-1.5 text-[var(--text-dim)] hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer ml-1"
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
