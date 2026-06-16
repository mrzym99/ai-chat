import React, { useEffect } from 'react';
import { CrossCircledIcon, Cross2Icon } from '@radix-ui/react-icons';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
  autoCloseDelay?: number;
}

export function ErrorToast({ 
  message, 
  onClose, 
  autoCloseDelay = 4000,
}: ErrorToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, autoCloseDelay);
    return () => clearTimeout(timer);
  }, [onClose, autoCloseDelay]);

  return (
    <div className="fixed top-6 right-6 bg-gradient-to-br from-red-500 to-red-600 text-white px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 z-50 animate-in slide-in-from-right-5 fade-in duration-300">
      <CrossCircledIcon className="w-5 h-5 flex-shrink-0" />
      <span className="font-medium">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-2 hover:opacity-80 transition-opacity p-1 rounded-full hover:bg-white/10"
      >
        <Cross2Icon className="w-4 h-4" />
      </button>
    </div>
  );
}
