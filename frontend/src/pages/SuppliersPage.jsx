import { Phone, MapPin, Truck, BadgeCheck, AlertTriangle, CircleDollarSign } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import './SuppliersPage.css';

const fallbackSuppliersData = {
  title: 'Supplier Management',
  subtitle: 'Track reliability and delivery health across vendors',
  suppliers: [],
  insights: [],
};

const statusClassMap = {
  preferred: 'badge-success',
  active: 'badge-primary',
  watch: 'badge-warning',
};

export default function SuppliersPage({ business, onToast }) {
  const suppliersData = business?.workspace?.suppliers || fallbackSuppliersData;
  const suppliers = suppliersData.suppliers || [];

  const preferredCount = suppliers.filter((s) => s.status === 'preferred').length;
  const avgReliability = suppliers.length
    ? Math.round(suppliers.reduce((sum, supplier) => sum + supplier.reliability, 0) / suppliers.length)
    : 0;

  return (
    <div className="page-wrap">
      <Topbar title={suppliersData.title} subtitle={suppliersData.subtitle} />

      <div className="sup-content animate-fade-in">
        <section className="sup-kpis">
          <article className="card sup-kpi">
            <div className="sup-kpi__icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
              <Truck size={18} />
            </div>
            <p className="sup-kpi__label">Total suppliers</p>
            <p className="sup-kpi__value">{suppliers.length}</p>
          </article>

          <article className="card sup-kpi">
            <div className="sup-kpi__icon" style={{ background: '#F0FDF4', color: '#16A34A' }}>
              <BadgeCheck size={18} />
            </div>
            <p className="sup-kpi__label">Preferred suppliers</p>
            <p className="sup-kpi__value">{preferredCount}</p>
          </article>

          <article className="card sup-kpi">
            <div className="sup-kpi__icon" style={{ background: '#FFFBEB', color: '#D97706' }}>
              <AlertTriangle size={18} />
            </div>
            <p className="sup-kpi__label">Avg reliability</p>
            <p className="sup-kpi__value">{avgReliability}%</p>
          </article>

          <article className="card sup-kpi">
            <div className="sup-kpi__icon" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
              <CircleDollarSign size={18} />
            </div>
            <p className="sup-kpi__label">Top monthly spend</p>
            <p className="sup-kpi__value">{suppliers[0]?.monthlyValue || '₹0'}</p>
          </article>
        </section>

        <section className="sup-layout">
          <div className="card sup-table-card">
            <div className="sup-header-row">
              <div>
                <h2 className="sup-title">Supplier Directory</h2>
                <p className="sup-sub">Performance, contacts, and payment terms by vendor</p>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Category</th>
                    <th>Contact</th>
                    <th>Lead Time</th>
                    <th>Reliability</th>
                    <th>Terms</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                      <td>
                        <div className="sup-name-cell">
                          <span className="sup-name">{supplier.name}</span>
                          <span className="sup-meta">Last delivery {supplier.lastDelivery}</span>
                        </div>
                      </td>
                      <td>{supplier.category}</td>
                      <td>
                        <div className="sup-contact-cell">
                          <span>{supplier.contact}</span>
                          <span className="sup-meta"><Phone size={11} /> {supplier.phone}</span>
                        </div>
                      </td>
                      <td>{supplier.leadTime}</td>
                      <td>
                        <span className={`badge ${supplier.reliability >= 90 ? 'badge-success' : supplier.reliability >= 80 ? 'badge-warning' : 'badge-danger'}`}>
                          {supplier.reliability}%
                        </span>
                      </td>
                      <td>{supplier.paymentTerms}</td>
                      <td>
                        <span className={`badge ${statusClassMap[supplier.status] || 'badge-gray'}`}>
                          {supplier.status === 'watch' ? 'Watchlist' : supplier.status[0].toUpperCase() + supplier.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="card sup-insights-card">
            <h3>Supplier Insights</h3>
            <p>Auto-generated recommendations from recent delivery and payment trends.</p>

            <div className="sup-insights-list">
              {suppliersData.insights?.map((insight, index) => (
                <div key={index} className="sup-insight-item">
                  <span className="sup-insight-dot" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary btn-sm"
              style={{ marginTop: 14 }}
              onClick={() => onToast?.('Supplier reminder draft prepared.', 'success')}
            >
              Send Supplier Reminder
            </button>

            <div className="sup-locations">
              {suppliers.slice(0, 3).map((supplier) => (
                <div key={supplier.id} className="sup-location-item">
                  <MapPin size={13} />
                  <span>{supplier.location}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
