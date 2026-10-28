import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Opportunity } from './models/Opportunity.js';
import { connectDB } from './config/db.js';

dotenv.config();

const seedData = [
  {
    title: "Full Stack Software Developer Intern",
    company: "onGrid (via Unstop)",
    category: "Internship",
    location: "Gurgaon / Delhi NCR, India",
    workMode: "Hybrid",
    tags: ["React.js", "Node.js", "MongoDB", "Express", "Unstop"],
    description: "High-trust digital identity verification platform, React component architecture, and MongoDB aggregation tuning. Directly linked to https://unstop.com/internships",
    deadline: new Date("2026-11-28T23:59:59.000Z"),
    applicationUrl: "https://unstop.com/internships",
    isDemo: true
  },
  {
    title: "Software Engineering Intern — Cloud & Web",
    company: "Fango Tech Labs (via Unstop)",
    category: "Internship",
    location: "Bangalore, India",
    workMode: "Hybrid",
    tags: ["React.js", "TypeScript", "Node.js", "REST APIs", "Unstop"],
    description: "Incentives: Paid stipend (₹15,000 – ₹25,000/month) + Pre-Placement Offer (PPO). Scope: TypeScript generics, optimistic UI updates, and resilient REST API clients. Directly linked to https://unstop.com/internships",
    deadline: new Date("2026-12-10T23:59:59.000Z"),
    applicationUrl: "https://unstop.com/internships",
    isDemo: true
  },
  {
    title: "Flipkart GRiD 6.0 — Software Development Track",
    company: "Flipkart (via Unstop)",
    category: "Hackathon",
    location: "Bangalore, India / Virtual",
    workMode: "Hybrid",
    tags: ["React.js", "Node.js", "System Design", "Algorithms", "Unstop"],
    description: "Flipkart GRiD is Flipkart's flagship national engineering campus challenge. Real-world e-commerce scale problems spanning smart inventory, autonomous returns, and GenAI product discovery with Pre-Placement Interviews (PPI) and cash pool worth ₹5,00,000+.",
    deadline: new Date("2026-11-20T18:30:00.000Z"),
    eventDate: new Date("2026-11-28T09:00:00.000Z"),
    applicationUrl: "https://unstop.com/hackathons/flipkart-grid",
    isDemo: true
  },
  {
    title: "Walmart CodeHers 2026 — Engineering Challenge",
    company: "Walmart Global Tech (via Unstop)",
    category: "Hackathon",
    location: "Bangalore / Chennai / Hybrid",
    workMode: "Hybrid",
    tags: ["JavaScript", "Python", "Node.js", "Data Structures", "Unstop"],
    description: "Walmart CodeHers is India's premier diversity tech hackathon for women engineers across colleges. Features algorithmic coding rounds followed by a 24-hour innovation challenge offering full-time SDE roles and summer internships.",
    deadline: new Date("2026-12-05T23:59:59.000Z"),
    eventDate: new Date("2026-12-12T10:00:00.000Z"),
    applicationUrl: "https://unstop.com/hackathons/walmart-codehers",
    isDemo: true
  },
  {
    title: "HackOn With Amazon — Season 5",
    company: "Amazon India (via Unstop)",
    category: "Hackathon",
    location: "Hyderabad / Bangalore / Virtual",
    workMode: "Remote",
    tags: ["React.js", "Node.js", "TypeScript", "AWS", "Unstop"],
    description: "National-level hackathon for engineering students across India. Solve real-world customer friction points leveraging Generative AI, cloud infrastructure, and serverless architectures with direct fast-track interview opportunities for Amazon SDE Intern roles.",
    deadline: new Date("2026-12-15T18:00:00.000Z"),
    eventDate: new Date("2026-12-22T09:00:00.000Z"),
    applicationUrl: "https://unstop.com/hackathons/hackon-with-amazon",
    isDemo: true
  },
  {
    title: "Global Hack Week: Open Source & Full Stack 2026",
    company: "Major League Hacking (Community)",
    category: "Hackathon",
    location: "Global / Virtual",
    workMode: "Remote",
    tags: ["React.js", "Node.js", "MongoDB", "Express", "Open Source"],
    description: "Build cutting-edge full-stack web applications, contribute to top open-source projects, and collaborate with 5,000+ passionate hackers worldwide. Features beginner-friendly workshops, mentoring by industry engineers, and live product demos.",
    deadline: new Date("2026-11-15T23:59:59.000Z"),
    eventDate: new Date("2026-11-20T09:00:00.000Z"),
    applicationUrl: "https://hackathons.mlh.com",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Hackathon Blueprint & Idea Selection",
          goal: "Brainstorm high-impact problems, assemble your 4-person team, and validate product feasibility.",
          tasks: [
            "Research MLH sponsor tracks and theme categories (AI, Web3, DevTools, Social Good)",
            "Sketch wireframes using Excalidraw or Figma",
            "Initialize repository with Vite, Tailwind CSS, and Express starter template"
          ],
          milestone: "Team aligned with product requirements document (PRD) and starter repo deployed"
        },
        {
          week: 2,
          title: "Full-Stack MVP Core Slicing",
          goal: "Build functional end-to-end CRUD flows within 48 hours sprint simulations.",
          tasks: [
            "Implement MongoDB schema models and Express REST API endpoints",
            "Build responsive client UI with React components and optimistic updates",
            "Test live API communication with Axios and error fallback boundaries"
          ],
          milestone: "Core user journey working locally end-to-end"
        },
        {
          week: 3,
          title: "Polish, Edge Cases & Polish UI",
          goal: "Refine user experience, add keyboard accessibility, and ensure zero runtime errors.",
          tasks: [
            "Implement loading states, toast notifications, and empty state cards",
            "Deploy frontend to Vercel/Netlify and backend to Render/Railway",
            "Conduct usability testing with fellow hackers for UX feedback"
          ],
          milestone: "Staging deployment live with sample mock data"
        },
        {
          week: 4,
          title: "Devpost Writeup & 2-Minute Pitch Video",
          goal: "Nail judging criteria: Technical Complexity, Design/Polish, Originality, and Pitch.",
          tasks: [
            "Draft Devpost submission with clear problem statement and tech stack overview",
            "Record 2-minute Loom/YouTube screen recording showcasing live interactive demo",
            "Rehearse live Q&A pitch responses for judges"
          ],
          milestone: "Complete Devpost entry ready to submit before deadline countdown"
        }
      ],
      technicalTopics: [
        {
          topic: "Rapid Prototyping Architecture",
          summary: "Best practices for setting up scalable, type-safe full-stack architectures in compressed hackathon timeframes.",
          keyPoints: [
            "Use modular folder structure separating routes, controllers, and models",
            "Leverage Tailwind CSS for rapid styling without stylesheet sprawl",
            "Implement defensive API clients with fallback mock data when services fail"
          ],
          resources: ["https://react.dev", "https://expressjs.com"]
        }
      ],
      sampleQuestions: [
        {
          question: "How do you ensure your hackathon project stands out during judge evaluations?",
          category: "Hackathon Pitching",
          difficulty: "Medium",
          answer: "Focus heavily on the first 30 seconds of your demo: immediately showcase the core user pain point and how your live software solves it. Ensure responsive UI design with zero broken links, and clearly articulate the technical stack and architecture decisions.",
          tips: ["Avoid showing login screens for more than 3 seconds", "Emphasize working production features over slide decks"]
        }
      ]
    }
  },
  {
    title: "AI & Cloud Innovation Hackathon",
    company: "CloudScale Ecosystems",
    category: "Hackathon",
    location: "San Francisco, CA / Hybrid",
    workMode: "Hybrid",
    tags: ["Python", "Node.js", "React.js", "Docker", "TypeScript"],
    description: "Design innovative autonomous agents, developer tooling, and cloud-native microservices. Prize pool over $50,000 with opportunity for venture incubator interviews.",
    deadline: new Date("2026-11-28T18:00:00.000Z"),
    eventDate: new Date("2026-12-05T10:00:00.000Z"),
    applicationUrl: "https://hackathons.mlh.com",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Domain Analysis & Architecture Spike",
          goal: "Identify developer friction points and test SDK integrations.",
          tasks: ["Analyze vector indexing and streaming REST API patterns", "Form technical roles"],
          milestone: "Functional CLI test harness communicating with backend"
        },
        {
          week: 2,
          title: "Microservice Scaffold & State Management",
          goal: "Implement event-driven streaming updates to web client.",
          tasks: ["Build Express server with Server-Sent Events (SSE)", "Integrate React context for real-time streaming state"],
          milestone: "Real-time updates visible on dashboard"
        },
        {
          week: 3,
          title: "Stress Testing & Docker Packaging",
          goal: "Containerize application to ensure deterministic evaluation.",
          tasks: ["Write Dockerfile for client and server", "Validate memory usage and response times under concurrent load"],
          milestone: "1-click local run via docker-compose"
        },
        {
          week: 4,
          title: "Pitch Deck & Live Demo Dry Runs",
          goal: "Practice live demonstration under simulated network conditions.",
          tasks: ["Prepare pre-recorded fallback video in case of venue WiFi drop", "Refine value metrics and business viability slide"],
          milestone: "Flawless 3-minute pitch rehearsal"
        }
      ],
      technicalTopics: [
        {
          topic: "Real-Time Streaming in Web Applications",
          summary: "Techniques for streaming chunked data from Node backend to React UI.",
          keyPoints: ["Use ReadableStream and TextDecoder API in browser", "Manage React state incrementally to avoid re-render thrashing"],
          resources: ["https://developer.mozilla.org/en-US/docs/Web/API/Streams_API"]
        }
      ],
      sampleQuestions: [
        {
          question: "How do you handle backend failures gracefully in a live hackathon demonstration?",
          category: "System Design",
          difficulty: "Medium",
          answer: "Implement a client-side interceptor that catches 5xx errors or timeouts and falls back to pre-seeded realistic mock datasets with a subtle UI banner notifying users that demo mode is active.",
          tips: ["Never let the screen show an unhandled white-screen exception"]
        }
      ]
    }
  },
  {
    title: "Full-Stack Software Engineering Intern (Summer 2026)",
    company: "Stripe",
    category: "Internship",
    location: "San Francisco, CA / Seattle, WA",
    workMode: "Hybrid",
    tags: ["React.js", "Node.js", "TypeScript", "Express", "MongoDB"],
    description: "Join product engineering teams building high-reliability payment infrastructure, developer dashboards, and developer SDKs. Work directly with senior staff engineers and mentor teams.",
    deadline: new Date("2026-11-30T23:59:59.000Z"),
    eventDate: null,
    applicationUrl: "https://stripe.com/jobs",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Data Structures & Algorithmic Problem Solving",
          goal: "Master arrays, hash maps, two-pointer techniques, and string parsing.",
          tasks: [
            "Solve 25 targeted LeetCode Medium problems (Arrays, Two Pointers, Sliding Window)",
            "Practice writing clean, readable code with descriptive variable naming without IDE autocomplete",
            "Review Big-O time and space complexity analysis on all solutions"
          ],
          milestone: "Comfortably solve standard medium array/string problems in under 25 minutes"
        },
        {
          week: 2,
          title: "JavaScript Engine & Asynchronous Architecture",
          goal: "Deep dive into Event Loop, Microtasks vs Macrotasks, Closures, and Promises.",
          tasks: [
            "Implement custom Promise.all, Promise.race, and EventEmitter from scratch",
            "Study debouncing, throttling, and deep cloning implementations",
            "Inspect JavaScript memory management and prototype chain mechanisms"
          ],
          milestone: "Ace frontend technical screening questions with high conceptual clarity"
        },
        {
          week: 3,
          title: "System Design for Interns: Scalable Web Services",
          goal: "Learn how to architect REST APIs, database indexing, and caching layers.",
          tasks: [
            "Design a URL shortener service with MongoDB and Redis caching",
            "Understand database indexing strategies (B-Trees, compound indexes, query plans)",
            "Learn idempotent HTTP PUT/POST semantics for payment architectures"
          ],
          milestone: "Whiteboard a complete web service architecture with database schema"
        },
        {
          week: 4,
          title: "Behavioral Preparation & Mock Interviews",
          goal: "Structure stories using the STAR method (Situation, Task, Action, Result).",
          tasks: [
            "Prepare 5 concrete stories: technical challenge overcome, conflict resolution, project leadership, failure learned from",
            "Perform 2 mock live-coding interviews with peers under timed conditions",
            "Review company engineering principles and write thoughtful questions for the interviewers"
          ],
          milestone: "Pass 2 full mock interview rounds with confident, calm communication"
        }
      ],
      technicalTopics: [
        {
          topic: "JavaScript Event Loop & Microtask Execution",
          summary: "How the V8 runtime processes synchronous code, Microtasks (Promise callbacks, queueMicrotask), and Macrotasks (setTimeout, I/O).",
          keyPoints: [
            "Call Stack executes synchronous frames first",
            "Microtask queue is fully drained after each task before rendering or next macrotask",
            "Avoid blocking the main thread with long-running computations"
          ],
          resources: ["https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop"]
        }
      ],
      sampleQuestions: [
        {
          question: "Implement a robust debounce utility function in JavaScript with immediate execution support.",
          category: "JavaScript & Frameworks",
          difficulty: "Medium",
          answer: "function debounce(fn, delay, immediate = false) {\n  let timer = null;\n  return function(...args) {\n    const callNow = immediate && !timer;\n    clearTimeout(timer);\n    timer = setTimeout(() => {\n      timer = null;\n      if (!immediate) fn.apply(this, args);\n    }, delay);\n    if (callNow) fn.apply(this, args);\n  };\n}",
          tips: ["Preserve the `this` context", "Clear previous timeout timers cleanly"]
        }
      ]
    }
  },
  {
    title: "Junior Full Stack Engineer (Fresher / 2026 Batch)",
    company: "MongoDB Inc.",
    category: "Fresher Job",
    location: "New York, NY / Austin, TX",
    workMode: "Hybrid",
    tags: ["MongoDB", "Node.js", "Express", "React.js", "JavaScript"],
    description: "Launch your engineering career building developer tools, cloud database portals, and ecosystem integrations. Complete onboarding program with dedicated senior mentorship.",
    deadline: new Date("2026-11-25T23:59:59.000Z"),
    eventDate: null,
    applicationUrl: "https://www.mongodb.com/careers",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Core MongoDB Schema Design & Indexing",
          goal: "Learn document modeling best practices: Embedding vs Referencing.",
          tasks: [
            "Study 1-to-1, 1-to-N, and N-to-N relationship patterns in document stores",
            "Master Compound Indexes and explain() performance tuning",
            "Build indexing tests for text search queries"
          ],
          milestone: "Design schemas that eliminate N+1 query problems"
        },
        {
          week: 2,
          title: "Express RESTful API Engineering & Security",
          goal: "Build production-grade APIs with helmet, validation, and sanitization.",
          tasks: [
            "Implement centralized error handling middleware in Express",
            "Set up request rate limiting and CORS origin whitelisting",
            "Validate inputs against SQL/NoSQL injection vulnerabilities"
          ],
          milestone: "Flawless API passing security and load audits"
        },
        {
          week: 3,
          title: "Modern React Architecture & State Flow",
          goal: "Master component composition, custom hooks, and defensive API consumption.",
          tasks: [
            "Build decoupled presentational components from data-fetching hooks",
            "Implement resilient offline fallback handling with mock states",
            "Style responsive UI with Tailwind CSS and CSS variables"
          ],
          milestone: "Polished full-stack dashboard with zero console warnings"
        },
        {
          week: 4,
          title: "System Design & Final Round Interview Polish",
          goal: "Master entry-level system design concepts and behavioral alignment.",
          tasks: [
            "Study database replication, replica sets, and failover mechanics",
            "Practice explaining trade-offs between consistency and availability (CAP theorem)",
            "Draft STAR behavioral responses on engineering ownership and curiosity"
          ],
          milestone: "Confident completion of final round technical loop"
        }
      ],
      technicalTopics: [
        {
          topic: "MongoDB Schema Design: Embedding vs Referencing",
          summary: "How to choose between embedding child documents and referencing by ObjectId.",
          keyPoints: [
            "Embed when data is viewed together, updated together, and bounded in size (under 16MB limit)",
            "Reference when child documents grow indefinitely or need independent querying",
            "Avoid deep nesting exceeding 2-3 levels"
          ],
          resources: ["https://www.mongodb.com/docs/manual/core/data-model-design/"]
        }
      ],
      sampleQuestions: [
        {
          question: "Explain the Equality, Sort, Range (ESR) rule in MongoDB indexing.",
          category: "Backend & DB",
          difficulty: "Hard",
          answer: "The ESR rule dictates the order of fields in a compound index: 1. Equality matches come first to narrow candidate documents immediately. 2. Sort fields come second to allow the index to fulfill sorting without an in-memory sort. 3. Range filters ($gt, $lt) come last because once a range is evaluated, the index can no longer be used for sorting.",
          tips: ["Draw a compound index visual example for the interviewer"]
        }
      ]
    }
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    console.log('[Seeder] Clearing old demo opportunities...');
    await Opportunity.deleteMany({ isDemo: true });

    console.log(`[Seeder] Inserting ${seedData.length} demonstration records...`);
    await Opportunity.insertMany(seedData);

    console.log('[Seeder] Database seeding completed successfully! ✨');
    process.exit(0);
  } catch (err) {
    console.error('[Seeder Error]:', err.message);
    process.exit(1);
  }
};

seedDB();
