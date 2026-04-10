import React, { HTMLAttributes } from 'react';

export interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
  props?: HTMLAttributes<HTMLParagraphElement>;
}

export const DescriptionText: React.FC<DescriptionProps> = ({
  className = '',
  children,
  ...props
}: DescriptionProps) => {
  const baseStyles = 'text-gray-500 text-[15px]';

  return (
    <p className={`${baseStyles} ${className}`.trim()} {...props}>
      {children}
    </p>
  );
};
