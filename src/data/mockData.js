// Mock Data for Chrovia Customer Journey Platform

export const INITIAL_CUSTOMERS = [
  {
    id: "1001",
    name: "Aarav Shah",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    loyalty_id: "LYT1001",
    account_id: "ACC-9901",
    tier: "Gold VIP",
    churn_risk: "CRITICAL",
    churn_score: 87,
    friction_score: 84,
    friction_band: "Critical",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    identities: [
      { type: "Email", value: "aarav@example.com", verified: true, strength: 0.95 },
      { type: "Phone", value: "+91 98765 43210", verified: true, strength: 0.95 },
      { type: "Loyalty ID", value: "LYT1001", verified: true, strength: 0.90 },
      { type: "Cookie ID", value: "ck_aarav_99812", verified: false, strength: 0.65 },
      { type: "Device Fingerprint", value: "fp_ios_15_8819", verified: false, strength: 0.70 },
      { type: "IP Address", value: "192.168.1.45 (Mumbai)", verified: false, strength: 0.40 }
    ]
  },
  {
    id: "1002",
    name: "Meera Patel",
    email: "meera@example.com",
    phone: "+91 97654 32109",
    loyalty_id: "LYT1002",
    account_id: "ACC-9902",
    tier: "Silver",
    churn_risk: "LOW",
    churn_score: 18,
    friction_score: 22,
    friction_band: "Moderate",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
    identities: [
      { type: "Email", value: "meera@example.com", verified: true, strength: 0.95 },
      { type: "Phone", value: "+91 97654 32109", verified: true, strength: 0.95 },
      { type: "Loyalty ID", value: "LYT1002", verified: true, strength: 0.90 },
      { type: "Device Fingerprint", value: "fp_android_12_441", verified: false, strength: 0.70 }
    ]
  },
  {
    id: "1003",
    name: "Rohan Mehta",
    email: "rohan@example.com",
    phone: "+91 96543 21098",
    loyalty_id: "LYT1003",
    account_id: "ACC-9903",
    tier: "Platinum VIP",
    churn_risk: "ELEVATED",
    churn_score: 62,
    friction_score: 58,
    friction_band: "Elevated",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    identities: [
      { type: "Email", value: "rohan@example.com", verified: true, strength: 0.95 },
      { type: "Phone", value: "+91 96543 21098", verified: true, strength: 0.95 },
      { type: "Loyalty ID", value: "LYT1003", verified: true, strength: 0.90 }
    ]
  },
  {
    id: "1004",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 95551 23456",
    loyalty_id: "LYT1004",
    account_id: "ACC-9904",
    tier: "Gold VIP",
    churn_risk: "HIGH",
    churn_score: 76,
    friction_score: 72,
    friction_band: "High",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
    identities: [
      { type: "Email", value: "priya@example.com", verified: true, strength: 0.95 },
      { type: "Phone", value: "+91 95551 23456", verified: true, strength: 0.95 }
    ]
  },
  {
    id: "1005",
    name: "Vikram Verma",
    email: "vikram@example.com",
    phone: "+91 94449 87654",
    loyalty_id: "LYT1005",
    account_id: "ACC-9905",
    tier: "Gold VIP",
    churn_risk: "HIGH",
    churn_score: 78,
    friction_score: 76,
    friction_band: "High",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    identities: [
      { type: "Email", value: "vikram@example.com", verified: true, strength: 0.95 },
      { type: "Phone", value: "+91 94449 87654", verified: true, strength: 0.95 },
      { type: "Loyalty ID", value: "LYT1005", verified: true, strength: 0.90 },
      { type: "Device Fingerprint", value: "fp_android_14_9921", verified: false, strength: 0.75 },
      { type: "IP Address", value: "10.0.4.99 (Delhi)", verified: false, strength: 0.45 }
    ]
  }
];

export const INITIAL_EVENTS = [
  // Customer 1001 (Aarav Shah)
  {
    id: "EVT-1001-1",
    customer_id: "1001",
    timestamp: "2026-09-19T10:02:00Z",
    time_display: "10:02 AM",
    channel: "WEB",
    event_type: "PRODUCT_VIEW",
    status: "COMPLETED",
    session_id: "SES-WEB-901",
    sentiment: "NEUTRAL",
    details: "Viewed Premium Wireless Headphones (Model H-900)",
    raw_payload: { page: "/products/headphones-h900", device: "Desktop Chrome", ip: "192.168.1.45" }
  },
  {
    id: "EVT-1001-2",
    customer_id: "1001",
    timestamp: "2026-09-19T10:13:00Z",
    time_display: "10:13 AM",
    channel: "MOBILE",
    event_type: "PAYMENT_FAILURE",
    status: "FAILED",
    session_id: "SES-MOB-902",
    sentiment: "NEGATIVE",
    details: "Payment Gateway Error #504 (Timeout on HDFC Gateway)",
    raw_payload: { amount: 14999, gateway: "HDFC_PG", card_type: "VISA_DEBIT" },
    linked_issue_id: "ISS-501"
  },
  {
    id: "EVT-1001-3",
    customer_id: "1001",
    timestamp: "2026-09-19T10:17:00Z",
    time_display: "10:17 AM",
    channel: "MOBILE",
    event_type: "ADD_TO_CART",
    status: "COMPLETED",
    session_id: "SES-MOB-902",
    sentiment: "NEUTRAL",
    details: "Retried placing item in cart after payment drop",
    raw_payload: { cart_total: 14999, items_count: 1 }
  },
  {
    id: "EVT-1001-4",
    customer_id: "1001",
    timestamp: "2026-09-19T10:20:00Z",
    time_display: "10:20 AM",
    channel: "CALL_CENTER",
    event_type: "SUPPORT_CONTACT",
    status: "OPEN",
    session_id: "SES-CALL-104",
    sentiment: "VERY_NEGATIVE",
    details: "Called support regarding debited amount without order confirmation. Agent: Rajesh K.",
    raw_payload: { IVR_path: "Billing -> Payment Failures", wait_time_sec: 420 },
    linked_issue_id: "ISS-501"
  },
  {
    id: "EVT-1001-5",
    customer_id: "1001",
    timestamp: "2026-09-19T10:35:00Z",
    time_display: "10:35 AM",
    channel: "CALL_CENTER",
    event_type: "ESCALATION",
    status: "ESCALATED",
    session_id: "SES-CALL-104",
    sentiment: "VERY_NEGATIVE",
    details: "Escalated to Supervisor due to agent inability to override payment hold",
    raw_payload: { supervisor: "Ananya M.", SLA_breached: true },
    linked_issue_id: "ISS-501",
    linked_escalation_id: "ESC-11"
  },
  {
    id: "EVT-1001-6",
    customer_id: "1001",
    timestamp: "2026-09-19T11:10:00Z",
    time_display: "11:10 AM",
    channel: "CHAT",
    event_type: "REPEAT_CONTACT",
    status: "OPEN",
    session_id: "SES-CHAT-302",
    sentiment: "FRUSTRATED",
    details: "Chatted with bot & live agent asking for refund status. Channel switch #3 in 1 hour.",
    raw_payload: { bot_deflection: false, channel_switch: "CALL -> CHAT" },
    linked_issue_id: "ISS-501"
  },

  // Customer 1002 (Meera Patel)
  {
    id: "EVT-1002-1",
    customer_id: "1002",
    timestamp: "2026-09-19T08:15:00Z",
    time_display: "08:15 AM",
    channel: "MOBILE",
    event_type: "CHECKOUT_COMPLETE",
    status: "COMPLETED",
    session_id: "SES-MOB-881",
    sentiment: "POSITIVE",
    details: "Order #ORD-7721 placed successfully",
    raw_payload: { order_id: "ORD-7721", amount: 3499 }
  },
  {
    id: "EVT-1002-2",
    customer_id: "1002",
    timestamp: "2026-09-19T09:40:00Z",
    time_display: "09:40 AM",
    channel: "WEB",
    event_type: "DELIVERY_TRACK",
    status: "COMPLETED",
    session_id: "SES-WEB-442",
    sentiment: "NEUTRAL",
    details: "Tracked order package status",
    raw_payload: { courier: "BlueDart", tracking_status: "Out for delivery" }
  },
  {
    id: "EVT-1002-3",
    customer_id: "1002",
    timestamp: "2026-09-19T10:22:00Z",
    time_display: "10:22 AM",
    channel: "CHAT",
    event_type: "SUPPORT_CONTACT",
    status: "RESOLVED",
    session_id: "SES-CHAT-112",
    sentiment: "POSITIVE",
    details: "Inquired about exact delivery window. Resolved in 42 min.",
    raw_payload: { resolution_time_min: 42 },
    linked_issue_id: "ISS-502"
  },

  // Customer 1003 (Rohan Mehta)
  {
    id: "EVT-1003-1",
    customer_id: "1003",
    timestamp: "2026-09-19T09:00:00Z",
    time_display: "09:00 AM",
    channel: "STORE",
    event_type: "STORE_CHECKIN",
    status: "COMPLETED",
    session_id: "SES-STR-01",
    sentiment: "NEUTRAL",
    details: "Visited Bandra Retail Store",
    raw_payload: { store_location: "Bandra Flagship" }
  },
  {
    id: "EVT-1003-2",
    customer_id: "1003",
    timestamp: "2026-09-19T09:30:00Z",
    time_display: "09:30 AM",
    channel: "STORE",
    event_type: "REFUND_REQUEST",
    status: "OPEN",
    session_id: "SES-STR-01",
    sentiment: "NEGATIVE",
    details: "Requested store refund for damaged screen. Store POS system offline.",
    raw_payload: { item_sku: "TV-55-OLED" },
    linked_issue_id: "ISS-503"
  },
  {
    id: "EVT-1003-3",
    customer_id: "1003",
    timestamp: "2026-09-19T11:45:00Z",
    time_display: "11:45 AM",
    channel: "CALL_CENTER",
    event_type: "ESCALATION",
    status: "ESCALATED",
    session_id: "SES-CALL-991",
    sentiment: "FRUSTRATED",
    details: "Supervisor escalation requested due to delayed store refund sync",
    raw_payload: { escalation_type: "Supervisor Request" },
    linked_issue_id: "ISS-503",
    linked_escalation_id: "ESC-12"
  },

  // Customer 1005 (Vikram Verma) - Complete Stitched Journey
  {
    id: "EVT-1005-1",
    customer_id: "1005",
    timestamp: "2026-09-19T11:00:00Z",
    time_display: "11:00 AM",
    channel: "WEB",
    event_type: "PRODUCT_VIEW",
    status: "COMPLETED",
    session_id: "SES-WEB-505",
    sentiment: "NEUTRAL",
    details: "Viewed Smart TV 65-inch 4K OLED (Model TV-65-OLED)",
    raw_payload: { page: "/products/tv-65-oled", amount: 89999 }
  },
  {
    id: "EVT-1005-2",
    customer_id: "1005",
    timestamp: "2026-09-19T11:15:00Z",
    time_display: "11:15 AM",
    channel: "MOBILE",
    event_type: "ADD_TO_CART",
    status: "COMPLETED",
    session_id: "SES-MOB-506",
    sentiment: "POSITIVE",
    details: "Added Smart TV 65-inch to mobile app cart",
    raw_payload: { cart_total: 89999, items: 1 }
  },
  {
    id: "EVT-1005-3",
    customer_id: "1005",
    timestamp: "2026-09-19T11:22:00Z",
    time_display: "11:22 AM",
    channel: "MOBILE",
    event_type: "PAYMENT_FAILURE",
    status: "FAILED",
    session_id: "SES-MOB-506",
    sentiment: "NEGATIVE",
    details: "High transaction amount debit authorization failure #502",
    raw_payload: { amount: 89999, gateway: "HDFC_PG", card: "AXIS_BANK_CREDIT" },
    linked_issue_id: "ISS-505"
  },
  {
    id: "EVT-1005-4",
    customer_id: "1005",
    timestamp: "2026-09-19T11:30:00Z",
    time_display: "11:30 AM",
    channel: "CALL_CENTER",
    event_type: "SUPPORT_CONTACT",
    status: "OPEN",
    session_id: "SES-CALL-507",
    sentiment: "VERY_NEGATIVE",
    details: "Called hotline asking why credit card was debited ₹89,999 without order confirmation receipt",
    raw_payload: { agent: "Suresh P.", IVR: "High Value Billing" },
    linked_issue_id: "ISS-505"
  },
  {
    id: "EVT-1005-5",
    customer_id: "1005",
    timestamp: "2026-09-19T11:45:00Z",
    time_display: "11:45 AM",
    channel: "CHAT",
    event_type: "REPEAT_CONTACT",
    status: "OPEN",
    session_id: "SES-CHAT-508",
    sentiment: "FRUSTRATED",
    details: "Opened live chat asking for refund transaction approval ID",
    raw_payload: { repeat_contact_number: 2, channel_hop: "CALL -> CHAT" },
    linked_issue_id: "ISS-505"
  },
  {
    id: "EVT-1005-6",
    customer_id: "1005",
    timestamp: "2026-09-19T12:00:00Z",
    time_display: "12:00 PM",
    channel: "CALL_CENTER",
    event_type: "ESCALATION",
    status: "ESCALATED",
    session_id: "SES-CALL-507",
    sentiment: "VERY_NEGATIVE",
    details: "Escalated to L2 Operations Manager Rajesh V. due to ₹89,999 transaction block",
    raw_payload: { manager: "Rajesh V.", SLA_breached: true },
    linked_issue_id: "ISS-505",
    linked_escalation_id: "ESC-15"
  }
];

export const INITIAL_ISSUES = [
  {
    issue_id: "ISS-501",
    customer_id: "1001",
    customer_name: "Aarav Shah",
    category: "PAYMENT",
    status: "UNRESOLVED",
    priority: "CRITICAL",
    created_at: "2026-09-19 10:13 AM",
    age_hours: 2.8,
    channel_path: ["MOBILE", "CALL_CENTER", "CHAT"],
    repeat_contact_count: 3,
    escalated: true,
    sla_breached: true,
    resolution_time: "> SLA",
    root_cause: "Payment Gateway Error #504 during checkout causing unconfirmed debit"
  },
  {
    issue_id: "ISS-502",
    customer_id: "1002",
    customer_name: "Meera Patel",
    category: "DELIVERY",
    status: "RESOLVED",
    priority: "LOW",
    created_at: "2026-09-19 10:22 AM",
    age_hours: 0.7,
    channel_path: ["CHAT"],
    repeat_contact_count: 1,
    escalated: false,
    sla_breached: false,
    resolution_time: "42 min",
    root_cause: "Standard delivery time inquiry"
  },
  {
    issue_id: "ISS-503",
    customer_id: "1003",
    customer_name: "Rohan Mehta",
    category: "REFUND",
    status: "OPEN",
    priority: "HIGH",
    created_at: "2026-09-19 09:30 AM",
    age_hours: 3.2,
    channel_path: ["STORE", "CALL_CENTER"],
    repeat_contact_count: 2,
    escalated: true,
    sla_breached: false,
    resolution_time: "Pending",
    root_cause: "Store POS offline preventing instant in-store cash/card refund"
  },
  {
    issue_id: "ISS-505",
    customer_id: "1005",
    customer_name: "Vikram Verma",
    category: "PAYMENT",
    status: "UNRESOLVED",
    priority: "HIGH",
    created_at: "2026-09-19 11:22 AM",
    age_hours: 1.5,
    channel_path: ["MOBILE", "CALL_CENTER", "CHAT"],
    repeat_contact_count: 2,
    escalated: true,
    sla_breached: true,
    resolution_time: "> SLA",
    root_cause: "High value transaction debit hold error ₹89,999"
  }
];

export const INITIAL_ESCALATIONS = [
  {
    escalation_id: "ESC-11",
    issue_id: "ISS-501",
    customer_id: "1001",
    customer_name: "Aarav Shah",
    reason: "SLA breach + repeat contact (3 channels in 1h)",
    severity: "HIGH",
    status: "ACTIVE_INVESTIGATION",
    assigned_to: "Ananya M. (L2 Supervisor)",
    timestamp: "2026-09-19 10:35 AM",
    sla_time_left: "EXPIRED (-45m)"
  },
  {
    escalation_id: "ESC-12",
    issue_id: "ISS-503",
    customer_id: "1003",
    customer_name: "Rohan Mehta",
    reason: "Supervisor request (Store POS system sync failure)",
    severity: "MEDIUM",
    status: "PENDING_SUPERVISOR",
    assigned_to: "Vikram R. (Store Manager)",
    timestamp: "2026-09-19 11:45 AM",
    sla_time_left: "1h 15m"
  },
  {
    escalation_id: "ESC-15",
    issue_id: "ISS-505",
    customer_id: "1005",
    customer_name: "Vikram Verma",
    reason: "High transaction debit hold (₹89,999) + 2 channel hopping contacts",
    severity: "HIGH",
    status: "ACTIVE_INVESTIGATION",
    assigned_to: "Rajesh V. (L2 Operations Manager)",
    timestamp: "2026-09-19 12:00 PM",
    sla_time_left: "EXPIRED (-15m)"
  }
];

export const CHANNEL_METRICS = [
  { channel: "WEB", events: 1420, friction_avg: 18, color: "#3B82F6" },
  { channel: "MOBILE", events: 2180, friction_avg: 32, color: "#A855F7" },
  { channel: "CALL_CENTER", events: 840, friction_avg: 74, color: "#F59E0B" },
  { channel: "CHAT", events: 1150, friction_avg: 48, color: "#06B6D4" },
  { channel: "STORE", events: 410, friction_avg: 39, color: "#10B981" }
];

export const DROP_OFF_STEPS = [
  { step: "Product Discovery", count: 10000, conversion_rate: 100, drop_rate: 0 },
  { step: "Add to Cart", count: 4800, conversion_rate: 48.0, drop_rate: 52.0 },
  { step: "Initiate Checkout", count: 3100, conversion_rate: 31.0, drop_rate: 35.4 },
  { step: "Payment Gateway", count: 2400, conversion_rate: 24.0, drop_rate: 22.5 },
  { step: "Order Confirmed", count: 1850, conversion_rate: 18.5, drop_rate: 22.9 }
];

export const CHURN_CORRELATION_DATA = [
  { signal: "Repeat Contact >= 3", churn_correlation: 0.82, impact: "High", risk_tier: "Critical" },
  { signal: "Unresolved Issue > SLA", churn_correlation: 0.79, impact: "High", risk_tier: "Critical" },
  { signal: "Call Center Escalation", churn_correlation: 0.74, impact: "High", risk_tier: "High" },
  { signal: "Payment Failure Error", churn_correlation: 0.65, impact: "Medium", risk_tier: "High" },
  { signal: "Channel Switches >= 2", churn_correlation: 0.58, impact: "Medium", risk_tier: "Elevated" },
  { signal: "Agent Wait Time > 5m", churn_correlation: 0.46, impact: "Low", risk_tier: "Moderate" }
];
