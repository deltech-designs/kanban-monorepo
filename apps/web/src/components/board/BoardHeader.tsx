import React from 'react';
import { Button } from '@/components/ui/Button';

interface BoardHeaderProps {
  title: string;
  category: string;
  subCategory: string;
}

export const BoardHeader: React.FC<BoardHeaderProps> = ({ title, category, subCategory }) => {
  return (
    <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-5">
      <div>
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2 flex items-center gap-2">
          <span>{category}</span>
          <svg
            className="w-3 h-3 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#3b46f1]">{subCategory}</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-extrabold text-gray-900 tracking-tight">{title}</h1>
          <button className="text-gray-300 hover:text-yellow-400 mt-1 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[11px] font-bold text-indigo-700 border-2 border-[#f8f9fb] shadow-sm z-30">
            JD
          </div>
          <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-[11px] font-bold text-cyan-700 border-2 border-[#f8f9fb] shadow-sm z-20">
            AS
          </div>
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[11px] font-bold text-orange-700 border-2 border-[#f8f9fb] shadow-sm z-10">
            BW
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600 border-2 border-[#f8f9fb] z-0">
            +4
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-gray-700 bg-white border border-gray-200/80 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share
        </button>

        <Button className="bg-[#3b46f1] hover:bg-blue-700 rounded-xl px-5 py-2.5 shadow-md">
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Column
        </Button>
      </div>
    </div>
  );
};
