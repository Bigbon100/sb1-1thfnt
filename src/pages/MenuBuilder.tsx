import React from 'react';
import { DashboardButton } from '../components/navigation/DashboardButton';
import MenuBuilderContent from '../components/MenuBuilder';

export default function MenuBuilder() {
  return (
    <div className="relative">
      <DashboardButton />
      <MenuBuilderContent />
    </div>
  );
}