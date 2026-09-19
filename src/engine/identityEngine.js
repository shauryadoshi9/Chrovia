// Unified Customer Identity Resolution Engine (Section 2 & 24.1)

/**
 * Calculates Levenshtein distance between two strings
 */
export function levenshteinDistance(a = "", b = "") {
  a = a.toLowerCase().trim();
  b = b.toLowerCase().trim();
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * Computes fuzzy name similarity percentage (0 to 1)
 */
export function nameSimilarity(name1, name2) {
  if (!name1 || !name2) return 0;
  const dist = levenshteinDistance(name1, name2);
  const maxLen = Math.max(name1.length, name2.length);
  return maxLen === 0 ? 1 : Math.max(0, 1 - dist / maxLen);
}

/**
 * Normalizes phone numbers for comparison
 */
export function normalizePhone(phone = "") {
  return phone.replace(/[^\d]/g, "");
}

/**
 * Evaluates match between Record A and Record B per Section 2.3
 */
export function evaluateIdentityMatch(recordA, recordB) {
  const breakdown = [];
  let score = 0;
  let falseMergeAlerts = [];

  // 1. Strong Exact Identifiers (Email, Phone, Loyalty ID)
  if (recordA.email && recordB.email) {
    if (recordA.email.toLowerCase().trim() === recordB.email.toLowerCase().trim()) {
      score += 0.40;
      breakdown.push({ signal: "Exact Email Match", score: "+0.40", matched: true });
    } else {
      falseMergeAlerts.push("Contradictory verified Email addresses!");
    }
  }

  if (recordA.phone && recordB.phone) {
    const p1 = normalizePhone(recordA.phone);
    const p2 = normalizePhone(recordB.phone);
    if (p1 && p2 && p1 === p2) {
      score += 0.35;
      breakdown.push({ signal: "Exact Phone Match", score: "+0.35", matched: true });
    } else if (p1 && p2) {
      falseMergeAlerts.push("Contradictory Phone numbers detected!");
    }
  }

  if (recordA.loyalty_id && recordB.loyalty_id) {
    if (recordA.loyalty_id.trim() === recordB.loyalty_id.trim()) {
      score += 0.30;
      breakdown.push({ signal: "Exact Loyalty ID Match", score: "+0.30", matched: true });
    }
  }

  // 2. Fuzzy / Contextual Identifiers (Name, Device ID, IP)
  if (recordA.name && recordB.name) {
    const sim = nameSimilarity(recordA.name, recordB.name);
    if (sim >= 0.8) {
      const added = Math.round(sim * 0.15 * 100) / 100;
      score += added;
      breakdown.push({ signal: `Fuzzy Name Match (${Math.round(sim * 100)}% similarity)`, score: `+${added}`, matched: true });
    } else if (sim < 0.4) {
      falseMergeAlerts.push(`Low name similarity (${Math.round(sim * 100)}%)`);
    }
  }

  if (recordA.device_id && recordB.device_id && recordA.device_id === recordB.device_id) {
    score += 0.15;
    breakdown.push({ signal: "Device Fingerprint Match", score: "+0.15", matched: true });
  }

  if (recordA.ip && recordB.ip && recordA.ip === recordB.ip) {
    score += 0.10;
    breakdown.push({ signal: "IP Address Subnet Match", score: "+0.10", matched: true });
  }

  // Cap score to 1.0 (100%)
  const finalConfidence = Math.min(1.0, Math.round(score * 100) / 100);

  // False Merge Prevention Safeguards (Section 2.4)
  let decision = "REJECT";
  let reason = "Confidence below threshold (0.65)";

  if (falseMergeAlerts.length >= 2) {
    decision = "BLOCKED_FALSE_MERGE";
    reason = `Blocked due to contradictory strong signals: ${falseMergeAlerts.join("; ")}`;
  } else if (finalConfidence >= 0.80) {
    decision = "AUTO_MERGE";
    reason = "High confidence composite identity match";
  } else if (finalConfidence >= 0.60) {
    decision = "MANUAL_REVIEW_QUEUE";
    reason = "Moderate confidence — flagged for analyst approval";
  }

  return {
    confidence_score: finalConfidence,
    confidence_percentage: Math.round(finalConfidence * 100),
    decision,
    reason,
    breakdown,
    alerts: falseMergeAlerts
  };
}
