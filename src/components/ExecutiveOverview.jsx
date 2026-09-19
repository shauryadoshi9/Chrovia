import React from "react";
import { 
  Activity, 
  Users, 
  AlertTriangle, 
  TrendingDown, 
  ShieldAlert, 
  Repeat, 
  Clock, 
  ChevronRight, 
  Sparkles,
  Zap
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { CHANNEL_METRICS } from "../data/mockData";

export default function ExecutiveOverview({ 
  customers = [], 
  events = [], 
  issues = [], 
  escalations = [],
  onNavigateTab,
  onSelectCustomer
}) {
  const totalEvents = events.length;
  const totalCustomers = customers.length;
  const criticalCustomers = customers.filter(c => c.churn_risk === "CRITICAL" || c.churn_risk === "HIGH");
  const openEscalations = escalations.filter(e => e.status !== "RESOLVED");
  const avgFriction = Math.round(
    customers.reduce((acc, c) => acc + (c.friction_score || 0), 0) / (totalCustomers || 1)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Welcome Banner */}
      <div className="glass-panel p-6 bg-gradient-to-r from-indigo-900/30 via-purple-900/15 to-slate-900/40 border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-500 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span>Real-time Journey Stitching Platform</span>
          </div>
          <h2 className="text-2xl font-black text-[var(--text-main)]">Cross-Channel Customer Journey Intelligence</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1 max-w-2xl">
            Unified cross-channel event normalization, hybrid identity resolution, friction scoring, and Gemini AI analyst grounding.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => onNavigateTab("ai_analyst")}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI Analyst</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Stitched Events */}
        <div className="glass-panel p-4 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] font-medium">Stitched Events</p>
            <h3 className="text-2xl font-black text-[var(--text-main)]">{totalEvents}</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1 mt-0.5">
              <span className="pulse-live"></span>
              <span>100% Normalized</span>
            </p>
          </div>
        </div>

        {/* KPI 2: Active Customer Journeys */}
        <div className="glass-panel p-4 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] font-medium">Active Profiles</p>
            <h3 className="text-2xl font-black text-[var(--text-main)]">{totalCustomers}</h3>
            <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
              {criticalCustomers.length} High Churn Risk
            </p>
          </div>
        </div>

        {/* KPI 3: Platform Friction Score */}
        <div className="glass-panel p-4 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] font-medium">Avg Journey Friction</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400">{avgFriction}</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                Elevated
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-dim)] mt-0.5">Configured 7-Factor Weight</p>
          </div>
        </div>

        {/* KPI 4: Open Escalations */}
        <div className="glass-panel p-4 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 dark:text-rose-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] font-medium">Active Escalations</p>
            <h3 className="text-2xl font-black text-rose-600 dark:text-rose-400">{openEscalations.length}</h3>
            <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
              1 SLA Breach Alert
            </p>
          </div>
        </div>

      </div>

      {/* Main Grid: Live Events & Channel Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (2 cols): Live Event Feed */}
        <div className="lg:col-span-2 glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-[var(--text-main)]">Live Stitched Event Stream</h3>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-medium">Auto-stitching active</span>
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {events.map((evt) => (
              <div
                key={evt.id}
                onClick={() => {
                  onSelectCustomer(evt.customer_id);
                  onNavigateTab("customer360");
                }}
                className="p-3 rounded-lg bg-[var(--bg-inner)] border border-[var(--border-panel)] hover:border-indigo-500/40 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <span className={`badge badge-${evt.channel.toLowerCase()}`}>
                    {evt.channel}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-[var(--text-main)] group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                        {evt.event_type}
                      </span>
                      <span className="text-[10px] text-[var(--text-dim)]">({evt.time_display})</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">{evt.details}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    evt.status === "FAILED" || evt.status === "ESCALATED"
                      ? "bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30"
                      : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                  }`}>
                    {evt.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[var(--text-dim)] group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Channel Distribution */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[var(--text-main)]">Channel Distribution</h3>
            <span className="text-xs text-[var(--text-muted)]">Events Volume</span>
          </div>

          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CHANNEL_METRICS}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="events"
                >
                  {CHANNEL_METRICS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--bg-panel)", borderColor: "var(--border-panel)", borderRadius: "8px", fontSize: "12px", color: "var(--text-main)" }}
                  itemStyle={{ color: "var(--text-main)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {CHANNEL_METRICS.map(m => (
              <div key={m.channel} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-[var(--text-main)] font-medium">{m.channel}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[var(--text-muted)]">{m.events} events</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">{m.friction_avg} friction</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* High Friction Customers Watchlist */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-bold text-[var(--text-main)]">High Friction & Churn Risk Customer Watchlist</h3>
          </div>
          <button 
            onClick={() => onNavigateTab("churn")}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            View Churn Intelligence →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {customers.slice(0, 3).map(customer => (
            <div
              key={customer.id}
              onClick={() => {
                onSelectCustomer(customer.id);
                onNavigateTab("customer360");
              }}
              className="p-4 rounded-xl bg-[var(--bg-inner)] border border-[var(--border-panel)] hover:border-indigo-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-10 h-10 rounded-full object-cover border border-[var(--border-panel)]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[var(--text-main)] group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors truncate">
                    {customer.name}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] truncate">{customer.email}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-panel)] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[var(--text-dim)] block text-[10px]">Friction Score</span>
                  <span className={`font-black text-sm ${customer.friction_score > 70 ? "text-rose-500" : "text-amber-500"}`}>
                    {customer.friction_score} / 100
                  </span>
                </div>

                <div>
                  <span className="text-[var(--text-dim)] block text-[10px]">Churn Risk</span>
                  <span className={`badge ${
                    customer.churn_risk === "CRITICAL"
                      ? "bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/40"
                      : "bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40"
                  }`}>
                    {customer.churn_risk}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
