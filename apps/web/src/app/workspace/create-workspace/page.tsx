'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';

const PRIMARY_BLUE = '#1763E6';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function StepIndicator() {
  return (
    <div className="mb-7 flex items-center gap-3" aria-label="Step 2 of 2">
      <span className="h-2 w-2 rounded-full bg-[#C9D8F8]" />
      <span className="h-2.5 w-9 rounded-full" style={{ backgroundColor: PRIMARY_BLUE }} />
      <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#7F8CA6]">
        Step 2 of 2
      </span>
    </div>
  );
}

export default function InviteTeamPage() {
  const [emailInput, setEmailInput] = useState('');
  const [emails, setEmails] = useState<string[]>([
    'sarah.design@flowboard.io',
    'alex.mktg@flowboard.io',
  ]);

  const canAdd = useMemo(() => EMAIL_PATTERN.test(emailInput.trim()), [emailInput]);

  const addEmail = () => {
    const normalized = emailInput.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(normalized) || emails.includes(normalized)) {
      return;
    }
    setEmails((prev) => [...prev, normalized]);
    setEmailInput('');
  };

  const onSubmitInput = (event: FormEvent) => {
    event.preventDefault();
    addEmail();
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails((prev) => prev.filter((email) => email !== emailToRemove));
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#E9EDF5] px-4 py-10">
      <section className="w-full max-w-120 rounded-2xl border border-[#DCE4F0] bg-white p-8 shadow-[0_12px_30px_rgba(18,50,99,0.08)] sm:p-9">
        <StepIndicator />

        <h1 className="text-[24px] font-bold leading-tight text-[#192231]">Invite your team</h1>

        <form onSubmit={onSubmitInput} className="mt-6">
          <label
            htmlFor="invite-email"
            className="mb-2 block text-[14px] font-semibold tracking-[0.01em] text-[#2E3B4E]"
          >
            Team email
          </label>
          <div className="flex h-13 items-center gap-2 rounded-xl border border-[#C6D1E1] bg-[#F1F5FC] px-2">
            <input
              id="invite-email"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
              placeholder="teammate@company.com"
              className="h-full flex-1 border-0 bg-transparent px-2 text-[18px] text-[#1D2B42] placeholder:text-[#8A97AC] outline-none"
            />
            <button
              type="submit"
              disabled={!canAdd}
              className="h-10 min-w-20 rounded-lg px-4 text-[15px] font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: PRIMARY_BLUE }}
            >
              Add
            </button>
          </div>
        </form>

        {emails.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {emails.map((email) => (
              <li
                key={email}
                className="flex items-center rounded-full bg-primary-light px-3 py-1.5 text-[14px] text-[#1F5ECB]"
              >
                <span>{email}</span>
                <button
                  type="button"
                  onClick={() => removeEmail(email)}
                  className="ml-2 leading-none text-[#1F5ECB] transition hover:opacity-80"
                  aria-label={`Remove ${email}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className="mt-7 flex h-13 w-full items-center justify-center rounded-xl text-[18px] font-semibold text-white shadow-[0_10px_20px_rgba(23,99,230,0.26)] transition hover:brightness-95"
          style={{ backgroundColor: PRIMARY_BLUE }}
        >
          Send Invites
        </button>

        <div className="mt-4 text-center">
          <Link
            href="/dashboard"
            className="text-[16px] text-[#7A879D] transition hover:text-[#616E84]"
          >
            Skip for now
          </Link>
        </div>
      </section>
    </main>
  );
}
