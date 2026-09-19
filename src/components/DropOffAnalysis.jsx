import React from "react";
import { TrendingDown, AlertTriangle, Layers, XCircle } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { DROP_OFF_STEPS } from "../data/mockData";

export default function DropOffAnalysis({ onNavigateTab }) {
  const dropOffCauses = [
    { cause: "Payment Gateway Error #504", percentage: 42, impact: "Critical", lossCount: 231 },
    { cause: "Unexpected Shipping Fee at Checkout", percentage: 28, impact: "High", lossCount: 154 },
    { cause: "Long Call Center Wait (> 5 mins)", percentage: 18, impact: "Medium", lossCount: 99 },
    { cause: "Store POS Sync Offline", percentage: 12, impact: "Low", lossCount: 66 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Header */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingDown className="w-4 h-4 text-indigo-500" />
            <span>Journey Abandonment Intelligence</span>
          </div>
          <h2 className="text-xl font-extrabold text-[var(--text-main)]">Cross-Channel Drop-Off Analysis</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Funnel conversion tracking, stage-by-stage drop rates, and root cause friction identification
          </p>
        </div>
      </div>

      {/* Funnel Stage Visualization Grid */}
      <div className="glass-panel p-6 space-y-6">
        <h3 className="text-base font-extrabold text-[var(--text-main)] flex items-center space-x-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          <span>E-Commerce & Support Conversion Funnel</span>
        </h3>

        <div className="space-y-4">
          {DROP_OFF_STEPS.map((step, idx) => {
            const dropCount = idx > 0 ? DROP_OFF_STEPS[idx - 1].count - step.count : 0;

            return (
              <div key={step.step} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-[11px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-[var(--text-main)] text-sm font-bold">{step.step}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs">
                    <span className="text-[var(--text-muted)] font-mono">{step.count.toLocaleString()} sessions</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{step.conversion_rate}% retained</span>
                    {step.drop_rate > 0 && (
                      <span className="text-rose-600 dark:text-rose-400 font-bold">-{step.drop_rate}% drop</span>
                    )}
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="relative w-full bg-[var(--bg-inner)] h-7 rounded-lg overflow-hidden border border-[var(--border-panel)] flex items-center px-3">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 opacity-90 transition-all duration-500"
                    style={{ width: `${step.conversion_rate}%` }}
                  />
                  <span className="relative z-10 text-[11px] font-bold text-white drop-shadow">
                    {step.count.toLocaleString()} users ({step.conversion_rate}%)
                  </span>
                </div>

                {/* Drop off Callout Badge */}
                {dropCount > 0 && (
                  <div className="pl-6 flex items-center space-x-2 text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{dropCount.toLocaleString()} users dropped off at this stage</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Root Cause Drop-Off Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Top Friction Drivers */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[var(--text-main)] flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Root Cause Drop-Off Drivers</span>
            </h3>
            <span className="text-xs text-[var(--text-muted)]">Impact Weight</span>
          </div>

          <div className="space-y-3">
            {dropOffCauses.map((c, i) => (
              <div key={i} className="p-3 rounded-xl bg-[var(--bg-inner)] border border-[var(--border-panel)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--text-main)]">{c.cause}</span>
                  <span className={`badge ${
                    c.impact === "Critical" ? "bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/30" : "bg-amber-500/20 text-amber-600 dark:text-amber-300"
                  }`}>
                    {c.impact} Impact
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span>{c.lossCount} customer drop-offs</span>
                  <span className="font-extrabold text-rose-600 dark:text-rose-400">{c.percentage}% of total friction</span>
                </div>

                <div className="w-full bg-[var(--bg-panel)] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full"
                    style={{ width: `${c.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Funnel Retained Bar Chart */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-base font-extrabold text-[var(--text-main)]">Funnel Stage Volume Comparison</h3>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DROP_OFF_STEPS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-panel)" />
                <XAxis dataKey="step" stroke="var(--text-dim)" tick={{ fontSize: 10 }} />
                <YAxis stroke="var(--text-dim)" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--bg-panel)", borderColor: "var(--border-panel)", borderRadius: "8px", fontSize: "12px", color: "var(--text-main)" }}
                />
                <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
