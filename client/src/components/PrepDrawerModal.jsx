import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  HelpCircle, 
  ExternalLink, 
  Building2, 
  Calendar,
  Sparkles,
  Layers,
  Code
} from 'lucide-react';
import TechStackBadge from './TechStackBadge.jsx';

export default function PrepDrawerModal({
  isOpen,
  onClose,
  opportunity
}) {
  const [activeTab, setActiveTab] = useState('roadmap'); // 'roadmap' | 'technical' | 'qa'
  const [expandedTopics, setExpandedTopics] = useState({});
  const [expandedQA, setExpandedQA] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const drawerRef = useRef(null);

  // Close with Escape key & trap focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !opportunity) return null;

  const {
    title,
    company,
    category,
    location,
    workMode,
    tags = [],
    deadline,
    applicationUrl,
    prepIntelligence = {}
  } = opportunity;

  const {
    roadmap = [],
    technicalTopics = [],
    sampleQuestions = []
  } = prepIntelligence;

  const toggleTopic = (index) => {
    setExpandedTopics(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleQA = (index) => {
    setExpandedQA(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="prep-drawer-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#060b14]/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div 
          ref={drawerRef}
          className="w-screen max-w-2xl bg-[#0b1426] border-l border-[#1f2d48] shadow-2xl flex flex-col h-full overflow-hidden"
        >
          {/* Top Drawer Header */}
          <div className="p-6 bg-[#111b2e] border-b border-[#1f2d48] flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-bold">
                  <Sparkles className="w-3 h-3 text-[#00f0ff]" />
                  Prep Intelligence
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  • {category}
                </span>
              </div>
              <h2 id="prep-drawer-title" className="font-heading text-xl sm:text-2xl font-bold text-white leading-tight">
                {title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#94a3b8] mt-2">
                <span className="flex items-center gap-1 font-semibold text-slate-200">
                  <Building2 className="w-3.5 h-3.5 text-[#00f0ff]" />
                  {company}
                </span>
                <span>•</span>
                <span>{location} ({workMode})</span>
              </div>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#0b1426] border border-transparent hover:border-[#1f2d48] transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tab Navigation (A. Roadmap, B. Technical Focus, C. Interview Q&A) */}
          <div className="flex border-b border-[#1f2d48] bg-[#0e172a] px-6 gap-2">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'roadmap'
                  ? 'border-[#00f0ff] text-[#00f0ff]'
                  : 'border-transparent text-[#94a3b8] hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>4-Week Roadmap</span>
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'technical'
                  ? 'border-[#00f0ff] text-[#00f0ff]'
                  : 'border-transparent text-[#94a3b8] hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Core Tech Focus</span>
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'qa'
                  ? 'border-[#00f0ff] text-[#00f0ff]'
                  : 'border-transparent text-[#94a3b8] hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Screening & Q&A</span>
            </button>
          </div>

          {/* Drawer Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* TAB A: 4-WEEK ROADMAP */}
            {activeTab === 'roadmap' && (
              <div className="space-y-6">
                <div className="bg-[#111b2e] border border-[#1f2d48] rounded-xl p-4 text-xs text-[#94a3b8] leading-relaxed">
                  <strong className="text-[#00f0ff]">Prep Methodology:</strong> Designed specifically for this {category.toLowerCase()} role. 
                  Follow the weekly milestones and check off daily study tasks as you complete them.
                </div>

                <div className="space-y-4">
                  {roadmap.map((weekItem, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#111b2e] border border-[#1f2d48] rounded-2xl p-5 relative overflow-hidden"
                    >
                      {/* Top Week Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f0ff] bg-[#00f0ff]/10 px-2.5 py-1 rounded-md border border-[#00f0ff]/20">
                          Week {weekItem.week || idx + 1}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          Goal Milestone
                        </span>
                      </div>

                      <h4 className="font-heading text-base font-bold text-white mb-1.5">
                        {weekItem.title}
                      </h4>
                      <p className="text-xs text-[#94a3b8] mb-4">
                        {weekItem.goal}
                      </p>

                      {/* Interactive Task Checklist */}
                      <div className="space-y-2 mb-4 bg-[#0b1426]/60 p-3 rounded-xl border border-[#1f2d48]/50">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                          Action Items:
                        </span>
                        {weekItem.tasks?.map((task, taskIdx) => {
                          const taskId = `w${weekItem.week}-t${taskIdx}`;
                          const isDone = completedTasks[taskId];
                          return (
                            <label
                              key={taskIdx}
                              className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer select-none group"
                            >
                              <input
                                type="checkbox"
                                checked={!!isDone}
                                onChange={() => toggleTask(taskId)}
                                className="mt-0.5 rounded border-slate-700 bg-slate-900 text-[#00f0ff] focus:ring-[#00f0ff] focus:ring-offset-[#0b1426]"
                              />
                              <span className={`transition-colors ${isDone ? 'line-through text-slate-500' : 'group-hover:text-white'}`}>
                                {task}
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Measurable Milestone */}
                      <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/20 px-3 py-2 rounded-lg border border-emerald-800/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span><strong>Milestone:</strong> {weekItem.milestone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB B: CORE TECHNICAL FOCUS */}
            {activeTab === 'technical' && (
              <div className="space-y-4">
                <div className="bg-[#111b2e] border border-[#1f2d48] rounded-xl p-4 text-xs text-[#94a3b8] leading-relaxed">
                  <strong className="text-[#38bdf8]">Deep Dive Concepts:</strong> High-yield technical patterns expected by top engineering interviewers and hackathon judges.
                </div>

                {technicalTopics.map((item, idx) => {
                  const isExpanded = !!expandedTopics[idx];
                  return (
                    <div 
                      key={idx}
                      className="bg-[#111b2e] border border-[#1f2d48] rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleTopic(idx)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-[#16233b] cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                          <h4 className="font-heading text-sm font-bold text-white">
                            {item.topic}
                          </h4>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-1 border-t border-[#1f2d48]/50 space-y-3 bg-[#0b1426]/40">
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {item.summary}
                          </p>

                          {item.keyPoints && item.keyPoints.length > 0 && (
                            <div className="space-y-1.5 pt-2">
                              <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold">Key Principles:</span>
                              <ul className="list-disc pl-5 space-y-1 text-xs text-[#94a3b8]">
                                {item.keyPoints.map((pt, pIdx) => (
                                  <li key={pIdx}>{pt}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {item.resources && item.resources.length > 0 && (
                            <div className="pt-2 flex flex-wrap gap-2">
                              {item.resources.map((resUrl, rIdx) => (
                                <a
                                  key={rIdx}
                                  href={resUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-[#00f0ff] hover:underline"
                                >
                                  <span>Official Docs</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB C: SCREENING & INTERVIEW Q&A */}
            {activeTab === 'qa' && (
              <div className="space-y-4">
                <div className="bg-[#111b2e] border border-[#1f2d48] rounded-xl p-4 text-xs text-[#94a3b8] leading-relaxed">
                  <strong className="text-emerald-400">Curated Interview Bank:</strong> Accurate questions and benchmark answers tailored to this role. Expand any question to study the model response and interviewer tips.
                </div>

                {sampleQuestions.map((qItem, idx) => {
                  const isExpanded = !!expandedQA[idx];
                  return (
                    <div 
                      key={idx}
                      className="bg-[#111b2e] border border-[#1f2d48] rounded-2xl overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleQA(idx)}
                        className="w-full p-4 flex items-start justify-between text-left hover:bg-[#16233b] cursor-pointer gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#0b1426] border border-[#1f2d48] text-slate-400">
                              {qItem.category || 'Technical'}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                              qItem.difficulty === 'Hard' ? 'text-red-400 bg-red-950/30' :
                              qItem.difficulty === 'Easy' ? 'text-emerald-400 bg-emerald-950/30' :
                              'text-amber-400 bg-amber-950/30'
                            }`}>
                              {qItem.difficulty || 'Medium'}
                            </span>
                          </div>
                          <h4 className="font-heading text-sm font-bold text-white">
                            {qItem.question}
                          </h4>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-2 border-t border-[#1f2d48]/50 space-y-3 bg-[#0b1426]/50">
                          <div>
                            <span className="text-[11px] font-mono uppercase text-[#00f0ff] font-bold block mb-1">
                              Model Technical Answer:
                            </span>
                            <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans bg-[#111b2e] p-3 rounded-xl border border-[#1f2d48] leading-relaxed">
                              {qItem.answer}
                            </pre>
                          </div>

                          {qItem.tips && qItem.tips.length > 0 && (
                            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                              <span className="text-[11px] font-mono uppercase text-amber-300 font-bold block mb-1">
                                Interviewer Pro Tips:
                              </span>
                              <ul className="list-disc pl-4 text-xs text-amber-200/90 space-y-1">
                                {qItem.tips.map((tip, tIdx) => (
                                  <li key={tIdx}>{tip}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Bottom Drawer Footer */}
          <div className="p-4 sm:p-5 bg-[#111b2e] border-t border-[#1f2d48] flex items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              Target Deadline: <strong className="text-white">{deadline ? new Date(deadline).toLocaleDateString() : 'Rolling'}</strong>
            </div>
            {applicationUrl ? (
              <a
                href={applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#0b1426] bg-[#00f0ff] hover:bg-[#38bdf8] shadow-cyan-glow transition-all"
              >
                <span>Apply / Register on Official Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#1f2d48] hover:bg-[#2a3d5e]"
              >
                Close Drawer
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
