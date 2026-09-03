import {
  ChefHat,
  ShoppingBasket,
  Shirt,
  Laptop,
  Truck,
  Egg,
  Gift,
  Store,
  Sparkles,
} from 'lucide-react';
import {
  kpiData as groceryKpiData,
  weeklyData as groceryWeeklyData,
  aiInsights as groceryAiInsights,
  recentOrders as groceryRecentOrders,
  inventoryData as groceryInventoryData,
  marketingPresets as groceryMarketingPresets,
  expenseData as groceryExpenseData,
  monthlyData as groceryMonthlyData,
  reportData as groceryReportData,
  initialMessage as groceryInitialMessage,
  quickPrompts as groceryQuickPrompts,
  chatSystemPrompt as groceryChatSystemPrompt,
} from './mockData';

export const businessSelectionOptions = [
  {
    slug: 'bakery',
    label: 'Bakery',
    category: 'Food processing',
    description: 'Plan batches, manage ingredients, and track custom cake orders.',
    route: '/bakery',
    available: true,
    icon: ChefHat,
    accent: '#D97706',
    softBg: '#FFF7ED',
  },
  {
    slug: 'grocery',
    label: 'Grocery Shop',
    category: 'Retail shop',
    description: 'Control stock, supplier reorders, and daily essential sales.',
    route: '/grocery',
    available: true,
    icon: ShoppingBasket,
    accent: '#2563EB',
    softBg: '#EFF6FF',
  },
  {
    slug: 'textile',
    label: 'Textile Business',
    category: 'Textile business',
    description: 'Coming soon: manage SKUs, production batches, and reseller orders.',
    route: '/businesses',
    available: false,
    icon: Shirt,
    accent: '#7C3AED',
    softBg: '#F5F3FF',
  },
  {
    slug: 'it-services',
    label: 'IT Services',
    category: 'IT services',
    description: 'Coming soon: capture projects, tickets, and team delivery status.',
    route: '/businesses',
    available: false,
    icon: Laptop,
    accent: '#0F766E',
    softBg: '#F0FDFA',
  },
  {
    slug: 'delivery',
    label: 'Delivery Services',
    category: 'Delivery services',
    description: 'Coming soon: monitor routes, drivers, and delivery SLAs.',
    route: '/businesses',
    available: false,
    icon: Truck,
    accent: '#DC2626',
    softBg: '#FEF2F2',
  },
  {
    slug: 'dairy-poultry',
    label: 'Dairy and Poultry Farming',
    category: 'Agribusiness',
    description: 'Coming soon: manage feed, yield, livestock, and cold-chain stock.',
    route: '/businesses',
    available: false,
    icon: Egg,
    accent: '#16A34A',
    softBg: '#F0FDF4',
  },
  {
    slug: 'ecommerce',
    label: 'E Commerce Seller',
    category: 'Online selling',
    description: 'Coming soon: sync marketplace orders, listings, and shipping labels.',
    route: '/businesses',
    available: false,
    icon: Store,
    accent: '#0284C7',
    softBg: '#F0F9FF',
  },
  {
    slug: 'home-products',
    label: 'Handmade Home Products',
    category: 'Home products',
    description: 'Coming soon: plan handmade batches, pricing, and customer follow-ups.',
    route: '/businesses',
    available: false,
    icon: Gift,
    accent: '#BE123C',
    softBg: '#FFF1F2',
  },
];

export const bakeryProfile = {
  slug: 'bakery',
  label: 'Bakery',
  category: 'Food processing',
  businessName: 'Sunrise Bakery',
  location: 'Bengaluru',
  accent: '#D97706',
  softBg: '#FFF7ED',
  badge: 'Fresh production control',
  headline: 'Keep batches, cake orders, and ingredient usage in sync every morning.',
  summary:
    'Use one dashboard for dough prep, oven batches, customer orders, wastage, and supplier tracking so the team knows what to bake next.',
  primaryActionLabel: 'Plan today\'s batches',
  primaryActionToast: 'Today\'s bakery production plan is ready.',
  overviewCards: [
    { label: 'Fresh items sold', value: '248', helper: '+14% vs yesterday' },
    { label: 'Custom orders', value: '18', helper: '7 due today' },
    { label: 'Waste rate', value: '3.2%', helper: 'Below target' },
  ],
  metrics: [
    { label: 'Morning batches', value: '12', trend: '+2 this week' },
    { label: 'Orders in queue', value: '31', trend: '9 need frosting' },
    { label: 'Ingredient alerts', value: '4', trend: 'Butter and maida low' },
    { label: 'Repeat buyers', value: '61%', trend: '+8% loyalty lift' },
  ],
  chart: {
    title: 'Production vs pre-orders',
    subtitle: 'Last 7 days',
    series: [
      { key: 'production', label: 'Produced', color: '#D97706' },
      { key: 'orders', label: 'Orders', color: '#F59E0B' },
    ],
    data: [
      { day: 'Mon', production: 118, orders: 104 },
      { day: 'Tue', production: 126, orders: 111 },
      { day: 'Wed', production: 122, orders: 115 },
      { day: 'Thu', production: 138, orders: 128 },
      { day: 'Fri', production: 146, orders: 140 },
      { day: 'Sat', production: 164, orders: 158 },
      { day: 'Sun', production: 132, orders: 120 },
    ],
  },
  operations: [
    { title: 'Morning batch', value: '120 loaves', note: 'Baked at 6:00 AM', progress: 78 },
    { title: 'Cake station', value: '9 cakes', note: 'Festive orders in progress', progress: 64 },
    { title: 'Ingredient watch', value: 'Butter low', note: 'Reorder before 5 PM', progress: 32 },
  ],
  inventoryRows: [
    { item: 'Maida 50kg', category: 'Flour', stock: '8 bags', supplier: 'Royal Mills', nextRestock: 'Today 5 PM', tone: 'warning', status: 'Low stock' },
    { item: 'Butter 1kg', category: 'Dairy', stock: '3 packs', supplier: 'Fresh Dairy', nextRestock: 'Today 3 PM', tone: 'danger', status: 'Critical' },
    { item: 'Sugar 1kg', category: 'Sweeteners', stock: '16 packs', supplier: 'Sweet Mills', nextRestock: 'Friday', tone: 'success', status: 'Healthy' },
    { item: 'Bread tins', category: 'Equipment', stock: '24 units', supplier: 'BakePro', nextRestock: 'Next week', tone: 'success', status: 'Healthy' },
  ],
  orderRows: [
    { id: '#BK-2401', customer: 'Ayesha Khan', items: '2 cake boxes, 12 buns', amount: '₹2,480', status: 'Packed', slot: '4:30 PM' },
    { id: '#BK-2402', customer: 'Kabir Rao', items: 'Birthday cake, 20 muffins', amount: '₹3,900', status: 'In progress', slot: '5:15 PM' },
    { id: '#BK-2403', customer: 'Hotel Lotus', items: '40 bread loaves', amount: '₹4,800', status: 'Scheduled', slot: 'Tomorrow' },
  ],
  insights: [
    {
      title: 'Festival demand is climbing',
      text: 'Sweet buns and custom cakes are trending 18% above average. Increase morning batch size by 15%.',
      tone: 'warning',
    },
    {
      title: 'Waste is under control',
      text: 'Yesterday\'s leftovers stayed below target thanks to smaller evening batches.',
      tone: 'success',
    },
    {
      title: 'Next supplier order',
      text: 'Maida, butter, and topping mix should be reordered before the evening rush.',
      tone: 'info',
    },
  ],
  quickActions: [
    { label: 'Create festival combo', hint: 'Generate a cake + pastry bundle.' },
    { label: 'Print production sheet', hint: 'Share the baking plan with staff.' },
    { label: 'Send low-stock alert', hint: 'Notify the purchase team instantly.' },
  ],
};

export const groceryProfile = {
  slug: 'grocery',
  label: 'Grocery Shop',
  category: 'Retail shop',
  businessName: 'Sharma General Store',
  location: 'Bangalore',
  accent: '#2563EB',
  softBg: '#EFF6FF',
  badge: 'Retail control center',
  headline: 'Track fast-moving stock, supplier orders, and daily sales in one place.',
  summary:
    'See essentials, low-stock alerts, customer orders, and daily sales together so the store stays stocked through the evening rush.',
  primaryActionLabel: 'Reorder essentials',
  primaryActionToast: 'Purchase draft prepared for essential items.',
  overviewCards: [
    { label: 'Revenue today', value: '₹15,240', helper: '+8.2% vs yesterday' },
    { label: 'Orders completed', value: '23', helper: '5 pickup orders pending' },
    { label: 'Low stock items', value: '4', helper: '2 critical items' },
  ],
  metrics: [
    { label: 'Active SKUs', value: '248', trend: '12 added this month' },
    { label: 'Supplier reorders', value: '5', trend: '3 due today' },
    { label: 'Customer queries', value: '8', trend: '2 awaiting reply' },
    { label: 'Repeat buyers', value: '68%', trend: '+12% loyalty lift' },
  ],
  chart: {
    title: 'Sales vs orders',
    subtitle: 'Last 7 days',
    series: [
      { key: 'sales', label: 'Sales', color: '#2563EB' },
      { key: 'orders', label: 'Orders', color: '#16A34A' },
    ],
    data: [
      { day: 'Mon', sales: 8200, orders: 14 },
      { day: 'Tue', sales: 12400, orders: 18 },
      { day: 'Wed', sales: 9800, orders: 16 },
      { day: 'Thu', sales: 15000, orders: 23 },
      { day: 'Fri', sales: 11300, orders: 19 },
      { day: 'Sat', sales: 18500, orders: 31 },
      { day: 'Sun', sales: 7600, orders: 12 },
    ],
  },
  operations: [
    { title: 'Supplier follow-up', value: '5 reorders', note: 'Call before noon', progress: 72 },
    { title: 'Front shelf fill', value: '92% stocked', note: 'Aisles 1 and 3 are full', progress: 92 },
    { title: 'Billing queue', value: '9 bills', note: 'Evening rush starts at 6 PM', progress: 48 },
  ],
  inventoryRows: [
    { item: 'Rice 5kg', category: 'Staples', stock: '5 bags', supplier: 'Agromax Pvt Ltd', nextRestock: 'Today 6 PM', tone: 'warning', status: 'Low stock' },
    { item: 'Sugar 1kg', category: 'Staples', stock: '2 packs', supplier: 'Sweet Mills', nextRestock: 'Today 4 PM', tone: 'danger', status: 'Critical' },
    { item: 'Cooking oil 1L', category: 'Oils', stock: '20 bottles', supplier: 'Fortune Traders', nextRestock: 'Friday', tone: 'success', status: 'Healthy' },
    { item: 'Biscuits assorted', category: 'Snacks', stock: '0 boxes', supplier: 'Britannia', nextRestock: 'Today 2 PM', tone: 'danger', status: 'Out of stock' },
  ],
  orderRows: [
    { id: '#ORD-2841', customer: 'Ravi Kumar', items: 'Rice 5kg x 2, Sugar x 3', amount: '₹784', status: 'Delivered', slot: '10 min ago' },
    { id: '#ORD-2840', customer: 'Meena Sharma', items: 'Oil x 1, Tea 500g x 2', amount: '₹560', status: 'Processing', slot: '25 min ago' },
    { id: '#ORD-2839', customer: 'Arun Patel', items: 'Wheat flour 5kg x 1', amount: '₹280', status: 'Packed', slot: '1 hr ago' },
  ],
  insights: [
    {
      title: 'Saturday remains the peak day',
      text: 'Stock up on rice, oil, and snacks by Friday evening to avoid missed sales.',
      tone: 'warning',
    },
    {
      title: 'Customer retention improved',
      text: 'Reminder messages and reorder follow-ups are converting repeat buyers faster.',
      tone: 'success',
    },
    {
      title: 'Cashflow is healthy',
      text: 'Today\'s sales are ahead of target, so the next purchase order can include higher fast-moving stock.',
      tone: 'info',
    },
  ],
  quickActions: [
    { label: 'Generate purchase order', hint: 'Create a supplier refill draft.' },
    { label: 'Broadcast daily offers', hint: 'Push discount messages to customers.' },
    { label: 'Export sales report', hint: 'Download today\'s summary for accounting.' },
  ],
};

export const groceryWorkspace = {
  dashboard: {
    title: 'Owner Dashboard',
    subtitle: 'Welcome back, Rajesh! Here\'s your business summary.',
    kpiData: groceryKpiData,
    weeklyData: groceryWeeklyData,
    aiInsights: groceryAiInsights,
    recentOrders: groceryRecentOrders,
    supplierInsights: [
      { type: 'warning', text: 'Sweet Mills has delayed 2 deliveries this month. Keep a backup sugar supplier active.' },
      { type: 'success', text: 'Fortune Traders maintains 96% on-time delivery and stable pricing for oil stock.' },
      { type: 'info', text: 'Agromax lead time reduced from 3 days to 2 days. Place Friday reorders before noon.' },
    ],
    supplierSnapshot: [
      { name: 'Agromax Pvt Ltd', category: 'Staples', lastDelivery: 'Today', reliability: 92, status: 'Stable' },
      { name: 'Sweet Mills', category: 'Sugar & Sweeteners', lastDelivery: '2 days ago', reliability: 78, status: 'Watchlist' },
      { name: 'Fortune Traders', category: 'Oils', lastDelivery: 'Yesterday', reliability: 96, status: 'Preferred' },
    ],
  },
  chatbot: {
    title: 'AI Customer Assistant',
    subtitle: 'Powered by Claude — answers customer queries 24/7',
    storeContext: 'Sharma General Store, Bangalore',
    languages: ['English', 'हिंदी', 'தமிழ்'],
    channels: ['Web Chat', 'WhatsApp Ready'],
    stats: { queriesToday: 8, resolved: 6, averageResponse: '1.2s' },
    quickPrompts: groceryQuickPrompts,
    initialMessage: groceryInitialMessage,
    systemPrompt: groceryChatSystemPrompt,
  },
  inventory: {
    title: 'Inventory Management',
    subtitle: 'Track stock levels, get AI alerts, and manage products',
    inventoryData: groceryInventoryData,
  },
  marketing: {
    title: 'AI Marketing Generator',
    subtitle: 'Generate promotional content for Instagram, WhatsApp & Facebook in seconds',
    presets: groceryMarketingPresets,
    businessName: 'Sharma General Store',
  },
  billing: {
    title: 'Automated Billing',
    subtitle: 'Generate invoices, run reminders, and track collections automatically',
    summary: {
      billsToday: 27,
      autoPaid: 14,
      pending: 9,
      collectionToday: 'Rs 24,860',
    },
    automationRules: [
      { id: 'g-auto-1', label: 'Auto-generate daily invoices at close', enabled: true, schedule: 'Every day • 09:30 PM' },
      { id: 'g-auto-2', label: 'Auto-send WhatsApp invoice copy', enabled: true, schedule: 'Immediately after invoice' },
      { id: 'g-auto-3', label: 'Auto reminder for pending payments', enabled: true, schedule: 'Every 24 hrs' },
    ],
    scheduledRuns: [
      { task: 'Daily invoice batch', nextRun: 'Today 09:30 PM', channel: 'System queue', status: 'scheduled' },
      { task: 'Pending payment reminders', nextRun: 'Today 06:00 PM', channel: 'WhatsApp', status: 'scheduled' },
      { task: 'Weekly tax export', nextRun: 'Sunday 08:00 PM', channel: 'Email', status: 'scheduled' },
    ],
    invoices: [
      { id: 'INV-GR-2405', customer: 'Ravi Kumar', amount: 784, dueDate: '15 Apr', method: 'UPI', status: 'paid' },
      { id: 'INV-GR-2406', customer: 'Meena Sharma', amount: 560, dueDate: '16 Apr', method: 'Cash', status: 'pending' },
      { id: 'INV-GR-2407', customer: 'Arun Patel', amount: 280, dueDate: '16 Apr', method: 'UPI', status: 'pending' },
      { id: 'INV-GR-2408', customer: 'Sunita Devi', amount: 750, dueDate: '14 Apr', method: 'Bank Transfer', status: 'overdue' },
    ],
  },
  expenses: {
    title: 'Expense & Profit Tracker',
    subtitle: 'Monthly financial overview with AI cost analysis',
    expenseData: groceryExpenseData,
    monthlyData: groceryMonthlyData,
  },
  reports: {
    title: 'Business Reports',
    subtitle: 'AI-powered analytics and sales forecasting',
    reportData: groceryReportData,
  },
  suppliers: {
    title: 'Supplier Management',
    subtitle: 'Track reliability, lead times, and payment terms for all vendors',
    suppliers: [
      { id: 'SUP-GR-01', name: 'Agromax Pvt Ltd', category: 'Staples', contact: 'Vikram Jain', phone: '+91 98765 22110', location: 'Yeshwanthpur, Bangalore', lastDelivery: '15 Apr', leadTime: '2 days', reliability: 92, paymentTerms: '14 days credit', status: 'active', monthlyValue: '₹1,45,000' },
      { id: 'SUP-GR-02', name: 'Sweet Mills', category: 'Sugar & Sweeteners', contact: 'Nitin Rao', phone: '+91 98450 33012', location: 'Tumkur', lastDelivery: '13 Apr', leadTime: '3 days', reliability: 78, paymentTerms: 'Advance 50%', status: 'watch', monthlyValue: '₹58,000' },
      { id: 'SUP-GR-03', name: 'Fortune Traders', category: 'Oils', contact: 'Ayesha Ali', phone: '+91 99861 44552', location: 'Peenya', lastDelivery: '14 Apr', leadTime: '1 day', reliability: 96, paymentTerms: '21 days credit', status: 'preferred', monthlyValue: '₹92,000' },
      { id: 'SUP-GR-04', name: 'Britannia Dist.', category: 'Snacks', contact: 'Rohan Joseph', phone: '+91 96111 55664', location: 'KR Puram', lastDelivery: '11 Apr', leadTime: '2 days', reliability: 85, paymentTerms: '7 days credit', status: 'active', monthlyValue: '₹74,000' },
    ],
    insights: [
      '1 supplier is on watchlist due to repeated delays.',
      'Preferred suppliers contribute 54% of purchase value.',
      'Average lead time improved to 2.0 days this month.',
    ],
  },
};

export const bakeryWorkspace = {
  dashboard: {
    title: 'Bakery Dashboard',
    subtitle: 'Good morning! Here\'s the bakery production summary.',
    kpiData: [
      { label: 'Revenue Today', value: '₹18,960', icon: 'IndianRupee', color: 'blue', trend: '+11% vs yesterday', raw: 18960 },
      { label: 'Orders', value: '36', icon: 'ShoppingBag', color: 'green', trend: '+6 pre-orders before noon', raw: 36 },
      { label: 'Low Stock Items', value: '5', icon: 'AlertTriangle', color: 'orange', trend: 'Butter and flour reorder needed', raw: 5 },
      { label: 'Customer Queries', value: '12', icon: 'MessageSquare', color: 'purple', trend: 'Birthday cake requests', raw: 12 },
    ],
    weeklyData: [
      { day: 'Mon', sales: 9200, orders: 16 },
      { day: 'Tue', sales: 11100, orders: 19 },
      { day: 'Wed', sales: 10800, orders: 18 },
      { day: 'Thu', sales: 14500, orders: 24 },
      { day: 'Fri', sales: 13800, orders: 22 },
      { day: 'Sat', sales: 19200, orders: 34 },
      { day: 'Sun', sales: 12700, orders: 21 },
    ],
    aiInsights: [
      { type: 'warning', text: 'Butter will run out by 4 PM. Reorder 5 packs before the evening cake rush.' },
      { type: 'info', text: 'Weekend orders for cream cakes are up 22%. Add one extra frosting batch.' },
      { type: 'success', text: 'Morning buns sold out 40 minutes faster than last week. Great batch planning.' },
      { type: 'tip', text: 'Gas usage was higher on Friday. Group oven batches to reduce idle heating time.' },
    ],
    recentOrders: [
      { id: '#BK-2401', customer: 'Ayesha Khan', items: '2 cake boxes, 12 buns', amount: '₹2,480', status: 'processing', time: '10 min ago' },
      { id: '#BK-2402', customer: 'Kabir Rao', items: 'Birthday cake, 20 muffins', amount: '₹3,900', status: 'delivered', time: '25 min ago' },
      { id: '#BK-2403', customer: 'Hotel Lotus', items: '40 bread loaves', amount: '₹4,800', status: 'processing', time: '1 hr ago' },
      { id: '#BK-2404', customer: 'Nina Joseph', items: 'Wedding cake, cupcakes', amount: '₹6,200', status: 'delivered', time: '2 hrs ago' },
      { id: '#BK-2405', customer: 'Cafe Nova', items: 'Croissants, donuts', amount: '₹1,420', status: 'cancelled', time: '3 hrs ago' },
    ],
    supplierInsights: [
      { type: 'warning', text: 'Fresh Dairy butter deliveries slipped twice this week. Keep emergency stock buffer of 2 packs.' },
      { type: 'success', text: 'Royal Mills maintained 95% fill rate for flour with no quality rejection this month.' },
      { type: 'info', text: 'PackWell can deliver cake boxes in 24 hours for urgent festive orders.' },
    ],
    supplierSnapshot: [
      { name: 'Royal Mills', category: 'Flour', lastDelivery: 'Today', reliability: 95, status: 'Preferred' },
      { name: 'Fresh Dairy', category: 'Dairy', lastDelivery: 'Yesterday', reliability: 81, status: 'Watchlist' },
      { name: 'PackWell', category: 'Packaging', lastDelivery: 'Today', reliability: 93, status: 'Stable' },
    ],
  },
  chatbot: {
    title: 'AI Bakery Assistant',
    subtitle: 'Powered by Claude — handles orders and availability 24/7',
    storeContext: 'Sunrise Bakery, Bengaluru',
    languages: ['English', 'हिंदी', 'தமிழ்'],
    channels: ['Web Chat', 'WhatsApp Ready'],
    stats: { queriesToday: 12, resolved: 9, averageResponse: '1.1s' },
    quickPrompts: ['Is fresh bread available?', 'How much is a birthday cake?', 'Can I pre-order muffins?', 'Do you have eggless options?', 'What are today\'s specials?'],
    initialMessage: {
      id: 1,
      role: 'assistant',
      content: 'Namaste! 👩‍🍳 I\'m Sunrise Bakery\'s assistant. I can help with cake orders, batch availability, pricing, and pickup slots. How can I help today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    systemPrompt: `You are an assistant for a small Indian bakery called "Sunrise Bakery" in Bengaluru.

You help customers check cake and bread availability, place orders, and ask about pickup slots.

Current products:
- Bread loaf: ₹40
- Buns (6 pack): ₹55
- Muffins (4 pack): ₹120
- Birthday cake: ₹1,200
- Wedding cake: ₹5,500
- Croissants (4 pack): ₹160

Rules:
- Reply in the same language as the customer.
- Ask for name, pickup time, and custom note for cake orders.
- Warn when ingredients or popular items are low.
- Be warm, short, and helpful.
- Keep responses to 3-4 sentences max.`,
  },
  inventory: {
    title: 'Bakery Inventory Management',
    subtitle: 'Track ingredients, packs, and equipment used in daily production',
    inventoryData: [
      { id: 1, product: 'Maida 50kg', category: 'Flour', stock: 8, unit: 'bags', status: 'low', threshold: 12, price: 1650, supplier: 'Royal Mills' },
      { id: 2, product: 'Butter 1kg', category: 'Dairy', stock: 3, unit: 'packs', status: 'critical', threshold: 6, price: 420, supplier: 'Fresh Dairy' },
      { id: 3, product: 'Sugar 1kg', category: 'Sweeteners', stock: 16, unit: 'packs', status: 'good', threshold: 8, price: 48, supplier: 'Sweet Mills' },
      { id: 4, product: 'Cream 500ml', category: 'Dairy', stock: 6, unit: 'packs', status: 'low', threshold: 8, price: 190, supplier: 'Farm Fresh' },
      { id: 5, product: 'Bread tins', category: 'Equipment', stock: 24, unit: 'units', status: 'good', threshold: 10, price: 650, supplier: 'BakePro' },
      { id: 6, product: 'Eggs', category: 'Ingredient', stock: 0, unit: 'dozens', status: 'critical', threshold: 5, price: 75, supplier: 'Local Farm' },
      { id: 7, product: 'Chocolate chips', category: 'Ingredient', stock: 11, unit: 'packs', status: 'good', threshold: 4, price: 120, supplier: 'Bakers Hub' },
      { id: 8, product: 'Cake boxes', category: 'Packaging', stock: 18, unit: 'boxes', status: 'good', threshold: 8, price: 32, supplier: 'PackWell' },
    ],
  },
  marketing: {
    title: 'Bakery Marketing Generator',
    subtitle: 'Create offers for cakes, buns, and festive combo boxes in seconds',
    presets: [
      { label: 'Birthday Special', productName: 'Chocolate Truffle Cake', offerPercent: '10', occasion: 'Birthday Party', platform: 'instagram' },
      { label: 'Weekend Combo', productName: 'Fresh Buns Box', offerPercent: '15', occasion: 'Weekend Special', platform: 'whatsapp' },
      { label: 'Festival Treat', productName: 'Assorted Pastry Pack', offerPercent: '20', occasion: 'Festival Season', platform: 'facebook' },
    ],
    businessName: 'Sunrise Bakery',
  },
  billing: {
    title: 'Bakery Automated Billing',
    subtitle: 'Run recurring invoices, delivery billing, and payment reminders from one panel',
    summary: {
      billsToday: 19,
      autoPaid: 8,
      pending: 7,
      collectionToday: 'Rs 31,420',
    },
    automationRules: [
      { id: 'b-auto-1', label: 'Auto-generate order invoice on dispatch', enabled: true, schedule: 'Real-time' },
      { id: 'b-auto-2', label: 'Auto-send GST invoice PDF', enabled: true, schedule: 'Within 2 minutes' },
      { id: 'b-auto-3', label: 'Auto reminder for B2B dues', enabled: false, schedule: 'Every 48 hrs' },
    ],
    scheduledRuns: [
      { task: 'Dispatch invoice sync', nextRun: 'Next order event', channel: 'System queue', status: 'active' },
      { task: 'B2B due reminders', nextRun: 'Tomorrow 11:00 AM', channel: 'Email + WhatsApp', status: 'paused' },
      { task: 'Monthly billing export', nextRun: '30 Apr 08:30 PM', channel: 'Drive backup', status: 'scheduled' },
    ],
    invoices: [
      { id: 'INV-BK-2401', customer: 'Ayesha Khan', amount: 2480, dueDate: '15 Apr', method: 'UPI', status: 'paid' },
      { id: 'INV-BK-2402', customer: 'Kabir Rao', amount: 3900, dueDate: '16 Apr', method: 'Card', status: 'pending' },
      { id: 'INV-BK-2403', customer: 'Hotel Lotus', amount: 4800, dueDate: '17 Apr', method: 'Bank Transfer', status: 'pending' },
      { id: 'INV-BK-2404', customer: 'Cafe Nova', amount: 1420, dueDate: '14 Apr', method: 'UPI', status: 'overdue' },
    ],
  },
  expenses: {
    title: 'Bakery Expense Tracker',
    subtitle: 'Monitor ingredient cost, oven fuel, and daily profit',
    expenseData: {
      totalExpenses: 52800,
      profit: 31800,
      revenue: 84600,
      breakdown: [
        { category: 'Ingredients', amount: 28000, icon: 'Package', color: '#2563EB' },
        { category: 'Staff Salary', amount: 15000, icon: 'Users', color: '#16A34A' },
        { category: 'Gas & Electricity', amount: 6200, icon: 'Zap', color: '#D97706', alert: true },
        { category: 'Packaging', amount: 3600, icon: 'Home', color: '#7C3AED' },
      ],
      aiInsight: 'Ingredient cost increased 9% this month. Review wheat and cream suppliers before the next festival batch.',
    },
    monthlyData: [
      { month: 'Oct', revenue: 162000, expenses: 98000 },
      { month: 'Nov', revenue: 188000, expenses: 101000 },
      { month: 'Dec', revenue: 235000, expenses: 118000 },
      { month: 'Jan', revenue: 224000, expenses: 109000 },
      { month: 'Feb', revenue: 248000, expenses: 116000 },
      { month: 'Mar', revenue: 286000, expenses: 127000 },
      { month: 'Apr', revenue: 205000, expenses: 101000 },
    ],
  },
  reports: {
    title: 'Bakery Reports',
    subtitle: 'Production, orders, and customer insights for the bakery team',
    reportData: {
      bestSelling: { product: 'Birthday Cake', units: 92, revenue: '₹1,10,400', growth: '+19%' },
      returningCustomers: { count: 48, percentage: '72%', trend: '+10%' },
      peakOrderTime: { time: '4:00 PM – 7:00 PM', dayOfWeek: 'Saturday' },
      salesForecast: { nextWeek: '₹1,42,000', confidence: '84%', trend: 'up' },
      categoryBreakdown: [
        { name: 'Cakes', value: 38, color: '#2563EB' },
        { name: 'Breads', value: 24, color: '#16A34A' },
        { name: 'Pastries', value: 22, color: '#D97706' },
        { name: 'Cupcakes', value: 10, color: '#7C3AED' },
        { name: 'Others', value: 6, color: '#6B7280' },
      ],
      topCustomers: [
        { name: 'Ayesha Khan', orders: 16, spent: '₹12,800', badge: 'VIP' },
        { name: 'Hotel Lotus', orders: 9, spent: '₹24,000', badge: 'Regular' },
        { name: 'Kabir Rao', orders: 7, spent: '₹9,600', badge: 'Regular' },
        { name: 'Cafe Nova', orders: 11, spent: '₹8,200', badge: 'New' },
      ],
    },
  },
  suppliers: {
    title: 'Bakery Suppliers',
    subtitle: 'Manage ingredient vendors, packaging partners, and lead-time risks',
    suppliers: [
      { id: 'SUP-BK-01', name: 'Royal Mills', category: 'Flour', contact: 'Sanjay Mehta', phone: '+91 98801 12090', location: 'Nelamangala', lastDelivery: '15 Apr', leadTime: '1 day', reliability: 95, paymentTerms: '15 days credit', status: 'preferred', monthlyValue: '₹1,12,000' },
      { id: 'SUP-BK-02', name: 'Fresh Dairy', category: 'Dairy', contact: 'Pooja Nair', phone: '+91 98444 33129', location: 'Hosur', lastDelivery: '14 Apr', leadTime: '2 days', reliability: 81, paymentTerms: 'Advance 30%', status: 'watch', monthlyValue: '₹86,000' },
      { id: 'SUP-BK-03', name: 'Sweet Mills', category: 'Sweeteners', contact: 'Nitin Rao', phone: '+91 98450 33012', location: 'Tumkur', lastDelivery: '13 Apr', leadTime: '2 days', reliability: 89, paymentTerms: '14 days credit', status: 'active', monthlyValue: '₹52,000' },
      { id: 'SUP-BK-04', name: 'PackWell', category: 'Packaging', contact: 'Lavanya Das', phone: '+91 99009 55122', location: 'Bommasandra', lastDelivery: '15 Apr', leadTime: '1 day', reliability: 93, paymentTerms: '21 days credit', status: 'active', monthlyValue: '₹44,000' },
    ],
    insights: [
      'Dairy supplier reliability dipped below 85% this week.',
      'Packaging supplier lead time is the fastest at 1 day.',
      'Top 2 suppliers cover 68% of monthly procurement value.',
    ],
  },
};

bakeryProfile.workspace = bakeryWorkspace;
groceryProfile.workspace = groceryWorkspace;
