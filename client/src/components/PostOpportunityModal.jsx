import React, { useState } from 'react';
import { X, PlusCircle, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { createOpportunity } from '../services/api.js';

export default function PostOpportunityModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: 'Hackathon',
    location: 'Remote',
    workMode: 'Remote',
    tags: 'React.js, Node.js, MongoDB',
    deadline: '',
    applicationUrl: 'https://hackathons.mlh.com',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.title.trim()) {
      setError('Please provide an opportunity title.');
      return;
    }
    if (!formData.company.trim()) {
      setError('Please provide a company / organization name.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title: formData.title.trim(),
        company: formData.company.trim(),
        category: formData.category,
        location: formData.location.trim() || 'Remote',
        workMode: formData.workMode,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
        applicationUrl: formData.applicationUrl.trim(),
        description: formData.description.trim(),
        isDemo: false
      };

      const result = await createOpportunity(payload);
      onSuccess(result.data);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit opportunity. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 bg-[#060b14]/85 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-[#0b1426] border border-[#1f2d48] rounded-2xl p-6 sm:p-8 shadow-2xl z-10">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1f2d48] mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                Post New Opportunity
              </h3>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#111b2e]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-950/40 border border-red-800/50 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Opportunity Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Major League Hackathon 2026 or Frontend Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#111b2e] border border-[#1f2d48] text-white text-sm focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Major League Hacking"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111b2e] border border-[#1f2d48] text-white text-sm focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111b2e] border border-[#1f2d48] text-white text-sm focus:outline-none focus:border-[#00f0ff]"
                >
                  <option value="Hackathon">Hackathon</option>
                  <option value="Internship">Internship</option>
                  <option value="Fresher Job">Fresher Job</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Global / Remote"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111b2e] border border-[#1f2d48] text-white text-sm focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Work Mode
                </label>
                <select
                  value={formData.workMode}
                  onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111b2e] border border-[#1f2d48] text-white text-sm focus:outline-none focus:border-[#00f0ff]"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="In-Person">In-Person</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Technology Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React.js, Node.js, MongoDB, Express"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#111b2e] border border-[#1f2d48] text-white text-sm focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Application Deadline / Event Date
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111b2e] border border-[#1f2d48] text-white text-sm focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Application URL
                </label>
                <input
                  type="url"
                  value={formData.applicationUrl}
                  onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
                  placeholder="https://hackathons.mlh.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111b2e] border border-[#1f2d48] text-white text-sm focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Description & Selection Criteria
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Key expectations, problem statement, or eligibility requirements..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#111b2e] border border-[#1f2d48] text-white text-sm focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#1f2d48]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#111b2e] border border-[#1f2d48]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#0b1426] bg-[#00f0ff] hover:bg-[#38bdf8] shadow-cyan-glow transition-all"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                <span>{loading ? 'Submitting...' : 'Post Opportunity'}</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
