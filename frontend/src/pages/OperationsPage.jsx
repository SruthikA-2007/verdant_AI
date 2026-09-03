import { useMemo, useState } from 'react';
import { AlertTriangle, FileText, Package, Plus, Search } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import './OperationsPage.css';

const statusConfig = {
  critical: { label: 'Critical', cls: 'badge-danger' },
  low: { label: 'Low Stock', cls: 'badge-warning' },
  good: { label: 'In Stock', cls: 'badge-success' },
};

const invoiceStatusConfig = {
  paid: { cls: 'badge-success', label: 'Paid' },
  pending: { cls: 'badge-warning', label: 'Pending' },
  overdue: { cls: 'badge-danger', label: 'Overdue' },
};

export default function OperationsPage({ business, onToast }) {
  const inventorySeed = business?.workspace?.inventory?.inventoryData || [];
  const billingSeed = business?.workspace?.billing?.invoices || [];

  const [activeTab, setActiveTab] = useState('inventory');
  const [inventory, setInventory] = useState(inventorySeed);
  const [invoices, setInvoices] = useState(billingSeed);
  const [search, setSearch] = useState('');
  const [inventoryForm, setInventoryForm] = useState({ product: '', stock: '', category: '' });
  const [invoiceForm, setInvoiceForm] = useState({ customer: '', dueDate: '', productId: '', quantity: '1' });
  const [invoiceItems, setInvoiceItems] = useState([]);

  const productCatalog = useMemo(
    () => inventory.map((item) => ({
      id: String(item.id),
      product: item.product,
      price: Number(item.price) || 0,
      unit: item.unit || 'units',
    })),
    [inventory],
  );

  const filteredInventory = useMemo(() => {
    return inventory
      .filter((item) => item.product.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.stock - b.stock);
  }, [inventory, search]);

  const lowStockCount = inventory.filter((item) => item.status === 'low' || item.status === 'critical').length;

  const salesHistory = useMemo(() => {
    return invoices
      .slice()
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((invoice, index) => ({
        id: `SALE-${index + 1}`,
        customer: invoice.customer,
        amount: invoice.amount,
        method: invoice.method || 'Cash',
      }));
  }, [invoices]);

  const invoiceTotal = useMemo(
    () => invoiceItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    [invoiceItems],
  );

  const submitInventory = (event) => {
    event.preventDefault();
    if (!inventoryForm.product || !inventoryForm.stock) {
      return;
    }

    const stock = Number(inventoryForm.stock);
    const threshold = 5;
    const status = stock === 0 ? 'critical' : stock < threshold ? 'low' : 'good';

    setInventory((prev) => [
      {
        id: Date.now(),
        product: inventoryForm.product,
        category: inventoryForm.category || 'General',
        stock,
        threshold,
        unit: 'units',
        price: 0,
        supplier: '-',
        status,
      },
      ...prev,
    ]);

    setInventoryForm({ product: '', stock: '', category: '' });
    onToast?.('Product added to inventory.', 'success');
  };

  const submitInvoice = (event) => {
    event.preventDefault();
    if (!invoiceForm.customer || !invoiceForm.dueDate || invoiceItems.length === 0) {
      onToast?.('Add customer, due date, and at least one product item.', 'warning');
      return;
    }

    setInvoices((prev) => [
      {
        id: `INV-${String(Date.now()).slice(-5)}`,
        customer: invoiceForm.customer,
        amount: invoiceTotal,
        dueDate: invoiceForm.dueDate,
        method: 'Cash',
        status: 'pending',
        items: invoiceItems,
      },
      ...prev,
    ]);

    setInvoiceForm({ customer: '', dueDate: '', productId: '', quantity: '1' });
    setInvoiceItems([]);
    onToast?.('Invoice created successfully.', 'success');
  };

  const addInvoiceItem = () => {
    const selectedProduct = productCatalog.find((item) => item.id === invoiceForm.productId);
    const quantity = Math.max(1, Number(invoiceForm.quantity) || 1);

    if (!selectedProduct) {
      onToast?.('Select a product first.', 'warning');
      return;
    }

    setInvoiceItems((prev) => {
      const existing = prev.find((item) => item.productId === selectedProduct.id);
      if (existing) {
        return prev.map((item) => item.productId === selectedProduct.id ? { ...item, quantity: item.quantity + quantity } : item);
      }

      return [
        ...prev,
        {
          productId: selectedProduct.id,
          product: selectedProduct.product,
          quantity,
          price: selectedProduct.price,
          unit: selectedProduct.unit,
        },
      ];
    });

    setInvoiceForm((prev) => ({ ...prev, productId: '', quantity: '1' }));
  };

  const removeInvoiceItem = (productId) => {
    setInvoiceItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  return (
    <div className="page-wrap">
      <Topbar title="Operations" subtitle="Manage inventory and billing from one workspace" />
      <div className="ops-content animate-fade-in">
        <div className="ops-tabs card">
          <button className={activeTab === 'inventory' ? 'ops-tab ops-tab--active' : 'ops-tab'} onClick={() => setActiveTab('inventory')}>
            <Package size={14} /> Inventory
          </button>
          <button className={activeTab === 'billing' ? 'ops-tab ops-tab--active' : 'ops-tab'} onClick={() => setActiveTab('billing')}>
            <FileText size={14} /> Billing
          </button>
        </div>

        {activeTab === 'inventory' && (
          <section className="ops-grid">
            <article className="card ops-panel">
              <div className="ops-panel__header">
                <h3>Inventory List</h3>
                <div className="ops-search">
                  <Search size={14} />
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" />
                </div>
              </div>
              {lowStockCount > 0 && (
                <div className="ops-alert">
                  <AlertTriangle size={14} />
                  <span>{lowStockCount} products are low in stock</span>
                </div>
              )}
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Stock</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.id}>
                        <td>{item.product}</td>
                        <td>{item.stock}</td>
                        <td>
                          <span className={`badge ${statusConfig[item.status]?.cls || 'badge-gray'}`}>
                            {statusConfig[item.status]?.label || 'Unknown'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="card ops-panel">
              <h3>Add / Edit Product</h3>
              <form className="ops-form" onSubmit={submitInventory}>
                <label>
                  Product Name
                  <input className="input" value={inventoryForm.product} onChange={(event) => setInventoryForm((prev) => ({ ...prev, product: event.target.value }))} required />
                </label>
                <label>
                  Category
                  <input className="input" value={inventoryForm.category} onChange={(event) => setInventoryForm((prev) => ({ ...prev, category: event.target.value }))} />
                </label>
                <label>
                  Stock Qty
                  <input type="number" min="0" className="input" value={inventoryForm.stock} onChange={(event) => setInventoryForm((prev) => ({ ...prev, stock: event.target.value }))} required />
                </label>
                <button className="btn btn-primary" type="submit"><Plus size={14} /> Save Product</button>
              </form>
            </article>
          </section>
        )}

        {activeTab === 'billing' && (
          <section className="ops-grid">
            <article className="card ops-panel">
              <h3>Create Invoice</h3>
              <form className="ops-form" onSubmit={submitInvoice}>
                <label>
                  Customer
                  <input className="input" value={invoiceForm.customer} onChange={(event) => setInvoiceForm((prev) => ({ ...prev, customer: event.target.value }))} required />
                </label>
                <label>
                  Product List
                  <select className="select" value={invoiceForm.productId} onChange={(event) => setInvoiceForm((prev) => ({ ...prev, productId: event.target.value }))}>
                    <option value="">Select Product</option>
                    {productCatalog.map((product) => (
                      <option key={product.id} value={product.id}>{product.product} (Rs {product.price})</option>
                    ))}
                  </select>
                </label>
                <label>
                  Quantity
                  <input type="number" min="1" className="input" value={invoiceForm.quantity} onChange={(event) => setInvoiceForm((prev) => ({ ...prev, quantity: event.target.value }))} />
                </label>

                <button className="btn btn-outline" type="button" onClick={addInvoiceItem}><Plus size={14} /> Add Item</button>

                <div className="ops-items-box">
                  <p className="ops-items-box__title">Invoice Items</p>
                  {invoiceItems.length === 0 && <p className="ops-items-box__empty">No products added yet.</p>}
                  {invoiceItems.length > 0 && (
                    <div className="ops-items-list">
                      {invoiceItems.map((item) => (
                        <div key={item.productId} className="ops-item-row">
                          <span>{item.product} x {item.quantity} {item.unit}</span>
                          <div>
                            <strong>Rs {(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                            <button type="button" onClick={() => removeInvoiceItem(item.productId)}>Remove</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <label>
                  Amount (Rs)
                  <input type="text" className="input" value={`Rs ${invoiceTotal.toLocaleString('en-IN')}`} readOnly />
                </label>
                <label>
                  Due Date
                  <input
                    type="text"
                    className="input"
                    placeholder="dd-mm-yyyy"
                    pattern="^\\d{2}-\\d{2}-\\d{4}$"
                    value={invoiceForm.dueDate}
                    onChange={(event) => setInvoiceForm((prev) => ({ ...prev, dueDate: event.target.value }))}
                    required
                  />
                </label>
                <button className="btn btn-primary" type="submit"><Plus size={14} /> Create Invoice</button>
              </form>
            </article>

            <article className="card ops-panel">
              <h3>Invoice List</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Invoice</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{invoice.customer}</td>
                        <td>{invoice.items?.length || 0}</td>
                        <td>Rs {Number(invoice.amount).toLocaleString('en-IN')}</td>
                        <td>
                          <span className={`badge ${invoiceStatusConfig[invoice.status]?.cls || 'badge-primary'}`}>
                            {invoiceStatusConfig[invoice.status]?.label || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="card ops-panel ops-panel--full">
              <h3>Sales History</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Sale ID</th>
                      <th>Customer</th>
                      <th>Payment Method</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesHistory.map((sale) => (
                      <tr key={sale.id}>
                        <td>{sale.id}</td>
                        <td>{sale.customer}</td>
                        <td>{sale.method}</td>
                        <td>Rs {Number(sale.amount).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </section>
        )}
      </div>
    </div>
  );
}

