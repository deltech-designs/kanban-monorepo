import React from 'react';
import { SocialLoginButtons } from '@components/ui/SocialLoginButtons';
import { AuthDivider } from '@/components/app/ui/AuthDivider';
import { DescriptionText } from '@/components/app/partials/DescriptionText';
import { TitleText } from '@/components/app/partials/TitleText';

interface FooterLink {
  text: string;
  linkText: string;
  href: string;
}

interface AuthFormPanelProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footerLink?: FooterLink;
  children: React.ReactNode;
  showSocialLogin?: boolean;
  showDivider?: boolean;
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function AuthFormPanel({
  title,
  subtitle,
  footerLink,
  children,
  showSocialLogin = true,
  showDivider = true,
  customHeader,
  customFooter,
  className = '',
  containerClassName = '',
}: AuthFormPanelProps) {
  return (
    <div
      className={`flex-1 flex flex-col pb-6 px-6 sm:px-12 lg:px-24 ${containerClassName}`.trim()}
    >
      <div
        className={`flex-1 flex flex-col justify-center max-w-[440px] w-full mx-auto ${className}`.trim()}
      >
        {customHeader ? (
          customHeader
        ) : title || subtitle ? (
          <div className="mb-8">
            {title && (
              <TitleText level={2} className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                {title}
              </TitleText>
            )}
            {subtitle && (
              <DescriptionText className="text-gray-500 text-[15px]">{subtitle}</DescriptionText>
            )}
          </div>
        ) : null}

        {showSocialLogin && <SocialLoginButtons />}
        {showDivider && <AuthDivider />}

        {children}

        {customFooter ? (
          customFooter
        ) : footerLink ? (
          <DescriptionText className="text-center text-[14px] text-gray-600 mt-8 mb-auto">
            {footerLink.text}{' '}
            <a href={footerLink.href} className="text-primary font-semibold hover:underline">
              {footerLink.linkText}
            </a>
          </DescriptionText>
        ) : null}
      </div>
    </div>
  );
}
