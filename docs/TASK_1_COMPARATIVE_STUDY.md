# Task 1: Comparative Technology Study

**Course:** Advanced Web Development (AWD) — B.Tech Semester-5 (Winter 2026)  
**Institution:** ITM SLS BU, School of Computer Science, Engineering & Technology, Vadodara  
**Project:** Crackly (MLH-Inspired Opportunity & Prep Intelligence Platform)  
**Student Component:** Project-Based Learning (PBL) Final Viva-Voce Submission  

---

## Executive Summary

The **Crackly** platform is an end-to-end web system designed to bridge the gap between discovery and preparation for technical opportunities (hackathons, summer/winter internships, and entry-level fresher software engineering roles). Building this application required deliberate architectural and technological decisions across the frontend, backend, database layer, and authentication mechanisms.

This report delivers a rigorous comparative study across the four fundamental technology dichotomies specified in the syllabus:
1. **REST API vs. GraphQL** (API Architecture & Communication)
2. **MongoDB vs. MySQL** (Data Persistence & Schema Design)
3. **React vs. Angular** (Frontend Framework Architecture)
4. **JWT-Based vs. Session-Based Authentication** (Security & State Management)

---

## 1. REST API vs. GraphQL

### 1.1 Introduction
- **REST (Representational State Transfer):** An architectural style introduced by Roy Fielding in 2000 relying on standard HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) to perform CRUD operations on stateless resource URIs (e.g., `/api/opportunities`).
- **GraphQL:** An open-source data query and manipulation language developed by Facebook in 2012 (released 2015). It allows clients to define the structure of data required from a single endpoint (typically `/graphql`).

### 1.2 Key Features and Differences

| Feature | REST API (Express.js) | GraphQL (Apollo/Yoga) |
| :--- | :--- | :--- |
| **Endpoint Structure** | Multiple discrete endpoints (`/api/opportunities`, `/api/auth`, `/api/health`) | Single endpoint (`/graphql`) accepting POST queries |
| **Data Fetching** | Fixed payload structure determined by server controllers | Exact payload structure requested by client query |
| **Over-fetching & Under-fetching** | Common unless custom projection parameters are written | Completely eliminated at client level |
| **Caching Mechanism** | Native HTTP caching (`Cache-Control`, `ETag`, `304 Not Modified`, browser, CDN) | Complex client-side caching (requires Apollo Cache / Normalized Cache) |
| **File Uploads** | Simple, native multipart/form-data support via standard middleware | Requires multipart request specifications or external presigned URLs |
| **Tooling & Learning Curve** | Universal, zero learning curve, standard Postman/curl testing | Requires learning schema definition language (SDL), resolvers, and client libraries |

### 1.3 Advantages and Limitations

#### REST API
- **Advantages:**
  - Standardized status codes (`200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `404 Not Found`).
  - Native, seamless HTTP caching on CDNs and browser proxies.
  - Granular rate limiting per endpoint using standard Express middleware (`express-rate-limit`).
  - Lightweight with minimal dependencies and zero client-bundle overhead.
- **Limitations:**
  - Over-fetching when clients only need a card summary but receive the full object.
  - Multiple round-trips if disparate resources need to be aggregated without specific endpoints.

#### GraphQL
- **Advantages:**
  - Solves over-fetching and under-fetching with typed schemas.
  - Great for mobile clients with low bandwidth.
  - Strongly typed contract between client and backend.
- **Limitations:**
  - High operational complexity and resolver overhead.
  - All responses typically return HTTP `200 OK`, making status monitoring and reverse-proxy caching difficult.
  - Susceptible to Denial of Service via deeply nested recursive queries unless query complexity analyzers are installed.

### 1.4 Suitable Use Cases
- **REST:** Content-driven sites, CRUD platforms, public developer APIs, microservices with CDN edge caching, and student/production projects prioritizing simplicity and resilience.
- **GraphQL:** Multi-platform ecosystems (iOS, Android, Web) where heterogeneous clients need vastly different subsets of complex, interconnected relational data graphs.

### 1.5 Justified Conclusion for Crackly
> **Decision: REST API (Express.js)**  
> **Rationale:** Crackly serves structured lists of opportunities, filters by category, and displays slide-over details. The endpoints are clean, stateless, and benefit directly from HTTP status codes, standard URL-based query filtering (`/api/opportunities?category=Hackathon&search=React`), and edge rate limiting. REST allowed us to implement an offline fallback architecture with standard Axios interceptors that seamlessly fall back to local mock data when the server is unreachable.

---

## 2. MongoDB vs. MySQL

### 2.1 Introduction
- **MongoDB:** A document-oriented NoSQL database that stores data in flexible, JSON-like BSON (Binary JSON) documents with dynamic schemas.
- **MySQL:** An open-source Relational Database Management System (RDBMS) based on Structured Query Language (SQL), organizing data into strict tables, columns, rows, and foreign-key relations with ACID compliance.

### 2.2 Key Features and Differences

| Feature | MongoDB (Mongoose) | MySQL (Relational) |
| :--- | :--- | :--- |
| **Data Model** | Hierarchical document trees (BSON / JSON) | Tabular rows and columns with fixed schemas |
| **Schema Flexibility** | Dynamic / schema-less (enforced at app level via Mongoose/Joi) | Rigid schema requiring DDL migrations (`ALTER TABLE`) |
| **Relationships** | Embedded subdocuments or `$lookup` references | Strict foreign key constraints and SQL `JOIN` operations |
| **Scaling** | Horizontal scaling via native sharding and replica sets | Vertical scaling (scaling up hardware) or complex read replication |
| **Transactions** | Multi-document ACID transactions supported since v4.0 | Mature, battle-tested ACID transactions out of the box |
| **Query Language** | Mongoose object query syntax & Aggregation Pipelines | Standard Declarative SQL syntax |

### 2.3 Advantages and Limitations

#### MongoDB
- **Advantages:**
  - Naturally models nested objects (e.g., our 4-week preparation roadmap, technical topics array, and interview Q&A bank inside an opportunity).
  - High write throughput and flexible evolution without schema migration downtime.
  - Native text indexing and regex matching across multiple document fields (`title`, `company`, `tags`).
- **Limitations:**
  - Higher memory usage due to denormalized data and key storage per document.
  - Not optimal for complex many-to-many joins across multiple domain boundaries.

#### MySQL
- **Advantages:**
  - Strong data integrity through referential integrity constraints (`FOREIGN KEY`, `ON DELETE CASCADE`).
  - Zero data duplication via 3rd Normal Form (3NF).
  - Excellent for financial ledger transactions and enterprise ERP systems.
- **Limitations:**
  - Schema alterations on large tables can lock tables and cause downtime.
  - Storing polymorphic nested structures (such as dynamic roadmap milestones and varied interview questions) requires 5+ joined tables or raw JSON columns.

### 2.4 Suitable Use Cases
- **MongoDB:** Content management systems, job boards, e-commerce product catalogs with polymorphic attributes, real-time logging, and hierarchical educational curricula.
- **MySQL:** Banking platforms, accounting ledgers, inventory systems with strict transactional atomicity, and multi-tenant SaaS with complex relational models.

### 2.5 Justified Conclusion for Crackly
> **Decision: MongoDB (Mongoose ODM)**  
> **Rationale:** In Crackly, each opportunity contains a deeply nested **Prep Intelligence** object comprising:
> - A 4-week roadmap (`roadmap: [{ week, title, goal, tasks, milestone }]`)
> - Core technical modules (`technicalTopics: [{ topic, summary, keyPoints, resources }]`)
> - Interview Q&A (`sampleQuestions: [{ question, category, difficulty, answer, tips }]`)
> In MySQL, retrieving this single opportunity card would require querying across 4 separate tables using multi-table SQL `JOIN`s, increasing query latency. MongoDB retrieves the entire opportunity and its prep blueprint in a single fast, indexed read operation (`Opportunity.findById(id).lean()`), which perfectly aligns with our application's access patterns.

---

## 3. React vs. Angular

### 3.1 Introduction
- **React:** A declarative, component-based JavaScript library for building user interfaces, maintained by Meta. It focuses exclusively on the View layer of the MVC pattern and leverages a Virtual DOM.
- **Angular:** A comprehensive, opinionated TypeScript-based framework maintained by Google. It includes built-in routing, state management, HTTP clients, form validation, and dependency injection out of the box.

### 3.2 Key Features and Differences

| Feature | React 18 | Angular (v16+) |
| :--- | :--- | :--- |
| **Type / Scope** | Lightweight UI Library (View layer) | Complete Full-Stack Frontend Framework |
| **Language** | JavaScript (ES6+) or TypeScript with JSX | TypeScript mandatory with HTML templates |
| **DOM Manipulation** | Virtual DOM (reconciliation and fiber tree) | Real DOM with Incremental DOM compilation |
| **Architecture** | Unidirectional data flow, functional components & hooks | Component-Service-Module / Signals architecture with Dependency Injection |
| **State Management** | Built-in React Hooks (`useState`, `useEffect`, `useCallback`, Context API) or external (Zustand, Redux) | RxJS Observables, Signals, and NgRx |
| **Bundle Size & Speed** | Very lightweight (~40KB runtime), blazing fast Vite HMR | Heavier bundle footprint due to framework runtime |

### 3.3 Advantages and Limitations

#### React
- **Advantages:**
  - Unmatched ecosystem and developer flexibility.
  - JSX enables writing declarative markup with the full expressive power of JavaScript.
  - Vite integration provides instant Hot Module Replacement (sub-50ms HMR).
  - Seamless composition for animated slide-overs, modals, and custom interactive SVGs.
- **Limitations:**
  - Requires developers to select third-party libraries for routing, forms, and network requests.
  - Rapid evolution means multiple ways to implement the same feature (classes vs. hooks).

#### Angular
- **Advantages:**
  - Highly standardized architecture; every enterprise Angular project follows the exact same conventions.
  - Built-in form validation, HTTP client, and end-to-end testing utilities.
  - Powerful dependency injection system for enterprise applications.
- **Limitations:**
  - Steep learning curve (RxJS reactive streams, decorators, TypeScript interfaces, modules/signals).
  - Boilerplate-heavy code for small to medium projects.
  - Slower initial compile times and heavier runtime footprint.

### 3.4 Suitable Use Cases
- **React:** Modern web apps, interactive developer portals, dashboard interfaces, rapid prototyping, and applications requiring custom animated components.
- **Angular:** Large-scale enterprise intranets, government banking portals with massive cross-functional teams where strict uniformity and opinionated structure are required.

### 3.5 Justified Conclusion for Crackly
> **Decision: React 18 + Vite**  
> **Rationale:** Crackly's user experience revolves around dynamic, interactive components: an isometric SVG workstation hero, debounced real-time opportunity filtering, responsive drawer slide-over modals, and swipeable testimonial carousels. React's functional component model and hook ecosystem (`useState`, `useCallback`, `useEffect`) allowed us to cleanly manage UI state, drawer focus traps, and keyboard listeners with zero framework overhead. Combined with Vite, the frontend builds in under 5 seconds.

---

## 4. JWT-Based Authentication vs. Session-Based Authentication

### 4.1 Introduction
- **JWT (JSON Web Token) Authentication:** A stateless authentication mechanism where user identity and claims are digitally signed into a compact, URL-safe base64-encoded token (`Header.Payload.Signature`) and verified by the server using a secret key without querying a session database.
- **Session-Based Authentication:** A stateful mechanism where the server authenticates credentials, creates a session object in server memory or a session store (Redis / DB), and sends a session ID cookie (`connect.sid`) to the client. On every request, the server looks up the session in its store.

### 4.2 Key Features and Differences

| Feature | JWT-Based Authentication | Session-Based Authentication |
| :--- | :--- | :--- |
| **Server State** | **Stateless:** Server stores nothing; verifies signature cryptographically | **Stateful:** Server stores active session IDs in memory or Redis |
| **Storage Location** | Client storage (`localStorage`, `sessionStorage`, or HttpOnly cookie) | Client browser cookie (`HttpOnly`, `SameSite`, `Secure`) |
| **Scalability** | Horizontally scalable across server clusters without shared session stores | Requires sticky sessions or shared central store (e.g., Redis cluster) |
| **Token Revocation** | Difficult before token expiration (requires token blacklisting or short TTLs) | Instant: deleting the session record immediately invalidates client access |
| **Payload Size** | Larger (~300–800 bytes) sent in `Authorization: Bearer <token>` header | Tiny (a short 32-character session ID string) |
| **Cross-Domain / Mobile** | Native support across mobile apps, SPAs, and decoupled APIs | Requires complex CORS cookie credentials (`credentials: 'include'`) |

### 4.3 Advantages and Limitations

#### JWT Authentication
- **Advantages:**
  - Truly decoupled: perfect for modern Single Page Applications (React) communicating with REST APIs.
  - Scalable: the backend verifies cryptographic signatures without database lookups on every request.
  - Contains useful non-sensitive claims (user ID, role, name) directly accessible by the client for UI personalization.
- **Limitations:**
  - Cannot be immediately revoked without maintaining a Redis blacklist.
  - Vulnerable to XSS if stored insecurely in `localStorage` (mitigated by HttpOnly cookies or memory storage).

#### Session-Based Authentication
- **Advantages:**
  - Immediate revocation: logging out or revoking user access terminates the session instantly.
  - Protected against XSS if stored in `HttpOnly` cookies.
- **Limitations:**
  - Introduces a state bottleneck on the backend; if server instances restart, users are logged out unless Redis is configured.
  - Susceptible to Cross-Site Request Forgery (CSRF) unless anti-CSRF tokens (`csurf`) are implemented.

### 4.4 Suitable Use Cases
- **JWT:** RESTful APIs, Single Page Applications (React/Vue), mobile backends, microservice architectures, and multi-service single sign-on (SSO).
- **Session-based:** Server-rendered multi-page applications (Next.js SSR, Django, Laravel, Ruby on Rails) with traditional form submissions.

### 4.5 Justified Conclusion for Crackly
> **Decision: JWT-Based Authentication (Stateless)**  
> **Rationale:** Crackly has a completely decoupled frontend (Vite React app on port 5173) and backend (Express API on port 5000). JWT authentication allows our React client to authenticate via standard `Authorization: Bearer <token>` headers without dealing with third-party cookie restrictions or CORS credential blockades. Furthermore, it allows stateless horizontal scaling of the Express server without needing a dedicated Redis session cluster for university project evaluation.

---

## 5. Summary Matrix of Architectural Decisions

| Layer | Chosen Technology | Primary Evaluated Alternative | Key Decision Driver for Crackly |
| :--- | :--- | :--- | :--- |
| **API Architecture** | **REST API** | GraphQL | Simpler caching, native HTTP error semantics, resilient offline fallback |
| **Database** | **MongoDB (Mongoose)** | MySQL | Native storage of hierarchical 4-week roadmaps and Q&A subdocuments |
| **Frontend** | **React 18 + Vite** | Angular | Rapid compilation, component flexibility for animated drawers and SVG hero |
| **Authentication** | **JWT (Stateless)** | Session Cookies | Decoupled client-server architecture, zero session store overhead |

---
*Report prepared for ITM SLS BU AWD B.Tech Sem-5 PBL Viva-Voce Examination.*
