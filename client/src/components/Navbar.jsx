import React, { useState } from 'react';
import { PlusCircle, Menu, X, Sparkles, Layers } from 'lucide-react';

export default function Navbar({ onSelectCategory, activeCategory, onOpenPostModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Hackathons', value: 'Hackathon' },
    { label: 'Internships', value: 'Internship' },
    { label: 'Fresher Jobs', value: 'Fresher Job' },
    { label: 'Prep Intelligence', value: 'Prep' },
  ];

  const handleNavClick = (val) => {
    if (val === 'Prep') {
      const el = document.getElementById('prep-intelligence-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        const oppsEl = document.getElementById('opportunities-section');
        if (oppsEl) oppsEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onSelectCategory(val);
      const el = document.getElementById('opportunities-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b1426]/95 backdrop-blur-md border-b border-[#1f2d48]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left Brand Mark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onSelectCategory('All Opportunities')}
              className="flex items-center gap-2.5 group text-left focus:outline-none focus:ring-2 focus:ring-[#00f0ff] rounded-lg p-1"
            >
              {/* Distinctive MLH-style badge */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#00b4d8] p-[1.5px] flex items-center justify-center shadow-cyan-glow group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0b1426] rounded-[7px] flex items-center justify-center font-heading font-extrabold text-[#00f0ff] text-base tracking-wider">
                  MLH
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black tracking-tight text-white text-base leading-none">
                  MLH
                </span>
                <span className="text-[10px] tracking-wider text-[#94a3b8] font-mono font-medium uppercase mt-0.5 group-hover:text-[#00f0ff] transition-colors">
                  OPPORTUNITIES & PREP
                </span>
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.value;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    isActive 
                      ? 'text-[#00f0ff] bg-[#111b2e] border border-[#00f0ff]/30 shadow-sm' 
                      : 'text-[#94a3b8] hover:text-white hover:bg-[#111b2e]/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenPostModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white bg-[#111b2e] border border-[#00f0ff]/80 hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:shadow-cyan-glow transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00f0ff]"
            >
              <PlusCircle className="w-4 h-4 text-[#00f0ff]" />
              <span>Post Opportunity</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenPostModal}
              className="p-2 text-xs font-semibold rounded-lg bg-[#111b2e] text-[#00f0ff] border border-[#00f0ff]/60"
            >
              Post
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#111b2e] focus:outline-none focus:ring-2 focus:ring-[#00f0ff]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1f2d48] bg-[#0b1426] px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.value)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                activeCategory === link.value
                  ? 'bg-[#111b2e] text-[#00f0ff] border border-[#00f0ff]/40'
                  : 'text-gray-300 hover:text-white hover:bg-[#111b2e]/60'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPostModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-[#111b2e] border border-[#00f0ff] shadow-cyan-glow"
            >
              <PlusCircle className="w-4 h-4 text-[#00f0ff]" />
              <span>Post Opportunity</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
