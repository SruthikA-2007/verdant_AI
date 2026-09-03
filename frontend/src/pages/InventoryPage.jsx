import { useState } from 'react';
import { AlertTriangle, Package, Plus, Pencil, Trash2, RefreshCw, Download, Search, Filter } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import { inventoryData as initialData } from '../data/mockData';
import './InventoryPage.css';

const statusConfig = {
  critical: { label: 'Critical', cls: 'badge-danger' },
  low: { label: 'Low Stock', cls: 'badge-warning' },
  good: { label: 'In Stock', cls: 'badge-success' },
};

export default function InventoryPage({ onToast, business }) {
  const inventoryPageData = business?.workspace?.inventory || { title: 'Inventory Management', subtitle: 'Track stock levels, get AI alerts, and manage products', inventoryData: initialData };
  const [inventory, setInventory] = useState(inventoryPageData.inventoryData);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ product: '', category: '', stock: '', unit: 'pkts', price: '', threshold: '', supplier: '' });

  const alerts = inventory.filter(i => i.status === 'critical' || i.status === 'low');

  const filtered = inventory.filter(item => {
    const matchSearch = item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || item.status === filter;
    return matchSearch && matchFilter;
  });

  function openAdd() {
    setEditItem(null);
    setForm({ product: '', category: '', stock: '', unit: 'pkts', price: '', threshold: '', supplier: '' });
    setShowModal(true);
  }

  function openEdit(item) {
    setEditItem(item);
    setForm({ ...item });
    setShowModal(true);
  }

  function handleDelete(id) {
    setInventory(prev => prev.filter(i => i.id !== id));
    onToast?.('Product removed', 'success');
  }

  function handleSave() {
    if (!form.product) return;
    const stock = parseInt(form.stock) || 0;
    const threshold = parseInt(form.threshold) || 5;
    const status = stock === 0 ? 'critical' : stock < threshold ? 'low' : 'good';
    if (editItem) {
      setInventory(prev => prev.map(i => i.id === editItem.id ? { ...editItem, ...form, stock, threshold, status } : i));
      onToast?.('Product updated', 'success');
    } else {
      setInventory(prev => [...prev, { ...form, id: Date.now(), stock, threshold, status }]);
      onToast?.('Product added', 'success');
    }
    setShowModal(false);
  }

  const counts = {
    all: inventory.length,
    good: inventory.filter(i => i.status === 'good').length,
    low: inventory.filter(i => i.status === 'low').length,
    critical: inventory.filter(i => i.status === 'critical').length,
  };

  return (
    <div className="page-wrap">
      <Topbar title={inventoryPageData.title} subtitle={inventoryPageData.subtitle} />
      <div className="inv-content animate-fade-in">

        {/* Alert Banner */}
        {alerts.length > 0 && (
          <div className="inv-alert-banner">
            <AlertTriangle size={18} className="inv-alert-icon" />
            <div>
              <p className="inv-alert-title">⚠️ {alerts.length} items need immediate attention</p>
              <p className="inv-alert-sub">
                {alerts.map(a => (
                  <span key={a.id} className={`inv-alert-chip ${a.status === 'critical' ? 'inv-alert-chip--critical' : ''}`}>
                    {a.product} ({a.stock} left)
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="inv-stats">
          {[
            { label: 'Total Products', value: counts.all, color: 'blue' },
            { label: 'In Stock', value: counts.good, color: 'green' },
            { label: 'Low Stock', value: counts.low, color: 'orange' },
            { label: 'Critical', value: counts.critical, color: 'red' },
          ].map((s, i) => (
            <div key={i} className={`inv-stat card inv-stat--${s.color}`}>
              <span className="inv-stat-value">{s.value}</span>
              <span className="inv-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="card">
          {/* Controls */}
          <div className="inv-controls">
            <div className="inv-search">
              <Search size={15} className="inv-search-icon" />
              <input
                className="inv-search-input"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="inv-filters">
              {['all', 'good', 'low', 'critical'].map(f => (
                <button
                  key={f}
                  className={`inv-filter-btn ${filter === f ? 'inv-filter-btn--active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? 'All' : statusConfig[f]?.label}
                  <span className="inv-filter-count">{counts[f]}</span>
                </button>
              ))}
            </div>
            <div className="inv-actions">
              <button className="btn btn-outline btn-sm" onClick={() => onToast?.('Purchase order generated!', 'success')}>
                <Download size={14} /> Export
              </button>
              <button className="btn btn-primary btn-sm" onClick={openAdd}>
                <Plus size={15} /> Add Product
              </button>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Supplier</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="inv-product-cell">
                        <div className="inv-product-icon">
                          <Package size={14} />
                        </div>
                        <span style={{ fontWeight: 600 }}>{item.product}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-gray">{item.category}</span>
                    </td>
                    <td>
                      <div className="inv-stock-cell">
                        <div
                          className="inv-stock-bar"
                          style={{
                            width: `${Math.min(100, (item.stock / (item.threshold * 3)) * 100)}%`,
                            background: item.status === 'critical' ? '#DC2626' : item.status === 'low' ? '#D97706' : '#16A34A',
                          }}
                        />
                        <span style={{ fontWeight: 700, color: item.stock <= 2 ? '#DC2626' : '#111827' }}>{item.stock}</span>
                      </div>
                    </td>
                    <td style={{ color: '#6B7280' }}>{item.unit}</td>
                    <td style={{ fontWeight: 600 }}>₹{item.price}</td>
                    <td style={{ color: '#6B7280', fontSize: '0.8rem' }}>{item.supplier}</td>
                    <td>
                      <span className={`badge ${statusConfig[item.status].cls}`}>
                        {statusConfig[item.status].label}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(item)}>
                          <Pencil size={13} />
                        </button>
                        <button className="btn btn-ghost btn-icon btn-sm" style={{ color: '#DC2626' }} onClick={() => handleDelete(item.id)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal animate-scale-in" onClick={e => e.stopPropagation()}>
              <h3 className="modal-title">{editItem ? 'Edit Product' : 'Add Product'}</h3>
              <div className="modal-form">
                {[
                  { key: 'product', label: 'Product Name', placeholder: 'e.g. Rice 5kg' },
                  { key: 'category', label: 'Category', placeholder: 'e.g. Staples' },
                  { key: 'stock', label: 'Stock Qty', placeholder: 'e.g. 10', type: 'number' },
                  { key: 'unit', label: 'Unit', placeholder: 'e.g. bags' },
                  { key: 'price', label: 'Price (₹)', placeholder: 'e.g. 320', type: 'number' },
                  { key: 'threshold', label: 'Low Stock Threshold', placeholder: 'e.g. 5', type: 'number' },
                  { key: 'supplier', label: 'Supplier', placeholder: 'e.g. Agromax Pvt Ltd' },
                ].map(f => (
                  <div key={f.key}>
                    <label>{f.label}</label>
                    <input
                      className="input"
                      type={f.type || 'text'}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-actions">
                <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editItem ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

