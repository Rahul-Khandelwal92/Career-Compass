import React, { useState } from 'react';
import { Icon } from './Icon';
import { Theme } from '../types';
import html2canvas from 'html2canvas';

interface DebugOverlayProps {
  currentVersion: string;
  onVersionChange: (version: string) => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const DebugOverlay: React.FC<DebugOverlayProps> = ({ 
  currentVersion, 
  onVersionChange,
  currentTheme,
  onThemeChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScreenshotMode, setIsScreenshotMode] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleDownloadScreenshot = async () => {
    setIsCapturing(true);
    setIsOpen(false);
    
    // Wait a bit for the menu to close
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(document.body, {
          useCORS: true,
          scale: 2, // Higher resolution
          backgroundColor: null,
        });
        
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `career-compass-screenshot-${Date.now()}.png`;
        link.click();
      } catch (error) {
        console.error('Failed to capture screenshot:', error);
      } finally {
        setIsCapturing(false);
      }
    }, 300);
  };

  if (isScreenshotMode || isCapturing) {
    return null; // Completely hide for clean screenshots
  }

  const layouts = [
    { id: 'v1', label: 'Classic Route' },
    { id: 'v2', label: 'Subway Map' },
    { id: 'v3', label: 'Focus Cards' }
  ];

  const themes: { id: Theme; label: string; icon: string }[] = [
    { id: 'light', label: 'Light', icon: 'light_mode' },
    { id: 'dark', label: 'Dark', icon: 'dark_mode' },
    { id: 'minimal', label: 'Minimal', icon: 'contrast' }
  ];

  return (
    <div className="absolute bottom-24 right-4 z-[100] flex flex-col items-end gap-2 pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        {isOpen && (
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl overflow-hidden min-w-[200px] animate-slide-up origin-bottom-right mb-2 border border-slate-800">
            
            {/* Theme Section */}
            <div className="px-4 py-2 bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700">
              App Style
            </div>
            <div className="flex p-2 gap-1 bg-slate-900">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className={`flex-1 flex flex-col items-center justify-center py-2 rounded-lg transition-all ${
                    currentTheme === t.id 
                      ? 'bg-slate-700 text-white shadow-inner' 
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon name={t.icon} className="text-[20px] mb-1" />
                  <span className="text-[10px] font-medium">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Layout Section */}
            <div className="px-4 py-2 bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700 border-t">
              Route Layout
            </div>
            <div className="flex flex-col">
              {layouts.map((v) => (
                <button
                  key={v.id}
                  onClick={() => onVersionChange(v.id)}
                  className={`w-full text-left px-4 py-3 text-xs font-bold transition-colors flex items-center justify-between ${
                    currentVersion === v.id 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  {v.label}
                  {currentVersion === v.id && <Icon name="check" className="text-[16px]" />}
                </button>
              ))}
            </div>
            {/* Screenshot Mode */}
            <div className="px-4 py-2 bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700 border-t">
              Export
            </div>
            <button
              onClick={handleDownloadScreenshot}
              className="w-full text-left px-4 py-3 text-xs font-bold transition-colors flex items-center gap-2 hover:bg-slate-800 text-slate-400 border-b border-slate-800"
            >
              <Icon name="download" className="text-[16px]" />
              Download Screenshot
            </button>
            <button
              onClick={() => setIsScreenshotMode(true)}
              className="w-full text-left px-4 py-3 text-xs font-bold transition-colors flex items-center gap-2 hover:bg-slate-800 text-slate-400"
            >
              <Icon name="photo_camera" className="text-[16px]" />
              Screenshot Mode (Hides this menu)
            </button>
          </div>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`size-12 rounded-full shadow-lg flex items-center justify-center transition-all active:scale-90 border-2 ${
            isOpen 
              ? 'bg-slate-900 text-white border-slate-900 rotate-90' 
              : 'bg-white text-slate-900 border-slate-100 hover:border-primary/50'
          }`}
        >
          <Icon name={isOpen ? 'close' : 'palette'} />
        </button>
      </div>
    </div>
  );
};