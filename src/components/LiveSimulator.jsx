import React, { useState } from "react";
import { Cpu, Zap, PlusCircle, CheckCircle, AlertTriangle, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function LiveSimulator({ customers = [], onAddEvent, onClose }) {
  const [selectedCustId, setSelectedCustId] = useState(customers[0]?.id || "1001");
  const [channel, setChannel] = useState("MOBILE");
  const [eventType, setEventType] = useState("PAYMENT_FAILURE");
  const [status, setStatus] = useState("FAILED");
  const [sentiment, setSentiment] = useState("NEGATIVE");
  const [details, setDetails] = useState("Payment timeout error on mobile checkout gateway");

  const handleFireEvent = (e) => {
    e.preventDefault();

    const customerObj = customers.find(c => c.id === selectedCustId);
    const newEvt = {
      id: `EVT-LIVE-${Date.now()}`,
      customer_id: selectedCustId,
      timestamp: new Date().toISOString(),
      time_display: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel,
      event_type: eventType,
      status,
      session_id: `SES-LIVE-${Math.floor(Math.random() * 900 + 100)}`,
      sentiment,
      details,
      raw_payload: { simulated: true, channel, status, time: new Date().toISOString() }
    };

    onAddEvent(newEvt);

    // Trigger visual confetti feedback
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-panel p-6 max-w-lg w-full space-y-6 bg-[#0F172A] border-indigo-500/40 shadow-2xl relative animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h3 className="text-base font-extrabold text-white">Live Cross-Channel Event Generator</h3>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleFireEvent} className="space-y-4 text-xs">
          <div>
            <label className="text-gray-400 block text-[10px] font-bold uppercase mb-1">Target Customer Profile</label>
            <select
              value={selectedCustId}
              onChange={e => setSelectedCustId(e.target.value)}
              className="w-full bg-gray-900 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} (ID: {c.id})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 block text-[10px] font-bold uppercase mb-1">Interaction Channel</label>
              <select
                value={channel}
                onChange={e => setChannel(e.target.value)}
                className="w-full bg-gray-900 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="WEB">WEB</option>
                <option value="MOBILE">MOBILE</option>
                <option value="CALL_CENTER">CALL_CENTER</option>
                <option value="STORE">STORE</option>
                <option value="CHAT">CHAT</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 block text-[10px] font-bold uppercase mb-1">Event Type</label>
              <select
                value={eventType}
                onChange={e => setEventType(e.target.value)}
                className="w-full bg-gray-900 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="PAYMENT_FAILURE">PAYMENT_FAILURE</option>
                <option value="SUPPORT_CONTACT">SUPPORT_CONTACT</option>
                <option value="ESCALATION">ESCALATION</option>
                <option value="REPEAT_CONTACT">REPEAT_CONTACT</option>
                <option value="PRODUCT_VIEW">PRODUCT_VIEW</option>
                <option value="ADD_TO_CART">ADD_TO_CART</option>
                <option value="CHECKOUT_COMPLETE">CHECKOUT_COMPLETE</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 block text-[10px] font-bold uppercase mb-1">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full bg-gray-900 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="FAILED">FAILED</option>
                <option value="ESCALATED">ESCALATED</option>
                <option value="OPEN">OPEN</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 block text-[10px] font-bold uppercase mb-1">Sentiment Signal</label>
              <select
                value={sentiment}
                onChange={e => setSentiment(e.target.value)}
                className="w-full bg-gray-900 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="VERY_NEGATIVE">VERY_NEGATIVE</option>
                <option value="FRUSTRATED">FRUSTRATED</option>
                <option value="NEGATIVE">NEGATIVE</option>
                <option value="NEUTRAL">NEUTRAL</option>
                <option value="POSITIVE">POSITIVE</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-gray-400 block text-[10px] font-bold uppercase mb-1">Event Note / Details</label>
            <input
              type="text"
              value={details}
              onChange={e => setDetails(e.target.value)}
              className="w-full bg-gray-900 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
              placeholder="Enter event details..."
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-semibold hover:bg-gray-700 cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Fire & Stitch Live Event</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
