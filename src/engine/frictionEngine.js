// Journey Friction Score Engine (Section 12 & 24.6)

export const DEFAULT_FRICTION_WEIGHTS = {
  w1_repeat_contacts: 18,    // Weight for repeat contact count
  w2_escalations: 25,        // Weight for escalation events
  w3_unresolved_issues: 20,  // Weight for open/unresolved issues
  w4_sla_breaches: 15,       // Weight for SLA breaches
  w5_channel_switches: 10,   // Weight for channel hopping
  w6_payment_failures: 12,   // Weight for payment errors
  w7_negative_sentiment: 10   // Weight for negative sentiment
};

/**
 * Calculates Friction Score (0 to 100) based on formula:
 * Friction = w1*repeat_contacts + w2*escalations + w3*unresolved + w4*sla_breach + w5*channel_switches + w6*payment_fails + w7*neg_sentiment
 */
export function calculateJourneyFriction(events = [], issues = [], weights = DEFAULT_FRICTION_WEIGHTS) {
  let repeat_contacts = 0;
  let escalations = 0;
  let payment_failures = 0;
  let negative_sentiments = 0;
  let channel_switches = 0;
  let last_channel = null;

  events.forEach(evt => {
    if (evt.event_type === "REPEAT_CONTACT") repeat_contacts += 1;
    if (evt.event_type === "ESCALATION" || evt.status === "ESCALATED") escalations += 1;
    if (evt.event_type === "PAYMENT_FAILURE" || evt.status === "FAILED") payment_failures += 1;
    if (evt.sentiment === "VERY_NEGATIVE" || evt.sentiment === "FRUSTRATED" || evt.sentiment === "NEGATIVE") {
      negative_sentiments += 1;
    }

    if (last_channel && last_channel !== evt.channel) {
      channel_switches += 1;
    }
    last_channel = evt.channel;
  });

  let unresolved_issues = 0;
  let sla_breaches = 0;

  issues.forEach(iss => {
    if (iss.status === "UNRESOLVED" || iss.status === "OPEN") unresolved_issues += 1;
    if (iss.sla_breached) sla_breaches += 1;
  });

  // Calculate contributions
  const c1 = (repeat_contacts * weights.w1_repeat_contacts);
  const c2 = (escalations * weights.w2_escalations);
  const c3 = (unresolved_issues * weights.w3_unresolved_issues);
  const c4 = (sla_breaches * weights.w4_sla_breaches);
  const c5 = (channel_switches * weights.w5_channel_switches);
  const c6 = (payment_failures * weights.w6_payment_failures);
  const c7 = (negative_sentiments * weights.w7_negative_sentiment);

  const rawSum = c1 + c2 + c3 + c4 + c5 + c6 + c7;
  const finalScore = Math.min(100, Math.round(rawSum));

  // Determine band per Section 12.3
  let band = "Low";
  let color = "#34D399";
  let cssClass = "friction-low";

  if (finalScore > 80) {
    band = "Critical";
    color = "#F43F5E";
    cssClass = "friction-critical";
  } else if (finalScore > 60) {
    band = "High";
    color = "#F97316";
    cssClass = "friction-high";
  } else if (finalScore > 40) {
    band = "Elevated";
    color = "#FBBF24";
    cssClass = "friction-elevated";
  } else if (finalScore > 20) {
    band = "Moderate";
    color = "#60A5FA";
    cssClass = "friction-moderate";
  }

  return {
    score: finalScore,
    band,
    color,
    cssClass,
    factors: {
      repeat_contacts,
      escalations,
      unresolved_issues,
      sla_breaches,
      channel_switches,
      payment_failures,
      negative_sentiments
    },
    contributions: { c1, c2, c3, c4, c5, c6, c7 }
  };
}
