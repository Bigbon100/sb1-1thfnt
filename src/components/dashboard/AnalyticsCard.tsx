import React, { ReactNode } from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
}

export function AnalyticsCard({ title, value, icon, subtitle }: AnalyticsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-purple-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-purple-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-purple-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-3 bg-purple-50 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
}