import React from 'react';

const AVATARS = [
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=32',
  'https://i.pravatar.cc/150?img=47',
];

export function SignupIllustrationPanel() {
  return (
    <div className="hidden lg:flex lg:w-[50%] xl:w-[60%] flex-col bg-[#EBF4FF] relative overflow-hidden">
      {/* Subtle ambient blobs */}
      <div className="absolute top-[-120px] right-[-120px] w-[480px] h-[480px] rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[360px] h-[360px] rounded-full bg-indigo-200/30 blur-3xl pointer-events-none" />

      {/* Main content — top section grows to fill */}
      <div className="relative z-10 flex flex-col flex-1 px-12 xl:px-16 pt-8">
        {/* Brand name */}
       

        {/* Editorial headline */}
        <h1 className="text-[2.6rem] xl:text-[3rem] font-extrabold leading-[1.15] tracking-tight text-gray-900 mb-5 max-w-[420px]">
          Design your{' '}
          <span className="text-[#4A90E2]">deep<br />work</span>{' '}
          environment.
        </h1>

        {/* Supporting copy */}
        <p className="text-[15px] text-gray-600 leading-relaxed max-w-[340px] mb-10">
          Elevate project management from a chore to a curated experience with
          our editorial-grade interface.
        </p>

        {/* Social proof pill */}
        <div className="flex items-center gap-3">
          {/* Stacked avatars */}
          <div className="flex -space-x-3">
            {AVATARS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="User avatar"
                width={36}
                height={36}
                className="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>

          {/* Pill badge */}
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full pl-2.5 pr-4 py-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#4A90E2] flex-shrink-0" />
            <span className="text-[13px] font-medium text-gray-700">
              42 others are in the flow
            </span>
          </div>
        </div>
      </div>

      {/* Testimonial card — pinned to bottom */}
      <div className="relative z-10 mx-12 xl:mx-16 mb-20">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-blue-50 max-w-[400px]">
          {/* Sparkle icon + label */}
          <div className="flex items-center gap-2 mb-3">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[#4A90E2] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
              />
            </svg>
            <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
              The Flow System
            </span>
          </div>

          {/* Quote */}
          <p className="text-[14px] text-gray-700 leading-relaxed italic mb-4">
            &ldquo;The most intuitive workspace I&rsquo;ve ever used. It feels
            like the interface anticipates my next move.&rdquo;
          </p>

          {/* Author */}
          <p className="text-[13px] text-gray-900 font-semibold">
            Sarah Jenkins{' '}
            <span className="font-normal text-gray-400">— Lead Architect, Studio 9</span>
          </p>
        </div>
      </div>
    </div>
  );
}
