import React from 'react';

export interface Activity {
  id: string;
  user: { name: string; avatarUrl: string; initials: string; color: string };
  actionText: React.ReactNode;
  timeAgo: string;
  comment?: string;
  type: 'move' | 'comment' | 'upload';
}

export function ActivityFeed({ activities }: { activities: Activity[] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">Recent Activity</h2>
      </div>
      <div className="space-y-6">
        {activities.map((activity, idx) => (
          <div key={activity.id} className="flex gap-4 relative">
             {/* Timeline line */}
             {idx !== activities.length - 1 && (
               <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-gray-100" />
             )}

             {/* Avatar/Icon */}
             {activity.type === 'upload' ? (
               <div className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#4A3CF0] flex items-center justify-center flex-shrink-0 z-10 border-4 border-white">
                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                 </svg>
               </div>
             ) : (
                <div className={`w-8 h-8 rounded-full ${activity.user.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 z-10 border-4 border-white`}>
                  {activity.user.initials}
                </div>
             )}

             <div>
               <p className="text-[13px] text-gray-800 leading-relaxed">
                 <span className="font-semibold">{activity.user.name}</span> {activity.actionText}
               </p>
               {activity.comment && (
                 <div className="mt-2 text-[13px] text-gray-500 bg-[#F8FAFC] border-l-2 border-[#4A3CF0] p-3 rounded-r-lg">
                   "{activity.comment}"
                 </div>
               )}
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1.5">
                 {activity.timeAgo}
               </p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
