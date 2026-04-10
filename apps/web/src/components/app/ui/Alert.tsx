import React, { ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type?: AlertType;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Alert({ type = 'info', title, children, className = '' }: AlertProps) {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 text-green-700 border-green-100',
          icon: 'text-green-500',
        };
      case 'error':
        return {
          container: 'bg-red-50 text-red-700 border-red-100',
          icon: 'text-red-500',
        };
      case 'warning':
        return {
          container: 'bg-amber-50 text-amber-700 border-amber-100',
          icon: 'text-amber-500',
        };
      case 'info':
      default:
        return {
          container: 'bg-blue-50 text-blue-700 border-blue-100',
          icon: 'text-blue-500',
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        );
      case 'error':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        );
      case 'warning':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        );
      case 'info':
      default:
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        );
    }
  };

  const styles = getStyles();

  return (
    <div className={`p-4 rounded-lg border text-sm text-left flex gap-3 ${styles.container} ${className}`.trim()}>
      <svg
        className={`w-5 h-5 shrink-0 mt-0.5 ${styles.icon}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {getIcon()}
      </svg>
      <div>
        {title && <p className="font-semibold mb-1">{title}</p>}
        {typeof children === 'string' ? <p>{children}</p> : <div>{children}</div>}
      </div>
    </div>
  );
}
