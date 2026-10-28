import React from 'react';
import { Search } from 'lucide-react';

export const CATEGORIES = [
  'All Categories',
  'AI & Machine Learning',
  'Web3 & Blockchain',
  'Developer Tools & Infra',
  'Social Good & Climate',
  'Healthcare & Biotech'
];

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResults
}) {
  return (
    <div className="space-y-4 mb-8">

      {/* Heading & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Winning Presentations
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Browse pitch decks from global hackathon winners with detailed judging rubrics.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects, hackathons..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Showing <strong>{totalResults}</strong> presentations
        </span>
      </div>

    </div>
  );
}
