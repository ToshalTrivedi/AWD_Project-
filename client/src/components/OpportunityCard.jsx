import React from 'react';
import { Calendar, MapPin, ExternalLink, Sparkles, Building2, Clock } from 'lucide-react';
import TechStackBadge from './TechStackBadge.jsx';

export default function OpportunityCard({ opportunity, onOpenPrep, onViewOpportunity }) {
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
    applicationUrl,
    isDemo
  } = opportunity;

  // Differentiated category styling
  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'Hackathon':
        return {
          bg: 'bg-purple-500/10',
          text: 'text-purple-400',
          border: 'border-purple-500/30'
        };
      case 'Internship':
        return {
          bg: 'bg-sky-500/10',
          text: 'text-sky-400',
          border: 'border-sky-500/30'
        };
      case 'Fresher Job':
        return {
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-400',
          border: 'border-emerald-500/30'
        };
      default:
        return {
          bg: 'bg-slate-500/10',
          text: 'text-slate-400',
          border: 'border-slate-500/30'
        };
    }
  };

  const catTheme = getCategoryTheme(category);

  // Check deadline expiration
  const deadlineDate = deadline ? new Date(deadline) : null;
  const isExpired = deadlineDate ? deadlineDate < new Date() : false;

  const formattedDate = deadlineDate
    ? deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : eventDate
      ? new Date(eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Open Enrollment';

  return (
    <article className="group bg-[#111b2e] border border-[#1f2d48] hover:border-[#00f0ff]/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-card-subtle hover:-translate-y-1 relative">
      
      {/* Top Meta Header: Category Badge + Mode + Demo flag */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${catTheme.bg} ${catTheme.text} ${catTheme.border}`}>
              {category}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0b1426] border border-[#1f2d48] text-[#94a3b8]">
              {workMode || 'Remote'}
            </span>
          </div>

          {isDemo && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded">
              Demo Sample
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#00f0ff] transition-colors line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Company & Location Info */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#94a3b8] mt-2 mb-3">
          <div className="flex items-center gap-1 font-medium text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>{company}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{location || 'Remote'}</span>
          </div>
        </div>

        {/* Date / Deadline display */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3 bg-[#0b1426]/60 p-2 rounded-lg border border-[#1f2d48]/50">
          {category === 'Hackathon' ? (
            <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          )}
          <span className="font-medium text-slate-300">
            {category === 'Hackathon' ? 'Event Date / Deadline:' : 'Deadline:'}
          </span>
          <span className={isExpired ? 'text-red-400 line-through' : 'text-slate-200'}>
            {formattedDate}
          </span>
          {isExpired && (
            <span className="ml-auto text-[10px] uppercase font-bold text-red-400 bg-red-950/40 px-1.5 py-0.5 rounded border border-red-800/40">
              Expired
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs text-[#94a3b8] line-clamp-3 mb-4 leading-relaxed">
          {description || 'No detailed description provided for this listing.'}
        </p>

        {/* Tech Stack Badges */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tags.slice(0, 4).map((tag, i) => (
              <TechStackBadge key={i} tag={tag} size="xs" />
            ))}
            {tags.length > 4 && (
              <span className="text-[11px] font-mono text-slate-400 self-center px-1">
                +{tags.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="pt-3 border-t border-[#1f2d48] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onViewOpportunity(opportunity)}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-[#0b1426] border border-[#1f2d48] hover:border-slate-500 transition-colors cursor-pointer"
        >
          <span>View Opportunity</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </button>

        <button
          type="button"
          onClick={() => onOpenPrep(opportunity)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#0b1426] bg-[#00f0ff] hover:bg-[#38bdf8] transition-all duration-150 shadow-cyan-glow cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#0b1426]" />
          <span>Crack Prep Intelligence</span>
        </button>
      </div>

    </article>
  );
}
