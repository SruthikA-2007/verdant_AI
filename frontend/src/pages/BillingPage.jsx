import { useMemo, useState } from 'react';
import { Bot, CalendarClock, CircleAlert, CircleCheck, CirclePause, IndianRupee, MessageSquareWarning, ReceiptText } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import './BillingPage.css';

const fallbackBilling = {
  title: 'Automated Billing',
  subtitle: 'Generate and track invoices automatically',
  summary: {
    billsToday: 0,
    autoPaid: 0,
    pending: 0,
    collectionToday: 'Rs 0',
  },
  automationRules: [],
  scheduledRuns: [],
  invoices: [],
};

const runStatusConfig = {
  scheduled: { cls: 'badge-primary', label: 'Scheduled', icon: CalendarClock },
  active: { cls: 'badge-success', label: 'Active', icon: CircleCheck },
  paused: { cls: 'badge-warning', label: 'Paused', icon: CirclePause },
};

const invoiceStatusConfig = {
  paid: { cls: 'badge-success', label: 'Paid' },
  pending: { cls: 'badge-warning', label: 'Pending' },
  overdue: { cls: 'badge-danger', label: 'Overdue' },
};

export default function BillingPage({ business, onToast }) {
  const billingData = business?.workspace?.billing || fallbackBilling;
  const inventoryData = business?.workspace?.inventory?.inventoryData || [];
  const [rules, setRules] = useState(billingData.automationRules || []);
  const [invoices, setInvoices] = useState(billingData.invoices || []);
  const [saleForm, setSaleForm] = useState({ productId: '', quantity: '1' });

  const productCatalog = useMemo(
    () => inventoryData
      .map((item) => ({
        id: String(item.id),
        label: item.product,
        unit: item.unit || 'units',
        unitPrice: Number(item.price) || 0,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    [inventoryData],
  );

  const selectedProduct = useMemo(
    () => productCatalog.find((item) => item.id === saleForm.productId) || null,
    [productCatalog, saleForm.productId],
  );

  const totalPendingAmount = useMemo(
    () => invoices
      .filter((invoice) => invoice.status === 'pending' || invoice.status === 'overdue')
      .reduce((sum, invoice) => sum + invoice.amount, 0),
    [invoices],
  );

  const soldQuantity = Math.max(1, Number(saleForm.quantity) || 1);
  const soldUnitPrice = selectedProduct?.unitPrice || 0;
  const soldTotal = soldQuantity * soldUnitPrice;
  const hasProducts = productCatalog.length > 0;

  const toggleRule = (ruleId) => {
    setRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)));
    onToast?.('Billing automation rule updated.', 'success');
  };

  const sendReminder = (invoice) => {
    onToast?.(`Reminder sent for ${invoice.id} (${invoice.customer}).`, 'info');
  };

  const markPaid = (invoiceId) => {
    setInvoices((prev) => prev.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: 'paid' } : invoice)));
    onToast?.('Invoice marked as paid.', 'success');
  };

  const updateSaleForm = (key, value) => {
    setSaleForm((prev) => ({ ...prev, [key]: value }));
  };

  const createSoldProductBill = (event) => {
    event.preventDefault();

    if (!hasProducts) {
      onToast?.('No products found. Add inventory items first.', 'warning');
      return;
    }

    if (!selectedProduct) {
      onToast?.('Please select a sold product.', 'warning');
      return;
    }

    const invoiceSuffix = String(Date.now()).slice(-5);
    const nextInvoice = {
      id: `INV-SALE-${invoiceSuffix}`,
      customer: 'Walk-in Customer',
      amount: soldTotal,
      dueDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      method: 'Cash',
      status: 'pending',
    };

    setInvoices((prev) => [nextInvoice, ...prev]);
    setSaleForm({ productId: '', quantity: '1' });
    onToast?.(`Bill created for ${selectedProduct.label} (${soldQuantity} ${selectedProduct.unit}).`, 'success');
  };

  return (
    <div className="page-wrap">
      <Topbar title={billingData.title} subtitle={billingData.subtitle} />

      <div className="billing-content animate-fade-in">
        <section className="billing-kpis">
          <article className="card billing-kpi">
            <div className="billing-kpi__icon billing-kpi__icon--blue"><ReceiptText size={18} /></div>
            <p className="billing-kpi__label">Bills generated today</p>
            <p className="billing-kpi__value">{billingData.summary.billsToday}</p>
          </article>
          <article className="card billing-kpi">
            <div className="billing-kpi__icon billing-kpi__icon--green"><CircleCheck size={18} /></div>
            <p className="billing-kpi__label">Auto-paid invoices</p>
            <p className="billing-kpi__value">{billingData.summary.autoPaid}</p>
          </article>
          <article className="card billing-kpi">
            <div className="billing-kpi__icon billing-kpi__icon--orange"><CircleAlert size={18} /></div>
            <p className="billing-kpi__label">Pending invoices</p>
            <p className="billing-kpi__value">{billingData.summary.pending}</p>
          </article>
          <article className="card billing-kpi">
            <div className="billing-kpi__icon billing-kpi__icon--purple"><IndianRupee size={18} /></div>
            <p className="billing-kpi__label">Collected today</p>
            <p className="billing-kpi__value">{billingData.summary.collectionToday}</p>
          </article>
        </section>

        <section className="billing-grid">
          <div className="card billing-panel billing-panel--full">
            <div className="billing-panel__header">
              <div>
                <h2>Record Sold Product</h2>
                <p>Select product, quantity, and get unit price automatically</p>
              </div>
            </div>

            <form className="billing-sale-form" onSubmit={createSoldProductBill}>
              <label className="billing-form-field" htmlFor="sold-product">
                <span>Product Sold</span>
                <select
                  id="sold-product"
                  value={saleForm.productId}
                  onChange={(event) => updateSaleForm('productId', event.target.value)}
                  disabled={!hasProducts}
                  required
                >
                  <option value="">{hasProducts ? 'Select product' : 'No products available'}</option>
                  {productCatalog.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="billing-form-field" htmlFor="sold-quantity">
                <span>Quantity Sold</span>
                <input
                  id="sold-quantity"
                  type="number"
                  min="1"
                  step="1"
                  value={saleForm.quantity}
                  onChange={(event) => updateSaleForm('quantity', event.target.value)}
                  disabled={!hasProducts}
                  required
                />
              </label>

              <label className="billing-form-field" htmlFor="unit-price">
                <span>Unit Price</span>
                <input
                  id="unit-price"
                  type="text"
                  value={selectedProduct ? `Rs ${soldUnitPrice.toLocaleString('en-IN')}` : 'Select product'}
                  readOnly
                />
              </label>

              <label className="billing-form-field" htmlFor="line-total">
                <span>Total</span>
                <input id="line-total" type="text" value={`Rs ${soldTotal.toLocaleString('en-IN')}`} readOnly />
              </label>

              <button className="btn btn-outline" type="submit" disabled={!hasProducts || !selectedProduct}>
                Generate Bill
              </button>
            </form>
            {!hasProducts && <p className="billing-form-note">Add items in Inventory to enable product billing.</p>}
          </div>

          <div className="card billing-panel">
            <div className="billing-panel__header">
              <div>
                <h2>Automation Rules</h2>
                <p>Control automated billing actions</p>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => onToast?.('Automation test run queued.', 'success')}>
                <Bot size={14} /> Run Test
              </button>
            </div>

            <div className="billing-rule-list">
              {rules.map((rule) => (
                <div key={rule.id} className="billing-rule-item">
                  <div>
                    <p className="billing-rule-item__title">{rule.label}</p>
                    <p className="billing-rule-item__sub">{rule.schedule}</p>
                  </div>
                  <button
                    className={`billing-switch ${rule.enabled ? 'billing-switch--on' : ''}`}
                    onClick={() => toggleRule(rule.id)}
                    aria-label={rule.enabled ? 'Disable rule' : 'Enable rule'}
                    type="button"
                  >
                    <span />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card billing-panel">
            <div className="billing-panel__header">
              <div>
                <h2>Scheduled Runs</h2>
                <p>Next automated billing jobs</p>
              </div>
            </div>

            <div className="billing-runs">
              {billingData.scheduledRuns.map((run) => {
                const meta = runStatusConfig[run.status] || runStatusConfig.scheduled;
                const Icon = meta.icon;

                return (
                  <div className="billing-run-item" key={`${run.task}-${run.nextRun}`}>
                    <div>
                      <p className="billing-run-item__title">{run.task}</p>
                      <p className="billing-run-item__sub">Next: {run.nextRun} • {run.channel}</p>
                    </div>
                    <span className={`badge ${meta.cls}`}>
                      <Icon size={11} />
                      {meta.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="card billing-panel">
          <div className="billing-panel__header">
            <div>
              <h2>Invoice Queue</h2>
              <p>Pending amount: Rs {totalPendingAmount.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => {
                  const statusMeta = invoiceStatusConfig[invoice.status] || invoiceStatusConfig.pending;
                  return (
                    <tr key={invoice.id}>
                      <td style={{ fontWeight: 700, color: '#2563EB' }}>{invoice.id}</td>
                      <td>{invoice.customer}</td>
                      <td style={{ fontWeight: 700 }}>Rs {invoice.amount.toLocaleString('en-IN')}</td>
                      <td>{invoice.dueDate}</td>
                      <td>{invoice.method}</td>
                      <td><span className={`badge ${statusMeta.cls}`}>{statusMeta.label}</span></td>
                      <td>
                        <div className="billing-actions">
                          {invoice.status !== 'paid' && (
                            <button className="btn btn-ghost btn-sm" onClick={() => sendReminder(invoice)}>
                              <MessageSquareWarning size={13} /> Remind
                            </button>
                          )}
                          {invoice.status !== 'paid' && (
                            <button className="btn btn-outline btn-sm" onClick={() => markPaid(invoice.id)}>
                              Mark Paid
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
