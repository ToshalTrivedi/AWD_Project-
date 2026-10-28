import React from 'react';
import { Search, X, Filter } from 'lucide-react';

const CATEGORIES = [
  'All Opportunities',
  'Hackathons',
  'Internships',
  'Fresher Jobs'
];

export default function FilterAndSearch({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalResults = 0,
  isFallback = false
}) {
  return (
    <div className="w-full bg-[#111b2e] border border-[#1f2d48] rounded-2xl p-4 sm:p-6 mb-8 shadow-card-subtle">
      
      {/* Category Pills & Total Counter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        
        {/* Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            // Match with backend enum value
            const mappedVal = 
              cat === 'Hackathons' ? 'Hackathon' :
              cat === 'Internships' ? 'Internship' :
              cat === 'Fresher Jobs' ? 'Fresher Job' : 'All Opportunities';

            const isActive = 
              selectedCategory === mappedVal || 
              (cat === 'All Opportunities' && (selectedCategory === 'All' || selectedCategory === 'All Opportunities' || !selectedCategory));

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(mappedVal)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#00f0ff] text-[#0b1426] shadow-cyan-glow font-bold'
                    : 'bg-[#0b1426] text-[#94a3b8] hover:text-white border border-[#1f2d48] hover:border-slate-600'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Counter Badge & Status */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#94a3b8]">
          <span className="px-2.5 py-1 rounded-md bg-[#0b1426] border border-[#1f2d48]">
            <strong className="text-white font-bold">{totalResults}</strong> found
          </span>
          {isFallback && (
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5 font-sans font-medium text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Demo Mode Active
            </span>
          )}
        </div>

      </div>

      {/* Search Input Bar with Clear Action */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
          <Search className="w-4 h-4" />
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, company, or tech tag (e.g. 'React', 'MongoDB', 'Remote')..."
          className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#0b1426] border border-[#1f2d48] text-white text-sm placeholder-[#64748b] focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear Search"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94a3b8] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4 hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

    </div>
  );
}
