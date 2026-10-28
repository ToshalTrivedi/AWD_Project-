import React from 'react';
import OpportunityCard from './OpportunityCard.jsx';
import { Loader2, AlertCircle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function OpportunityGrid({
  opportunities = [],
  loading = false,
  error = null,
  pagination = {},
  onPageChange,
  onOpenPrep,
  onViewOpportunity,
  onResetFilters
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <Loader2 className="w-10 h-10 text-[#00f0ff] animate-spin mb-4" />
        <h4 className="text-lg font-bold text-white mb-1">Retrieving Opportunities...</h4>
        <p className="text-sm text-[#94a3b8]">Connecting with backend indexing nodes</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-950/20 border border-red-800/40 rounded-2xl p-8 text-center max-w-lg mx-auto my-12">
        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <h4 className="text-lg font-bold text-white mb-2">Failed to load opportunities</h4>
        <p className="text-sm text-red-200/80 mb-5">{error}</p>
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-[#111b2e] hover:bg-[#16233b] text-white border border-[#1f2d48] rounded-xl text-xs font-semibold"
        >
          Reset Filters & Retry
        </button>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="bg-[#111b2e] border border-[#1f2d48] rounded-2xl p-12 text-center max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-[#0b1426] border border-[#1f2d48] flex items-center justify-center mx-auto mb-4 text-[#00f0ff]">
          <Sparkles className="w-6 h-6" />
        </div>
        <h4 className="font-heading text-xl font-bold text-white mb-2">No matching opportunities found</h4>
        <p className="text-sm text-[#94a3b8] mb-6 max-w-md mx-auto">
          We couldn't find any opportunities matching your current search query or filter tags. Try searching broader keywords or view all categories.
        </p>
        <button
          onClick={onResetFilters}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#0b1426] bg-[#00f0ff] hover:bg-[#38bdf8] transition-colors shadow-cyan-glow cursor-pointer"
        >
          View All Opportunities
        </button>
      </div>
    );
  }

  const { page = 1, totalPages = 1, hasPrevPage, hasNextPage } = pagination;

  return (
    <section id="opportunities-section" className="space-y-8">
      {/* 3-Column Responsive Grid as specified in PDF Section 9 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((item) => (
          <OpportunityCard
            key={item._id}
            opportunity={item}
            onOpenPrep={onOpenPrep}
            onViewOpportunity={onViewOpportunity}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-[#1f2d48]">
          <div className="text-xs text-[#94a3b8] font-mono">
            Page <span className="text-white font-bold">{page}</span> of{' '}
            <span className="text-white font-bold">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={!hasPrevPage}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                hasPrevPage
                  ? 'bg-[#111b2e] border-[#1f2d48] text-white hover:border-[#00f0ff] cursor-pointer'
                  : 'bg-[#0b1426] border-[#1f2d48]/40 text-slate-600 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={!hasNextPage}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                hasNextPage
                  ? 'bg-[#111b2e] border-[#1f2d48] text-white hover:border-[#00f0ff] cursor-pointer'
                  : 'bg-[#0b1426] border-[#1f2d48]/40 text-slate-600 cursor-not-allowed'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
