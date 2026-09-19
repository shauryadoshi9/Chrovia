import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Award, 
  Network, 
  Clock, 
  AlertCircle, 
  Activity, 
  ShieldCheck, 
  ChevronDown,
  Layers,
  Sparkles
} from "lucide-react";
import { calculateJourneyFriction } from "../engine/frictionEngine";

export default function Customer360({ 
  customers = [], 
  selectedCustomerId, 
  onSelectCustomer, 
  events = [], 
  issues = [], 
  escalations = [],
  onNavigateTab
}) {
  const currentCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  // Filter events and issues for this customer
  const customerEvents = events.filter(e => e.customer_id === currentCustomer?.id);
  const customerIssues = issues.filter(i => i.customer_id === currentCustomer?.id);
  const customerEscalations = escalations.filter(e => e.customer_id === currentCustomer?.id);

  // Compute live friction score breakdown for this customer
  const frictionData = calculateJourneyFriction(customerEvents, customerIssues);

  const [activeSubTab, setActiveSubTab] = useState("timeline"); // "timeline" | "identity_graph" | "issues"

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Customer Selector & Profile Header Card */}
      <div className="glass-panel p-6 space-y-6">
        
        {/* Selector Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-extrabold text-white">Unified Customer 360 View</h2>
          </div>

          {/* Customer Dropdown */}
          <div className="relative min-w-[240px]">
            <select
              value={currentCustomer?.id}
              onChange={(e) => onSelectCustomer(e.target.value)}
              className="w-full bg-gray-900 border border-white/20 text-white text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer appearance-none pr-8"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} (ID: {c.id} - {c.churn_risk} Risk)
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Profile Card Summary */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* User Details */}
          <div className="flex items-center space-x-4">
            <img
              src={currentCustomer?.avatar}
              alt={currentCustomer?.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/20"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-extrabold text-white">{currentCustomer?.name}</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {currentCustomer?.tier}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-1">
                <div className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-gray-500" />
                  <span>{currentCustomer?.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-gray-500" />
                  <span>{currentCustomer?.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-gray-300 font-semibold">{currentCustomer?.loyalty_id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scores Badges */}
          <div className="flex items-center space-x-4 shrink-0">
            
            {/* Friction Score Badge */}
            <div className="p-3 rounded-xl bg-gray-900/80 border border-white/10 text-center min-w-[110px]">
              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                Friction Score
              </span>
              <span className={`text-2xl font-black ${frictionData.color}`}>
                {frictionData.score} <span className="text-xs text-gray-500">/ 100</span>
              </span>
              <span className={`block text-[10px] font-bold px-1.5 py-0.5 rounded mt-1 ${frictionData.cssClass}`}>
                {frictionData.band} Band
              </span>
            </div>

            {/* Churn Risk Badge */}
            <div className="p-3 rounded-xl bg-gray-900/80 border border-white/10 text-center min-w-[110px]">
              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                Churn Risk
              </span>
              <span className={`text-2xl font-black ${
                currentCustomer?.churn_risk === "CRITICAL" ? "text-rose-400" : "text-amber-400"
              }`}>
                {currentCustomer?.churn_score}%
              </span>
              <span className={`block text-[10px] font-bold px-1.5 py-0.5 rounded mt-1 ${
                currentCustomer?.churn_risk === "CRITICAL"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}>
                {currentCustomer?.churn_risk}
              </span>
            </div>

          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
          <button
            onClick={() => setActiveSubTab("timeline")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === "timeline"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Stitched Timeline ({customerEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab("identity_graph")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === "identity_graph"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Identity Graph ({currentCustomer?.identities?.length || 0} nodes)</span>
          </button>

          <button
            onClick={() => setActiveSubTab("issues")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === "issues"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Issues & Escalations ({customerIssues.length})</span>
          </button>
        </div>

      </div>

      {/* Sub-Tab 1: Stitched Cross-Channel Timeline */}
      {activeSubTab === "timeline" && (
        <div className="glass-panel p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <span>Stitched Cross-Channel Activity Log</span>
            </h3>
            <span className="text-xs text-gray-400">Chronological Event Sequence</span>
          </div>

          <div className="relative pl-6 space-y-6">
            <div className="timeline-line"></div>

            {customerEvents.length === 0 ? (
              <p className="text-xs text-gray-500 italic py-4">No events found for this customer profile.</p>
            ) : (
              customerEvents.map((evt, idx) => (
                <div key={evt.id} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border-2 border-[#0B0F19] ${
                    evt.status === "FAILED" || evt.status === "ESCALATED" ? "bg-rose-500" : "bg-indigo-500"
                  }`} />

                  <div className="glass-panel p-4 bg-gray-900/80 hover:bg-gray-800/80 transition-all border-white/10 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className={`badge badge-${evt.channel.toLowerCase()}`}>
                          {evt.channel}
                        </span>
                        <span className="text-sm font-bold text-white">{evt.event_type}</span>
                        <span className="text-xs text-gray-400">({evt.time_display})</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          evt.sentiment === "VERY_NEGATIVE" || evt.sentiment === "FRUSTRATED" || evt.sentiment === "NEGATIVE"
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}>
                          Sentiment: {evt.sentiment}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">Session: {evt.session_id}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300">{evt.details}</p>

                    {/* Raw Event Payload preview */}
                    {evt.raw_payload && (
                      <div className="mt-2 p-2 rounded bg-black/40 text-[11px] font-mono text-gray-400 border border-white/5">
                        <span className="text-indigo-400 font-semibold block mb-0.5">Canonical Schema Payload:</span>
                        {JSON.stringify(evt.raw_payload)}
                      </div>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Identity Graph Visualization */}
      {activeSubTab === "identity_graph" && (
        <div className="glass-panel p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Network className="w-5 h-5 text-indigo-400" />
                <span>Resolved Identity Graph Nodes</span>
              </h3>
              <p className="text-xs text-gray-400">
                Deterministic & Fuzzy link trace for customer #{currentCustomer?.id}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab("identity_sandbox")}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Open Resolution Engine Sandbox →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCustomer?.identities?.map((idNode, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-900/80 border border-white/10 hover:border-indigo-500/40 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">{idNode.type}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    idNode.verified ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                  }`}>
                    {idNode.verified ? "Verified Deterministic" : "Probabilistic Signal"}
                  </span>
                </div>

                <p className="text-sm font-extrabold text-white font-mono break-all">{idNode.value}</p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Confidence Weight</span>
                  <span className="font-bold text-emerald-400">{Math.round(idNode.strength * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Issues & Escalation Threads */}
      {activeSubTab === "issues" && (
        <div className="glass-panel p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <span>Active Issue Threads & Escalation History</span>
            </h3>
          </div>

          <div className="space-y-4">
            {customerIssues.length === 0 ? (
              <p className="text-xs text-gray-500 italic py-4">No support issues filed for this customer.</p>
            ) : (
              customerIssues.map(iss => (
                <div key={iss.issue_id} className="p-4 rounded-xl bg-gray-900/80 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-extrabold text-white">{iss.issue_id}</span>
                      <span className="text-xs font-semibold text-indigo-400">({iss.category})</span>
                    </div>

                    <span className={`badge ${
                      iss.status === "UNRESOLVED"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    }`}>
                      {iss.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 font-medium">
                    Root Cause: {iss.root_cause}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-2 border-t border-white/5">
                    <span>Repeated Contacts: <strong className="text-amber-400">{iss.repeat_contact_count}</strong></span>
                    <span>Channel Switch Path: <strong className="text-indigo-300">{iss.channel_path.join(" → ")}</strong></span>
                    <span>SLA Status: <strong className={iss.sla_breached ? "text-rose-400" : "text-emerald-400"}>{iss.resolution_time}</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
