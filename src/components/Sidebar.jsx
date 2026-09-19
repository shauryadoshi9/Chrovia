import React from "react";
import { 
  LayoutDashboard, 
  UserCheck, 
  GitBranch, 
  TrendingDown, 
  AlertTriangle, 
  Repeat, 
  ShieldAlert, 
  Sparkles, 
  Cpu, 
  Network 
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, counts = {} }) {
  const navItems = [
    { id: "overview", label: "Executive Overview", icon: LayoutDashboard, category: "Analytics" },
    { id: "customer360", label: "Customer 360", icon: UserCheck, category: "Analytics", badge: counts.customers },
    { id: "explorer", label: "Journey Explorer", icon: GitBranch, category: "Analytics" },
    { id: "dropoff", label: "Drop-Off Analysis", icon: TrendingDown, category: "Intelligence" },
    { id: "escalations", label: "Escalation Center", icon: AlertTriangle, category: "Intelligence", badge: counts.escalations, badgeColor: "bg-rose-500/20 text-rose-600 dark:text-rose-400" },
    { id: "repeat_contact", label: "Repeated Contact", icon: Repeat, category: "Intelligence", badge: counts.repeatIssues },
    { id: "churn", label: "Churn Intelligence", icon: ShieldAlert, category: "Intelligence" },
    { id: "ai_analyst", label: "AI Journey Analyst", icon: Sparkles, category: "AI Assistant", highlight: true },
    { id: "simulator", label: "Event Ingestion Simulator", icon: Cpu, category: "Tools" },
    { id: "identity_sandbox", label: "Identity Resolution Sandbox", icon: Network, category: "Tools" },
  ];

  return (
    <aside className="w-64 bg-[var(--bg-panel)] border-r border-[var(--border-panel)] p-4 flex flex-col justify-between shrink-0 min-h-[calc(100vh-60px)] transition-colors">
      <div className="space-y-6">
        
        {/* Navigation Section */}
        <div>
          <h3 className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-dim)] mb-2">
            Platform Views
          </h3>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-500/40 shadow-sm"
                      : item.highlight
                      ? "text-purple-600 dark:text-purple-300 hover:bg-purple-500/10 border border-purple-500/20"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-inner)] border border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600 dark:text-indigo-400" : item.highlight ? "text-purple-600 dark:text-purple-400" : "text-[var(--text-dim)]"}`} />
                    <span>{item.label}</span>
                  </div>
                  
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor || "bg-indigo-500/20 text-indigo-600 dark:text-indigo-300"}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Footer Info Box */}
      <div className="p-3 rounded-lg bg-[var(--bg-inner)] border border-[var(--border-panel)] text-xs">
        <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-300 font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Gemini Grounded RAG</span>
        </div>
        <p className="text-[11px] text-[var(--text-dim)] leading-tight">
          Active session identity graph grounded with 100% data auditability.
        </p>
      </div>
    </aside>
  );
}
