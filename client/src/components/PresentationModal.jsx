import React, { useEffect } from 'react';
import { X, Award, ExternalLink, CheckCircle2, Star, Github, Video, FileText } from 'lucide-react';

export default function PresentationModal({ presentation, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !presentation) return null;

  const {
    projectTitle,
    hackathonName,
    hackathonCategory,
    year,
    award,
    team,
    presentationUrl,
    demoVideoUrl,
    githubUrl,
    pitchSummary,
    whyTheyWon = [],
    rubrics = [],
    totalScore = 95,
    tags = []
  } = presentation;

  const maxTotalScore = rubrics.reduce((acc, r) => acc + (Number(r.maxScore) || 0), 0) || 100;
  const actualTotalScore = rubrics.reduce((acc, r) => acc + (Number(r.scoreAwarded) || 0), 0) || totalScore;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-bold">
                    {hackathonCategory}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {hackathonName} • {year}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                  {projectTitle}
                </h2>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{award}</span>
                  <span className="text-slate-400 font-normal">| By {team}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2.5 mt-5 pt-4 border-t border-slate-800">
              {presentationUrl && (
                <a
                  href={presentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition shadow"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open Pitch Deck / Slides</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {demoVideoUrl && (
                <a
                  href={demoVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
                >
                  <Video className="w-3.5 h-3.5 text-red-400" />
                  <span>Demo Video</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-200px)] overflow-y-auto">
            
            {/* Pitch Summary */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Executive Pitch Summary
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {pitchSummary}
              </p>
            </div>

            {/* Section 1: Why This Presentation Won */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Why This Presentation Won (Judge & Winning Pointers)
                </h4>
                <span className="text-xs text-slate-500">{whyTheyWon.length} Key Insights</span>
              </div>

              <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-200/80 space-y-2.5">
                {whyTheyWon.map((pointer, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{pointer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Table of Rubrics & Scored Sections */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    Official Judging Rubrics & Score Breakdown
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">Parameters on which this presentation was evaluated and won</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-bold">
                  Total: {actualTotalScore} / {maxTotalScore}
                </div>
              </div>

              {/* Rubric Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th scope="col" className="px-4 py-3">Evaluation Parameter</th>
                      <th scope="col" className="px-4 py-3 text-center">Max Score</th>
                      <th scope="col" className="px-4 py-3 text-center">Score Awarded</th>
                      <th scope="col" className="px-4 py-3">Judges' Remarks / Specific Reason It Won</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {rubrics.map((r, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {r.parameter}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-500 font-mono">
                          {r.maxScore}
                        </td>
                        <td className="px-4 py-3 text-center font-mono font-bold text-indigo-600 bg-indigo-50/30">
                          {r.scoreAwarded}
                        </td>
                        <td className="px-4 py-3 text-slate-700 leading-snug">
                          {r.remarks || 'Full criteria satisfaction demonstrated during live pitch.'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                    <tr>
                      <td className="px-4 py-3">Combined Total Score</td>
                      <td className="px-4 py-3 text-center font-mono">{maxTotalScore}</td>
                      <td className="px-4 py-3 text-center font-mono text-indigo-700 text-base">{actualTotalScore}</td>
                      <td className="px-4 py-3 text-emerald-700">
                        Top Decile Score ({Math.round((actualTotalScore / maxTotalScore) * 100)}% Overall Evaluation)
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-400 font-medium">Domain Tags:</span>
                {tags.map((t, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                    #{t}
                  </span>
                ))}
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Ref ID: <code className="font-mono text-slate-700">{presentation._id}</code>
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
