import React from 'react';
import { Theme } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  theme?: Theme;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = "", theme = 'light' }) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'dark bg-slate-950 text-white';
      case 'minimal':
        return 'bg-white text-black grayscale';
      default:
        return 'bg-[#f6f6f8] text-slate-900';
    }
  };

  const getContainerClasses = () => {
     switch (theme) {
      case 'dark':
        return 'bg-slate-900 border-slate-800';
      case 'minimal':
        return 'bg-white border-black';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`min-h-screen w-full flex justify-center font-sans transition-colors duration-300 ${getThemeClasses()}`}>
      <div className={`w-full max-w-md min-h-screen shadow-2xl relative flex flex-col transition-colors duration-300 ${getContainerClasses()} ${className}`}>
        {children}
      </div>
    </div>
  );
};