import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import styles from './Toaster.module.css';

interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Return a dummy function if not in provider
    return { addToast: () => {} };
  }
  return context;
};

// Global toast function for use outside React components
let globalAddToast: ((toast: Omit<Toast, 'id'>) => void) | null = null;

export const toast = {
  success: (title: string, message?: string) => globalAddToast?.({ title, message, type: 'success' }),
  error: (title: string, message?: string) => globalAddToast?.({ title, message, type: 'error' }),
  info: (title: string, message?: string) => globalAddToast?.({ title, message, type: 'info' }),
  warning: (title: string, message?: string) => globalAddToast?.({ title, message, type: 'warning' }),
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    globalAddToast = addToast;
    return () => {
      globalAddToast = null;
    };
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className={styles.container}>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />,
  };

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <div className={styles.icon}>{icons[toast.type]}</div>
      <div className={styles.content}>
        <p className={styles.title}>{toast.title}</p>
        {toast.message && <p className={styles.message}>{toast.message}</p>}
      </div>
      <button className={styles.close} onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}

export function Toaster() {
  return <ToastProvider>{null}</ToastProvider>;
}
