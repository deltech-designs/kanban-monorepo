import React from 'react';
import { Logo } from '../../partials/Logo';
import { TitleText } from '../../partials/TitleText';
import { DescriptionText } from '../../partials/DescriptionText';

interface AuthBrandingPanelProps {
  title: React.ReactNode;
  subtitle: string;
}

export function AuthBrandingPanel({ title, subtitle }: AuthBrandingPanelProps) {
  return (
    <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-b from-[#3B3AEC] to-[#4A3CF0] flex-col justify-between p-12 text-white relative overflow-hidden">
      {/* Logo */}
      <Logo />

      {/* Hero Content */}
      <div className="max-w-md mt-20 mb-auto">
        <TitleText level={1} className="text-[44px] leading-[1.1] text-white mb-6">
          {title}
        </TitleText>
        <DescriptionText className="text-lg text-white/80 leading-relaxed max-w-[400px]">
          {subtitle}
        </DescriptionText>
      </div>

      {/* Trust Badge */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-5 w-max flex items-center gap-4">
        <div className="flex -space-x-3">
          <div className="w-9 h-9 rounded-full bg-slate-800 border-2 border-[#4A3CF0] flex items-center justify-center overflow-hidden">
            <svg className="w-8 h-8 text-white/50 mt-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-[#4A3CF0] flex items-center justify-center overflow-hidden">
            <svg className="w-8 h-8 text-amber-600 mt-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="w-9 h-9 rounded-full bg-emerald-100 border-2 border-[#4A3CF0] flex items-center justify-center overflow-hidden">
            <svg className="w-8 h-8 text-emerald-600 mt-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <div>
          <DescriptionText className="font-semibold text-sm">Trusted by 10k+ teams</DescriptionText>
          <DescriptionText className="text-white/70 text-xs">
            From startups to Fortune 500s
          </DescriptionText>
        </div>
      </div>
    </div>
  );
}
