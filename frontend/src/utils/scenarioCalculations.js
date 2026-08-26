// ─── Scenario Calculations ────────────────────────────────────────────────────

/**
 * Apply slider changes to the base financial plan and return new numbers + risk level.
 * @param {object} base - { monthlyRevenue, monthlyExpenses, monthlyProfit, totalStartup }
 * @param {number} salesChangePct  - e.g. -20 for "sales drop 20%"
 * @param {number} costChangePct   - e.g. 15 for "costs rise 15%"
 * @param {number} priceChangePct  - e.g. 10 for "price up 10%"
 */
export function calculateScenario(base, salesChangePct, costChangePct, priceChangePct) {
  const saleMult  = 1 + salesChangePct / 100;
  const costMult  = 1 + costChangePct  / 100;
  const priceMult = 1 + priceChangePct / 100;

  const revenue  = Math.round(base.monthlyRevenue  * saleMult * priceMult);
  const expenses = Math.round(base.monthlyExpenses * costMult);
  const profit   = revenue - expenses;

  const breakEven = profit > 0 ? Math.ceil(base.totalStartup / profit) : 999;

  let risk;
  const ratio = base.monthlyProfit > 0 ? profit / base.monthlyProfit : 0;
  if (ratio >= 0.8)      risk = 'low';
  else if (ratio >= 0.4) risk = 'medium';
  else if (profit > 0)   risk = 'high';
  else                   risk = 'critical';

  return { revenue, expenses, profit, breakEven, risk };
}

export function getRiskMeta(risk) {
  return {
    low:      { label: 'LOW RISK',       emoji: '✅', color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
    medium:   { label: 'MODERATE RISK',  emoji: '⚠️', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
    high:     { label: 'HIGH RISK',      emoji: '🚨', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
    critical: { label: 'CRITICAL — LOSS',emoji: '❌', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  }[risk] || { label: 'MODERATE RISK', emoji: '⚠️', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' };
}

export const PRESET_SCENARIOS = [
  { id: 'normal',    label: 'Normal',      sales:   0, cost:   0, price:  0 },
  { id: 'sales-dn',  label: 'Sales −20%',  sales: -20, cost:   0, price:  0 },
  { id: 'sales-up',  label: 'Sales +20%',  sales:  20, cost:   0, price:  0 },
  { id: 'cost-up',   label: 'Costs +15%',  sales:   0, cost:  15, price:  0 },
  { id: 'best',      label: 'Best Case',   sales:  20, cost: -10, price: 10 },
];
