import React, { useState } from "react";
import { UserPlus, Edit3, X, CheckCircle, Plus, Trash2, ShieldCheck, Network } from "lucide-react";

export default function CustomerManageModal({ 
  mode = "add", // "add" | "edit"
  customerData = null, 
  onSave, 
  onClose 
}) {
  const [name, setName] = useState(customerData?.name || "");
  const [email, setEmail] = useState(customerData?.email || "");
  const [phone, setPhone] = useState(customerData?.phone || "");
  const [loyaltyId, setLoyaltyId] = useState(customerData?.loyalty_id || `LYT${Math.floor(Math.random() * 9000 + 1000)}`);
  const [tier, setTier] = useState(customerData?.tier || "Gold VIP");
  const [churnRisk, setChurnRisk] = useState(customerData?.churn_risk || "ELEVATED");
  const [churnScore, setChurnScore] = useState(customerData?.churn_score || 55);

  // Identity Graph nodes state
  const [identities, setIdentities] = useState(
    customerData?.identities || [
      { type: "Email", value: email || "user@example.com", verified: true, strength: 0.95 },
      { type: "Phone", value: phone || "+91 98765 00000", verified: true, strength: 0.95 },
      { type: "Loyalty ID", value: loyaltyId, verified: true, strength: 0.90 }
    ]
  );

  const [newType, setNewType] = useState("Device Fingerprint");
  const [newValue, setNewValue] = useState("");

  const handleAddIdentityNode = () => {
    if (!newValue.trim()) return;
    setIdentities(prev => [
      ...prev,
      { type: newType, value: newValue.trim(), verified: false, strength: 0.70 }
    ]);
    setNewValue("");
  };

  const handleRemoveIdentityNode = (index) => {
    setIdentities(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const updatedCustomer = {
      id: customerData?.id || `${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      loyalty_id: loyaltyId.trim(),
      account_id: customerData?.account_id || `ACC-${Math.floor(Math.random() * 9000 + 1000)}`,
      tier,
      churn_risk: churnRisk,
      churn_score: Number(churnScore),
      friction_score: customerData?.friction_score || 45,
      friction_band: churnScore > 75 ? "Critical" : churnScore > 50 ? "Elevated" : "Low",
      avatar: customerData?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      identities
    };

    onSave(updatedCustomer);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-8 max-w-lg w-full space-y-6 bg-[var(--bg-panel)] border-indigo-500/40 shadow-2xl relative animate-fade-in rounded-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-500">
            {mode === "add" ? <UserPlus className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[var(--text-main)]">
              {mode === "add" ? "Add New Customer Profile" : `Edit Profile: ${customerData?.name}`}
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Dynamic Database Management & Identity Graph Control
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-bold uppercase mb-1">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] text-[var(--text-main)] rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Vikram Verma"
              />
            </div>

            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-bold uppercase mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] text-[var(--text-main)] rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. vikram@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-bold uppercase mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] text-[var(--text-main)] rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="+91 94449 87654"
              />
            </div>

            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-bold uppercase mb-1">Loyalty ID</label>
              <input
                type="text"
                value={loyaltyId}
                onChange={e => setLoyaltyId(e.target.value)}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] text-[var(--text-main)] rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="LYT1005"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-bold uppercase mb-1">Membership Tier</label>
              <select
                value={tier}
                onChange={e => setTier(e.target.value)}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] text-[var(--text-main)] rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Platinum">Platinum VIP</option>
                <option value="Gold VIP">Gold VIP</option>
                <option value="Silver">Silver Member</option>
                <option value="Regular">Regular Customer</option>
              </select>
            </div>

            <div>
              <label className="text-[var(--text-muted)] block text-[10px] font-bold uppercase mb-1">Churn Risk Level</label>
              <select
                value={churnRisk}
                onChange={e => setChurnRisk(e.target.value)}
                className="w-full bg-[var(--bg-inner)] border border-[var(--border-panel)] text-[var(--text-main)] rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="ELEVATED">ELEVATED</option>
                <option value="MODERATE">MODERATE</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
          </div>

          {/* Identity Graph Nodes Control Section */}
          <div className="pt-2 border-t border-[var(--border-panel)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider flex items-center space-x-1">
                <Network className="w-3.5 h-3.5" />
                <span>Identity Graph Nodes ({identities.length})</span>
              </span>
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {identities.map((idNode, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-[var(--bg-inner)] border border-[var(--border-panel)] text-xs">
                  <div>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px]">{idNode.type}</span>
                    <span className="font-mono text-[var(--text-main)] text-[11px]">{idNode.value}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveIdentityNode(idx)}
                    className="p-1 text-gray-400 hover:text-rose-500 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Insert New Node */}
            <div className="flex items-center space-x-2 pt-1">
              <select
                value={newType}
                onChange={e => setNewType(e.target.value)}
                className="bg-[var(--bg-inner)] border border-[var(--border-panel)] text-[var(--text-main)] text-[11px] rounded px-2 py-1 focus:outline-none shrink-0"
              >
                <option value="Device Fingerprint">Device Fingerprint</option>
                <option value="IP Address">IP Address</option>
                <option value="Cookie ID">Cookie ID</option>
                <option value="Social ID">Social ID</option>
              </select>
              <input
                type="text"
                placeholder="Enter node value..."
                value={newValue}
                onChange={e => setNewValue(e.target.value)}
                className="flex-1 bg-[var(--bg-inner)] border border-[var(--border-panel)] text-[var(--text-main)] text-[11px] rounded px-2 py-1 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddIdentityNode}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-bold cursor-pointer shrink-0"
              >
                ＋ Add
              </button>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[var(--bg-inner)] text-[var(--text-muted)] text-xs font-semibold hover:text-[var(--text-main)] cursor-pointer border border-[var(--border-panel)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{mode === "add" ? "Save & Create Profile" : "Update Profile"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
