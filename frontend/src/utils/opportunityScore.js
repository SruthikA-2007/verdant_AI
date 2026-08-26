// ─── Opportunity Scoring Algorithm ───────────────────────────────────────────
import { businessIdeas } from '../data/sihData.js';

function parseCurrency(val = '') {
  return parseInt(String(val).replace(/[^0-9]/g, '') || '0');
}

function scoreBudgetFit(idea, capitalStr) {
  const capital = parseCurrency(capitalStr);
  if (capital === 0) return 68;
  if (capital >= idea.investmentMax) return 100;
  if (capital >= idea.investmentMin) {
    const pct = (capital - idea.investmentMin) / (idea.investmentMax - idea.investmentMin);
    return Math.round(78 + pct * 22);
  }
  const ratio = capital / idea.investmentMin;
  return Math.round(ratio * 72);
}

function scoreInterestMatch(idea, interests = []) {
  if (!interests.length) return 68;
  const matches = interests.filter(i => (idea.interestMatch || []).includes(i));
  if (!matches.length) return 50;
  return Math.round(70 + (matches.length / Math.max(idea.interestMatch.length, 1)) * 30);
}

function scoreResourceFit(idea, resources = []) {
  const needed = idea.resourcesNeeded || [];
  if (!needed.length) return 88;
  if (!resources.length) return 58;
  const matched = needed.filter(r => resources.includes(r)).length;
  return Math.round(60 + (matched / needed.length) * 40);
}

function scoreLocationPotential(idea) {
  // Deterministic — inversely related to risk score + category bonus
  return Math.min(100, Math.round((100 - idea.riskScore) * 0.85 + 20));
}

/**
 * Score a single business idea against a user profile.
 * Returns { overall, breakdown: { budgetFit, interestMatch, resourceFit, locationPotential } }
 */
export function scoreIdea(profile, idea) {
  const budgetFit        = scoreBudgetFit(idea, profile.capital);
  const interestMatch    = scoreInterestMatch(idea, profile.interests || []);
  const resourceFit      = scoreResourceFit(idea, profile.resources || []);
  const locationPotential = scoreLocationPotential(idea);

  const overall = Math.min(
    100,
    Math.round(
      budgetFit        * 0.32 +
      interestMatch    * 0.28 +
      resourceFit      * 0.18 +
      locationPotential * 0.22
    ),
  );

  return {
    overall,
    breakdown: { budgetFit, interestMatch, resourceFit, locationPotential },
  };
}

/**
 * Returns top-N ranked recommendations for a given profile.
 */
export function getRankedRecommendations(profile, topN = 3) {
  return businessIdeas
    .map(idea => ({ ...idea, score: scoreIdea(profile, idea) }))
    .sort((a, b) => b.score.overall - a.score.overall)
    .slice(0, topN);
}
