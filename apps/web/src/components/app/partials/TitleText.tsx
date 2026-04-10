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
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const baseStyles = 'text-3xl font-bold text-gray-900 tracking-tight';

  return (
    <Tag className={`${baseStyles} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
};
