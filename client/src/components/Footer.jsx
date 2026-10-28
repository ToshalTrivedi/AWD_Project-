import React from 'react';
import { Github, Twitter, Linkedin, Heart, Shield, Terminal, Sparkles } from 'lucide-react';

export default function Footer({ onSelectCategory }) {
  return (
    <footer className="bg-[#080e1a] border-t border-[#1f2d48] text-[#94a3b8] pt-14 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1f2d48]/70">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#00b4d8] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0b1426] rounded-[7px] flex items-center justify-center font-heading font-extrabold text-[#00f0ff] text-xs">
                  MLH
                </div>
              </div>
              <span className="font-heading font-bold text-white tracking-tight text-base">
                MLH OPPORTUNITIES & PREP
              </span>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              An engineering platform dedicated to helping students and developers discover hackathons, 
              secure technical internships, and master coding interview intelligence.
            </p>
          </div>

          {/* Quick Category Navigation */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-3">
              Explore Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('Hackathon')}
                  className="hover:text-[#00f0ff] transition-colors cursor-pointer"
                >
                  Global Hackathons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Internship')}
                  className="hover:text-[#00f0ff] transition-colors cursor-pointer"
                >
                  Engineering Internships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Fresher Job')}
                  className="hover:text-[#00f0ff] transition-colors cursor-pointer"
                >
                  Fresher & Graduate Roles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('All Opportunities')}
                  className="hover:text-[#00f0ff] transition-colors cursor-pointer"
                >
                  All Active Listings
                </button>
              </li>
            </ul>
          </div>

          {/* Prep Intelligence Resources */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-3">
              Prep Intelligence
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#prep-intelligence-section" className="hover:text-[#00f0ff] transition-colors">
                  4-Week Structured Roadmaps
                </a>
              </li>
              <li>
                <a href="#prep-intelligence-section" className="hover:text-[#00f0ff] transition-colors">
                  System Design & Node Topics
                </a>
              </li>
              <li>
                <a href="#prep-intelligence-section" className="hover:text-[#00f0ff] transition-colors">
                  MongoDB ESR & Aggregation Guides
                </a>
              </li>
              <li>
                <a href="#prep-intelligence-section" className="hover:text-[#00f0ff] transition-colors">
                  Technical Screening Question Bank
                </a>
              </li>
            </ul>
          </div>

          {/* Official Reference & Community Guidelines */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-3">
              Community & Guidelines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://mlh.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#00f0ff] transition-colors inline-flex items-center gap-1"
                >
                  <span>Official MLH Website</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://mlh.com/code-of-conduct" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#00f0ff] transition-colors"
                >
                  MLH Code of Conduct
                </a>
              </li>
              <li>
                <a 
                  href="https://hackathons.mlh.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#00f0ff] transition-colors"
                >
                  MLH Hackathon Season
                </a>
              </li>
              <li>
                <a 
                  href="https://fellowship.mlh.io" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#00f0ff] transition-colors"
                >
                  MLH Fellowship
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer as required by PDF Section 19 & Section 20 */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left leading-relaxed">
            <strong>Disclaimer:</strong> This is an independent, MLH-inspired educational and opportunity intelligence platform. 
            It is not an official product of, nor affiliated with or endorsed by Major League Hacking (MLH).
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Built with React, Express, MongoDB</span>
            <span>•</span>
            <span>2026 Production Edition</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
