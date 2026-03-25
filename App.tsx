import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { BottomNav } from './components/BottomNav';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { AssessmentScreen } from './screens/AssessmentScreen';
import { PathScreen } from './screens/PathScreen';
import { StepDetailScreen } from './screens/StepDetailScreen';
import { ScreenName, UserProfile, Theme } from './types';
import { PATH_STEPS } from './data';
import { DebugOverlay } from './components/DebugOverlay';
import { Icon } from './components/Icon';

// --- Placeholder Screens for Demo ---
const PlaceholderScreen = ({ title, icon, theme }: { title: string, icon: string, theme: Theme }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in pb-24">
    <div className={`size-24 rounded-3xl flex items-center justify-center mb-6 shadow-glow ${
      theme === 'dark' ? 'bg-slate-800 text-teal-400' : 'bg-white text-primary'
    }`}>
      <Icon name={icon} className="text-[48px]" />
    </div>
    <h1 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{title}</h1>
    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
      This feature is coming soon. Focus on your Career Path for now!
    </p>
  </div>
);

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(ScreenName.HOME);
  // Separate state to track which main tab is active, to restore it when coming back from detail
  const [activeTab, setActiveTab] = useState<ScreenName>(ScreenName.HOME);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    currentRole: 'Marketing Associate',
    targetRole: 'Product Manager',
    experienceYears: 3.5
  });
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  
  // UI States
  const [uiVersion, setUiVersion] = useState<string>('v1');
  const [theme, setTheme] = useState<Theme>('light');

  const handleProfileUpdate = (profile: UserProfile) => {
    setUserProfile(profile);
    // When updating profile from Home, we might want to suggest checking progress
    setCurrentScreen(ScreenName.PROGRESS);
    setActiveTab(ScreenName.PROGRESS);
  };

  const handleAssessmentComplete = () => {
    setCurrentScreen(ScreenName.LEARN);
    setActiveTab(ScreenName.LEARN);
  };

  const handleStepClick = (stepId: string) => {
    setSelectedStepId(stepId);
    setCurrentScreen(ScreenName.DETAIL);
  };

  const handleNav = (screen: ScreenName) => {
    setCurrentScreen(screen);
    setActiveTab(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      // Home Tab: Career Compass
      case ScreenName.HOME:
        return <OnboardingScreen initialProfile={userProfile} onSave={handleProfileUpdate} />;
      
      // Progress Tab: Skill Gap Assessment
      case ScreenName.PROGRESS:
        return (
          <AssessmentScreen 
            userProfile={userProfile} 
            onNext={handleAssessmentComplete} 
          />
        );
      
      // Learn Tab: Path/Curriculum
      case ScreenName.LEARN:
        return (
          <PathScreen 
            uiVersion={uiVersion}
            theme={theme}
            onStepClick={handleStepClick} 
          />
        );
      
      case ScreenName.PROFILE:
        return <PlaceholderScreen title="Your Profile" icon="account_circle" theme={theme} />;
      
      // Details (Not a tab, but part of Learn flow)
      case ScreenName.DETAIL:
        const step = PATH_STEPS.find(s => s.id === selectedStepId);
        if (!step) return null;
        return (
          <StepDetailScreen 
            step={step} 
            onBack={() => setCurrentScreen(activeTab)} 
          />
        );
      default:
        return <OnboardingScreen initialProfile={userProfile} onSave={handleProfileUpdate} />;
    }
  };

  // Check if we should show the bottom nav
  const showNav = [ScreenName.HOME, ScreenName.PROGRESS, ScreenName.LEARN, ScreenName.PROFILE].includes(currentScreen);
  // Also show Debug Overlay on main screens
  const showDebug = true;

  return (
    <Layout theme={theme}>
      {renderScreen()}
      
      {showNav && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={handleNav}
          theme={theme}
        />
      )}

      {showDebug && (
        <DebugOverlay 
          currentVersion={uiVersion} 
          onVersionChange={setUiVersion} 
          currentTheme={theme}
          onThemeChange={setTheme}
        />
      )}
    </Layout>
  );
};

export default App;