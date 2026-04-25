import React from 'react';
import Link from 'next/link';
import { Share2, Filter, ArrowUpDown, ChevronLeft } from 'lucide-react';

interface BoardHeaderProps {
  title: string;
  category: string;
  subCategory: string;
}

export const BoardHeader: React.FC<BoardHeaderProps> = ({ title, category, subCategory }) => {
  return (
    <div className="flex items-center justify-between gap-3">
      {/* Left Section */}
      <div className="flex items-center gap-2 min-w-0">
        
        <Link
          href="/dashboard/boards"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          title="Back to boards"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>

        <div className="h-3 w-px bg-gray-200" />

        {/* Breadcrumb + Title */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] font-medium text-gray-400 uppercase whitespace-nowrap">
            {category}
          </span>
          {/* <span className="text-[10px] font-medium text-blue-600 uppercase whitespace-nowrap">
            {subCategory}
          </span> */}
          <div className="h-3 w-px bg-gray-200" />
          <div className="flex items-center gap-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>
          </div>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Team Avatars */}
        <div className="flex items-center -space-x-1.5">
          <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[7px] font-bold text-indigo-700 border border-white shadow-sm z-30">
            JD
          </div>
          <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-[7px] font-bold text-cyan-700 border border-white shadow-sm z-20">
            S
          </div>
          <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[7px] font-bold text-orange-700 border border-white shadow-sm z-10">
            W
          </div>
          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[6px] font-bold text-gray-600 border border-white shadow-sm z-0">
            +4
          </div>
        </div>

        <div className="h-3 w-px bg-gray-200" />

        {/* Filter Button */}
        <button className="flex items-center gap-1 px-2 py-0.5 text-[12px] font-medium text-gray-600 hover:bg-gray-100 rounded transition-colors whitespace-nowrap">
          <Filter className="w-3.5 h-3.5" />
          Filter
        </button>

        {/* Sort Button */}
        <button className="flex items-center gap-1 px-2 py-0.5 text-[12px] font-medium text-gray-600 hover:bg-gray-100 rounded transition-colors whitespace-nowrap">
          <ArrowUpDown className="w-3.5 h-3.5" />
          Sort
        </button>

        {/* Share Button */}
        <button className="flex items-center gap-1 px-2 py-0.5 text-[12px] font-medium text-gray-600 hover:bg-gray-100 rounded transition-colors whitespace-nowrap">
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>
      </div>
    </div>
  );
};
