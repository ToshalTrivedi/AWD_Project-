import React from 'react';
import { Award, CheckCircle2, ExternalLink, FileText, Star, Users } from 'lucide-react';

const CATEGORY_COLORS = {
  'AI & Machine Learning': 'bg-purple-50 text-purple-700 border-purple-200',
  'Web3 & Blockchain': 'bg-blue-50 text-blue-700 border-blue-200',
  'Developer Tools & Infra': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Social Good & Climate': 'bg-amber-50 text-amber-800 border-amber-200',
  'Healthcare & Biotech': 'bg-rose-50 text-rose-700 border-rose-200'
};

export default function PresentationCard({ presentation, onSelect }) {
  const {
    projectTitle,
    hackathonName,
    hackathonCategory,
    year,
    award,
    team,
    pitchSummary,
    whyTheyWon = [],
    rubrics = [],
    totalScore = 95,
    tags = []
  } = presentation;

  const categoryStyle = CATEGORY_COLORS[hackathonCategory] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-400 hover:shadow-lg transition-all duration-200 group">
      
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${categoryStyle}`}>
            {hackathonCategory}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {hackathonName} • {year}
          </span>
        </div>

        {/* Award */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-3">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>{award}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-1">
          {projectTitle}
        </h3>

        {/* Team */}
        <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>{team}</span>
        </p>

        {/* Score Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-mono font-bold mb-4 shadow-sm">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span>Rubrics Score: {totalScore} / 100</span>
        </div>

        {/* Pitch Summary */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {pitchSummary}
        </p>

        {/* Why They Won Preview (Top 2 Pointers) */}
        {whyTheyWon.length > 0 && (
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Why This Presentation Won:
            </span>
            <ul className="space-y-1.5">
              {whyTheyWon.slice(0, 2).map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5 leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">
          {rubrics.length} Scored Criteria
        </span>
        <button
          onClick={() => onSelect(presentation)}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm group-hover:shadow"
        >
          <span>View Rubrics & Pitch</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
