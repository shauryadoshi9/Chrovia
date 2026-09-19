import React from "react";
import { 
  Activity, 
  Sparkles, 
  GitBranch, 
  ShieldAlert, 
  Network, 
  TrendingDown, 
  AlertTriangle, 
  Repeat, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Lock,
  Layers,
  Cpu
} from "lucide-react";

export default function LandingPage({ onLaunchApp, onOpenAuth }) {
  const capabilities = [
    {
      icon: Network,
      title: "Deterministic & Fuzzy Identity Engine",
      desc: "Combines exact email/phone/loyalty matches with Levenshtein fuzzy similarity and temporal context, backed by false-merge safeguards.",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/30"
    },
    {
      icon: GitBranch,
      title: "Cross-Channel Event Stitching",
      desc: "Normalizes raw events from Web, Mobile, Call Center, Store POS, and Chat into unified, session-stitched customer journey timelines.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/30"
    },
    {
      icon: TrendingDown,
      title: "7-Factor Friction Score Solver",
      desc: "Configurable score formula factoring repeat contacts, escalations, SLA breaches, channel hopping, payment errors, and sentiment.",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/30"
    },
    {
      icon: Sparkles,
      title: "Gemini AI Customer Analyst",
      desc: "Conversational RAG assistant grounded in live platform identity graphs and normalized event streams with audit evidence links.",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/30"
    },
    {
      icon: AlertTriangle,
      title: "Escalation & SLA Command Center",
      desc: "Real-time queue tracking supervisor escalations, SLA breach countdowns, and automated mitigation override actions.",
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/30"
    },
    {
      icon: ShieldAlert,
      title: "Predictive Churn Intelligence",
      desc: "Pearson correlation modeling between journey friction signals and customer churn propensity to trigger proactive retention playbooks.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30"
    }
  ];

  const dashboardModules = [
    { name: "Executive Overview", desc: "Real-time KPIs & Channel Metrics", icon: Activity },
    { name: "Customer 360 View", desc: "Identity Graph & Stitched Log", icon: UserCheck },
    { name: "Journey Explorer", desc: "Node Graph & Journey Replay Player", icon: GitBranch },
    { name: "Drop-Off Analysis", desc: "5-Stage Conversion Funnel", icon: TrendingDown },
    { name: "Escalation Center", desc: "Supervisor Incident Queue", icon: AlertTriangle },
    { name: "Repeated Contact", desc: "Channel Hopping & Cost Impact", icon: Repeat },
    { name: "Churn Intelligence", desc: "Risk Radar & Retention Actions", icon: ShieldAlert },
    { name: "AI Journey Analyst", desc: "Gemini Natural Language Queries", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Dynamic Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3">
          <img
            src="/chrovia-logo.jpeg"
            alt="Chrovia Logo"
            className="w-10 h-10 rounded-xl object-cover border-2 border-indigo-500/60 shadow-lg shadow-indigo-500/30"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black text-white tracking-wider">CHROVIA</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PS-4 PLATFORM
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium hidden sm:block">
              Cross-Channel Customer Journey Intelligence Engine
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-200 border border-white/10 text-xs font-bold transition-all cursor-pointer"
          >
            Sign In / Login
          </button>
          
          <button
            onClick={onLaunchApp}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto text-center space-y-8 relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold shadow-sm">
          <Zap className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>One Customer. Every Interaction. One Unified Journey.</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Unify Fragmented Touchpoints Into{" "}
          <span className="text-gradient">Actionable Journey Intelligence</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Chrovia stiches disconnected web clicks, mobile app events, call center logs, store check-ins, and live chats into a unified customer identity graph with real-time friction scoring and AI analytics.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onLaunchApp}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>Launch Platform Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAuth}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gray-900/90 hover:bg-gray-800 text-gray-200 border border-white/15 text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>Analyst Login</span>
          </button>
        </div>

        {/* Hero Image Mockup Container */}
        <div className="pt-8 max-w-5xl mx-auto">
          <div className="glass-panel p-3 bg-gray-900/90 border-indigo-500/30 shadow-2xl rounded-2xl relative overflow-hidden group">
            
            {/* Header bar mock */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/40 rounded-t-xl text-xs text-gray-400 font-mono">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-indigo-300 font-bold">chrovia-platform.internal</span>
              </div>
              <span className="text-emerald-400 font-bold flex items-center space-x-1">
                <span className="pulse-live"></span>
                <span>STITCHING ENGINE ONLINE</span>
              </span>
            </div>

            {/* Dashboard Teaser Grid */}
            <div className="p-6 bg-[#0B0F19] rounded-b-xl grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              
              <div className="p-4 rounded-xl bg-gray-900/90 border border-white/10 space-y-2">
                <span className="text-[10px] text-indigo-400 font-bold uppercase">Stitched Identity Graph</span>
                <h4 className="text-sm font-bold text-white">Aarav Shah (#1001)</h4>
                <p className="text-xs text-gray-400">Linked: Email, Phone, Loyalty ID, iOS Device Fingerprint</p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Match Confidence</span>
                  <span className="font-extrabold text-emerald-400">95% Verified</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-900/90 border border-white/10 space-y-2">
                <span className="text-[10px] text-amber-400 font-bold uppercase">Friction Score Solver</span>
                <h4 className="text-sm font-bold text-amber-400">Score: 84 / 100 (Critical)</h4>
                <p className="text-xs text-gray-400">3 Repeat Contacts, 1 SLA Breach, Mobile Payment Fail #504</p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Churn Risk</span>
                  <span className="badge bg-rose-500/20 text-rose-300">87% CRITICAL</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-900/90 border border-white/10 space-y-2">
                <span className="text-[10px] text-purple-400 font-bold uppercase">AI Grounded RAG</span>
                <h4 className="text-sm font-bold text-purple-300">Gemini Journey Analyst</h4>
                <p className="text-xs text-gray-300 italic">"Why did Customer 1001 escalate?"</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-indigo-300 font-semibold">
                  <span>Grounded in 6 timeline records</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Core Platform Capabilities Grid */}
      <section className="px-6 py-16 bg-gray-950/60 border-t border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Platform Architecture & Intelligence Modules
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
              Engineered according to the PS-4 Cross-Channel Journey Stitching specifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-gray-900/80 border border-white/10 hover:border-indigo-500/40 transition-all space-y-3 glass-panel"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${cap.bg} ${cap.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-white">{cap.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8 Core Dashboard Views Preview Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">8 Core Dashboard Views</h2>
            <p className="text-xs text-gray-400 mt-1">Product-like analyst workspace for real-time journey navigation</p>
          </div>

          <button
            onClick={onLaunchApp}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer shrink-0"
          >
            <span>Open Dashboard Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardModules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div
                key={i}
                onClick={onLaunchApp}
                className="p-4 rounded-xl bg-gray-900/60 border border-white/10 hover:border-indigo-500/50 hover:bg-gray-800/80 transition-all cursor-pointer group space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono text-gray-500">Page {i + 1}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{mod.name}</h4>
                <p className="text-xs text-gray-400">{mod.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-gray-950/80 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center space-x-3">
            <img
              src="/chrovia-logo.jpeg"
              alt="Chrovia Logo"
              className="w-7 h-7 rounded-lg object-cover border border-indigo-500/50"
            />
            <span className="font-extrabold text-white">CHROVIA Intelligence Platform</span>
            <span className="text-gray-600">|</span>
            <span>Academic Year 2026–27</span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={onOpenAuth} className="hover:text-white transition-colors cursor-pointer">
              Sign In
            </button>
            <button onClick={onLaunchApp} className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors cursor-pointer">
              Launch Platform →
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
