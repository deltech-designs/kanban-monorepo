import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'flex items-center justify-center gap-2 p-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer';

  const variants = {
    primary: 'bg-blue-600 text-white border-none hover:bg-blue-700 shadow-sm font-semibold',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';
