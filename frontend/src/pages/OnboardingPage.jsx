import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileUp, BarChart3, Lightbulb } from 'lucide-react';
import './OnboardingPage.css';

function formatCurrency(value) {
  return `Rs ${Math.round(value).toLocaleString('en-IN')}`;
}

function buildAnnualReport(business, answers, files) {
  const monthly = business?.workspace?.expenses?.monthlyData || [];
  const supplierList = business?.workspace?.suppliers?.suppliers || [];
  const reportData = business?.workspace?.reports?.reportData;

  const annualEstimate = monthly.length
    ? Math.round((monthly.reduce((sum, item) => sum + item.revenue, 0) / monthly.length) * 12)
    : null;

  const avgReliability = supplierList.length
    ? Math.round(supplierList.reduce((sum, supplier) => sum + supplier.reliability, 0) / supplierList.length)
    : null;

  const fileList = files.length ? files.map((file) => file.name).join(', ') : 'No file names captured';

  return [
    `${business.businessName} Annual General Report`,
    '',
    `Business type: ${business.label}`,
    `Profile status: ${answers.isNew ? 'New business setup' : 'Established business operations'}`,
    `Uploaded sources: ${fileList}`,
    '',
    'Executive Summary',
    annualEstimate ? `- Estimated annual revenue run-rate: ${formatCurrency(annualEstimate)}` : '- Annual run-rate estimate is pending enough monthly revenue data.',
    reportData?.salesForecast ? `- Forward view: ${reportData.salesForecast.nextWeek} projected next week at ${reportData.salesForecast.confidence} confidence.` : '- Forecast trend: monitor weekly sales and supplier fulfillment to build confidence.',
    avgReliability !== null ? `- Supplier reliability average: ${avgReliability}%.` : '- Supplier reliability baseline unavailable.',
    '',
    'Operational Observations',
    supplierList.length
      ? `- Preferred supplier count: ${supplierList.filter((supplier) => supplier.status === 'preferred').length}.`
      : '- Build a preferred supplier roster for stable procurement.',
    answers.hasData
      ? '- Uploaded files are treated as reference inputs in this demo. Insights are generated from your workspace baseline metrics plus file metadata.'
      : '- Add historical invoices and sales sheets to improve future AI recommendations.',
    '',
    'Recommended Priorities for Next 12 Months',
    '- Improve stock planning by aligning purchase cycles with peak demand windows.',
    '- Track supplier lead-time and reliability monthly with fallback vendors for critical items.',
    '- Review gross margin by category and reduce slow-moving inventory carry cost.',
    answers.isNew
      ? '- Build baseline KPIs in the first quarter: revenue, repeat customers, stockout frequency, and expense ratio.'
      : '- Set quarterly targets for revenue expansion, retention growth, and procurement efficiency.',
  ].join('\n');
}

export default function OnboardingPage({ business, onComplete, onToast }) {
  const navigate = useNavigate();

  const [isNew, setIsNew] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [files, setFiles] = useState([]);
  const [report, setReport] = useState('');

  const canContinue = !hasData || Boolean(report);

  const summaryTitle = useMemo(
    () => `Setup ${business.businessName} Workspace`,
    [business.businessName]
  );

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const handleGenerateReport = () => {
    if (!hasData) {
      onToast?.('Enable data upload first to generate a report.', 'info');
      return;
    }

    if (!files.length) {
      onToast?.('Please upload at least one file (PDF, Excel, or text).', 'warning');
      return;
    }

    const annualReport = buildAnnualReport(business, { isNew, hasData }, files);
    setReport(annualReport);
    onToast?.('Annual report generated for this business.', 'success');
  };

  const handleContinue = () => {
    if (!canContinue) {
      onToast?.('Generate the annual report before continuing.', 'warning');
      return;
    }

    onComplete?.(business.slug, {
      isNew,
      hasData,
      uploadedFiles: files.map((file) => file.name),
      generatedReport: report,
    });

    navigate(`/${business.slug}/dashboard`);
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-shell animate-fade-in">
        <section className="onboarding-panel card">
          <div className="onboarding-header">
            <h1>{summaryTitle}</h1>
            <p>
              Before opening the dashboard, answer a few setup questions so the assistant can prepare a business-specific starter report.
            </p>
          </div>

          <div className="onboarding-block">
            <p className="onboarding-label">Are you new to this business?</p>
            <div className="onboarding-options">
              <label className="onboarding-option">
                <input
                  type="radio"
                  name="isNewBusiness"
                  checked={isNew}
                  onChange={() => setIsNew(true)}
                />
                Yes, I am just starting
              </label>
              <label className="onboarding-option">
                <input
                  type="radio"
                  name="isNewBusiness"
                  checked={!isNew}
                  onChange={() => setIsNew(false)}
                />
                No, I already run this business
              </label>
            </div>
          </div>

          <div className="onboarding-block">
            <p className="onboarding-label">Do you want to attach reference files for setup?</p>
            <div className="onboarding-options">
              <label className="onboarding-option">
                <input
                  type="radio"
                  name="hasData"
                  checked={hasData}
                  onChange={() => {
                    setHasData(true);
                    setReport('');
                  }}
                />
                Yes, attach my files
              </label>
              <label className="onboarding-option">
                <input
                  type="radio"
                  name="hasData"
                  checked={!hasData}
                  onChange={() => {
                    setHasData(false);
                    setFiles([]);
                    setReport('');
                  }}
                />
                No, continue with baseline setup
              </label>
            </div>
          </div>

          {hasData && (
            <div className="onboarding-upload card">
              <p className="onboarding-upload-title">
                <FileUp size={16} /> Upload PDF, Excel, or Text files (demo reference)
              </p>
              <input
                className="input"
                type="file"
                multiple
                accept=".pdf,.xls,.xlsx,.csv,.txt,text/plain,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileChange}
              />
              {files.length > 0 && (
                <ul className="onboarding-file-list">
                  {files.map((file) => (
                    <li key={file.name}>{file.name}</li>
                  ))}
                </ul>
              )}
              <p className="onboarding-placeholder" style={{ marginTop: 10, marginBottom: 10 }}>
                Note: this demo uses uploaded file names and workspace metrics to generate a starter summary. It does not parse full file contents yet.
              </p>
              <button className="btn btn-primary btn-sm" onClick={handleGenerateReport}>
                <BarChart3 size={14} /> Generate Starter Annual Report
              </button>
            </div>
          )}

          <div className="onboarding-actions">
            <button className="btn btn-success btn-lg" onClick={handleContinue}>
              Continue to Dashboard <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <aside className="onboarding-report card">
          <h2>
            <Lightbulb size={18} /> Annual Report Preview
          </h2>
          {report ? (
            <pre className="onboarding-report-text">{report}</pre>
          ) : (
            <p className="onboarding-placeholder">
              Attach files and generate a starter report to view annual business insights. Without attachments, the workspace continues with baseline assumptions.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
