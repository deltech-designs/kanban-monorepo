import React from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  status: 'online' | 'offline' | 'busy';
}

export function TeamWidget({ members }: { members: TeamMember[] }) {
  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-gray-300',
    busy: 'bg-amber-500'
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">Team Members</h2>
         <button className="text-[#4A3CF0] hover:bg-[#EEF2FF] p-1.5 rounded-md transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
         </button>
      </div>

      <div className="space-y-4">
        {members.map(member => (
          <div key={member.id} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${member.color} flex items-center justify-center text-white text-[12px] font-bold shadow-sm`}>
                {member.initials}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-900 leading-tight mb-0.5">{member.name}</p>
                <p className="text-[11px] text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className={`w-2 h-2 rounded-full ${statusColors[member.status]}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
