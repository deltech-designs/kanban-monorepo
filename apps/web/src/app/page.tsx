import React from 'react';
import Link from 'next/link';
import { Button } from '../components/app/partials/Button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fc] font-sans">
      <header className="flex items-center justify-between w-full px-6 py-4 bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-2 text-blue-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Hiram Board</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/auth/login" tabIndex={-1}>
            <Button variant="outline">Log in</Button>
          </Link>
          <Link href="/auth/signup" tabIndex={-1}>
            <Button variant="primary">Sign up</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-16 pb-12">
        <div className="max-w-3xl mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Organize your work and life, <span className="text-blue-600">finally.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 mx-auto max-w-2xl">
            Focus on what matters most with Hiram Board. Track tasks, collaborate with your team,
            and achieve your goals using our intuitive Kanban workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto" tabIndex={-1}>
              <Button fullWidth className="px-8 py-3 text-base">
                Get Started for Free
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto" tabIndex={-1}>
              <Button variant="outline" fullWidth className="px-8 py-3 text-base">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mt-16 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Visual Workflows</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Map out your projects visually with fully customizable columns and drag-and-drop cards
              tailored to your team's style.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Team Collaboration</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Work together seamlessly. Share boards, assign tasks, and keep everyone on the same
              page with real-time updates.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Task Tracking</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Never lose track of a task again. Create checklists, set deadlines, and manage
              intricate project details automatically.
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 text-center text-sm text-gray-400 border-t border-gray-200 mt-16 bg-white">
        <p>&copy; {new Date().getFullYear()} Hiram Board. All rights reserved.</p>
      </footer>
    </div>
  );
}
