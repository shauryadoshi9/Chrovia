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
    { id: "escalations", label: "Escalation Center", icon: AlertTriangle, category: "Intelligence", badge: counts.escalations, badgeColor: "bg-rose-500/20 text-rose-400" },
    { id: "repeat_contact", label: "Repeated Contact", icon: Repeat, category: "Intelligence", badge: counts.repeatIssues },
    { id: "churn", label: "Churn Intelligence", icon: ShieldAlert, category: "Intelligence" },
    { id: "ai_analyst", label: "AI Journey Analyst", icon: Sparkles, category: "AI Assistant", highlight: true },
    { id: "simulator", label: "Event Ingestion Simulator", icon: Cpu, category: "Tools" },
    { id: "identity_sandbox", label: "Identity Resolution Sandbox", icon: Network, category: "Tools" },
  ];

  return (
    <aside className="w-64 bg-[#0D1322]/90 border-r border-white/10 p-4 flex flex-col justify-between shrink-0 min-h-[calc(100vh-60px)]">
      <div className="space-y-6">
        
        {/* Navigation Section */}
        <div>
          <h3 className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-gray-500 mb-2">
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
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
                      : item.highlight
                      ? "text-purple-300 hover:bg-purple-500/10 border border-purple-500/20"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : item.highlight ? "text-purple-400" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor || "bg-indigo-500/20 text-indigo-300"}`}>
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
      <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs">
        <div className="flex items-center space-x-2 text-indigo-300 font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Gemini Grounded RAG</span>
        </div>
        <p className="text-[11px] text-gray-400 leading-tight">
          Active session identity graph grounded with 100% data auditability.
        </p>
      </div>
    </aside>
  );
}
