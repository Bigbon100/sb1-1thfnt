import React from 'react';
import { Trash2, MoveVertical } from 'lucide-react';

type MenuItemProps = {
  id: string;
  text: string;
  index: number;
  onRemove: (id: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
};

export function MenuItem({ id, text, index, onRemove, onMove }: MenuItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
      <button 
        className="opacity-50 hover:opacity-100 cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => {
          const target = e.currentTarget;
          const startY = e.clientY;
          const startIndex = index;
          
          const handleMouseMove = (moveEvent: MouseEvent) => {
            const currentY = moveEvent.clientY;
            const diff = Math.round((currentY - startY) / 40);
            const newIndex = Math.max(0, Math.min(index + diff, index + diff));
            if (newIndex !== startIndex) {
              onMove(startIndex, newIndex);
            }
          };
          
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            target.releasePointerCapture(e.pointerId);
          };
          
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
          target.setPointerCapture(e.pointerId);
        }}
      >
        <MoveVertical size={20} />
      </button>
      <span className="flex-1">{text}</span>
      <button
        onClick={() => onRemove(id)}
        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}