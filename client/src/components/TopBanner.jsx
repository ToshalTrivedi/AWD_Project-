import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function TopBanner() {
  return (
    <aside 
      aria-label="Announcement" 
      className="bg-[#dc2626] text-white py-2 px-4 transition-all duration-200 relative z-50 border-b border-red-700/40"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs md:text-sm font-medium">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
            Live
          </span>
          <span className="font-semibold tracking-tight">
            LIVE OPPORTUNITIES: Hackathons, Internships & Fresher Jobs | Updated Daily
          </span>
        </div>
        <div className="flex items-center">
          <a
            href="https://mlh.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-bold hover:text-red-100 transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            <span>View MLH Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </aside>
  );
}
