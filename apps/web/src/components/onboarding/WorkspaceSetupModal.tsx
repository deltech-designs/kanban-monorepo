'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/app/partials/Button';

interface WorkspaceSetupModalProps {
  onClose: () => void;
}

export const WorkspaceSetupModal: React.FC<WorkspaceSetupModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState('');
  const [boardTitle, setBoardTitle] = useState('');
  const [boardType, setBoardType] = useState<'blank' | 'task'>('blank');

  const handleContinue = () => {
    if (step === 1 && workspaceName.trim()) {
      setStep(2);
    } else if (step === 2) {
      // Finish onboarding and navigate
      onClose();
      router.push('/dashboard/boards/1'); // Mock ID 1 for now
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7f9fc] overflow-y-auto">
      <div className="w-full max-w-6xl min-h-screen px-8 py-12 flex flex-col relative justify-center">
        {/* Top Header Logotype */}
        <div className="absolute top-8 left-8">
          <span className="font-extrabold text-gray-900 text-[19px] tracking-tight">
            HiramBoard
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-16 lg:w-[85%] mx-auto h-auto my-auto relative z-10 w-full">
          {/* Left Column */}
          <div className="flex-[0.8] max-w-[420px] pt-12 flex flex-col">
            <h1 className="text-[44px] lg:text-[50px] font-bold text-gray-900 leading-[1.05] mb-6 tracking-tight">
              Let&apos;s set up your
              <br />
              <span className="text-[#3b46f1]">Kinetic</span>
              <br />
              <span className="text-[#3b46f1]">Workspace</span>.
            </h1>
            <p className="text-gray-600 text-[17px] mb-12 pr-4 leading-relaxed">
              Define your environment and start curating your projects with professional fluidity.
            </p>

            {/* Stepper */}
            <div className="space-y-8 mb-16 flex-1 mt-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[15px] shadow-sm transition-colors ${step >= 1 ? 'bg-[#3b46f1] text-white' : 'bg-gray-100 text-gray-400'}`}
                >
                  1
                </div>
                <div>
                  <div
                    className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-1 transition-colors ${step >= 1 ? 'text-[#3b46f1]' : 'text-gray-400'}`}
                  >
                    Identity
                  </div>
                  <div
                    className={`font-semibold text-[15px] transition-colors ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    Workspace Name
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[15px] shadow-sm transition-colors ${step >= 2 ? 'bg-[#3b46f1] text-white' : 'bg-gray-200/60 text-gray-400'}`}
                >
                  2
                </div>
                <div>
                  <div
                    className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-1 transition-colors ${step >= 2 ? 'text-[#3b46f1]' : 'text-gray-400'}`}
                  >
                    Framework
                  </div>
                  <div
                    className={`font-semibold text-[15px] transition-colors ${step >= 2 ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    Initial Board
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-[#f0f3ff] rounded-2xl p-6 relative overflow-hidden mt-6 flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-[#e2e8ff] text-[#3b46f1] flex items-center justify-center font-bold text-[13px] shrink-0 mt-0.5">
                i
              </div>
              <p className="text-[14px] font-medium text-gray-600 leading-snug">
                &quot;A well-named workspace is the anchor of every great workflow.&quot;
              </p>
            </div>
          </div>

          {/* Right Column (Card) */}
          <div className="flex-1 max-w-[520px] lg:ml-auto flex flex-col justify-center">
            <div className="bg-white rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] p-10 lg:p-12 border border-gray-100 flex flex-col items-stretch">
              {/* Step 1 Content */}
              {step === 1 && (
                <div className="h-[280px] flex flex-col">
                  <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-4">
                    Step 1: Workspace Identity
                  </div>
                  <h2 className="text-[26px] font-bold text-gray-900 mb-6 tracking-tight">
                    What is your workspace name?
                  </h2>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="e.g. Acme Design Studio"
                      className="w-full border border-gray-200 rounded-xl px-5 py-4 text-[16px] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b46f1]/20 focus:border-[#3b46f1] transition-all bg-transparent font-medium"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      autoFocus
                    />
                  </div>

                  {/* Faded partial step 2 to match design (showing step 2 faded) */}
                  <div className="mt-auto opacity-30 pointer-events-none mb-[-20px]">
                    <div className="text-[11px] font-bold tracking-widest text-[#a8b0c1] uppercase mb-4">
                      Step 2: Framework
                    </div>
                    <h2 className="text-[22px] font-bold text-gray-900 mb-4 tracking-tight">
                      Create your first board
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-xl h-16 bg-gray-50/50"></div>
                      <div className="border border-gray-200 rounded-xl h-16 bg-gray-50/50"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 Content */}
              {step === 2 && (
                <div className="h-[280px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-4">
                    Step 2: Framework
                  </div>
                  <h2 className="text-[26px] font-bold text-gray-900 mb-6 tracking-tight">
                    Create your first board
                  </h2>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Board Title"
                      className="w-full border border-gray-200 rounded-xl px-5 py-4 text-[16px] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b46f1]/20 focus:border-[#3b46f1] transition-all font-medium bg-transparent"
                      value={boardTitle}
                      onChange={(e) => setBoardTitle(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setBoardType('blank')}
                      className={`h-[96px] border-2 rounded-2xl flex flex-col items-start justify-center p-5 transition-all
                        ${
                          boardType === 'blank'
                            ? 'border-[#3b46f1] bg-[#3b46f1]/5'
                            : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                    >
                      <div className="w-5 h-5 border-2 rounded shrink-0 mb-3 border-gray-300"></div>
                      <span className="font-semibold text-gray-700 text-[14px]">Blank</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoardType('task')}
                      className={`h-[96px] border-2 rounded-2xl flex flex-col items-start justify-center p-5 transition-all
                        ${
                          boardType === 'task'
                            ? 'border-[#3b46f1] bg-[#3b46f1]/5'
                            : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                    >
                      <svg
                        className="w-6 h-6 mb-2 shrink-0 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <span className="font-semibold text-gray-700 text-[14px]">Task Board</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 pt-4 flex items-center justify-between z-10 relative">
                <button
                  type="button"
                  className={`text-gray-500 font-semibold text-[15px] hover:text-gray-900 transition-colors flex items-center gap-2 ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                  onClick={() => setStep(1)}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back
                </button>
                <Button
                  onClick={handleContinue}
                  className={`py-[14px] bg-[#3b46f1] hover:bg-blue-700 text-white font-semibold rounded-xl text-[15px] ${step === 1 ? 'w-full ml-0 px-6' : 'px-8 ml-auto'}`}
                >
                  Continue{' '}
                  <svg
                    className="w-4 h-4 ml-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Social Proof Footer under card */}
            <div className="mt-10 flex items-center justify-center lg:justify-end lg:pr-8 gap-3 text-[13px] text-gray-500">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#f7f9fc] bg-gray-200 overflow-hidden relative">
                  <svg
                    className="w-full h-full text-gray-400 mt-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#f7f9fc] bg-gray-200 overflow-hidden relative">
                  <svg
                    className="w-full h-full text-gray-400 mt-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#f7f9fc] bg-gray-200 overflow-hidden relative">
                  <svg
                    className="w-full h-full text-gray-400 mt-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#f7f9fc] bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                  +12k
                </div>
              </div>
              <span className="font-medium text-[13px] text-gray-600">
                Joined by 12,000+ curators this month
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-[11px] font-bold tracking-[0.1em] text-gray-400 uppercase pt-4">
          <div>© 2024 HIRAMBOARD</div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
