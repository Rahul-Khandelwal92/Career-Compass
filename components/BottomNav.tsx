import React from 'react';
import { Icon } from './Icon';
import { ScreenName, Theme } from '../types';

interface BottomNavProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  theme: Theme;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, theme }) => {
  
  const navItems = [
    { id: ScreenName.HOME, icon: 'my_location', label: 'Home' },
    { id: ScreenName.PROGRESS, icon: 'analytics', label: 'Progress' },
    { id: ScreenName.LEARN, icon: 'school', label: 'Learn' },
    { id: ScreenName.PROFILE, icon: 'person', label: 'Profile' },
  ];

  const isDark = theme === 'dark';
  const isMinimal = theme === 'minimal';

  return (
    <div className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 flex justify-around pt-3 h-20 border-t transition-colors duration-300
      ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}
      ${isMinimal ? 'bg-white border-t-2 border-black' : ''}
    `}>
      {navItems.map((item) => {
        // Active state logic: If current screen is Detail, it doesn't highlight any nav item, or we could highlight 'Learn' if we knew parent. 
        // For simplicity, strict equality.
        const isActive = currentScreen === item.id;
        
        let activeColor = 'text-primary';
        if (isDark) activeColor = 'text-teal-400';
        if (isMinimal) activeColor = 'text-black';

        let inactiveColor = 'text-slate-400';
        if (isDark) inactiveColor = 'text-slate-600';
        if (isMinimal) inactiveColor = 'text-gray-400';

        return (
          <button 
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 w-16 transition-colors ${isActive ? activeColor : inactiveColor}`}
          >
            <Icon 
              name={item.icon} 
              fill={isActive && !isMinimal} 
              className={`text-[26px] transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
            />
            <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
            
            {/* Active Indicator Dot */}
            <div className={`size-1 rounded-full mt-0.5 transition-all duration-300 ${isActive ? (isMinimal ? 'bg-black' : 'bg-current') : 'bg-transparent scale-0'}`}></div>
          </button>
        );
      })}
    </div>
  );
};