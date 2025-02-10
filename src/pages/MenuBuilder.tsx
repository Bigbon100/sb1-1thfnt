import React from 'react';
import { DashboardButton } from '../components/navigation/DashboardButton';
import { AdminButton } from '../components/navigation/AdminButton';
import MenuBuilderContent from '../components/MenuBuilder';

export default function MenuBuilder() {
  return (
    <div className="relative">
      <DashboardButton />
      <AdminButton />
      <MenuBuilderContent />
    </div>
  );
}