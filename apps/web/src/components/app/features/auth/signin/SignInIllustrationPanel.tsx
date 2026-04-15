import React from 'react';

export function SignInIllustrationPanel() {
  const teamColors = ['bg-sky-500', 'bg-emerald-500', 'bg-amber-500'];

  return (
    <aside className="relative hidden overflow-hidden bg-linear-to-b from-[#F4F8FF] via-[#ECF4FF] to-white p-12 lg:flex lg:w-[50%] lg:flex-col lg:justify-center lg:items-center">
      <div className="pointer-events-none absolute -left-16 top-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-14 right-8 h-64 w-64 rounded-full bg-[#7BC7FF]/25 blur-3xl" />

      <div className="relative z-10 w-full max-w-130">
        <div className="rounded-3xl border border-primary/15 bg-white/95 p-6 shadow-[0_20px_55px_rgba(44,109,181,0.16)] backdrop-blur">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark/80">
                Team Board
              </p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">Sprint planning - Q2</p>
            </div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark">
              12 tasks active
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-neutral-100 bg-neutral-100/70 p-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-700">
                To Do
              </p>
              <div className="space-y-2">
                <div className="rounded-lg border border-neutral-100 bg-white p-2">
                  <div className="mb-1.5 h-1.5 w-full rounded-full bg-neutral-100" />
                  <div className="h-1.5 w-3/4 rounded-full bg-neutral-100" />
                </div>
                <div className="rounded-lg border border-neutral-100 bg-white p-2">
                  <div className="mb-1.5 h-1.5 w-5/6 rounded-full bg-neutral-100" />
                  <div className="h-1.5 w-2/3 rounded-full bg-neutral-100" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-primary-dark">
                In Progress
              </p>
              <div className="rounded-lg border border-primary/20 bg-white p-2.5">
                <div className="mb-1.5 h-1.5 w-full rounded-full bg-primary/25" />
                <div className="h-1.5 w-2/3 rounded-full bg-primary/20" />
                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-full bg-[#E8F4FF] px-1.5 py-0.5 text-[10px] font-semibold text-primary-dark">
                    High
                  </span>
                  <div className="h-4 w-4 rounded-full bg-primary" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-success/25 bg-success/10 p-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-success">
                Done
              </p>
              <div className="space-y-2">
                {[0, 1].map((item) => (
                  <div key={item} className="rounded-lg border border-success/20 bg-white p-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-success">
                        <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none">
                          <path
                            d="M2 5l2 2 4-4"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-neutral-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-neutral-100 bg-neutral-100/60 px-3 py-2">
              <p className="text-[11px] text-neutral-700">Delivery score</p>
              <p className="mt-0.5 text-xl font-bold text-neutral-900">94%</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-2">
              <p className="text-[11px] text-primary-dark">Weekly streak</p>
              <p className="mt-0.5 text-xl font-bold text-primary-dark">+18 tasks</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-95 text-center">
          <h2 className="text-[26px] font-bold leading-tight tracking-tight text-neutral-900">
            Plan clearly. Deliver confidently.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            Hiram Board keeps priorities, owners, and progress in one focused workspace built for
            high-performing teams.
          </p>

          <div className="mx-auto mt-6 flex w-max items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 shadow-[0_8px_20px_rgba(44,109,181,0.12)]">
            <div className="flex -space-x-2">
              {teamColors.map((color, index) => (
                <span
                  key={index}
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white ${color}`}
                >
                  <svg
                    className="mt-0.5 h-3.5 w-3.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              ))}
            </div>
            <span className="text-xs font-semibold text-neutral-700">Trusted by 10k+ teams</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
