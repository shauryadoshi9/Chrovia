import React from "react";
import { AlertTriangle, Clock, UserCheck, ShieldAlert, CheckCircle, ArrowUpRight } from "lucide-react";

export default function EscalationCenter({ 
  escalations = [], 
  onResolveEscalation, 
  onSelectCustomer, 
  onNavigateTab 
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Header */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>High-Priority Exception Command Center</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Escalation Control Center</h2>
          <p className="text-xs text-gray-400 mt-1">
            Real-time supervisor escalation monitoring, SLA breach alerts, and automated intervention triggers
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
            {escalations.filter(e => e.status !== "RESOLVED").length} Active Escalations
          </span>
        </div>
      </div>

      {/* Escalation Queue Table Card */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>Active Escalation Incident Queue</span>
          </h3>
          <span className="text-xs text-gray-400">Sorted by Severity</span>
        </div>

        <div className="space-y-4">
          {escalations.length === 0 ? (
            <p className="text-xs text-gray-500 italic py-6 text-center">No active escalations in queue.</p>
          ) : (
            escalations.map((esc) => {
              const isResolved = esc.status === "RESOLVED";

              return (
                <div
                  key={esc.escalation_id}
                  className={`p-5 rounded-xl border transition-all space-y-3 ${
                    isResolved
                      ? "bg-gray-900/40 border-white/5 opacity-60"
                      : "bg-gray-900/80 border-rose-500/30 hover:border-rose-500/60 shadow-lg shadow-rose-950/20"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-base font-black text-white">{esc.escalation_id}</span>
                      <span className="text-xs font-mono text-indigo-400">({esc.issue_id})</span>
                      <span className={`badge ${
                        esc.severity === "HIGH" || esc.severity === "CRITICAL"
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      }`}>
                        {esc.severity} SEVERITY
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        <span>Timestamp: {esc.timestamp}</span>
                      </div>
                      <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                        esc.sla_time_left.includes("EXPIRED")
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}>
                        SLA: {esc.sla_time_left}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info & Escalation Reason */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-white/5">
                    <div>
                      <button
                        onClick={() => {
                          onSelectCustomer(esc.customer_id);
                          onNavigateTab("customer360");
                        }}
                        className="text-xs font-extrabold text-indigo-300 hover:underline flex items-center space-x-1"
                      >
                        <span>Customer: {esc.customer_name} (ID: {esc.customer_id})</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <p className="text-xs text-gray-300 mt-1 font-medium">
                        Reason: {esc.reason}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-gray-400 block">Assigned Supervisor</span>
                      <span className="text-xs font-bold text-gray-200">{esc.assigned_to}</span>
                    </div>
                  </div>

                  {/* Quick Mitigation Action Bar */}
                  {!isResolved && (
                    <div className="pt-3 border-t border-white/5 flex items-center justify-end space-x-3">
                      <button
                        onClick={() => onResolveEscalation(esc.escalation_id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Override & Resolve Incident</span>
                      </button>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
