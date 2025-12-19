import { ReactNode } from 'react';

interface AlertBarProps {
  /**
   * Controls whether the alert bar is visible
   */
  isOpen: boolean;
  /**
   * The content to display in the alert bar
   */
  children: ReactNode;
  /**
   * Optional variant for different alert types
   */
  variant?: 'error' | 'warning' | 'info' | 'success';
}

/**
 * A dismissible alert bar component for displaying messages to users
 */
function AlertBar({ isOpen, children, variant = 'error' }: AlertBarProps) {
  if (!isOpen) {
    return null;
  }

  const variantStyles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };

  return (
    <div
      className={`border rounded-lg p-4 mb-4 ${variantStyles[variant]}`}
      role="alert"
    >
      {children}
    </div>
  );
}

export default AlertBar;

