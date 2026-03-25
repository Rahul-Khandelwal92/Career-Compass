import React from 'react';
import { Icon } from '../components/Icon';
import { PathStep, Theme } from '../types';
import { PATH_STEPS } from '../data';

interface PathScreenProps {
  onStepClick: (stepId: string) => void;
  uiVersion?: string; // v1 | v2 | v3
  theme?: Theme;
}

export const PathScreen: React.FC<PathScreenProps> = ({ onStepClick, uiVersion = 'v1', theme = 'light' }) => {
  const isDark = theme === 'dark';
  const isMinimal = theme === 'minimal';
  
  // Render based on version
  const renderContent = () => {
    if (uiVersion === 'v2') return <SubwayLayout steps={PATH_STEPS} onStepClick={onStepClick} theme={theme} />;
    if (uiVersion === 'v3') return <FocusCardLayout steps={PATH_STEPS} onStepClick={onStepClick} theme={theme} />;
    return <ClassicLayout steps={PATH_STEPS} onStepClick={onStepClick} theme={theme} />;
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Header */}
      <header className={`sticky top-0 z-50 flex items-center p-4 pb-3 justify-between border-b backdrop-blur-md
        ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-100'}
        ${isMinimal ? 'bg-white border-black border-b-2' : ''}
      `}>
        <div className="flex items-center gap-1.5">
          <Icon name="explore" className={`text-[18px] ${isDark ? 'text-teal-400' : 'text-primary'}`} />
          <span className={`font-bold text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Career Compass
          </span>
        </div>
        <h2 className={`text-[10px] font-bold uppercase tracking-widest
          ${isDark ? 'text-slate-400' : 'text-slate-400'}
        `}>
          Curriculum
        </h2>
      </header>

      <div className="flex-1 flex flex-col p-4 pb-24 overflow-y-auto no-scrollbar">
        <div className="mb-6 mt-2 animate-slide-up">
          <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Your Transition Route</h1>
          <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Estimated timeline: 4-6 months</p>
        </div>

        {/* Start Point Card */}
        <div className="relative z-10 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className={`rounded-2xl shadow-lg overflow-hidden relative p-6 pb-8
            ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-gradient-to-b from-teal-600 to-slate-900 text-white'}
            ${isMinimal ? 'bg-white border-2 border-black text-black shadow-none' : ''}
          `}>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Icon name="map" className="text-[120px]" />
            </div>
            
            <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full border
              ${isMinimal ? 'border-black bg-white text-black' : 'bg-white/20 border-white/10'}
            `}>
              <span className="text-[10px] font-bold tracking-wider uppercase">Start Point</span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg backdrop-blur-sm
                   ${isMinimal ? 'bg-black text-white' : 'bg-white/20'}
                `}>
                  <Icon name="foundation" className="text-[24px]" />
                </div>
                <h3 className={`text-xl font-bold leading-tight ${isMinimal || !isDark ? 'text-inherit' : 'text-white'}`}>Transferable Skills</h3>
              </div>
              <p className={`text-sm font-medium leading-relaxed pl-1
                 ${isMinimal ? 'text-slate-600' : 'text-teal-100'}
                 ${isDark ? 'text-slate-400' : ''}
              `}>
                Foundation detected: User Research, Stakeholder Management.
              </p>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

// --- Helper Props ---
interface LayoutProps {
  steps: PathStep[];
  onStepClick: (id: string) => void;
  theme: Theme;
}

// --- V1: Classic Layout ---
const ClassicLayout: React.FC<LayoutProps> = ({ steps, onStepClick, theme }) => {
  const isDark = theme === 'dark';
  const isMinimal = theme === 'minimal';

  return (
    <div className="relative pl-4 pr-1 animate-fade-in">
      {/* Timeline Line */}
      <div className={`absolute left-[22px] top-0 bottom-0 w-[2px] h-full z-0 
        ${isDark ? 'bg-slate-800' : 'bg-slate-200'}
        ${isMinimal ? 'bg-black' : ''}
      `}></div>
      {/* Active Line Segment */}
      <div className={`absolute left-[22px] top-0 h-[30%] w-[2px] z-0
        ${isMinimal ? 'bg-black' : 'bg-primary'}
      `}></div>

      {steps.map((step, index) => {
        const isCurrent = step.status === 'current';
        const isLocked = step.status === 'locked';
        
        return (
          <div 
            key={step.id} 
            className="relative z-10 grid grid-cols-[48px_1fr] gap-x-4 mb-8 group animate-slide-up"
            style={{ animationDelay: `${200 + (index * 100)}ms` }}
            onClick={() => !isLocked && onStepClick(step.id)}
          >
            {/* Icon Column */}
            <div className="flex flex-col items-center">
              <div className={`
                flex items-center justify-center size-12 rounded-full z-10 border-4 transition-all duration-300
                ${isDark ? 'border-slate-900' : 'border-[#f6f6f8]'}
                ${isCurrent 
                  ? (isMinimal ? 'bg-black text-white border-black scale-110' : 'bg-primary text-white shadow-glow scale-110') 
                  : ''}
                ${isLocked 
                  ? (isDark ? 'bg-slate-800 text-slate-600' : 'bg-white text-slate-300 border-slate-200') 
                  : ''}
                ${!isCurrent && !isLocked 
                  ? (isMinimal ? 'bg-white text-black border-black' : 'bg-teal-600 text-white') 
                  : ''}
              `}>
                <Icon name={isLocked ? "lock" : isCurrent ? "navigation" : "check"} className={isCurrent ? "animate-pulse" : ""} />
              </div>
            </div>

            {/* Content Column */}
            <div className={`flex flex-col pt-1 pb-2 ${isLocked ? 'opacity-60 grayscale' : 'cursor-pointer hover:scale-[1.01] transition-transform'}`}>
              <div className={`
                rounded-2xl p-5 relative transition-colors
                ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white shadow-soft'}
                ${isMinimal ? 'bg-white border-2 border-black shadow-none rounded-none' : 'border'}
                ${isCurrent && !isMinimal ? 'border-primary/20 ring-1 ring-primary/5' : ''}
              `}>
                {isCurrent && (
                  <div className={`absolute -top-3 right-4 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm z-10
                    ${isMinimal ? 'bg-black text-white top-2 right-2' : 'bg-primary text-white'}
                  `}>
                    Current Step
                  </div>
                )}

                <h3 className={`text-lg font-bold leading-tight mb-1
                  ${isDark ? 'text-white' : 'text-slate-900'}
                `}>{step.title}</h3>
                <p className={`text-xs font-semibold uppercase tracking-wide mb-3
                  ${isDark ? 'text-slate-500' : 'text-slate-500'}
                `}>{step.subtitle}</p>

                {/* Chips */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {step.isGap && (
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border
                        ${isDark ? 'bg-red-900/20 border-red-900/50 text-red-400' : 'bg-red-50 border-red-100 text-red-600'}
                        ${isMinimal ? 'bg-white border-black text-black' : ''}
                      `}>
                        <span className="text-[10px] font-bold uppercase">Gap</span>
                      </div>
                  )}
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border
                       ${isDark ? 'bg-slate-700 border-slate-600 text-slate-300' : 'bg-slate-50 border-slate-100 text-slate-500'}
                       ${isMinimal ? 'bg-white border-black text-black' : ''}
                    `}>
                      <Icon name="schedule" className="text-[14px]" />
                      <span className="text-[10px] font-bold">{step.effort}</span>
                    </div>
                </div>

                {isCurrent && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onStepClick(step.id);
                    }}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl h-12 px-4 text-sm font-bold mt-2 transition-colors
                    ${isMinimal ? 'bg-black text-white hover:bg-slate-800' : 'bg-primary hover:bg-teal-700 active:bg-teal-800 text-white shadow-lg shadow-teal-500/20'}
                  `}>
                    <span>Start Learning</span>
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* End Cap */}
      <div className={`absolute left-[18px] bottom-0 w-3 h-3 rounded-full 
        ${isDark ? 'bg-slate-800' : 'bg-slate-300'}
        ${isMinimal ? 'bg-black' : ''}
      `}></div>
    </div>
  );
};

// --- V2: Subway Layout ---
const SubwayLayout: React.FC<LayoutProps> = ({ steps, onStepClick, theme }) => {
  const isDark = theme === 'dark';
  const isMinimal = theme === 'minimal';

  return (
  <div className="relative pt-4 pb-8 animate-fade-in">
    {/* Center Line */}
    <div className={`absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full
      ${isDark ? 'bg-slate-800' : 'bg-slate-200'}
      ${isMinimal ? 'bg-black' : ''}
    `}></div>

    {steps.map((step, index) => {
      const isEven = index % 2 === 0;
      const isCurrent = step.status === 'current';
      const isLocked = step.status === 'locked';

      return (
        <div key={step.id} className="relative mb-8 grid grid-cols-2 gap-8 items-center"
             onClick={() => !isLocked && onStepClick(step.id)}>
           
           {/* Center Node */}
           <div className={`
             absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-5 rounded-full z-20 border-4 transition-all
             ${isDark ? 'border-slate-900' : 'border-[#f6f6f8]'}
             ${isCurrent 
                ? (isMinimal ? 'bg-black scale-125' : 'bg-primary scale-125 ring-4 ring-primary/20') 
                : (isLocked 
                  ? (isDark ? 'bg-slate-700' : 'bg-slate-300') 
                  : (isMinimal ? 'bg-white border-black' : 'bg-teal-600'))}
           `}></div>

           {/* Left Content */}
           <div className={`${!isEven ? 'col-start-1 text-right pr-2' : 'col-start-2 pl-2 order-2'}`}>
             <div className={`
               p-4 rounded-2xl transition-transform
               ${isLocked ? 'opacity-60 grayscale' : 'hover:scale-[1.02] cursor-pointer'}
               ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white shadow-soft border-slate-100 border'}
               ${isMinimal ? 'bg-white border-2 border-black shadow-none rounded-none' : ''}
               ${isCurrent && !isMinimal ? 'border-primary ring-2 ring-primary/5' : ''}
             `}>
               <h3 className={`font-bold text-sm leading-tight
                 ${isDark ? 'text-white' : 'text-slate-900'}
               `}>{step.title}</h3>
               <p className={`text-[10px] font-medium mt-1
                  ${isDark ? 'text-slate-400' : 'text-slate-500'}
               `}>{step.effort}</p>
               {isCurrent && <div className={`mt-2 text-[10px] font-bold uppercase tracking-wider
                 ${isMinimal ? 'text-black' : 'text-primary'}
               `}>Current</div>}
             </div>
           </div>

           {/* Empty side for balance */}
           <div className={!isEven ? 'col-start-2' : 'col-start-1'}></div>
        </div>
      )
    })}
  </div>
  );
};

// --- V3: Focus Cards Layout ---
const FocusCardLayout: React.FC<LayoutProps> = ({ steps, onStepClick, theme }) => {
  const isDark = theme === 'dark';
  const isMinimal = theme === 'minimal';

  return (
  <div className="flex flex-col gap-4 animate-fade-in">
    {steps.map((step, index) => {
      const isCurrent = step.status === 'current';
      const isLocked = step.status === 'locked';

      return (
        <div 
          key={step.id}
          onClick={() => !isLocked && onStepClick(step.id)}
          className={`
            relative p-6 rounded-3xl transition-all duration-300 border
            ${isCurrent 
              ? (isMinimal ? 'bg-black text-white border-black' : 'bg-slate-900 text-white shadow-xl scale-[1.02] border-transparent') 
              : (isDark 
                  ? 'bg-slate-800 text-slate-200 border-slate-700' 
                  : (isMinimal ? 'bg-white text-black border-2 border-black' : 'bg-white text-slate-900 shadow-soft border-slate-100'))}
            ${isLocked ? 'opacity-50' : 'cursor-pointer hover:shadow-md'}
          `}
        >
          <div className="flex justify-between items-start mb-4">
            <span className={`text-4xl font-black 
               ${isCurrent ? 'text-slate-700' : (isDark ? 'text-slate-700' : 'text-slate-100')}
            `}>
              0{index + 1}
            </span>
            {isCurrent && <Icon name="play_circle" className="text-white text-[32px]" fill />}
            {!isCurrent && !isLocked && <Icon name="check_circle" className="text-green-500 text-[24px]" fill />}
            {isLocked && <Icon name="lock" className="text-slate-300 text-[24px]" />}
          </div>
          
          <h3 className="text-xl font-bold mb-1">{step.title}</h3>
          <p className={`text-sm font-medium
            ${isCurrent ? 'text-slate-400' : 'text-slate-500'}
          `}>{step.subtitle}</p>
          
          <div className="mt-4 flex gap-2">
             <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded
               ${isCurrent ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'}
               ${isDark && !isCurrent ? 'bg-slate-700 text-slate-400' : ''}
               ${isMinimal ? 'bg-white border border-black text-black' : ''}
             `}>
               {step.effort}
             </span>
          </div>
        </div>
      );
    })}
  </div>
  );
};