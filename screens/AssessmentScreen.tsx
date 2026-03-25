import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { UserProfile, Skill, SkillLevel } from '../types';
import { INITIAL_SKILLS } from '../data';

interface AssessmentScreenProps {
  userProfile: UserProfile;
  onNext: () => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({ userProfile, onNext }) => {
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);

  // Calculate progress
  const progress = 35; // Mock progress for visual

  const handleLevelChange = (id: string, level: SkillLevel) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, level } : s));
  };

  return (
    <div className="flex flex-col h-full bg-[#f6f6f8]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-1.5">
            <Icon name="explore" className="text-primary text-[18px]" />
            <span className="font-bold text-sm text-slate-900 tracking-tight">Career Compass</span>
          </div>
          <h2 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Skill Gap</h2>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-100">
          <div className="h-full bg-primary rounded-r-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-1 px-4 pt-6 pb-28 overflow-y-auto">
        {/* Context Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-4 animate-fade-in">
          <Icon name="swap_horiz" className="text-primary text-[18px]" />
          <span className="text-primary text-xs font-bold tracking-wide">
            {userProfile.currentRole || 'Marketing'} → {userProfile.targetRole || 'Product Manager'}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Check your toolkit</h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Update your comfort level with these core {userProfile.targetRole} skills.
        </p>

        <div className="flex flex-col gap-4">
          {skills.map((skill, index) => (
            <div 
              key={skill.id} 
              className="bg-white rounded-2xl p-5 shadow-soft border border-transparent transition-all animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{skill.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{skill.description}</p>
                </div>
                {skill.isTransferable && (
                  <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-100">
                    <Icon name="check_circle" className="text-[14px]" fill />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Transferable</span>
                  </div>
                )}
              </div>

              {/* Toggle Switch */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                {[SkillLevel.NONE, SkillLevel.BASIC, SkillLevel.EXPERT].map((level) => {
                  const isActive = skill.level === level;
                  return (
                    <button
                      key={level}
                      onClick={() => handleLevelChange(skill.id, level)}
                      className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' 
                          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400 max-w-xs mx-auto">
          Accurate self-assessment helps us curate better learning resources for you.
        </p>
      </div>

       {/* Sticky Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 p-4 z-20 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
             <button 
              onClick={onNext}
              className="w-full bg-primary hover:bg-teal-700 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              Update Learning Plan
              <Icon name="arrow_forward" className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};