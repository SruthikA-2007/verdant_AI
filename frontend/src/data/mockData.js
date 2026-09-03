// ─── KPI / Stats ────────────────────────────────────────────────────
export const kpiData = [
  { label: "Revenue Today", value: "₹15,240", icon: "IndianRupee", color: "blue", trend: "+8.2% vs yesterday", raw: 15240 },
  { label: "Orders", value: "23", icon: "ShoppingBag", color: "green", trend: "+3 since morning", raw: 23 },
  { label: "Low Stock Items", value: "4", icon: "AlertTriangle", color: "orange", trend: "Restock needed", raw: 4 },
  { label: "Customer Queries", value: "8", icon: "MessageSquare", color: "purple", trend: "2 unread", raw: 8 },
];

// ─── Weekly Sales ────────────────────────────────────────────────────
export const weeklyData = [
  { day: "Mon", sales: 8200, orders: 14 },
  { day: "Tue", sales: 12400, orders: 18 },
  { day: "Wed", sales: 9800, orders: 16 },
  { day: "Thu", sales: 15000, orders: 23 },
  { day: "Fri", sales: 11300, orders: 19 },
  { day: "Sat", sales: 18500, orders: 31 },
  { day: "Sun", sales: 7600, orders: 12 },
];

// ─── Monthly Revenue ─────────────────────────────────────────────────
export const monthlyData = [
  { month: "Oct", revenue: 182000, expenses: 95000 },
  { month: "Nov", revenue: 204000, expenses: 102000 },
  { month: "Dec", revenue: 251000, expenses: 112000 },
  { month: "Jan", revenue: 219000, expenses: 108000 },
  { month: "Feb", revenue: 238000, expenses: 115000 },
  { month: "Mar", revenue: 274000, expenses: 121000 },
  { month: "Apr", revenue: 195000, expenses: 98000 },
];

// ─── AI Insights ─────────────────────────────────────────────────────
export const aiInsights = [
  { type: "warning", text: "Sugar 1kg will run out today! Only 2 units left. Restock before evening rush." },
  { type: "info", text: "Saturday is your peak sales day. Stock up on Rice 5kg and Cooking Oil by Friday." },
  { type: "success", text: "Customer retention improved by 12% this week. Great job on follow-ups!" },
  { type: "tip", text: "Electricity bill increased 18% vs last month. Consider switching to LED lighting." },
];

// ─── Inventory ───────────────────────────────────────────────────────
export const inventoryData = [
  { id: 1, product: "Rice 5kg", category: "Staples", stock: 5, unit: "bags", status: "low", threshold: 10, price: 320, supplier: "Agromax Pvt Ltd" },
  { id: 2, product: "Sugar 1kg", category: "Staples", stock: 2, unit: "pkts", status: "critical", threshold: 5, price: 48, supplier: "Sweet Mills" },
  { id: 3, product: "Cooking Oil 1L", category: "Oils", stock: 20, unit: "btls", status: "good", threshold: 8, price: 180, supplier: "Fortune Traders" },
  { id: 4, product: "Wheat Flour 5kg", category: "Staples", stock: 8, unit: "bags", status: "low", threshold: 10, price: 280, supplier: "Agromax Pvt Ltd" },
  { id: 5, product: "Tea Powder 500g", category: "Beverages", stock: 15, unit: "pkts", status: "good", threshold: 6, price: 190, supplier: "Chai Box" },
  { id: 6, product: "Atta 10kg", category: "Staples", stock: 3, unit: "bags", status: "critical", threshold: 8, price: 390, supplier: "Patanjali Ltd" },
  { id: 7, product: "Cold Drink 2L", category: "Beverages", stock: 24, unit: "btls", status: "good", threshold: 10, price: 95, supplier: "Pepsi Dist." },
  { id: 8, product: "Detergent 1kg", category: "Cleaning", stock: 11, unit: "pkts", status: "good", threshold: 5, price: 160, supplier: "Surf Local" },
  { id: 9, product: "Biscuits Assorted", category: "Snacks", stock: 0, unit: "boxs", status: "critical", threshold: 10, price: 30, supplier: "Britannia" },
  { id: 10, product: "Tomato Ketchup 500g", category: "Condiments", stock: 6, unit: "btls", status: "good", threshold: 4, price: 85, supplier: "Kissan" },
];

// ─── Recent Orders ────────────────────────────────────────────────────
export const recentOrders = [
  { id: "#ORD-2841", customer: "Ravi Kumar", items: "Rice 5kg × 2, Sugar × 3", amount: "₹784", status: "delivered", time: "10 min ago" },
  { id: "#ORD-2840", customer: "Meena Sharma", items: "Cooking Oil × 1, Tea 500g × 2", amount: "₹560", status: "processing", time: "25 min ago" },
  { id: "#ORD-2839", customer: "Arun Patel", items: "Wheat Flour 5kg × 1", amount: "₹280", status: "delivered", time: "1 hr ago" },
  { id: "#ORD-2838", customer: "Sunita Devi", items: "Atta 10kg × 1, Oil × 2", amount: "₹750", status: "delivered", time: "2 hrs ago" },
  { id: "#ORD-2837", customer: "Prakash Nair", items: "Assorted Biscuits × 10", amount: "₹300", status: "cancelled", time: "3 hrs ago" },
];

// ─── Expense Data ─────────────────────────────────────────────────────
export const expenseData = {
  totalExpenses: 45000,
  profit: 22000,
  revenue: 67000,
  breakdown: [
    { category: "Rent", amount: 10000, icon: "Home", color: "#2563EB" },
    { category: "Staff Salary", amount: 15000, icon: "Users", color: "#16A34A" },
    { category: "Electricity", amount: 8000, icon: "Zap", color: "#D97706", alert: true },
    { category: "Inventory", amount: 12000, icon: "Package", color: "#7C3AED" },
  ],
  aiInsight: "Electricity bill increased by 18% compared to last month. Check if fridge/AC units are energy-efficient.",
};

// ─── Reports / Analytics ──────────────────────────────────────────────
export const reportData = {
  bestSelling: { product: "Rice 5kg", units: 142, revenue: "₹45,440", growth: "+14%" },
  returningCustomers: { count: 34, percentage: "68%", trend: "+12%" },
  peakOrderTime: { time: "6:00 PM – 8:00 PM", dayOfWeek: "Saturday" },
  salesForecast: { nextWeek: "₹1,12,000", confidence: "87%", trend: "up" },
  categoryBreakdown: [
    { name: "Staples", value: 42, color: "#2563EB" },
    { name: "Beverages", value: 21, color: "#16A34A" },
    { name: "Oils", value: 18, color: "#D97706" },
    { name: "Snacks", value: 12, color: "#7C3AED" },
    { name: "Others", value: 7, color: "#6B7280" },
  ],
  topCustomers: [
    { name: "Ravi Kumar", orders: 24, spent: "₹9,840", badge: "Regular" },
    { name: "Meena Sharma", orders: 18, spent: "₹7,200", badge: "Regular" },
    { name: "Suresh Mohan", orders: 12, spent: "₹5,600", badge: "New" },
    { name: "Arun Patel", orders: 31, spent: "₹15,200", badge: "VIP" },
  ],
};

// ─── Chat (initial message) ────────────────────────────────────────────
export const initialMessage = {
  id: 1,
  role: "assistant",
  content: "Namaste! 🙏 I'm Verdant AI, your smart business assistant. I can help your customers check product availability, place orders, and answer questions. How can I assist you today?",
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

// ─── Quick Prompts for Chat ────────────────────────────────────────────
export const quickPrompts = [
  "Is rice available?",
  "What's the price of sugar?",
  "Do you have cooking oil in stock?",
  "Place an order for wheat flour",
  "What are today's offers?",
  "அரிசி கிடைக்குமா?",
  "சர்க்கரையின் விலை என்ன?",
  "Cooking oil ஸ்டாக்கில் இருக்கா?",
  "கோதுமை மாவுக்கு ஆர்டர் செய்யவும்",
  "இன்றைய சலுகைகள் என்ன?",
];

// ─── AI System Prompt for Chat ────────────────────────────────────────
export const chatSystemPrompt = `You are Verdant AI, a smart business assistant for a small Indian retail grocery shop called "Sharma General Store" in Bangalore.

You help customers check product availability, place orders, and answer FAQs.

Current inventory:
- Rice 5kg: ₹320 (5 units available — LOW STOCK)
- Sugar 1kg: ₹48 (2 units — CRITICAL: almost out)
- Cooking Oil 1L: ₹180 (20 units)
- Wheat Flour 5kg: ₹280 (8 units — LOW STOCK)
- Tea Powder 500g: ₹190 (15 units)
- Atta 10kg: ₹390 (3 units — CRITICAL)
- Cold Drink 2L: ₹95 (24 units)
- Detergent 1kg: ₹160 (11 units)

Rules:
- Always respond in the same language the customer uses (Hindi, English, or Tamil)
- For orders, ask for customer name and delivery address
- For low stock items, warn customer about limited availability
- Be warm, friendly, concise, and helpful
- Format prices with ₹ symbol
- Keep responses short and conversational (max 3-4 sentences)
- Mention that the store is open from 8 AM to 10 PM`;

// ─── Marketing Presets ────────────────────────────────────────────────
export const marketingPresets = [
  { label: "Weekend Flash Sale", productName: "Basmati Rice 5kg", offerPercent: "15", occasion: "Weekend Special", platform: "instagram" },
  { label: "Festival Offer", productName: "Cooking Oil 1L", offerPercent: "10", occasion: "Eid Al Adha", platform: "whatsapp" },
  { label: "Clearance Deal", productName: "Wheat Flour 5kg", offerPercent: "20", occasion: "Stock Clearance", platform: "facebook" },
];

