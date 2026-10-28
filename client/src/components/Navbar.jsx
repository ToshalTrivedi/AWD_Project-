import React from 'react';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md relative overflow-hidden select-none font-black text-lg tracking-tighter">
              <span>C</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full border border-indigo-600"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">Crackly</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  AWD PBL
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Global Hackathon Winning Presentations &amp; Rubrics
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
