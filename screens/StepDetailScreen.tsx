import React from 'react';
import { Icon } from '../components/Icon';
import { PathStep } from '../types';

interface StepDetailScreenProps {
  step: PathStep;
  onBack: () => void;
}

export const StepDetailScreen: React.FC<StepDetailScreenProps> = ({ step, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-50">
        <div className="flex items-center justify-between px-4 h-16">
          <button onClick={onBack} className="flex items-center justify-center size-10 -ml-2 rounded-full hover:bg-slate-50 transition-colors text-slate-900">
            <Icon name="arrow_back" />
          </button>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <Icon name="explore" className="text-primary text-[14px]" />
              <span className="text-[12px] font-bold text-slate-900 tracking-tight">Career Compass</span>
            </div>
            <div className="w-16 h-1 bg-slate-100 rounded-full mt-1">
              <div className="w-[20%] h-full bg-primary rounded-full"></div>
            </div>
          </div>
          <button className="size-10 -mr-2 flex items-center justify-center text-slate-400 hover:text-primary">
            <Icon name="more_vert" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header Content */}
        <div className="px-6 pt-6 pb-2 animate-slide-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-primary border border-teal-100 mb-4">
            <Icon name="timelapse" className="text-[18px]" fill />
            <span className="text-xs font-bold tracking-wide">{step.effort} Effort</span>
          </div>
          <h1 className="text-4xl font-bold leading-[1.1] text-slate-900 tracking-tight mb-2">
            {step.title}
          </h1>
          <p className="text-slate-500 font-medium">{step.subtitle}</p>
        </div>

        <div className="h-8"></div>

        {/* Why this matters */}
        <section className="px-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Icon name="psychology" className="text-primary" fill />
            Why this matters
          </h3>
          <p className="text-slate-600 text-base leading-relaxed">
            {step.description}
          </p>
        </section>

        <div className="h-10"></div>

        {/* Resources */}
        <section className="px-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Curated Resources</h3>
            <span className="text-xs font-bold text-primary bg-teal-50 px-2 py-1 rounded">{step.resources.length} Items</span>
          </div>
          
          <div className="flex flex-col gap-3">
            {step.resources.map((res, i) => (
              <a 
                key={i} 
                href={res.url}
                className="group relative flex items-center p-4 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-soft transition-all active:scale-[0.99]"
              >
                <div className={`
                  size-12 shrink-0 rounded-xl flex items-center justify-center
                  ${res.type === 'VIDEO' ? 'bg-red-100 text-red-600' : ''}
                  ${res.type === 'TEMPLATE' ? 'bg-teal-100 text-teal-600' : ''}
                  ${res.type === 'ARTICLE' ? 'bg-purple-100 text-purple-600' : ''}
                `}>
                  <Icon 
                    name={res.type === 'VIDEO' ? 'play_circle' : res.type === 'TEMPLATE' ? 'article' : 'lightbulb'} 
                    fill 
                  />
                </div>
                <div className="ml-4 flex-1 pr-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">{res.type}</div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                    {res.title}
                  </h4>
                </div>
                <Icon name="chevron_right" className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>
        </section>

        <div className="h-10"></div>

        {/* Proof Component */}
        {step.proof && (
          <section className="px-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="relative bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-3xl p-6 border border-slate-100 overflow-hidden">
              <div className="absolute -top-4 -right-4 text-slate-200/50 pointer-events-none select-none">
                <Icon name="format_quote" className="text-[120px]" fill />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="size-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src={step.proof.authorImage} alt={step.proof.authorName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{step.proof.authorName}</h4>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 font-medium">{step.proof.authorRole}</span>
                      <span className="text-xs font-bold text-[#cb202d] bg-white px-1.5 py-0.5 rounded shadow-sm border border-slate-100">
                        {step.proof.authorCompany}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[15px] italic text-slate-600 leading-relaxed">
                  "{step.proof.quote}"
                </p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 max-w-md w-full p-4 bg-white/80 backdrop-blur-xl border-t border-slate-50 z-30">
        <button className="w-full h-14 bg-primary hover:bg-teal-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
          <span>Start Learning</span>
          <Icon name="arrow_forward" />
        </button>
      </div>
    </div>
  );
};