import React, { useState, useEffect } from "react";
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

import LandingPage from "./components/LandingPage";
import AuthModal from "./components/AuthModal";

import { 
  INITIAL_CUSTOMERS, 
  INITIAL_EVENTS, 
  INITIAL_ISSUES, 
  INITIAL_ESCALATIONS 
} from "./data/mockData";

export default function App() {
  // Theme State: "dark" | "light"
  const [theme, setTheme] = useState(() => localStorage.getItem("chrovia_theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("chrovia_theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // Page Flow State: "landing" | "dashboard"
  const [currentPage, setCurrentPage] = useState("landing");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Authenticated User Session
  const [userSession, setUserSession] = useState(null);

  // Dashboard Active View Tab
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("1001");

  // Global Platform State
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [issues, setIssues] = useState(INITIAL_ISSUES);
  const [escalations, setEscalations] = useState(INITIAL_ESCALATIONS);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // Auth Action Handlers
  const handleAuthenticate = (userData) => {
    setUserSession(userData);
    setIsAuthModalOpen(false);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUserSession(null);
    setCurrentPage("landing");
  };

  const handleLaunchApp = () => {
    if (!userSession) {
      setUserSession({
        name: "Aarav Shah",
        email: "aarav@chrovia.internal",
        role: "Lead Journey Analyst",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
      });
    }
    setCurrentPage("dashboard");
  };

  // Live Event Ingestion Handler
  const handleAddLiveEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);

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

  const handleResolveEscalation = (escId) => {
    setEscalations(prev =>
      prev.map(e => (e.escalation_id === escId ? { ...e, status: "RESOLVED", sla_time_left: "RESOLVED" } : e))
    );
  };

  // Render Public Landing Page
  if (currentPage === "landing") {
    return (
      <>
        <LandingPage
          onLaunchApp={handleLaunchApp}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
        {isAuthModalOpen && (
          <AuthModal
            onAuthenticate={handleAuthenticate}
            onClose={() => setIsAuthModalOpen(false)}
          />
        )}
      </>
    );
  }

  // Render Main Authenticated Dashboard Workspace
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] font-sans selection:bg-indigo-500 selection:text-white transition-colors">
      
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        eventsCount={events.length}
        userSession={userSession}
        onLogout={handleLogout}
        onGoHome={() => setCurrentPage("landing")}
        theme={theme}
        onToggleTheme={handleToggleTheme}
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
              <h2 className="text-xl font-bold text-[var(--text-main)]">Live Event Generator Engine</h2>
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

      {/* Auth Modal if triggered inside dashboard */}
      {isAuthModalOpen && (
        <AuthModal
          onAuthenticate={handleAuthenticate}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}

    </div>
  );
}
