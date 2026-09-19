import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ExecutiveOverview from "./components/ExecutiveOverview";
import Customer360 from "./components/Customer360";
import JourneyExplorer from "./components/JourneyExplorer";
import DropOffAnalysis from "./components/DropOffAnalysis";
import EscalationCenter from "./components/EscalationCenter";
import RepeatedContact from "./components/RepeatedContact";
import ChurnIntelligence from "./components/ChurnIntelligence";
import AiAnalyst from "./components/AiAnalyst";
import IdentityPlayground from "./components/IdentityPlayground";
import LiveSimulator from "./components/LiveSimulator";

import { 
  INITIAL_CUSTOMERS, 
  INITIAL_EVENTS, 
  INITIAL_ISSUES, 
  INITIAL_ESCALATIONS 
} from "./data/mockData";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("1001");

  // Global State for live events, customers, escalations
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [issues, setIssues] = useState(INITIAL_ISSUES);
  const [escalations, setEscalations] = useState(INITIAL_ESCALATIONS);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // Live Event Ingestion Handler
  const handleAddLiveEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);

    // Check if event should create an escalation or issue
    if (newEvent.event_type === "ESCALATION") {
      const newEsc = {
        escalation_id: `ESC-LIVE-${Date.now().toString().slice(-3)}`,
        issue_id: `ISS-LIVE-${Date.now().toString().slice(-3)}`,
        customer_id: newEvent.customer_id,
        customer_name: customers.find(c => c.id === newEvent.customer_id)?.name || "Live Customer",
        reason: newEvent.details || "Live Event Escalation",
        severity: "HIGH",
        status: "ACTIVE_INVESTIGATION",
        assigned_to: "Duty Supervisor",
        timestamp: newEvent.time_display,
        sla_time_left: "2h 00m"
      };
      setEscalations(prev => [newEsc, ...prev]);
    }
  };

  // Escalation Resolution Handler
  const handleResolveEscalation = (escId) => {
    setEscalations(prev =>
      prev.map(e => (e.escalation_id === escId ? { ...e, status: "RESOLVED", sla_time_left: "RESOLVED" } : e))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-gray-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        eventsCount={events.length}
      />

      {/* Main Workspace Layout (Sidebar + View Panel) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={{
            customers: customers.length,
            escalations: escalations.filter(e => e.status !== "RESOLVED").length,
            repeatIssues: issues.filter(i => i.repeat_contact_count > 1).length
          }}
        />

        {/* Dynamic View Panel */}
        <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-60px)]">
          
          {activeTab === "overview" && (
            <ExecutiveOverview
              customers={customers}
              events={events}
              issues={issues}
              escalations={escalations}
              onNavigateTab={setActiveTab}
              onSelectCustomer={setSelectedCustomerId}
            />
          )}

          {activeTab === "customer360" && (
            <Customer360
              customers={customers}
              selectedCustomerId={selectedCustomerId}
              onSelectCustomer={setSelectedCustomerId}
              events={events}
              issues={issues}
              escalations={escalations}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "explorer" && (
            <JourneyExplorer
              customers={customers}
              events={events}
              selectedCustomerId={selectedCustomerId}
              onSelectCustomer={setSelectedCustomerId}
            />
          )}

          {activeTab === "dropoff" && (
            <DropOffAnalysis
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "escalations" && (
            <EscalationCenter
              escalations={escalations}
              onResolveEscalation={handleResolveEscalation}
              onSelectCustomer={setSelectedCustomerId}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "repeat_contact" && (
            <RepeatedContact
              issues={issues}
              events={events}
              onNavigateTab={setActiveTab}
              onSelectCustomer={setSelectedCustomerId}
            />
          )}

          {activeTab === "churn" && (
            <ChurnIntelligence
              customers={customers}
              onSelectCustomer={setSelectedCustomerId}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "ai_analyst" && (
            <AiAnalyst
              customers={customers}
              events={events}
              issues={issues}
              escalations={escalations}
              onSelectCustomer={setSelectedCustomerId}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "identity_sandbox" && (
            <IdentityPlayground />
          )}

          {activeTab === "simulator" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Live Event Generator Engine</h2>
              <LiveSimulator
                customers={customers}
                onAddEvent={handleAddLiveEvent}
                onClose={null}
              />
            </div>
          )}

        </main>
      </div>

      {/* Live Event Modal overlay */}
      {isSimulatorOpen && (
        <LiveSimulator
          customers={customers}
          onAddEvent={handleAddLiveEvent}
          onClose={() => setIsSimulatorOpen(false)}
        />
      )}

    </div>
  );
}
