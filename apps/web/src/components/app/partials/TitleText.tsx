import React, { HTMLAttributes } from 'react';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const TitleText: React.FC<TitleProps> = ({
  level = 2,
  className = '',
  children,
  ...props
}) => {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const baseStyles = 'text-3xl font-bold text-gray-900 tracking-tight';

  return (
    <Tag className={`${baseStyles} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
};
