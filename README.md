# MLH-Inspired Opportunity & Interview Intelligence Platform

A complete, responsive full-stack web application for discovering hackathons, internships, and entry-level fresher roles, complete with structured 4-week preparation blueprints, core technical topics, curated screening Q&A, and interactive community testimonials.

Built inspired by the **Major League Hacking (mlh.com)** design language and community experience, featuring an original developer workstation illustration, subtle matte paper aesthetic (`#F7F7F7`), interactive drawer modals, Express REST API, MongoDB Mongoose integration, and resilient offline demonstration fallback data with real opportunities from MLH & Unstop.

---

## 🏗️ Architecture & Exact Directory Structure

```text
my-mlh-platform/
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── postcss.config.cjs
│   ├── tailwind.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── TopBanner.jsx
│       │   ├── Navbar.jsx
│       │   ├── HeroSection.jsx
│       │   ├── FilterAndSearch.jsx
│       │   ├── OpportunityGrid.jsx
│       │   ├── OpportunityCard.jsx
│       │   ├── PrepDrawerModal.jsx
│       │   ├── PostOpportunityModal.jsx
│       │   ├── OpportunityDetailModal.jsx
│       │   ├── CommunityThoughts.jsx
│       │   ├── TechStackBadge.jsx
│       │   └── Footer.jsx
│       ├── services/
│       │   └── api.js
│       └── data/
│           └── mockData.js
└── server/
    ├── package.json
    ├── server.js
    ├── seed.js
    ├── .env.example
    ├── config/
    │   └── db.js
    ├── models/
    │   └── Opportunity.js
    ├── controllers/
    │   └── opportunityController.js
    └── routes/
        └── opportunityRoutes.js
```

---

## 🎨 Visual Design System

Implemented with exact specified palette, grainy matte paper textures, and typography:
- **Page Background:** Matte paper white (`#F7F7F7` / `#FAFAFA`) with subtle grainy texture
- **Card & Surface Background:** Clean card white (`#FFFFFF`) with refined border contours (`#E2E8F0`)
- **Border Default / Hover:** `#E2E8F0` / `#00f0ff`
- **Announcement Banner:** `#dc2626`
- **Primary Cyan:** `#00f0ff`
- **Secondary Cyan:** `#00b4d8`
- **React Tag:** `#38bdf8`
- **Node.js Tag:** `#22c55e`
- **MongoDB Tag:** `#10b981`
- **Primary Text:** Slate 900 (`#0F172A`)
- **Secondary Text:** Slate 500 (`#64748B`)

---

## 🚀 Prerequisites

- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **npm:** v9.0.0 or higher
- **MongoDB:** (Optional) Local MongoDB daemon or MongoDB Atlas connection string. *If MongoDB is not running, the application automatically activates its offline demonstration fallback with all sample records intact!*

---

## 📦 Installation & Setup

### 1. Server Setup

Open a terminal in the `server` directory:

```bash
cd server
npm install
```

### 2. Environment Configuration

Copy the example `.env` file:

```bash
cp .env.example .env
```

Contents of `server/.env`:
```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mlh_opportunities
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### 3. Client Setup

Open a separate terminal in the `client` directory:

```bash
cd client
npm install
```

---

## ⚡ Running the Platform

### Start Backend API Server
In the `server` directory:

```bash
# Starts Express server on http://localhost:5000
npm start
# Or for live file watching:
npm run dev
```

### Start Frontend React Application
In the `client` directory:

```bash
# Starts Vite dev server on http://localhost:5173
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 🍃 MongoDB Seeding & Verification

### Optional Database Seeder
If you have MongoDB running locally or on Atlas:

```bash
cd server
npm run seed
```

### Verify Endpoints

1. **Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   *Returns server uptime, timestamp, and database connection status.*

2. **Fetch Opportunities:**
   ```bash
   curl "http://localhost:5000/api/opportunities?category=Hackathon&page=1&limit=9"
   ```

3. **Search by Keyword:**
   ```bash
   curl "http://localhost:5000/api/opportunities?search=React"
   ```

4. **Post Opportunity:**
   ```bash
   curl -X POST http://localhost:5000/api/opportunities \
     -H "Content-Type: application/json" \
     -d "{\"title\":\"MLH Hackathon 2026\",\"company\":\"Major League Hacking\",\"category\":\"Hackathon\",\"location\":\"Remote\",\"workMode\":\"Remote\",\"tags\":[\"React.js\",\"Node.js\"]}"
   ```

---

## 🛡️ Mock Data & Offline Fallback Behavior

- When MongoDB or the Express server is offline, the client frontend automatically activates the **Demo Mode** indicator badge in the search filter bar.
- Category filtering, real-time debounced search, pagination, and the interactive **Crack Prep Intelligence** slide-over drawer will continue functioning smoothly with 17 complete, deeply structured demonstration records including Unstop internships and hackathons.
- No white screen crashes or unhandled network errors.

---

## 📋 Features Checklist

- [x] Responsive announcement banner (`#dc2626`) linking to official MLH resources.
- [x] Navigation bar with original text brandmark `MLH OPPORTUNITIES & PREP` and functional `Post Opportunity` modal.
- [x] Two-column hero section with an isometric SVG & CSS developer workstation illustration.
- [x] Community Thoughts swipeable testimonial carousel matching MLH's homepage with drag, touch swipe, keyboard navigation, and avatar pickers.
- [x] Integrated real-world Unstop opportunities (onGrid Full Stack, Fango Tech Labs Cloud & Web, Flipkart GRiD, Walmart CodeHers, HackOn Amazon).
- [x] Interactive category filters (`Hackathons`, `Internships`, `Fresher Jobs`) + real-time debounced keyword search.
- [x] Responsive 3-column opportunity card grid with expired deadline tags and tags preview.
- [x] Polished slide-over **Prep Intelligence Drawer** with 3 navigable tabs:
  - 4-Week Step-by-Step Roadmap with interactive checklist tasks and milestones.
  - Core Technical Focus modules with expandable summaries and documentation links.
  - Screening & Interview Bank with expandable answers, difficulty pills, and interview tips.
- [x] Full keyboard navigation, `Escape` key listeners, and accessible contrast.
- [x] Comprehensive footer with track navigation and clear independent MLH-inspired disclaimer.
