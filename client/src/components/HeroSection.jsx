import React from 'react';
import { ArrowRight, Compass, BookOpen, ShieldCheck, Zap } from 'lucide-react';
import TechStackBadge from './TechStackBadge.jsx';

export default function HeroSection({ onExploreOpportunities, onExplorePrep }) {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 hero-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Supporting Text, Badges, CTAs */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-6 z-10">

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1]">
              Discover Opportunities. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#00b4d8] to-[#0ea5e9]">
                Master The Intelligence.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl font-normal">
              Find top hackathons, internships, and entry-level software engineering roles. 
              Get step-by-step blueprints, study notes, and technical interview questions to crack them.
            </p>

            {/* Value & Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 bg-[#111b2e]/80 border border-[#1f2d48] px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#00f0ff]" />
                <span>Curated Developer Paths</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#111b2e]/80 border border-[#1f2d48] px-3 py-1.5 rounded-full">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Zero Fluff Prep Blueprints</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreOpportunities}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-heading font-bold text-[#0b1426] bg-[#00f0ff] hover:bg-[#38bdf8] shadow-cyan-glow hover:shadow-cyan-glow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4 text-[#0b1426]" />
                <span>Explore Opportunities</span>
                <ArrowRight className="w-4 h-4 text-[#0b1426]" />
              </button>
              <button
                onClick={onExplorePrep}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-heading font-bold text-white bg-[#111b2e] border border-[#1f2d48] hover:border-[#00f0ff]/70 hover:bg-[#16233b] transition-all duration-200 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#00f0ff]" />
                <span>Explore Preparation</span>
              </button>
            </div>

          </div>

          {/* Right Column: Substantial Isometric Original SVG & CSS Developer Art (45-55% visual width) */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center">
            
            {/* Subtle background glow circle behind illustration */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#00f0ff]/10 blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

            <div className="w-full max-w-lg lg:max-w-none transform transition-transform hover:scale-[1.01] duration-300">
              <svg
                viewBox="0 0 600 500"
                className="w-full h-auto drop-shadow-2xl select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="MLH Developer Community & Hackathon Isometric Illustration"
              >
                <defs>
                  {/* Gradients */}
                  <linearGradient id="mlhPlatform" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#111b2e" />
                    <stop offset="100%" stopColor="#0b1426" />
                  </linearGradient>
                  
                  <linearGradient id="cyanAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="100%" stopColor="#00b4d8" />
                  </linearGradient>

                  <linearGradient id="editorWindow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#162238" />
                    <stop offset="100%" stopColor="#0d182b" />
                  </linearGradient>

                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* --- 1. Isometric Base Grid Platforms --- */}
                {/* Lower base tier */}
                <polygon points="300,440 520,330 300,230 80,330" fill="url(#mlhPlatform)" stroke="#1f2d48" strokeWidth="2" opacity="0.8" />
                <polygon points="80,330 300,440 300,460 80,350" fill="#09101d" opacity="0.9" />
                <polygon points="300,440 520,330 520,350 300,460" fill="#0c1729" opacity="0.9" />

                {/* Primary elevated stage tier */}
                <polygon points="300,400 480,305 300,220 120,305" fill="#132038" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.6" />
                <polygon points="120,305 300,400 300,412 120,317" fill="#080e1a" />
                <polygon points="300,400 480,305 480,317 300,412" fill="#0b1526" />

                {/* Isometric grid accent lines */}
                <line x1="210" y1="262" x2="390" y2="352" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3" />
                <line x1="390" y1="262" x2="210" y2="352" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3" />

                {/* --- 2. Central Primary Code Editor Screen (Floating) --- */}
                <g className="animate-float">
                  {/* Screen Frame */}
                  <rect x="180" y="90" width="240" height="160" rx="10" fill="url(#editorWindow)" stroke="#1f2d48" strokeWidth="2" />
                  
                  {/* Top Window Header */}
                  <path d="M180 100 C180 94.5 184.5 90 190 90 L410 90 C415.5 90 420 94.5 420 100 L420 115 L180 115 Z" fill="#111b2e" />
                  <circle cx="196" cy="102" r="4" fill="#dc2626" />
                  <circle cx="208" cy="102" r="4" fill="#facc15" />
                  <circle cx="220" cy="102" r="4" fill="#22c55e" />
                  <text x="240" y="106" fill="#94a3b8" fontSize="9" fontFamily="monospace">App.jsx — MLH Prep</text>

                  {/* Code Editor Lines */}
                  <rect x="200" y="128" width="60" height="7" rx="3.5" fill="#38bdf8" opacity="0.9" />
                  <rect x="268" y="128" width="90" height="7" rx="3.5" fill="#94a3b8" opacity="0.6" />
                  
                  <rect x="215" y="145" width="45" height="7" rx="3.5" fill="#00f0ff" />
                  <rect x="268" y="145" width="115" height="7" rx="3.5" fill="#22c55e" opacity="0.8" />
                  
                  <rect x="215" y="162" width="130" height="7" rx="3.5" fill="#e2e8f0" opacity="0.75" />
                  <rect x="230" y="179" width="75" height="7" rx="3.5" fill="#38bdf8" />
                  <rect x="313" y="179" width="60" height="7" rx="3.5" fill="#00f0ff" opacity="0.85" />

                  <rect x="200" y="196" width="40" height="7" rx="3.5" fill="#38bdf8" opacity="0.9" />
                  <rect x="200" y="213" width="85" height="16" rx="4" fill="#00f0ff" opacity="0.15" stroke="#00f0ff" strokeWidth="1" />
                  <text x="208" y="224" fill="#00f0ff" fontSize="9" fontFamily="monospace" fontWeight="bold">yarn build ✓</text>
                </g>

                {/* --- 3. Left Developer Laptop & Terminal Window (Floating) --- */}
                <g className="animate-float-slow">
                  <g transform="translate(45, 170)">
                    {/* Terminal Window */}
                    <rect x="0" y="0" width="150" height="105" rx="8" fill="#0c1424" stroke="#00b4d8" strokeWidth="1.5" />
                    {/* Header */}
                    <path d="M0 8 C0 3.6 3.6 0 8 0 L142 0 C146.4 0 150 3.6 150 8 L150 20 L0 20 Z" fill="#132038" />
                    <circle cx="12" cy="10" r="3" fill="#dc2626" />
                    <circle cx="22" cy="10" r="3" fill="#facc15" />
                    <circle cx="32" cy="10" r="3" fill="#22c55e" />
                    <text x="44" y="13" fill="#64748b" fontSize="8" fontFamily="monospace">bash: mongodb</text>

                    {/* Terminal lines */}
                    <text x="12" y="38" fill="#22c55e" fontSize="9" fontFamily="monospace">&gt; mongod ready</text>
                    <text x="12" y="54" fill="#38bdf8" fontSize="8" fontFamily="monospace">[db] index verified</text>
                    <text x="12" y="70" fill="#94a3b8" fontSize="8" fontFamily="monospace">POST /api/opps 201</text>
                    <rect x="12" y="82" width="6" height="10" fill="#00f0ff" className="animate-pulse" />
                  </g>
                </g>

                {/* --- 4. Right Interactive Prep Blueprint Card (Floating) --- */}
                <g className="animate-float" style={{ animationDelay: '1.2s' }}>
                  <g transform="translate(400, 160)">
                    {/* Prep Card */}
                    <rect x="0" y="0" width="160" height="125" rx="10" fill="#111b2e" stroke="#1f2d48" strokeWidth="2" filter="url(#softGlow)" />
                    <rect x="1" y="1" width="158" height="26" rx="8" fill="#16233b" />
                    <circle cx="16" cy="13" r="5" fill="#00f0ff" />
                    <text x="28" y="17" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PREP BLUEPRINT</text>

                    {/* 4-Week Progress Indicator */}
                    <rect x="15" y="38" width="130" height="5" rx="2.5" fill="#1e293b" />
                    <rect x="15" y="38" width="95" height="5" rx="2.5" fill="url(#cyanAccent)" />

                    {/* Checklist items */}
                    <g transform="translate(15, 54)">
                      <circle cx="6" cy="6" r="5" fill="#22c55e" opacity="0.3" stroke="#22c55e" strokeWidth="1" />
                      <path d="M4 6 L5.5 7.5 L8.5 4.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <text x="17" y="9" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">W1: DSA Foundations</text>
                    </g>
                    <g transform="translate(15, 74)">
                      <circle cx="6" cy="6" r="5" fill="#22c55e" opacity="0.3" stroke="#22c55e" strokeWidth="1" />
                      <path d="M4 6 L5.5 7.5 L8.5 4.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <text x="17" y="9" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">W2: React & Hooks</text>
                    </g>
                    <g transform="translate(15, 94)">
                      <circle cx="6" cy="6" r="5" fill="#00f0ff" opacity="0.3" stroke="#00f0ff" strokeWidth="1" />
                      <text x="17" y="9" fill="#00f0ff" fontSize="8" fontFamily="sans-serif" fontWeight="bold">W3: Mock System Loop</text>
                    </g>
                  </g>
                </g>

                {/* --- 5. Developer Workstation Elements & Isometric Accessories --- */}
                {/* Physical Laptop on Stage */}
                <g transform="translate(260, 275)">
                  {/* Laptop Base */}
                  <polygon points="0,35 45,48 90,35 45,22" fill="#334155" />
                  <polygon points="0,35 45,48 45,52 0,39" fill="#1e293b" />
                  <polygon points="45,48 90,35 90,39 45,52" fill="#0f172a" />
                  {/* Trackpad */}
                  <polygon points="35,42 45,45 55,42 45,39" fill="#1e293b" />
                  {/* Laptop Open Screen */}
                  <polygon points="12,23 78,23 78,-20 12,-20" fill="#0b1426" stroke="#00f0ff" strokeWidth="1.5" />
                  <rect x="18" y="-15" width="54" height="32" rx="2" fill="#0f1f38" />
                  <path d="M25 -5 L33 -5 M25 2 L45 2 M25 9 L38 9" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
                </g>

                {/* Floating MLH Trophy / Innovation Token */}
                <g transform="translate(370, 290)" className="animate-float-slow">
                  <polygon points="20,0 35,10 20,20 5,10" fill="#facc15" />
                  <polygon points="5,10 20,20 20,28 5,18" fill="#ca8a04" />
                  <polygon points="20,20 35,10 35,18 20,28" fill="#eab308" />
                  {/* Floating particle */}
                  <circle cx="20" cy="-6" r="3" fill="#fef08a" className="animate-ping" />
                </g>

                {/* Floating Tech Badges (React & Node Icons) */}
                <g transform="translate(130, 110)" className="animate-float">
                  <circle cx="16" cy="16" r="16" fill="#111b2e" stroke="#38bdf8" strokeWidth="1.5" />
                  <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#38bdf8" strokeWidth="1" fill="none" transform="rotate(30 16 16)" />
                  <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#38bdf8" strokeWidth="1" fill="none" transform="rotate(90 16 16)" />
                  <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#38bdf8" strokeWidth="1" fill="none" transform="rotate(150 16 16)" />
                  <circle cx="16" cy="16" r="2" fill="#38bdf8" />
                </g>

                <g transform="translate(450, 100)" className="animate-float-slow" style={{ animationDelay: '0.8s' }}>
                  <circle cx="16" cy="16" r="16" fill="#111b2e" stroke="#22c55e" strokeWidth="1.5" />
                  {/* Node Hexagon */}
                  <polygon points="16,7 24,11.5 24,20.5 16,25 8,20.5 8,11.5" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                  <circle cx="16" cy="16" r="2.5" fill="#22c55e" />
                </g>

                {/* Floating Geometric Stars / Sparkles */}
                <path d="M280 60 Q285 70 295 75 Q285 80 280 90 Q275 80 265 75 Q275 70 280 60 Z" fill="#00f0ff" opacity="0.8" className="animate-pulse" />
                <path d="M120 280 Q123 286 130 290 Q123 294 120 300 Q117 294 110 290 Q117 286 120 280 Z" fill="#00b4d8" opacity="0.7" />
              </svg>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
