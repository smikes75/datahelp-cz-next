'use client';

import React, { useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

export function Toast({ id, message, type, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLeaving, setIsLeaving] = React.useState(false);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Match animation duration
  }, [id, onClose]);

  useEffect(() => {
    // Trigger entrance animation
    const showTimer = setTimeout(() => setIsVisible(true), 10);

    // Auto-dismiss after duration
    const hideTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, handleClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-600" />,
    error: <XCircle className="h-5 w-5 text-red-600" />,
    info: <AlertCircle className="h-5 w-5 text-blue-600" />
  };

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border-2 shadow-lg
        transition-all duration-300 ease-out
        ${styles[type]}
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
      aria-live="polite"
    >
      {icons[type]}
      <p className="flex-1 font-medium text-sm">{message}</p>
      <button
        onClick={handleClose}
        className="text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
