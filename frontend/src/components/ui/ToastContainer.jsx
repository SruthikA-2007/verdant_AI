import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={16} />,
  error: <XCircle size={16} />,
  info: <Info size={16} />,
};

export default function ToastContainer({ toasts, removeToast }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type} animate-scale-in`}>
          {icons[toast.type]}
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', opacity: 0.8, display: 'flex' }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

