import React, { useState, useEffect } from 'react';
import { Icon } from '../components/Icon';
import { UserProfile } from '../types';

interface OnboardingScreenProps {
  initialProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ initialProfile, onSave }) => {
  const [currentRole, setCurrentRole] = useState(initialProfile.currentRole);
  const [targetRole, setTargetRole] = useState(initialProfile.targetRole);
  const [experience, setExperience] = useState(initialProfile.experienceYears || 3.5);

  const canProceed = currentRole && targetRole;

  const handleSave = () => {
    if (canProceed) {
      onSave({
        currentRole,
        targetRole,
        experienceYears: experience
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f6f6f8] relative">
      {/* Top Bar */}
      <div className="flex items-center justify-center p-4 bg-[#f6f6f8] sticky top-0 z-10 gap-2">
        <Icon name="explore" className="text-primary text-[24px]" />
        <span className="font-bold text-lg text-slate-900 tracking-tight">Career Compass</span>
      </div>

      <div className="flex-1 px-5 pt-4 pb-32 overflow-y-auto">
        {/* Decorative Image */}
        <div className="w-full h-32 rounded-2xl overflow-hidden relative shadow-md group mb-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Career planning workspace" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
           <div className="absolute bottom-3 left-4 z-20 text-white font-medium text-sm flex items-center gap-2">
             <Icon name="trending_up" className="text-[18px]" />
             <span>Recalibrating path...</span>
           </div>
        </div>

        <h1 className="text-[32px] leading-tight font-bold text-slate-900 mb-3 tracking-tight">
          Your coordinates
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-8">
          Update your starting point and destination to recalibrate your career path.
        </p>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
          
          {/* Start Point */}
          <div className="flex gap-4 mb-1">
            <div className="flex flex-col items-center pt-2">
              <Icon name="my_location" className="text-primary text-[24px]" />
              <div className="w-0.5 h-full bg-slate-100 my-1 min-h-[32px] rounded-full"></div>
            </div>
            <div className="flex-1 pb-6 border-b border-slate-50">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Where are you starting?</label>
              <div className="relative">
                <select 
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  className="w-full h-12 bg-slate-50 rounded-xl px-4 text-lg font-medium text-slate-900 appearance-none focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all cursor-pointer hover:bg-slate-100 border-none"
                >
                  <option value="" disabled>Select Current Role</option>
                  <option value="Marketing Associate">Marketing Associate</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="Sales Executive">Sales Executive</option>
                  <option value="HR Generalist">HR Generalist</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Icon name="expand_more" />
                </div>
              </div>
            </div>
          </div>

          {/* End Point */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center pt-1">
              <Icon name="location_on" className="text-red-500 text-[24px]" fill />
            </div>
            <div className="flex-1 pt-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Where do you want to go?</label>
              <div className="relative">
                <select 
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full h-12 bg-slate-50 rounded-xl px-4 text-lg font-medium text-slate-900 appearance-none focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all cursor-pointer hover:bg-slate-100 border-none"
                >
                  <option value="" disabled>Select Target Role</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="UX Designer">UX Designer</option>
                  <option value="Data Scientist">Data Scientist</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Icon name="expand_more" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Slider */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
          <div className="flex justify-between items-end mb-6">
            <label className="text-base font-bold text-slate-900">Years of Experience</label>
            <span className="text-primary font-bold text-xl">{experience} Years</span>
          </div>
          <div className="relative w-full flex items-center mb-2">
            <input 
              type="range" 
              min="0" 
              max="15" 
              step="0.5" 
              value={experience}
              onChange={(e) => setExperience(parseFloat(e.target.value))}
              className="w-full z-20 focus:outline-none"
            />
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-slate-400">
            <span>Fresher</span>
            <span>15+ Years</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 p-4 z-20 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
             <button 
              onClick={handleSave}
              disabled={!canProceed}
              className={`w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                canProceed 
                  ? 'bg-primary text-white hover:bg-teal-700 shadow-primary/25 translate-y-0' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <Icon name="analytics" />
              Check Skill Gaps
            </button>
        </div>
      </div>
    </div>
  );
};