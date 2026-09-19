import React from "react";
import { ShieldAlert, TrendingUp, Sparkles, UserCheck } from "lucide-react";
import { CHURN_CORRELATION_DATA } from "../data/mockData";

export default function ChurnIntelligence({ customers = [], onSelectCustomer, onNavigateTab }) {
  const atRiskCustomers = customers.filter(c => c.churn_risk === "CRITICAL" || c.churn_risk === "HIGH");

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Header */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>Predictive Customer Retention Engine</span>
          </div>
          <h2 className="text-xl font-extrabold text-[var(--text-main)]">Churn Intelligence & Risk Radar</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Journey friction feature correlation, churn propensity modeling, and proactive retention playbooks
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-xs font-bold">
            {atRiskCustomers.length} At-Risk Profiles Flagged
          </span>
        </div>
      </div>

      {/* Main Grid: Signals & At-Risk List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Signal Correlation Table */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[var(--text-main)] flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <span>Friction Signal vs. Churn Correlation</span>
            </h3>
            <span className="text-xs text-[var(--text-muted)]">Pearson Coefficient</span>
          </div>

          <div className="space-y-3">
            {CHURN_CORRELATION_DATA.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[var(--bg-inner)] border border-[var(--border-panel)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--text-main)]">{item.signal}</span>
                  <span className={`badge ${
                    item.risk_tier === "Critical"
                      ? "bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/40"
                      : "bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40"
                  }`}>
                    r = +{item.churn_correlation}
                  </span>
                </div>

                <div className="w-full bg-[var(--bg-panel)] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-rose-500 h-full rounded-full"
                    style={{ width: `${item.churn_correlation * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: At-Risk Customers & Playbooks */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-base font-extrabold text-[var(--text-main)] flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-rose-500" />
            <span>High-Propensity Churn Watchlist & Retention Actions</span>
          </h3>

          <div className="space-y-4">
            {atRiskCustomers.map(customer => (
              <div key={customer.id} className="p-4 rounded-xl bg-[var(--bg-inner)] border border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full object-cover border border-[var(--border-panel)]"
                    />
                    <div>
                      <button
                        onClick={() => {
                          onSelectCustomer(customer.id);
                          onNavigateTab("customer360");
                        }}
                        className="text-sm font-extrabold text-[var(--text-main)] hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                      >
                        {customer.name}
                      </button>
                      <p className="text-xs text-[var(--text-muted)]">{customer.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[var(--text-dim)] block">Churn Risk</span>
                    <span className="text-lg font-black text-rose-600 dark:text-rose-400">{customer.churn_score}%</span>
                  </div>
                </div>

                {/* Recommendation Callout */}
                <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-xs space-y-1">
                  <div className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-300 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>AI Retention Playbook Recommendation:</span>
                  </div>
                  <p className="text-[var(--text-muted)] text-[11px]">
                    Auto-issue ₹1,500 goodwill wallet credit & route upcoming call to VIP Retention Desk.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
