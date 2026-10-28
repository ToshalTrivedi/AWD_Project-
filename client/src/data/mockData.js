/**
 * Demonstration dataset containing 12 realistic records across Hackathons,
 * Internships, and Fresher Jobs with deep prep roadmaps, technical concepts, and Q&As.
 * Enables the platform to be fully functional offline or without MongoDB running.
 */

export const mockOpportunities = [
  {
    _id: "unstop-hack-01",
    title: "Flipkart GRiD 6.0 — Software Development Track",
    company: "Flipkart (via Unstop)",
    category: "Hackathon",
    location: "Bangalore, India / Virtual",
    workMode: "Hybrid",
    tags: ["React.js", "Node.js", "System Design", "Algorithms", "Unstop"],
    description: "Flipkart GRiD is Flipkart's flagship national engineering campus challenge. Real-world e-commerce scale problems spanning smart inventory, autonomous returns, and GenAI product discovery with Pre-Placement Interviews (PPI) and cash pool worth ₹5,00,000+.",
    deadline: "2026-11-20T18:30:00.000Z",
    eventDate: "2026-11-28T09:00:00.000Z",
    applicationUrl: "https://unstop.com/hackathons/flipkart-grid",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Online Assessment & DSA Speed Drill",
          goal: "Clear Level 1 E-Commerce algorithmic test and technical MCQ screening.",
          tasks: [
            "Practice graph traversals (BFS/DFS), dynamic programming, and binary trees",
            "Take mock 60-minute time-bound MCQs on CS fundamentals (OS, DBMS, Computer Networks)",
            "Review algorithmic space and time optimizations for large datasets"
          ],
          milestone: "Score 90%+ in simulated Flipkart online assessments"
        },
        {
          week: 2,
          title: "Problem Statement Architecture & Proof of Concept",
          goal: "Deconstruct the Flipkart problem statement and design high-scale technical architecture.",
          tasks: [
            "Model database entities for inventory, orders, and real-time delivery logs",
            "Draft high-level architecture diagram (microservices, caching with Redis, message queues)",
            "Build working end-to-end prototype with Express REST API and React UI"
          ],
          milestone: "Functional prototype submitted for Level 2 evaluation"
        },
        {
          week: 3,
          title: "Scale Optimization & Edge Cases",
          goal: "Optimize response times under simulated flash-sale traffic loads.",
          tasks: [
            "Benchmark endpoints with concurrency load testing tools",
            "Implement MongoDB compound indexing and defensive error recovery",
            "Document edge-case handling for network partitions and concurrent checkouts"
          ],
          milestone: "Sub-50ms latency under simulated concurrent requests"
        },
        {
          week: 4,
          title: "National Finale Presentation & Jury Pitch",
          goal: "Nail executive pitch to Flipkart Engineering Directors and Staff Architects.",
          tasks: [
            "Structure presentation slides around Business Value, System Scalability, and Code Quality",
            "Rehearse live working demo video with zero dependency failures",
            "Prepare STAR responses for technical panel cross-examination"
          ],
          milestone: "Secured Pre-Placement Interview (PPI) shortlist"
        }
      ],
      technicalTopics: [
        {
          topic: "E-Commerce Microservices & High-Concurrency Systems",
          summary: "Architectural patterns for high-throughput transactional systems during mega-sale events.",
          keyPoints: [
            "Use message queues (Kafka/RabbitMQ) for asynchronous decoupled order processing",
            "Apply optimistic locking or atomic database operations to prevent overselling inventory",
            "Implement multi-tier caching with Redis and CDN caching for product catalogs"
          ],
          resources: ["https://unstop.com/hackathons", "https://react.dev"]
        }
      ],
      sampleQuestions: [
        {
          question: "How would you design a flash-sale inventory reservation system that handles 100,000 requests per second?",
          category: "System Design",
          difficulty: "Hard",
          answer: "Decouple request ingestion from database writes. Validate inventory availability via in-memory Redis clusters with atomic DECR operations. Push successful reservation requests into an asynchronous message queue (e.g., Kafka) where worker nodes process payments and finalize orders in MongoDB.",
          tips: ["Mention idempotency keys to prevent double-charging on duplicate clicks"]
        }
      ]
    }
  },
  {
    _id: "unstop-hack-02",
    title: "Walmart CodeHers 2026 — Engineering Challenge",
    company: "Walmart Global Tech (via Unstop)",
    category: "Hackathon",
    location: "Bangalore / Chennai / Hybrid",
    workMode: "Hybrid",
    tags: ["JavaScript", "Python", "Node.js", "Data Structures", "Unstop"],
    description: "Walmart CodeHers is India's premier diversity tech hackathon for women engineers across colleges. Features algorithmic coding rounds followed by a 24-hour innovation challenge offering full-time SDE roles and summer internships.",
    deadline: "2026-12-05T23:59:59.000Z",
    eventDate: "2026-12-12T10:00:00.000Z",
    applicationUrl: "https://unstop.com/hackathons/walmart-codehers",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Core Algorithmic Foundations",
          goal: "Master high-frequency Walmart coding patterns.",
          tasks: [
            "Solve 30 top problems on Strings, Arrays, HashMaps, and Stacks",
            "Practice writing bug-free syntax without IDE auto-completion",
            "Review bit manipulation and sliding window algorithms"
          ],
          milestone: "Solve 2 LeetCode Mediums in under 45 minutes"
        },
        {
          week: 2,
          title: "Object-Oriented Design & Clean Code",
          goal: "Write maintainable, modular software following SOLID principles.",
          tasks: [
            "Implement design patterns (Factory, Strategy, Observer) in modern JavaScript/Node",
            "Write comprehensive unit test cases and boundary conditions",
            "Review clean code conventions and naming semantics"
          ],
          milestone: "Zero code smells in automated static analysis"
        },
        {
          week: 3,
          title: "Supply Chain & Retail System Architecture",
          goal: "Learn Walmart's global supply chain tech challenges.",
          tasks: [
            "Study real-time warehouse package routing and inventory tracking",
            "Implement REST APIs with rate limiting and robust error responses",
            "Integrate responsive React frontend with data visualizers"
          ],
          milestone: "Cleanly deployed prototype with verified live APIs"
        },
        {
          week: 4,
          title: "Walmart Leadership Principles & Technical Interview",
          goal: "Prepare behavioral and architectural rounds with Walmart mentors.",
          tasks: [
            "Align STAR stories with Walmart values (Customer First, High Performance, Inclusion)",
            "Conduct mock interview with focus on clear technical communication",
            "Prepare thoughtful queries regarding Walmart Global Tech engineering roadmaps"
          ],
          milestone: "Ready for Walmart CodeHers finalist technical loop"
        }
      ],
      technicalTopics: [
        {
          topic: "Data Structure Selection for Real-Time Querying",
          summary: "Trade-offs between HashMaps, Tries, and Balanced Trees in search and lookup operations.",
          keyPoints: [
            "Trie structures provide O(L) prefix search for product auto-complete",
            "Hash tables offer O(1) average lookup but can degrade to O(N) on collision clustering",
            "Use B-Trees and compound indexes to satisfy equality and range bounds in databases"
          ],
          resources: ["https://unstop.com", "https://nodejs.org"]
        }
      ],
      sampleQuestions: [
        {
          question: "Given a stream of customer search queries, how do you find the top 10 most frequent items in real time?",
          category: "Coding",
          difficulty: "Medium",
          answer: "Combine a HashMap with a Min-Heap of size K (K=10), or use Count-Min Sketch with Heavy Hitters for distributed massive streaming data. In a single-instance service, update frequency counts in the HashMap and maintain the top 10 in a Min-Heap with O(N log K) complexity.",
          tips: ["Discuss memory footprint trade-offs between exact counts and probabilistic sketches"]
        }
      ]
    }
  },
  {
    _id: "unstop-hack-03",
    title: "HackOn With Amazon — Season 5",
    company: "Amazon India (via Unstop)",
    category: "Hackathon",
    location: "Hyderabad / Bangalore / Virtual",
    workMode: "Remote",
    tags: ["React.js", "Node.js", "TypeScript", "AWS", "Unstop"],
    description: "National-level hackathon for engineering students across India. Solve real-world customer friction points leveraging Generative AI, cloud infrastructure, and serverless architectures with direct fast-track interview opportunities for Amazon SDE Intern roles.",
    deadline: "2026-12-15T18:00:00.000Z",
    eventDate: "2026-12-22T09:00:00.000Z",
    applicationUrl: "https://unstop.com/hackathons/hackon-with-amazon",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Amazon Leadership Principles & Problem Ideation",
          goal: "Identify customer-centric problem statements and evaluate feasibility.",
          tasks: [
            "Study Amazon 16 Leadership Principles (Customer Obsession, Invent and Simplify)",
            "Draft 'Working Backwards' Press Release & FAQ (PR/FAQ) for your concept",
            "Initialize clean Git repository with CI/CD GitHub Actions"
          ],
          milestone: "Approved PR/FAQ document and architecture blueprint"
        },
        {
          week: 2,
          title: "Cloud-Native Backend & REST Services",
          goal: "Develop scalable backend with Express and MongoDB.",
          tasks: [
            "Build secure, token-authenticated REST endpoints",
            "Implement database models with proper indexing and validation",
            "Add automated smoke tests to ensure API stability"
          ],
          milestone: "Core backend services passing all test suites"
        },
        {
          week: 3,
          title: "Interactive User Experience & Cloud Deployment",
          goal: "Build polished React client with keyboard accessibility.",
          tasks: [
            "Construct responsive UI with Tailwind CSS and feedback states",
            "Integrate live API calls with graceful mock data fallback",
            "Deploy staging preview on cloud hosting platform"
          ],
          milestone: "Live deployed URL tested on desktop and mobile"
        },
        {
          week: 4,
          title: "Executive Jury Pitch & Live Demonstration",
          goal: "Deliver a compelling 3-minute pitch to Amazon Principal Engineers.",
          tasks: [
            "Highlight operational excellence, error resilience, and customer impact",
            "Record backup walkthrough video to mitigate live WiFi interruptions",
            "Conduct mock Q&A grilling sessions with peers"
          ],
          milestone: "Completed HackOn Amazon national submission"
        }
      ],
      technicalTopics: [
        {
          topic: "Idempotent API Design & Fault Tolerance",
          summary: "Techniques for ensuring distributed transactions survive network timeouts safely.",
          keyPoints: [
            "Use client-generated UUID idempotency keys for mutation endpoints",
            "Implement exponential backoff with jitter on outgoing network requests",
            "Design stateless application servers to allow seamless horizontal autoscaling"
          ],
          resources: ["https://unstop.com", "https://aws.amazon.com"]
        }
      ],
      sampleQuestions: [
        {
          question: "How does Amazon enforce 'Customer Obsession' during architectural trade-off discussions?",
          category: "Behavioral",
          difficulty: "Easy",
          answer: "By prioritizing long-term user trust and reliability over short-term expediency. For example, selecting a resilient multi-region database setup or building offline fallback mechanisms so users never encounter a dead end, even during third-party dependency outages.",
          tips: ["Provide a specific personal project example using the STAR format"]
        }
      ]
    }
  },
  {
    _id: "unstop-intern-01",
    title: "Full Stack Software Developer Intern",
    company: "onGrid (via Unstop)",
    category: "Internship",
    location: "Gurgaon / Delhi NCR, India",
    workMode: "Hybrid",
    tags: ["React.js", "Node.js", "MongoDB", "Express", "Unstop"],
    description: "Work directly on high-trust identity and background verification platform processing millions of transactions. Build scalable frontend user portals, secure microservices, and optimize MongoDB data models.",
    deadline: "2026-11-28T23:59:59.000Z",
    eventDate: null,
    applicationUrl: "https://unstop.com/internships",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "JavaScript Fundamentals & Asynchronous Patterns",
          goal: "Master promises, closures, prototypes, and async/await error handling.",
          tasks: [
            "Implement custom asynchronous queue processor in vanilla JS",
            "Study memory leak detection using Chrome DevTools memory tab",
            "Complete 20 practice questions on the JS Event Loop"
          ],
          milestone: "100% on technical JS screening quiz"
        },
        {
          week: 2,
          title: "React Component Architecture & Hooks",
          goal: "Build performant UI components with clean separation of concerns.",
          tasks: [
            "Develop reusable form components with accessible validation states",
            "Use useCallback and useMemo to optimize component rendering tree",
            "Build custom hooks for window resize and network connection status"
          ],
          milestone: "Tested component library with zero unnecessary re-renders"
        },
        {
          week: 3,
          title: "Node.js, Express & Database Aggregations",
          goal: "Design high-performance REST APIs with MongoDB pipelines.",
          tasks: [
            "Write Express authentication middleware with JWT verification",
            "Build MongoDB aggregation pipelines ($match, $lookup, $project)",
            "Implement helmet security headers and request payload sanitization"
          ],
          milestone: "Production-ready REST microservice deployed locally"
        },
        {
          week: 4,
          title: "Interview Rehearsal & Live Pair Programming",
          goal: "Ace technical interview loop and secure the internship offer.",
          tasks: [
            "Practice explaining code decisions out loud during coding tests",
            "Review past project architecture challenges and trade-offs",
            "Prepare questions regarding onGrid's engineering stack and mentorship"
          ],
          milestone: "Successful completion of final interview round"
        }
      ],
      technicalTopics: [
        {
          topic: "MongoDB Query Tuning with explain('executionStats')",
          summary: "Techniques for analyzing database execution plans and replacing COLLSCAN with IXSCAN.",
          keyPoints: [
            "Examine 'totalDocsExamined' vs 'nReturned' ratio",
            "Apply ESR (Equality, Sort, Range) compound indexing rules",
            "Create sparse or partial indexes for optional document fields"
          ],
          resources: ["https://unstop.com/internships", "https://www.mongodb.com"]
        }
      ],
      sampleQuestions: [
        {
          question: "What is the difference between shallow copy and deep copy in JavaScript, and how do you clone nested state in React?",
          category: "JavaScript & Frameworks",
          difficulty: "Easy",
          answer: "A shallow copy copies top-level references (e.g., Object.assign or spread operator {...obj}), meaning nested objects still share memory. A deep copy duplicates all nested layers. In modern JavaScript, use structuredClone(obj) for deep copying, or in React state updates, update nested properties immutably using nested spread operators or utility libraries.",
          tips: ["Mention that JSON.parse(JSON.stringify(x)) loses functions, dates, and undefined values"]
        }
      ]
    }
  },
  {
    _id: "unstop-intern-02",
    title: "Software Engineering Intern — Cloud & Web",
    company: "Fango Tech Labs (via Unstop)",
    category: "Internship",
    location: "Bangalore, India",
    workMode: "Hybrid",
    tags: ["React.js", "TypeScript", "Node.js", "REST APIs", "Unstop"],
    description: "Paid internship (₹15,000 – ₹25,000/month) with Pre-Placement Offer (PPO) potential. Join the core product engineering squad building consumer-facing high-performance web applications and analytics dashboards.",
    deadline: "2026-12-10T23:59:59.000Z",
    eventDate: null,
    applicationUrl: "https://unstop.com/internships",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "TypeScript Types & Interface Modeling",
          goal: "Achieve end-to-end type safety across frontend and backend modules.",
          tasks: [
            "Master Generics, Union Types, and Type Guards in TypeScript",
            "Define strict interfaces for API responses and request payloads",
            "Configure tsconfig.json with strict type checking enabled"
          ],
          milestone: "Zero implicit 'any' across codebase"
        },
        {
          week: 2,
          title: "State Management & Real-Time Sync",
          goal: "Implement fluid user experiences with optimistic updates.",
          tasks: [
            "Manage complex application state using React Context or lightweight stores",
            "Handle debounce inputs on search filters to eliminate lag",
            "Implement slide-over drawer modal with accessible keyboard navigation"
          ],
          milestone: "Interactive dashboard with 60fps responsiveness"
        },
        {
          week: 3,
          title: "RESTful API Integration & Error Resilience",
          goal: "Handle offline fallback data and network dropouts gracefully.",
          tasks: [
            "Build Axios interceptors for timeout and retry handling",
            "Create user-friendly error banners and skeleton loading states",
            "Verify complete WCAG AA color contrast ratios"
          ],
          milestone: "Resilient frontend that never crashes on backend 500 errors"
        },
        {
          week: 4,
          title: "Technical Review & Team Fit Loop",
          goal: "Demonstrate engineering maturity and curiosity.",
          tasks: [
            "Walk through previous GitHub repositories and highlight clean commits",
            "Discuss testing strategies (unit tests vs integration tests)",
            "Finalize compensation and internship timeline expectations"
          ],
          milestone: "Signed internship offer letter"
        }
      ],
      technicalTopics: [
        {
          topic: "Optimistic UI Updates in Modern Web Apps",
          summary: "Immediately reflecting user actions on screen before the server confirms the request.",
          keyPoints: [
            "Update local client state immediately on user click",
            "Dispatch asynchronous API call in the background",
            "Roll back to previous state snapshot with a toast notification if the network fails"
          ],
          resources: ["https://unstop.com/internships", "https://react.dev"]
        }
      ],
      sampleQuestions: [
        {
          question: "How do you prevent prop drilling in a multi-level React component tree?",
          category: "JavaScript & Frameworks",
          difficulty: "Easy",
          answer: "By using component composition (passing components as children or props), React Context API for genuinely global data (such as user themes or auth sessions), or state management stores. Favor composition first to maintain component reusability before adding global context.",
          tips: ["Highlight that over-using Context can trigger unnecessary re-renders in unmemoized consumers"]
        }
      ]
    }
  },
  {
    _id: "demo-hack-01",
    title: "Global Hack Week: Open Source & Full Stack 2026",
    company: "Major League Hacking (Community)",
    category: "Hackathon",
    location: "Global / Virtual",
    workMode: "Remote",
    tags: ["React.js", "Node.js", "MongoDB", "Express", "Open Source"],
    description: "Build cutting-edge full-stack web applications, contribute to top open-source projects, and collaborate with 5,000+ passionate hackers worldwide. Features beginner-friendly workshops, mentoring by industry engineers, and live product demos.",
    deadline: "2026-11-15T23:59:59.000Z",
    eventDate: "2026-11-20T09:00:00.000Z",
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
        },
        {
          topic: "Judging Criteria Optimization",
          summary: "How hackathon judges score submissions and how to maximize points.",
          keyPoints: [
            "UX/UI Polish accounts for immediate first impressions (30%)",
            "Technical challenge: demonstrates clean API integration and data persistence (40%)",
            "Clear video demonstration showing real problem solved (30%)"
          ],
          resources: ["https://mlh.com/about"]
        }
      ],
      sampleQuestions: [
        {
          question: "How do you ensure your hackathon project stands out during judge evaluations?",
          category: "Hackathon Pitching",
          difficulty: "Medium",
          answer: "Focus heavily on the first 30 seconds of your demo: immediately showcase the core user pain point and how your live software solves it. Ensure responsive UI design with zero broken links, and clearly articulate the technical stack and architecture decisions.",
          tips: ["Avoid showing login screens for more than 3 seconds", "Emphasize working production features over slide decks"]
        },
        {
          question: "What strategies prevent database connection bottlenecks during live hackathon demos?",
          category: "Backend & DB",
          difficulty: "Easy",
          answer: "Maintain singleton Mongoose connection pools, enable request rate limiting, configure resilient fallback mock data in the frontend client, and pre-warm cloud server instances prior to judging rounds.",
          tips: ["Always log connection statuses safely", "Use retry logic with exponential backoff"]
        }
      ]
    }
  },
  {
    _id: "demo-hack-02",
    title: "AI & Cloud Innovation Hackathon",
    company: "CloudScale Ecosystems",
    category: "Hackathon",
    location: "San Francisco, CA / Hybrid",
    workMode: "Hybrid",
    tags: ["Python", "Node.js", "React.js", "Docker", "TypeScript"],
    description: "Design innovative autonomous agents, developer tooling, and cloud-native microservices. Prize pool over $50,000 with opportunity for venture incubator interviews and credits.",
    deadline: "2026-11-28T18:00:00.000Z",
    eventDate: "2026-12-05T10:00:00.000Z",
    applicationUrl: "https://hackathons.mlh.com",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Domain Analysis & Architecture Spike",
          goal: "Identify developer friction points and test SDK integrations.",
          tasks: ["Analyze vector indexing and streaming REST API patterns", "Form technical roles (Frontend Lead, Backend/Infra Lead)"],
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
    _id: "demo-hack-03",
    title: "FinTech & Open Banking Hackfest",
    company: "Apex Financial Labs",
    category: "Hackathon",
    location: "New York, NY / Hybrid",
    workMode: "Hybrid",
    tags: ["JavaScript", "Express", "Node.js", "MongoDB", "Security"],
    description: "Create financial inclusivity solutions, algorithmic analytics dashboards, and secure transaction workflows using open banking standards.",
    deadline: "2026-12-10T23:59:59.000Z",
    eventDate: "2026-12-18T08:30:00.000Z",
    applicationUrl: "https://hackathons.mlh.com",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Financial Security Principles",
          goal: "Review PCI-DSS basics, JWT standards, and rate limiting.",
          tasks: ["Review OWASP Top 10 web vulnerabilities", "Design token authorization flow"],
          milestone: "Secure route authentication middleware written"
        },
        {
          week: 2,
          title: "Ledger Schema & Aggregations",
          goal: "Model double-entry accounting in MongoDB.",
          tasks: ["Create MongoDB transaction collections with compound indexes", "Write aggregation queries for account balance summaries"],
          milestone: "Transactions pipeline validated with unit tests"
        },
        {
          week: 3,
          title: "Analytics Visualizations",
          goal: "Implement interactive SVG financial charts in React.",
          tasks: ["Build SVG charts showing cash flow trends", "Add filtering by date ranges and categories"],
          milestone: "Interactive dashboard rendered cleanly"
        },
        {
          week: 4,
          title: "Security Auditing & Pitch",
          goal: "Prove data confidentiality and pitch value to banking mentors.",
          tasks: ["Audit dependencies with npm audit", "Polish presentation deck highlighting privacy compliance"],
          milestone: "Completed submission and security self-attestation"
        }
      ],
      technicalTopics: [
        {
          topic: "MongoDB Aggregation Pipelines for Financial Records",
          summary: "Using $match, $group, and $project to process high-volume ledger records.",
          keyPoints: ["Filter early with $match using indexed fields", "Avoid $unwind on large arrays without pagination"],
          resources: ["https://www.mongodb.com/docs/manual/aggregation/"]
        }
      ],
      sampleQuestions: [
        {
          question: "How do you protect financial REST APIs against brute force and replay attacks?",
          category: "Backend & DB",
          difficulty: "Hard",
          answer: "Implement IP-based rate limiting via express-rate-limit, enforce short-lived JWT tokens with rotating refresh secrets, mandate HTTPS with Helmet security headers, and include monotonic nonces or idempotency keys on write endpoints.",
          tips: ["Discuss idempotency keys in payment processing"]
        }
      ]
    }
  },
  {
    _id: "demo-hack-04",
    title: "Hack The Climate: CleanTech Challenge",
    company: "EcoTech Consortium",
    category: "Hackathon",
    location: "Berlin, Germany / Remote",
    workMode: "Remote",
    tags: ["React.js", "Python", "TypeScript", "Node.js"],
    description: "Build digital solutions tracking carbon footprints, renewable energy distribution, and community recycling networks.",
    deadline: "2026-12-22T23:59:59.000Z",
    eventDate: "2027-01-08T09:00:00.000Z",
    applicationUrl: "https://hackathons.mlh.com",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Carbon Accounting Data Model",
          goal: "Understand greenhouse gas calculation methodologies.",
          tasks: ["Research standard emission factors", "Draft JSON schemas for energy consumption telemetry"],
          milestone: "Calculators verified against open climate datasets"
        },
        {
          week: 2,
          title: "Frontend Carbon Calculator",
          goal: "Build interactive sliders and dynamic graph updates in React.",
          tasks: ["Implement responsive calculator forms with validation", "Add accessible SVG comparison graphs"],
          milestone: "Live calculations rendered with 60fps responsiveness"
        },
        {
          week: 3,
          title: "API Optimization & Caching",
          goal: "Cache climate sensor APIs using in-memory caches.",
          tasks: ["Implement 5-minute server response caching", "Provide offline mock data fallback for testing"],
          milestone: "Sub-100ms API response time"
        },
        {
          week: 4,
          title: "Impact Pitch & Community Launch",
          goal: "Present tangible sustainability impact to judging panel.",
          tasks: ["Draft executive one-pager detailing CO2 reduction potential", "Submit project to Devpost with open-source MIT license"],
          milestone: "Project launched on GitHub"
        }
      ],
      technicalTopics: [
        {
          topic: "Performance Optimization in Data-Intensive React UIs",
          summary: "Using useMemo, useCallback, and debouncing for complex calculations.",
          keyPoints: ["Debounce user inputs on continuous sliders", "Memoize heavy dataset aggregations"],
          resources: ["https://react.dev/reference/react/useMemo"]
        }
      ],
      sampleQuestions: [
        {
          question: "How do you explain the real-world feasibility of your hackathon project to non-technical judges?",
          category: "Hackathon Pitching",
          difficulty: "Easy",
          answer: "Anchor the pitch on concrete user stories: 'Here is Sarah, a facility manager who saved 18% electricity using our real-time alert engine.' Connect technical elegance directly to measurable cost or carbon savings.",
          tips: ["Keep slides text-light and visual-rich"]
        }
      ]
    }
  },
  {
    _id: "demo-intern-01",
    title: "Full-Stack Software Engineering Intern (Summer 2026)",
    company: "Stripe",
    category: "Internship",
    location: "San Francisco, CA / Seattle, WA",
    workMode: "Hybrid",
    tags: ["React.js", "Node.js", "TypeScript", "Express", "MongoDB"],
    description: "Join product engineering teams building high-reliability payment infrastructure, developer dashboards, and developer SDKs. Work directly with senior staff engineers and mentor teams.",
    deadline: "2026-11-30T23:59:59.000Z",
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
        },
        {
          topic: "React Rendering Lifecycle & Hook Internals",
          summary: "Understanding reconciliation, fiber architecture, and state batching in React 18+.",
          keyPoints: [
            "State updates are automatically batched in React 18+",
            "useEffect fires asynchronously after layout and paint",
            "useCallback/useMemo must have correct dependency arrays to prevent stale closures"
          ],
          resources: ["https://react.dev"]
        }
      ],
      sampleQuestions: [
        {
          question: "Implement a robust debounce utility function in JavaScript with immediate execution support.",
          category: "JavaScript & Frameworks",
          difficulty: "Medium",
          answer: "function debounce(fn, delay, immediate = false) {\n  let timer = null;\n  return function(...args) {\n    const callNow = immediate && !timer;\n    clearTimeout(timer);\n    timer = setTimeout(() => {\n      timer = null;\n      if (!immediate) fn.apply(this, args);\n    }, delay);\n    if (callNow) fn.apply(this, args);\n  };\n}",
          tips: ["Preserve the `this` context", "Clear previous timeout timers cleanly"]
        },
        {
          question: "Explain the difference between SQL and NoSQL database indexing strategies.",
          category: "Backend & DB",
          difficulty: "Medium",
          answer: "In MongoDB, indexes use B-Trees similar to relational DBs. Single field indexes optimize point queries and range filters. Compound indexes must adhere to the Equality-Sort-Range (ESR) rule to maximize prefix matching and prevent memory sorts.",
          tips: ["Mention the MongoDB explain() executionStats method"]
        },
        {
          question: "Tell me about a time you faced a difficult technical bug under time pressure.",
          category: "Behavioral",
          difficulty: "Easy",
          answer: "Use STAR: Detail the Situation (critical bug right before deadline), Task (isolate root cause without disrupting existing tests), Action (used structured git bisect, inspected network payloads, reproduced in isolated sandbox), and Result (fixed root cause, wrote regression test, delivered on time).",
          tips: ["Focus on your individual contribution and lessons learned"]
        }
      ]
    }
  },
  {
    _id: "demo-intern-02",
    title: "Frontend Engineering Intern",
    company: "Figma",
    category: "Internship",
    location: "Remote / San Francisco",
    workMode: "Remote",
    tags: ["React.js", "TypeScript", "JavaScript", "CSS"],
    description: "Help build fluid, responsive design tooling web interfaces with extreme attention to visual detail, canvas performance, and keyboard ergonomics.",
    deadline: "2026-12-01T23:59:59.000Z",
    eventDate: null,
    applicationUrl: "https://figma.com/careers",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Advanced CSS Layouts & Canvas Performance",
          goal: "Master Flexbox, CSS Grid, transforms, and sub-pixel rendering.",
          tasks: ["Recreate complex desktop layouts using CSS Grid", "Analyze browser layout thrashing and compositing layers"],
          milestone: "Zero layout shift components benchmarked"
        },
        {
          week: 2,
          title: "DOM Manipulation & Custom Hook Architecture",
          goal: "Build reusable hooks for keyboard shortcuts and focus trapping.",
          tasks: ["Write useKeydown and useFocusTrap hooks", "Support full WAI-ARIA modal dialogue accessibility standards"],
          milestone: "Modal components accessible via keyboard only"
        },
        {
          week: 3,
          title: "State Management & React Profiling",
          goal: "Eliminate wasteful re-renders in deep component trees.",
          tasks: ["Profile with React DevTools flame charts", "Apply memoization to heavy UI item renderers"],
          milestone: "Achieve consistent 60fps scrolling on large lists"
        },
        {
          week: 4,
          title: "Frontend Technical Interview Practice",
          goal: "Solve live UI coding prompts under observation.",
          tasks: ["Build autocomplete search pill component from scratch", "Practice answering CSS specificity and stacking context questions"],
          milestone: "Clean UI component written in under 35 minutes"
        }
      ],
      technicalTopics: [
        {
          topic: "CSS Stacking Context & Z-Index Rules",
          summary: "How browsers determine layering order and paint order for elements.",
          keyPoints: ["Opacity < 1, transform, and filter create new stacking contexts", "z-index only applies to positioned elements"],
          resources: ["https://developer.mozilla.org"]
        }
      ],
      sampleQuestions: [
        {
          question: "How do you build an accessible modal dialogue that traps keyboard focus?",
          category: "Coding",
          difficulty: "Medium",
          answer: "Query all focusable child elements (buttons, inputs, links). When the user presses Tab on the last element, wrap focus back to the first; on Shift+Tab from the first element, wrap focus to the last. Also listen for the Escape key to close the modal and restore focus to the triggering element.",
          tips: ["Remember to clean up event listeners on unmount"]
        }
      ]
    }
  },
  {
    _id: "demo-intern-03",
    title: "Backend Platform Engineering Intern",
    company: "Datadog",
    category: "Internship",
    location: "New York, NY / Hybrid",
    workMode: "Hybrid",
    tags: ["Node.js", "Express", "MongoDB", "Python"],
    description: "Work on telemetry ingest pipelines, rate limiters, and high-throughput monitoring APIs serving millions of metrics per second.",
    deadline: "2026-12-15T23:59:59.000Z",
    eventDate: null,
    applicationUrl: "https://www.datadoghq.com/careers",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Operating Systems & Networking Basics",
          goal: "Review TCP/IP, sockets, thread models, and memory buffers.",
          tasks: ["Study Node.js Buffer and Stream APIs", "Inspect HTTP/1.1 vs HTTP/2 multiplexing"],
          milestone: "High-throughput stream processing script"
        },
        {
          week: 2,
          title: "Express Middleware & Rate Limiting Internals",
          goal: "Build token-bucket rate limiters from scratch.",
          tasks: ["Implement token bucket algorithm in JavaScript", "Benchmark throughput using autocannon"],
          milestone: "Tested rate limiter middleware handling 10k req/sec"
        },
        {
          week: 3,
          title: "Database Performance & Index Analysis",
          goal: "Optimize queries with executionStats and compound indexing.",
          tasks: ["Simulate 50,000 records in MongoDB", "Run explain() queries and remove collection scans (COLLSCAN)"],
          milestone: "Achieve indexed IXSCAN on all critical read paths"
        },
        {
          week: 4,
          title: "Backend Architecture Interview Prep",
          goal: "Practice distributed systems and resilience questions.",
          tasks: ["Study circuit breaker patterns and exponential backoff", "Rehearse answers for handling cascading backend outages"],
          milestone: "Confident presentation of resilience architectures"
        }
      ],
      technicalTopics: [
        {
          topic: "Node.js Stream Backpressure Management",
          summary: "Preventing memory starvation when reading data faster than writing.",
          keyPoints: ["readable.pipe(writable) automatically handles backpressure", "Listen for 'drain' events when writing directly"],
          resources: ["https://nodejs.org/api/stream.html"]
        }
      ],
      sampleQuestions: [
        {
          question: "Explain what happens when an unhandled Promise rejection occurs in Node.js.",
          category: "Backend & DB",
          difficulty: "Medium",
          answer: "In modern Node.js versions, unhandled promise rejections emit an 'unhandledRejection' process event and, by default, will terminate the Node.js process with a non-zero exit code to prevent zombie states with corrupt memory.",
          tips: ["Always handle errors in promises or use global process listeners"]
        }
      ]
    }
  },
  {
    _id: "demo-intern-04",
    title: "Software Engineering Intern - Web Core",
    company: "GitHub",
    category: "Internship",
    location: "Global / Remote",
    workMode: "Remote",
    tags: ["React.js", "TypeScript", "Node.js", "Express"],
    description: "Contribute to developer workflows, Pull Request review interfaces, and GitHub Actions web tooling used by over 100 million developers.",
    deadline: "2026-12-20T23:59:59.000Z",
    eventDate: null,
    applicationUrl: "https://github.com/about/careers",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Git Internals & Object Model",
          goal: "Understand commits, trees, blobs, and references.",
          tasks: ["Inspect .git folder contents manually", "Write a small Node script that parses git commit sha objects"],
          milestone: "Clear understanding of directed acyclic graph (DAG)"
        },
        {
          week: 2,
          title: "TypeScript Generics & Utility Types",
          goal: "Master ReturnType, Record, Partial, and conditional types.",
          tasks: ["Build strongly-typed API response wrappers", "Avoid use of `any` across frontend codebases"],
          milestone: "Zero type-safety compromises"
        },
        {
          week: 3,
          title: "Code Review & Collaborative Development",
          goal: "Practice clean git branch workflows, rebase, and squash.",
          tasks: ["Create informative pull request descriptions with before/after screenshots", "Review open source issues for clear reproduction steps"],
          milestone: "High quality PR merged into community repo"
        },
        {
          week: 4,
          title: "Behavioral & Technical Synergy",
          goal: "Showcase open-source passion and constructive teamwork.",
          tasks: ["Prepare narrative around open-source contributions", "Review GitHub community code of conduct"],
          milestone: "Ready for collaborative pair programming interviews"
        }
      ],
      technicalTopics: [
        {
          topic: "Virtualization in Long Web Lists",
          summary: "Rendering thousands of list items efficiently without freezing the DOM.",
          keyPoints: ["Only render visible items plus small buffer overscan", "Dynamically calculate offsets or use fixed item heights"],
          resources: ["https://react.dev"]
        }
      ],
      sampleQuestions: [
        {
          question: "How would you design a virtualized list component in React?",
          category: "System Design",
          difficulty: "Hard",
          answer: "Track the container scroll position using an onScroll listener (or IntersectionObserver). Calculate startIndex = Math.floor(scrollTop / itemHeight) and endIndex based on visible container height. Render only the slice of items with absolute positioning translateY(index * itemHeight).",
          tips: ["Mention total scroll height dummy container"]
        }
      ]
    }
  },
  {
    _id: "demo-job-01",
    title: "Junior Full Stack Engineer (Fresher / 2026 Batch)",
    company: "MongoDB Inc.",
    category: "Fresher Job",
    location: "New York, NY / Austin, TX",
    workMode: "Hybrid",
    tags: ["MongoDB", "Node.js", "Express", "React.js", "JavaScript"],
    description: "Launch your engineering career building developer tools, cloud database portals, and ecosystem integrations. Complete onboarding program with dedicated senior mentorship.",
    deadline: "2026-11-25T23:59:59.000Z",
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
        },
        {
          topic: "Express Middleware Chain & Error Handling",
          summary: "How Express passes execution through middleware functions using next().",
          keyPoints: [
            "Standard middleware takes (req, res, next)",
            "Error middleware must take 4 parameters: (err, req, res, next)",
            "Always return after calling next() or sending a response"
          ],
          resources: ["https://expressjs.com/en/guide/using-middleware.html"]
        }
      ],
      sampleQuestions: [
        {
          question: "Explain the Equality, Sort, Range (ESR) rule in MongoDB indexing.",
          category: "Backend & DB",
          difficulty: "Hard",
          answer: "The ESR rule dictates the order of fields in a compound index: 1. Equality matches come first to narrow candidate documents immediately. 2. Sort fields come second to allow the index to fulfill sorting without an in-memory sort. 3. Range filters ($gt, $lt) come last because once a range is evaluated, the index can no longer be used for sorting.",
          tips: ["Draw a compound index visual example for the interviewer"]
        },
        {
          question: "What is the difference between synchronous execution, microtasks, and macrotasks in the Node.js event loop?",
          category: "Coding",
          difficulty: "Medium",
          answer: "Synchronous code executes on the call stack immediately. When the stack is clear, the engine checks the Microtask queue (process.nextTick, Promise then/catch). Once all microtasks are drained, the event loop advances to the next phase of macrotasks (Timers, I/O callbacks, Poll, Check/setImmediate).",
          tips: ["process.nextTick takes priority before Promise microtasks in Node.js"]
        },
        {
          question: "How do you handle disagreements on technical design with a teammate?",
          category: "Behavioral",
          difficulty: "Easy",
          answer: "Focus on objective data and project requirements rather than personal preferences. Set up an isolated benchmark or spike, list the trade-offs of both approaches clearly, and consult senior engineers or team guidelines to reach a respectful consensus.",
          tips: ["Emphasize empathy and shared project success"]
        }
      ]
    }
  },
  {
    _id: "demo-job-02",
    title: "Associate React & Node Developer",
    company: "Vercel Partner Network",
    category: "Fresher Job",
    location: "Remote / Worldwide",
    workMode: "Remote",
    tags: ["React.js", "Node.js", "Express", "TypeScript"],
    description: "Build developer-facing portals, integration plugins, and edge applications. Strong emphasis on React component quality, web vitals, and clean architecture.",
    deadline: "2026-12-05T23:59:59.000Z",
    eventDate: null,
    applicationUrl: "https://vercel.com/careers",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Core Web Vitals & Hydration",
          goal: "Understand LCP, FID/INP, and CLS metrics.",
          tasks: ["Run Lighthouse audits on sample web apps", "Fix cumulative layout shifts caused by dynamic image sizing"],
          milestone: "95+ Lighthouse performance score"
        },
        {
          week: 2,
          title: "REST API Client Design",
          goal: "Implement robust API services with Axios interceptors.",
          tasks: ["Build retry interceptor for 429 rate limit responses", "Handle offline graceful fallback data"],
          milestone: "Resilient API service module completed"
        },
        {
          week: 3,
          title: "Component Composition & Modals",
          goal: "Build slide-over drawers with clean portal mounting.",
          tasks: ["Use React createPortal for accessibility", "Implement ESC key listeners and scroll locking"],
          milestone: "Production-ready drawer component"
        },
        {
          week: 4,
          title: "Technical Coding Interviews",
          goal: "Live solve React hook and state management challenges.",
          tasks: ["Build custom useDebounce and usePagination hooks", "Demonstrate clean code structure under observation"],
          milestone: "Passed technical interview assessment"
        }
      ],
      technicalTopics: [
        {
          topic: "React Portals & DOM Hierarchy",
          summary: "Rendering child components into a DOM node outside the parent hierarchy.",
          keyPoints: ["Ideal for modal dialogs and slide-over drawers", "Event bubbling still behaves as if child was in React tree"],
          resources: ["https://react.dev/reference/react-dom/createPortal"]
        }
      ],
      sampleQuestions: [
        {
          question: "Why should you avoid using array index as key in React lists?",
          category: "JavaScript & Frameworks",
          difficulty: "Easy",
          answer: "Using indexes can cause bugs with component state, focus, and animation if items are reordered, inserted, or removed. React relies on persistent keys to identify which elements changed and can reuse or preserve DOM nodes correctly.",
          tips: ["Always use unique database IDs whenever available"]
        }
      ]
    }
  },
  {
    _id: "demo-job-03",
    title: "Junior Backend Engineer (API Services)",
    company: "Twilio",
    category: "Fresher Job",
    location: "Denver, CO / Remote",
    workMode: "Remote",
    tags: ["Node.js", "Express", "MongoDB", "JavaScript"],
    description: "Help build developer communication APIs, webhook delivery infrastructure, and telemetry tracking systems with 99.999% reliability targets.",
    deadline: "2026-12-18T23:59:59.000Z",
    eventDate: null,
    applicationUrl: "https://www.twilio.com/company/jobs",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "HTTP Protocol & Webhook Mechanics",
          goal: "Master status codes, headers, and webhook signing.",
          tasks: ["Inspect HMAC SHA-256 signature verification", "Build webhook receiver with idempotency checking"],
          milestone: "Verified webhook endpoint with signature validation"
        },
        {
          week: 2,
          title: "Asynchronous Queue Processing",
          goal: "Handle background tasks without blocking HTTP request threads.",
          tasks: ["Implement simple message queue pattern", "Process batch jobs with exponential backoff retries"],
          milestone: "Queue processor with retry handling"
        },
        {
          week: 3,
          title: "API Rate Limiting & Helmet Security",
          goal: "Secure Express endpoints with helmet and rate limiters.",
          tasks: ["Configure strict CSP and security headers", "Implement IP window sliding rate limits"],
          milestone: "Pen-test verified Express server"
        },
        {
          week: 4,
          title: "Live Debugging & Behavioral Questions",
          goal: "Practice diagnosing production incident logs under pressure.",
          tasks: ["Analyze mock production stack traces", "Prepare STAR answers on learning from mistakes"],
          milestone: "Ready for live incident debugging round"
        }
      ],
      technicalTopics: [
        {
          topic: "Webhook Idempotency & Delivery Guarantees",
          summary: "Ensuring duplicate webhook deliveries do not cause duplicate state mutations.",
          keyPoints: ["Store received event IDs with unique database indexes", "Return 200 OK immediately for already processed events"],
          resources: ["https://restfulapi.net/"]
        }
      ],
      sampleQuestions: [
        {
          question: "How do you guarantee idempotent API processing on POST requests?",
          category: "Backend & DB",
          difficulty: "Medium",
          answer: "Clients supply an 'Idempotency-Key' header in the POST request. The server checks if a transaction with that key already completed in MongoDB. If found, it returns the cached response without re-executing. If not, it executes the operation inside an atomic session and stores the result.",
          tips: ["Mention MongoDB transaction sessions and unique index constraints"]
        }
      ]
    }
  },
  {
    _id: "demo-job-04",
    title: "Graduate Software Engineer (Foundations)",
    company: "Atlassian",
    category: "Fresher Job",
    location: "Mountain View, CA / Remote",
    workMode: "Hybrid",
    tags: ["React.js", "Node.js", "TypeScript", "Express"],
    description: "Join the core collaboration platform team enhancing Jira and Confluence workspaces. Focus on real-time sync, accessibility, and high performance.",
    deadline: "2026-12-30T23:59:59.000Z",
    eventDate: null,
    applicationUrl: "https://www.atlassian.com/company/careers",
    isDemo: true,
    prepIntelligence: {
      roadmap: [
        {
          week: 1,
          title: "Object-Oriented & Functional Design Principles",
          goal: "Master SOLID principles and clean code practices in TypeScript.",
          tasks: ["Write unit tests using mock dependencies", "Apply Dependency Inversion in service modules"],
          milestone: "High test-coverage modular utility library"
        },
        {
          week: 2,
          title: "Concurrent Data Structures & CRDTs",
          goal: "Understand how real-time collaborative editors resolve conflicts.",
          tasks: ["Study operational transformation vs CRDT basics", "Build simple collaborative text state demo"],
          milestone: "Conflict-free state synchronization prototype"
        },
        {
          week: 3,
          title: "Accessible Component Development",
          goal: "Build WCAG 2.1 AA compliant UI components.",
          tasks: ["Test keyboard navigation with screen reader", "Audit color contrast ratios with WCAG requirements"],
          milestone: "100% accessible dropdown and drawer components"
        },
        {
          week: 4,
          title: "Values Alignment & Leadership Interview",
          goal: "Reflect on Atlassian values: 'Open company, no bullshit', 'Build with heart and balance'.",
          tasks: ["Prepare concrete examples of open feedback and teamwork", "Practice clear technical explanation for non-engineers"],
          milestone: "Completed cultural and values interview rehearsal"
        }
      ],
      technicalTopics: [
        {
          topic: "Accessibility (a11y) in Modern Web Apps",
          summary: "Making rich web applications usable for everyone, including keyboard and screen reader users.",
          keyPoints: ["Use semantic HTML elements (<button>, <nav>, <header>) instead of click divs", "Manage focus with ref.current.focus() when opening and closing modals"],
          resources: ["https://www.w3.org/WAI/standards-guidelines/wcag/"]
        }
      ],
      sampleQuestions: [
        {
          question: "How do you ensure proper keyboard accessibility in complex single-page apps?",
          category: "JavaScript & Frameworks",
          difficulty: "Medium",
          answer: "Ensure all interactive elements are focusable with Tab, provide clear visible focus rings, handle Escape key to dismiss overlays, maintain logical tab-index ordering, and return focus to the trigger button when an overlay or drawer closes.",
          tips: ["Avoid tabindex values greater than 0"]
        }
      ]
    }
  }
];
