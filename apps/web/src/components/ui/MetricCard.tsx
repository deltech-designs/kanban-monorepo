import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
  isPrimary?: boolean;
  pillLabels?: string[];
  pillColors?: string[];
}

export function MetricCard({ 
  title, 
  value, 
  trend, 
  icon, 
  isPrimary = false,
  pillLabels = [],
  pillColors = [] 
}: MetricCardProps) {
  return (
    <div className={`p-6 rounded-2xl flex flex-col justify-between ${
      isPrimary 
        ? 'bg-gradient-to-r from-[#4A3CF0] to-[#3B3AEC] text-white shadow-lg' 
        : 'bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-gray-900'
    }`}>
      <div>
        <h3 className={`text-[11px] font-bold tracking-wider uppercase mb-3 ${isPrimary ? 'text-white/80' : 'text-gray-500'}`}>
          {title}
        </h3>
        {pillLabels.length === 0 ? (
          <div className="flex items-center gap-3">
             <div className="text-[40px] font-bold leading-none tracking-tight">
               {value}
             </div>
             {trend && (
                <span className={`text-[13px] font-bold ${isPrimary ? 'text-white' : 'text-teal-500'}`}>
                  {trend}
                </span>
             )}
          </div>
        ) : (
          <div className="text-[28px] font-bold leading-tight tracking-tight max-w-[200px]">
             {value}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
         {icon && (
           <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPrimary ? 'bg-white/10' : 'text-[#4A3CF0] bg-[#EEF2FF]'}`}>
             {icon}
           </div>
         )}
         
         {pillLabels.length > 0 && (
           <div className="flex gap-2">
             {pillLabels.map((lbl, idx) => (
                <span key={lbl} className={`px-3 py-1 rounded-full text-[11px] font-semibold ${pillColors[idx] || 'bg-white/10 text-white'}`}>
                  {lbl}
                </span>
             ))}
           </div>
         )}
      </div>
    </div>
  );
}
