import React, { useState } from 'react';
import { X, ExternalLink, Calendar, MapPin, Building2, Sparkles, BookOpen } from 'lucide-react';
import TechStackBadge from './TechStackBadge.jsx';

export default function OpportunityDetailModal({ isOpen, onClose, opportunity, onOpenPrep }) {
  if (!isOpen || !opportunity) return null;

  const {
    title,
    company,
    category,
    location,
    workMode,
    tags = [],
    description,
    deadline,
    eventDate,
    applicationUrl
  } = opportunity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 bg-[#060b14]/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-[#0b1426] border border-[#1f2d48] rounded-2xl p-6 sm:p-8 shadow-2xl z-10">
          
          <div className="flex items-start justify-between pb-4 border-b border-[#1f2d48] mb-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                  {category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {workMode}
                </span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-[#111b2e]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#111b2e] p-4 rounded-xl border border-[#1f2d48]">
              <div>
                <span className="text-[11px] text-[#94a3b8] block">Organization</span>
                <span className="text-sm font-semibold text-white">{company}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#94a3b8] block">Location</span>
                <span className="text-sm font-semibold text-white">{location}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#94a3b8] block">Application Due</span>
                <span className="text-sm font-semibold text-white">
                  {deadline ? new Date(deadline).toLocaleDateString() : 'Rolling'}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-[#00f0ff] mb-2 font-bold tracking-wider">
                Opportunity Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-[#111b2e]/60 p-4 rounded-xl border border-[#1f2d48]/60">
                {description || 'Detailed eligibility requirements, tracks, and selection criteria are provided on the official registration page.'}
              </p>
            </div>

            {tags && tags.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase text-[#94a3b8] mb-2 font-semibold">
                  Required & Preferred Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <TechStackBadge key={i} tag={tag} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1f2d48]">
            <button
              onClick={() => {
                onClose();
                onOpenPrep(opportunity);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#111b2e] border border-[#00f0ff] hover:bg-[#00f0ff]/10"
            >
              <Sparkles className="w-4 h-4 text-[#00f0ff]" />
              <span>Open Prep Intelligence</span>
            </button>

            {applicationUrl && (
              <a
                href={applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#0b1426] bg-[#00f0ff] hover:bg-[#38bdf8] shadow-cyan-glow"
              >
                <span>Proceed to Official Registration</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
