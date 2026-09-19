import React, { useState } from "react";
import { Sparkles, Send, Bot, User, ExternalLink } from "lucide-react";

export default function AiAnalyst({ customers = [], events = [], issues = [], escalations = [], onSelectCustomer, onNavigateTab }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your **Chrovia AI Customer Journey Analyst**, grounded in Chrovia's real-time identity graphs and normalized event stream.\n\nHow can I help you analyze journey friction, customer escalations, or drop-off causes today?",
      citations: []
    }
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const presetQueries = [
    "Why did Customer 1001 (Aarav Shah) escalate and file repeat contacts?",
    "What are the top root causes for payment failure drop-offs?",
    "Summarize all active SLA breaches and recommended supervisor overrides.",
    "Show me common channel-hopping sequences and cost impact."
  ];

  const handleSendQuery = (userQueryText) => {
    const textToSend = userQueryText || query;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { sender: "user", text: textToSend }];
    setMessages(newMessages);
    if (!userQueryText) setQuery("");
    setIsAnalyzing(true);

    setTimeout(() => {
      let aiResponseText = "";
      let citations = [];

      const lower = textToSend.toLowerCase();

      if (lower.includes("1001") || lower.includes("aarav")) {
        aiResponseText = `### Journey Analysis: Customer 1001 (Aarav Shah)\n\n**Overall Friction Score:** **84 / 100 (Critical)**\n\n#### Root Cause Summary:\n1. **10:13 AM (MOBILE)**: Payment Gateway Timeout Error #504 during checkout for headphones ₹14,999.\n2. **10:20 AM (CALL CENTER)**: Contacted support regarding debited funds without order receipt (IVR Wait: 7 mins).\n3. **10:35 AM (CALL CENTER)**: Escalated to Supervisor Ananya M. due to payment hold override restriction.\n4. **11:10 AM (CHAT)**: Channel switch #3 to Live Chat inquiring about refund status.\n\n**Key Finding**: Channel hopping across 3 distinct touchpoints within 1 hour triggered an SLA breach alert **ESC-11**.`;
        citations = [
          { label: "Customer 1001 Profile", customerId: "1001", tab: "customer360" },
          { label: "Escalation ESC-11", tab: "escalations" }
        ];
      } else if (lower.includes("payment") || lower.includes("drop")) {
        aiResponseText = `### Drop-Off Analysis: Payment Gateway Friction\n\n- **Total Affected Sessions**: 2,400 sessions at Payment step (22.5% step drop rate).\n- **Primary Culprit**: HDFC Gateway Timeout Error #504 (accounts for **42%** of all checkout abandonments).\n- **Secondary Impact**: 48% of affected customers immediately call support or abandon cart permanently.`;
        citations = [{ label: "View Drop-Off Analysis", tab: "dropoff" }];
      } else if (lower.includes("sla") || lower.includes("escalat")) {
        aiResponseText = `### Active Escalation & SLA Breach Report\n\nCurrently tracking **${escalations.length} active escalations**:\n\n1. **ESC-11 (Aarav Shah)**: SLA EXPIRED (-45 mins). Reason: SLA breach + 3 channel repeat contacts.\n2. **ESC-12 (Rohan Mehta)**: SLA 1h 15m remaining. Reason: Store POS system offline preventing instant refund.`;
        citations = [{ label: "Open Escalation Center", tab: "escalations" }];
      } else {
        aiResponseText = `### General Platform Intelligence Summary\n\n- **Active Customers Analyzed**: ${customers.length} profiles.\n- **Normalized Event Stream**: ${events.length} cross-channel events.\n- **Average Journey Friction**: 58 / 100.\n- **Recommended Focus**: Resolve HDFC payment gateway error #504 to reduce customer support call volume by an estimated 35%.`;
        citations = [{ label: "Executive Overview", tab: "overview" }];
      }

      setMessages(prev => [
        ...prev,
        { sender: "ai", text: aiResponseText, citations }
      ]);
      setIsAnalyzing(false);
    }, 900);
  };

  return (
    <div className="space-y-6 animate-fade-in flex flex-col h-[calc(100vh-120px)]">
      
      {/* Title Bar */}
      <div className="glass-panel p-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-lg shadow-purple-500/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[var(--text-main)] flex items-center space-x-2">
              <span>AI Customer Journey Analyst</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                CHROVIA AI ENGINE
              </span>
            </h2>
            <p className="text-xs text-[var(--text-muted)]">Natural Language Analytics with Audit Trace & Citation Links</p>
          </div>
        </div>
      </div>

      {/* Main Chat Conversation Container */}
      <div className="flex-1 glass-panel p-6 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-300 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-2xl p-4 rounded-2xl text-xs space-y-2 ${
              msg.sender === "user"
                ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20"
                : "bg-[var(--bg-inner)] border border-[var(--border-panel)] text-[var(--text-main)] rounded-tl-none"
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.text}
              </div>

              {/* Citations / Links */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-2 border-t border-[var(--border-panel)] flex flex-wrap gap-2">
                  <span className="text-[10px] text-[var(--text-dim)] font-bold block w-full">Grounded Evidence Links:</span>
                  {msg.citations.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (c.customerId) onSelectCustomer(c.customerId);
                        onNavigateTab(c.tab);
                      }}
                      className="px-2.5 py-1 rounded-md bg-indigo-500/15 hover:bg-indigo-500/30 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30 text-[11px] font-semibold flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <span>{c.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isAnalyzing && (
          <div className="flex items-center space-x-2 text-xs text-indigo-600 dark:text-indigo-400 animate-pulse py-2">
            <Sparkles className="w-4 h-4" />
            <span>Querying identity graph & stitching event records...</span>
          </div>
        )}
      </div>

      {/* Preset Query Buttons */}
      <div className="flex flex-wrap gap-2 shrink-0">
        {presetQueries.map((pq, i) => (
          <button
            key={i}
            onClick={() => handleSendQuery(pq)}
            className="px-3 py-1.5 rounded-lg bg-[var(--bg-inner)] hover:bg-[var(--bg-panel-hover)] border border-[var(--border-panel)] text-[var(--text-muted)] hover:text-[var(--text-main)] text-xs font-medium transition-all text-left truncate max-w-xs cursor-pointer"
          >
            "{pq}"
          </button>
        ))}
      </div>

      {/* Input Row */}
      <div className="glass-panel p-3 shrink-0 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Ask anything about customer journeys, friction drivers, or churn risks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendQuery()}
          className="flex-1 bg-transparent border-none text-[var(--text-main)] placeholder-[var(--text-dim)] text-xs focus:outline-none"
        />
        <button
          onClick={() => handleSendQuery()}
          disabled={!query.trim()}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 transition-all cursor-pointer shrink-0"
        >
          <span>Ask AI</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
