'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

export default function CreateBoardPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('workspace-1');

  // Mock workspaces
  const workspaceOptions = [
    { value: 'workspace-1', label: 'Acme Corp Engineering' },
    { value: 'workspace-2', label: 'Marketing Team' },
    { value: 'workspace-3', label: 'Personal Projects' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, include selectedWorkspace in the payload
    router.push('/dashboard/boards');
  };

  return (
    <div className="min-h-full flex flex-col items-center py-16 px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-[32px] font-bold text-[#0F172A] tracking-tight mb-2">
          Create New Board
        </h1>
        <p className="text-[#64748B] text-[15px]">
          Set up your collaborative workspace in seconds.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-160 p-8 sm:p-10 border border-gray-100/50">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Workspace Selection */}
          <Select
            id="workspace"
            label="WORKSPACE"
            options={workspaceOptions}
            value={selectedWorkspace}
            onChange={(e) => setSelectedWorkspace(e.target.value)}
            className="bg-[#F8FAFC]/50 border-gray-200 py-3"
            required
          />

          {/* Board Name */}
          <Input
            id="board-name"
            label="BOARD NAME"
            placeholder="e.g., Q4 Marketing Sprint"
            className="bg-[#F8FAFC]/50 border-gray-200 py-3"
            required
          />

          {/* Description */}
          <Textarea
            id="description"
            label={
              <>
                DESCRIPTION{' '}
                <span className="text-gray-400 font-medium normal-case ml-1">(OPTIONAL)</span>
              </>
            }
            placeholder="What is this board about?"
            className="bg-[#F8FAFC]/50 border-gray-200 min-h-30"
          />

          {/* Template Selection */}
          <div>
            <label className="block text-[13px] font-bold tracking-wider uppercase text-gray-700 mb-3">
              CHOOSE A TEMPLATE
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Blank Board */}
              <div
                onClick={() => setSelectedTemplate('blank')}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
                  selectedTemplate === 'blank'
                    ? 'border-[#4A3CF0] bg-[#EEF2FF]'
                    : 'border-gray-100 bg-[#F8FAFC] hover:border-gray-200'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mb-4 text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-[14px] mb-1">Blank Board</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  Start from a clean slate.
                </p>
              </div>

              {/* Kanban */}
              <div
                onClick={() => setSelectedTemplate('kanban')}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col ${
                  selectedTemplate === 'kanban'
                    ? 'border-[#4A3CF0] bg-[#EEF2FF]'
                    : 'border-gray-100 bg-[#F8FAFC] hover:border-gray-200'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center gap-0.5 justify-center mb-4 text-gray-600">
                  <div className="w-2.5 h-3.5 border-2 border-current rounded-[3px]" />
                  <div className="w-2.5 h-3.5 border-2 border-current rounded-[3px]" />
                </div>
                <h3 className="font-semibold text-gray-900 text-[14px] mb-1">
                  Kanban <span className="font-normal text-gray-500">(Default)</span>
                </h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  Visualize workflow with columns.
                </p>
              </div>

              {/* Roadmap */}
              <div
                onClick={() => setSelectedTemplate('roadmap')}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
                  selectedTemplate === 'roadmap'
                    ? 'border-[#4A3CF0] bg-[#EEF2FF]'
                    : 'border-gray-100 bg-[#F8FAFC] hover:border-gray-200'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mb-4 text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-[14px] mb-1">Project Roadmap</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  Timeline view for milestones.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#4A3CF0]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-[14px]">Privacy Settings</h3>
                <p className="text-[13px] text-gray-500">Visible to all workspace members</p>
              </div>
            </div>

            {/* Toggle group */}
            <div className="flex bg-white p-1 rounded-lg shadow-sm border border-gray-100">
              <button
                type="button"
                onClick={() => setIsPrivate(false)}
                className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-all ${
                  !isPrivate ? 'bg-[#EEF2FF] text-[#4A3CF0]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Public
              </button>
              <button
                type="button"
                onClick={() => setIsPrivate(true)}
                className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-all ${
                  isPrivate ? 'bg-[#EEF2FF] text-[#4A3CF0]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Private
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-[14px] font-semibold text-gray-600 hover:text-gray-900 px-4 py-2"
            >
              Cancel
            </button>
            <Button
              type="submit"
              className="bg-[#3B3AEC] hover:bg-[#3231d6] text-white px-8 py-3 rounded-xl text-[14px]"
            >
              Create Board
            </Button>
          </div>
        </form>
      </div>

      {/* Bottom Legal / Note */}
      <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-[13px]">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        All data is encrypted within HiramBoard Workspace
      </div>
    </div>
  );
}
