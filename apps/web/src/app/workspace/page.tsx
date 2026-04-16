'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const PRIMARY_BLUE = '#1763E6';

function StepIndicator() {
  return (
    <div className="mb-7 flex items-center gap-3" aria-label="Step 1 of 2">
      <span className="h-2 w-2 rounded-full bg-[#C9D8F8]" />
      <span className="h-2.5 w-9 rounded-full" style={{ backgroundColor: PRIMARY_BLUE }} />
      <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#7F8CA6]">
        Step 1 of 2
      </span>
    </div>
  );
}

export default function WorkspaceNamePage() {
  const [workspaceName, setWorkspaceName] = useState('');

  const continueHref = useMemo(() => {
    const name = workspaceName.trim();
    return name
      ? `/workspace/create-workspace?name=${encodeURIComponent(name)}`
      : '/workspace/create-workspace';
  }, [workspaceName]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#E9EDF5] px-4 py-10">
      <section className="w-full max-w-120 rounded-2xl border border-[#DCE4F0] bg-white p-8 shadow-[0_12px_30px_rgba(18,50,99,0.08)] sm:p-9">
        <StepIndicator />

        <h1 className="text-[24px] font-bold leading-tight text-[#192231]">Name your workspace</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-[#5D687B]">
          This is where your team and boards will live.
        </p>

        <div className="mt-7">
          <label
            htmlFor="workspace-name"
            className="mb-2 block text-[14px] font-semibold tracking-[0.01em] text-[#2E3B4E]"
          >
            Workspace Name
          </label>
          <input
            id="workspace-name"
            value={workspaceName}
            onChange={(event) => setWorkspaceName(event.target.value)}
            placeholder="e.g. Acme Marketing, Design Ops"
            className="h-13 w-full rounded-xl border border-[#C6D1E1] bg-[#F1F5FC] px-4 text-[20px] text-[#1D2B42] placeholder:text-[#8A97AC] outline-none transition focus:border-[#AABCE2] focus:bg-white"
          />
          <p className="mt-2 text-[14px] text-[#728098]">You can always change this later</p>
        </div>

        <Link
          href={continueHref}
          className="mt-8 flex h-13 w-full items-center justify-center rounded-xl text-[18px] font-semibold text-white shadow-[0_10px_20px_rgba(23,99,230,0.26)] transition hover:brightness-95"
          style={{ backgroundColor: PRIMARY_BLUE }}
        >
          Continue
        </Link>
      </section>
    </main>
  );
}
