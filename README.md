# Crackly — Global Hackathon Winning Presentations & Rubrics Archive

> **Academic Project Submission**: Advanced Web Development (AWD) — B.Tech Semester 5 (Winter 2026)  
> **Institution**: ITM SLS BU, School of Computer Science, Engineering & Technology, Vadodara  
> **Evaluation Component**: Project-Based Learning (PBL) Final Viva-Voce Examination

---

## 💡 Overview

**Crackly** is a curated web platform designed to help students, developers, and hackathon participants study real winning presentations from major global hackathons (ETHIndia, PennApps, HackMIT, CalHacks, Hack The North, NASA Space Apps).

Unlike generic project repositories, Crackly focuses specifically on **why projects won**:
- **Winning Presentations Archive**: Browse and filter winning pitch decks by category (AI & ML, Web3 & Blockchain, Developer Tools, Social Good & Climate, Healthcare & Biotech).
- **Why They Won (Winning Pointers)**: Key breakdown of pitch strategies, live demo hooks, judge defenses, and narrative structures.
- **Official Judging Rubrics & Score Breakdown**: Interactive tables detailing each evaluation criterion (Technical Complexity, Innovation, Real-World Impact, Pitch Quality, UI/UX), max scores, awarded scores, and specific judge remarks.
- **Resource Deep-Links**: Direct links to slide decks, demo videos, and GitHub repositories.
- **Instant Search & Category Filters**: Real-time debounced search across project names, hackathons, and technology tags.
- **Defensive Offline Architecture**: Built-in mock data fallback ensures the client functions smoothly even when the backend or MongoDB is offline.

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | **React.js** | `^18.3.1` | Component-driven declarative single-page application |
| **Build Tool** | **Vite** | `^5.2.11` | Sub-second Hot Module Replacement (HMR) and optimized bundling |
| **Styling** | **Tailwind CSS** | `^3.4.4` | Utility-first responsive design system |
| **Icons** | **Lucide React** | `^0.395.0` | Accessible SVG iconography |
| **Backend API** | **Node.js + Express.js** | `^4.19.2` | RESTful API server with modular routing and middleware |
| **Database** | **MongoDB (Mongoose)** | `^8.4.0` | Document-oriented NoSQL storage for presentations and users |
| **Security 1** | **Helmet.js** | `^7.1.0` | HTTP security headers (CSP, HSTS, X-Frame-Options, noSniff) |
| **Security 2** | **bcrypt / bcryptjs** | `^6.0.0` | Cryptographic password hashing with adaptive salt factor (10) |
| **Security 3** | **Joi** | `^18.3.1` | Schema validation and input sanitization middleware |
| **Authentication** | **jsonwebtoken (JWT)** | `^9.0.3` | Stateless token-based authorization and RBAC |

---

## 📁 Clean & Lean Project Structure

```
Crackly/
├── client/                              # React 18 SPA (Vite)
│   ├── src/
│   │   ├── components/                  # Focused UI Components
│   │   │   ├── Navbar.jsx               # Brand header with AWD PBL badge
│   │   │   ├── CategoryFilter.jsx       # Category selector pills and search bar
│   │   │   ├── PresentationCard.jsx     # Presentation summary card with preview
│   │   │   └── PresentationModal.jsx    # Full modal with rubrics table & insights
│   │   ├── data/
│   │   │   └── mockData.js              # Comprehensive fallback presentation dataset
│   │   ├── services/
│   │   │   └── api.js                   # Axios client with automatic offline fallback
│   │   ├── App.jsx                      # Main app container & state management
│   │   ├── index.css                    # Clean Tailwind base & scrollbar styles
│   │   └── main.jsx                     # React DOM root entry point
│   ├── index.html                       # HTML5 entry with custom Crackly SVG favicon
│   ├── package.json                     # Lean dependencies (no unused libraries)
│   ├── tailwind.config.js               # Clean Tailwind configuration
│   └── vite.config.js                   # Vite dev server with proxy to :5000
│
├── server/                              # Node.js + Express REST API
│   ├── config/
│   │   └── db.js                        # MongoDB connection manager with fail-fast timeout
│   ├── controllers/
│   │   ├── authController.js            # User registration & login (bcrypt + JWT)
│   │   └── presentationController.js   # Presentation queries, regex search & fallback
│   ├── data/
│   │   └── presentationsMock.js         # Server-side seed & offline fallback data
│   ├── middleware/
│   │   ├── auth.js                      # JWT verification & role authorization (RBAC)
│   │   └── validate.js                  # Generic Joi request validation middleware
│   ├── models/
│   │   ├── Presentation.js              # Mongoose schema for presentations & rubrics
│   │   └── User.js                      # User schema with bcrypt pre-save hashing
│   ├── routes/
│   │   ├── authRoutes.js                # /api/auth routes (register, login, me)
│   │   └── presentationRoutes.js        # /api/presentations routes (GET, POST)
│   ├── validations/
│   │   ├── authValidation.js            # Joi schemas for registration & login
│   │   └── presentationValidation.js    # Joi schemas for presentations & queries
│   ├── .env.example                     # Environment variable template
│   ├── package.json                     # Server scripts & dependencies
│   └── server.js                        # Express server entry point (Helmet, CORS, rate-limit)
│
├── docs/                                # AWD Viva-Voce Examination Reports
│   ├── TASK_1_COMPARATIVE_STUDY.md      # Task 1: REST vs GraphQL, Mongo vs MySQL, React vs Angular, JWT vs Sessions
│   ├── TASK_2_SECURITY_AUDIT.md         # Task 2: Security Audit Report (NoSQL injection, XSS, Weak Auth, Inadequate Input)
│   ├── TASK_3_SECURITY_LIBRARIES_DEMO.md# Task 3: Demonstration & Justification of Helmet.js, bcrypt, and Joi
│   └── VIVA_QUESTION_BANK.md            # Viva-voce Q&A preparation guide for evaluators
│
├── Task for B.Tech Semester-5 AWD.pdf   # Official university assignment specification
├── .gitignore                           # Git ignore rules
└── README.md                            # Project documentation
```

---

## 🚀 Running the Project Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB** *(optional)*: Local MongoDB instance or MongoDB Atlas URI (frontend and server include graceful fallback datasets when MongoDB is offline).

### 1. Frontend Setup (Client)
```bash
# Navigate to the client folder
cd client

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
The client will be running at: **http://localhost:5173**

### 2. Backend Setup (Server)
```bash
# In a separate terminal, navigate to the server folder
cd server

# Install dependencies
npm install

# (Optional) Copy environment template and adjust settings
cp .env.example .env

# Start the backend API server
npm start
```
The server will be running at: **http://localhost:5000**
- Health Check: `http://localhost:5000/api/health`
- Presentations API: `http://localhost:5000/api/presentations`

---

## 📚 AWD Regular Final Viva-Voce Deliverables

All deliverables requested in the official assignment specification (`Task for B.Tech Semester-5 AWD.pdf`) are documented in the `docs/` folder:

| Task | Title | Documentation File | Key Highlights |
| :---: | :--- | :--- | :--- |
| **Task 1** | **Comparative Technology Study** | [`docs/TASK_1_COMPARATIVE_STUDY.md`](docs/TASK_1_COMPARATIVE_STUDY.md) | Exhaustive comparative reports covering: 1. REST API vs. GraphQL, 2. MongoDB vs. MySQL, 3. React vs. Angular, 4. JWT vs. Session Authentication, with justified conclusions for Crackly. |
| **Task 2** | **Security Audit Report** | [`docs/TASK_2_SECURITY_AUDIT.md`](docs/TASK_2_SECURITY_AUDIT.md) | Full audit analyzing NoSQL injection, XSS, insecure password storage, weak auth, input validation, and DoS with CVSS risk classifications and implemented mitigations. |
| **Task 3** | **Security Libraries Implementation** | [`docs/TASK_3_SECURITY_LIBRARIES_DEMO.md`](docs/TASK_3_SECURITY_LIBRARIES_DEMO.md) | In-depth technical justification, code snippets, syntax, and live execution results for **Helmet.js**, **bcrypt**, and **Joi**. Run live via `npm run demonstrate:security`. |
| **Presentation** | **Viva-Voce PPT Slide Deck** | [`docs/AWD_Final_Viva_Presentation_Crackly.pptx`](docs/AWD_Final_Viva_Presentation_Crackly.pptx) | 10-slide 16:9 executive presentation covering architecture, Tasks 1–3, security demonstrations, and outcomes. |
| **Word Doc** | **Official Submission Document** | [`docs/AWD_Final_Viva_Submission_Crackly.docx`](docs/AWD_Final_Viva_Submission_Crackly.docx) | Comprehensive formatted submission document meeting the university word document requirement. |
| **Bonus** | **Viva-Voce Question Bank** | [`docs/VIVA_QUESTION_BANK.md`](docs/VIVA_QUESTION_BANK.md) | Rapid-fire oral exam questions and model answers addressing common questions asked during evaluation. |

---

## 🔒 Security Implementation Highlights

1. **Helmet.js**: Configures critical HTTP response headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Content-Security-Policy`, `Strict-Transport-Security`, and removes `X-Powered-By`).
2. **bcrypt**: Passwords hashed with an adaptive work factor (10 salt rounds) via Mongoose `pre('save')` hook; verified in constant time via `bcrypt.compare`.
3. **Joi Schema Validation**: Validates all incoming payloads before processing (`stripUnknown: true`), rejecting injected fields and URL pseudoprotocols (`javascript:`).
4. **Rate Limiting**: Protects against DoS abuse by restricting clients to 200 requests per 15-minute window (`express-rate-limit`).
5. **CORS Restrictions**: Constrains cross-origin access to the configured frontend host (`http://localhost:5173`).

---

## 👨‍💻 Submission Details

- **Academic Year**: 2026-2027 (Winter 2026)
- **Program**: B.Tech Computer Science and Engineering (Semester 5)
- **Subject**: Advanced Web Development (AWD)
- **Component**: Project-Based Learning (PBL) Viva-Voce
- **University**: ITM SLS BU, Vadodara
