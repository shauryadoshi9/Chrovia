import React from "react";
import { Repeat, Smartphone, PhoneCall, MessageSquare, DollarSign, Clock, Layers } from "lucide-react";

export default function RepeatedContact({ issues = [], events = [], onNavigateTab, onSelectCustomer }) {
  // Filter repeated contact issues (>1 contact)
  const repeatIssues = issues.filter(i => i.repeat_contact_count > 1);

  // Compute stats
  const totalRepeatContacts = repeatIssues.reduce((acc, i) => acc + i.repeat_contact_count, 0);
  const totalCostImpact = totalRepeatContacts * 4.50; // $4.50 avg repeated call cost

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Header */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Repeat className="w-4 h-4 text-indigo-400" />
            <span>Multi-Touch Service Effort Detection</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Repeated Contact Analysis</h2>
          <p className="text-xs text-gray-400 mt-1">
            Channel hopping detection, multi-contact issue threading, and service cost impact
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-center">
            <span className="text-[10px] text-gray-400 block">Est. Cost Impact</span>
            <span className="text-lg font-black text-amber-400">${totalCostImpact.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Channel Hopping Flow Heatmap Card */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>Common Channel Hopping Sequences</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300">Mobile App → Call Center</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                48% Frequency
              </span>
            </div>
            <p className="text-xs text-gray-400">Triggered after payment gateway timeout errors on mobile checkout.</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300">Chat Bot → Call Center</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                32% Frequency
              </span>
            </div>
            <p className="text-xs text-gray-400">Occurs when automated bot failed refund status lookup deflection.</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300">Store POS → Call Center</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                20% Frequency
              </span>
            </div>
            <p className="text-xs text-gray-400">Store system offline resulting in customer calling hotline from store.</p>
          </div>
        </div>
      </div>

      {/* Repeated Contact Threads List */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-base font-extrabold text-white">Multi-Touch Issue Threads</h3>

        <div className="space-y-3">
          {repeatIssues.map((iss) => (
            <div
              key={iss.issue_id}
              className="p-4 rounded-xl bg-gray-900/80 border border-white/10 hover:border-indigo-500/40 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-extrabold text-white">{iss.issue_id}</span>
                  <button
                    onClick={() => {
                      onSelectCustomer(iss.customer_id);
                      onNavigateTab("customer360");
                    }}
                    className="text-xs font-semibold text-indigo-400 hover:underline"
                  >
                    {iss.customer_name}
                  </button>
                </div>

                <span className="text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                  {iss.repeat_contact_count} Contacts
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <span className="text-gray-400">Channel Switch Path:</span>
                <span className="font-mono font-bold text-indigo-300">{iss.channel_path.join(" → ")}</span>
              </div>

              <p className="text-xs text-gray-400">Root Cause: {iss.root_cause}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
