// ─── Financial Calculations ───────────────────────────────────────────────────

function parseCurrency(val = '') {
  return parseInt(String(val).replace(/[^0-9]/g, '') || '0');
}

/**
 * Calculate full financial plan for a selected business idea and user profile.
 */
export function calculateFinancials(idea, profile) {
  const capital = parseCurrency(profile?.capital);
  const startupCosts = idea.startupCostBreakdown || [];
  const totalStartup = startupCosts.reduce((s, i) => s + i.amount, 0);

  const monthlyRevenue = idea.monthlyRevenueBase || 0;
  const monthlyExpenses = idea.monthlyExpenseBase || 0;
  const monthlyProfit = monthlyRevenue - monthlyExpenses;
  const fundingGap = Math.max(0, totalStartup - capital);
  const breakEvenMonths = monthlyProfit > 0 ? Math.ceil(totalStartup / monthlyProfit) : 999;

  const revenueBreakdown = idea.monthlyBreakdown?.revenue || [];
  const expenseBreakdown = idea.monthlyBreakdown?.expenses || [];

  return {
    startupCosts,
    totalStartup,
    revenueBreakdown,
    expenseBreakdown,
    monthlyRevenue,
    monthlyExpenses,
    monthlyProfit,
    capital,
    fundingGap,
    breakEvenMonths,
  };
}

