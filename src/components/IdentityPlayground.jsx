import React, { useState } from "react";
import { Network, ShieldAlert } from "lucide-react";
import { evaluateIdentityMatch } from "../engine/identityEngine";

export default function IdentityPlayground() {
  const [recordA, setRecordA] = useState({
    name: "Aarav Shah",
    email: "aarav@example.com",
    phone: "9876543210",
    loyalty_id: "LYT1001",
    device_id: "DEV-8891",
    ip: "192.168.1.45"
  });

  const [recordB, setRecordB] = useState({
    name: "Aarav Shaah",
    email: "aarav@example.com",
    phone: "9876543210",
    loyalty_id: "LYT1001",
    device_id: "DEV-8891",
    ip: "192.168.1.45"
  });

  const evaluation = evaluateIdentityMatch(recordA, recordB);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Header */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Network className="w-4 h-4 text-indigo-500" />
            <span>Hybrid Identity Resolution Engine Testbed</span>
          </div>
          <h2 className="text-xl font-extrabold text-[var(--text-main)]">Identity Matching & Merge Safety Sandbox</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Test deterministic + fuzzy signal confidence scoring and false merge prevention rules per Section 2
          </p>
        </div>
      </div>

      {/* Input Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Record A */}
        <div className="glass-panel p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-indigo-600 dark:text-indigo-300">Identity Signal Record A</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-semibold">Full Name</label>
              <input
                type="text"
                value={recordA.name}
                onChange={e => setRecordA({ ...recordA, name: e.target.value })}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] rounded px-2.5 py-1.5 text-[var(--text-main)] focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-semibold">Email Address</label>
              <input
                type="text"
                value={recordA.email}
                onChange={e => setRecordA({ ...recordA, email: e.target.value })}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] rounded px-2.5 py-1.5 text-[var(--text-main)] focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-semibold">Phone Number</label>
              <input
                type="text"
                value={recordA.phone}
                onChange={e => setRecordA({ ...recordA, phone: e.target.value })}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] rounded px-2.5 py-1.5 text-[var(--text-main)] focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-semibold">Loyalty ID</label>
              <input
                type="text"
                value={recordA.loyalty_id}
                onChange={e => setRecordA({ ...recordA, loyalty_id: e.target.value })}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] rounded px-2.5 py-1.5 text-[var(--text-main)] focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Record B */}
        <div className="glass-panel p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-cyan-600 dark:text-cyan-300">Identity Signal Record B</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-semibold">Full Name (Fuzzy Match Target)</label>
              <input
                type="text"
                value={recordB.name}
                onChange={e => setRecordB({ ...recordB, name: e.target.value })}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] rounded px-2.5 py-1.5 text-[var(--text-main)] focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-semibold">Email Address</label>
              <input
                type="text"
                value={recordB.email}
                onChange={e => setRecordB({ ...recordB, email: e.target.value })}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] rounded px-2.5 py-1.5 text-[var(--text-main)] focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-semibold">Phone Number</label>
              <input
                type="text"
                value={recordB.phone}
                onChange={e => setRecordB({ ...recordB, phone: e.target.value })}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] rounded px-2.5 py-1.5 text-[var(--text-main)] focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-semibold">Loyalty ID</label>
              <input
                type="text"
                value={recordB.loyalty_id}
                onChange={e => setRecordB({ ...recordB, loyalty_id: e.target.value })}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] rounded px-2.5 py-1.5 text-[var(--text-main)] focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Engine Output & Confidence Evaluation Panel */}
      <div className="glass-panel p-6 space-y-6 border-indigo-500/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider block">
              Composite Identity Match Score
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{evaluation.confidence_percentage}%</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                evaluation.decision === "AUTO_MERGE"
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40"
                  : evaluation.decision === "BLOCKED_FALSE_MERGE"
                  ? "bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/40"
                  : "bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40"
              }`}>
                DECISION: {evaluation.decision}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">{evaluation.reason}</p>
          </div>
        </div>

        {/* Signal Breakdown */}
        <div className="space-y-3 pt-4 border-t border-[var(--border-panel)]">
          <h4 className="text-xs font-extrabold text-[var(--text-main)] uppercase tracking-wider">Matching Signal Breakdown</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {evaluation.breakdown.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[var(--bg-inner)] border border-[var(--border-panel)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-main)] font-medium">{item.signal}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold font-mono">{item.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* False Merge Alerts if any */}
        {evaluation.alerts.length > 0 && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 text-xs space-y-1">
            <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>False Merge Prevention Alerts:</span>
            </div>
            <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-0.5 text-[11px]">
              {evaluation.alerts.map((alt, i) => (
                <li key={i}>{alt}</li>
              ))}
            </ul>
          </div>
        )}

      </div>

    </div>
  );
}
