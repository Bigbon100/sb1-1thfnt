import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Notification({ message, onClose, duration = 3000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-4 right-4 bg-green-50 text-green-800 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
      <CheckCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
}