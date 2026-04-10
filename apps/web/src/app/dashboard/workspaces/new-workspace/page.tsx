'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../../../components/app/partials/Input';
import { Button } from '../../../../components/app/partials/Button';

export default function CreateWorkspacePage() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* In a real app, call API to create workspace */
    router.push('/dashboard/workspaces');
  };

  return (
    <div className="min-h-full flex flex-col items-center py-16 px-6">
      <div className="text-center mb-10">
        <h1 className="text-[32px] font-bold text-[#0F172A] tracking-tight mb-2">
          Create New Workspace
        </h1>
        <p className="text-[#64748B] text-[15px]">
          Organize your boards and team members in one place.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg w-full max-w-160 p-8 sm:p-10 border border-gray-100/50">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Input
            id="workspace-name"
            label="WORKSPACE NAME"
            placeholder="e.g., Acme Corp Engineering"
            className="bg-slate-50/50 border-gray-200 py-3"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => router.back()}
              className="py-3"
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth className="py-3">
              Create Workspace
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
