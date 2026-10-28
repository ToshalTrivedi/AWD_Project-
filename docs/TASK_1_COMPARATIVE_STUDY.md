# Advanced Web Development (AWD) — Task 1: Comparative Technology Study

**Course**: B.Tech Semester-5 (Winter 2026)  
**Institution**: ITM SLS BU, School of Computer Science, Engineering & Technology, Vadodara  
**Project**: Crackly — Global Hackathon Winning Presentations & Rubrics Archive  
**Technology Stack**: React 18, Vite, Tailwind CSS, Express.js, Node.js, MongoDB (Mongoose)

---

## Executive Summary

As part of the Project-Based Learning (PBL) submission in Advanced Web Development (AWD), this comparative report investigates and contrasts four core architectural decisions relevant to modern full-stack web applications and specifically justifies the technical selections made for **Crackly**:

1. **REST API vs. GraphQL** (API Architecture)
2. **MongoDB vs. MySQL** (Database Paradigm: Document NoSQL vs. Relational SQL)
3. **React vs. Angular** (Frontend Framework / Library Paradigm)
4. **JWT-Based Authentication vs. Session-Based Authentication** (Identity & Session Management)

Each study is analyzed across:
- Architectural introduction and technical fundamentals
- Key features and comparison matrix
- Advantages and limitations
- Suitable industry use cases
- Justified conclusion explaining why the chosen technology is best suited for Crackly

---

## 1. REST API vs. GraphQL

### 1.1 Introduction
- **REST (Representational State Transfer)**: An architectural style established by Roy Fielding in 2000 that relies on standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) to perform stateless CRUD operations on identifiable URI resources (e.g., `/api/presentations/:id`). Communication standardly exchanges JSON payloads.
- **GraphQL**: An open-source query language and runtime developed by Meta (Facebook) in 2012 (released 2015). Instead of multiple fixed endpoint URIs, GraphQL exposes a single HTTP endpoint (typically `/graphql`) where clients explicitly describe the shape and depth of the requested data using a type system and schema.

### 1.2 Key Features & Technical Comparison

| Feature | REST API | GraphQL |
| :--- | :--- | :--- |
| **Endpoint Structure** | Multiple resource-specific URIs (`/presentations`, `/auth`) | Single endpoint (`/graphql`) |
| **HTTP Methods** | Standard semantic verbs (`GET`, `POST`, `PUT`, `DELETE`) | Primarily HTTP `POST` for queries & mutations |
| **Data Fetching Precision** | Fixed server response shape; prone to Over-fetching or Under-fetching | Client requests exact fields; eliminates over/under-fetching |
| **Network Round-Trips** | May require chained round-trips for nested resources | Single round-trip for complex nested graphs |
| **Caching Mechanism** | Built-in HTTP caching (`ETag`, `Cache-Control`, CDNs, reverse proxies) | Complex client-side caching (Apollo InMemoryCache, normalized cache by `id`) |
| **Learning Curve & Tooling** | Low; native browser `fetch` / `axios` support; ubiquitous tooling | Moderate-High; requires schema definitions, resolvers, schema stitching |
| **File Uploads** | Trivially handled via standard `multipart/form-data` | Requires specialized specifications (GraphQL multipart request spec) |
| **Error Handling** | Standard HTTP status codes (`200`, `400`, `401`, `404`, `500`) | Usually returns HTTP `200 OK` with errors array inside JSON payload |

### 1.3 Advantages & Limitations

#### REST API
- **Advantages**:
  - Leverages native HTTP features (status codes, caching headers, proxies, CDNs).
  - Straightforward monitoring, rate-limiting, and web application firewall (WAF) rule configuration.
  - Minimal client overhead; works out of the box with `fetch()` without bulky client libraries.
  - Predictable security surface area with uniform route-level middleware.
- **Limitations**:
  - Over-fetching: Endpoints return entire objects even when only a few fields are needed.
  - Under-fetching: Related records may require sequential requests (e.g., fetch presentation, then fetch author details).
  - Endpoint proliferation: Rapid versioning can lead to redundant route maintenance.

#### GraphQL
- **Advantages**:
  - Declarative client querying avoids extraneous network payload on low-bandwidth mobile networks.
  - Strongly typed schema serves as a self-documenting contract between teams.
  - Built-in subscriptions for real-time bi-directional streaming over WebSockets.
- **Limitations**:
  - High operational complexity: Query depth limiting, query complexity scoring, and DOS protection are required.
  - Standard HTTP caching is lost because all queries are sent via `POST` to a single URL.
  - The "N+1 query problem" arises in resolvers unless DataLoader batching is configured.

### 1.4 Suitable Use Cases
- **REST**: Content portals, public developer APIs, microservices with clear resource boundaries, lightweight web apps, systems heavily reliant on CDN edge caching.
- **GraphQL**: Complex dashboards aggregating data from multiple microservices, mobile apps with constrained bandwidth, platforms with deeply nested graph relationships (e.g., social networks, collaborative workspaces).

### 1.5 Justified Conclusion for Crackly
**Selected Technology**: **REST API**  
**Justification**:  
Crackly is a curated archive where clients browse, search, and inspect hackathon presentations and judging rubrics. The primary access pattern is deterministic:
1. `GET /api/presentations` (fetches cards with search and category filters).
2. `GET /api/presentations/:id` (retrieves the complete presentation, pointers, and rubrics array).
3. `POST /api/presentations` (submits a new curated presentation).

For Crackly, REST provides:
- Simplicity and speed: Direct routing using Express.js without the overhead of GraphQL schemas and resolvers.
- Seamless HTTP caching and standard status codes (`200`, `400`, `404`, `500`).
- Easy integration with standard security middleware (Helmet, rate-limiting, Joi input validation).
- Zero third-party client weight: The React frontend uses a lean HTTP client with instantaneous offline fallback capabilities.

---

## 2. MongoDB vs. MySQL

### 2.1 Introduction
- **MongoDB**: A leading distributed, open-source document-oriented NoSQL database. MongoDB represents data as flexible, schema-free JSON-like BSON (Binary JSON) documents. Collections do not enforce uniform columns across records, allowing dynamic and nested hierarchical data modeling.
- **MySQL**: A mature, open-source Relational Database Management System (RDBMS) based on Structured Query Language (SQL) and relational algebra. MySQL stores data in fixed rows and columns across tables, enforcing strict schema definitions, referential integrity (foreign keys), and ACID transactions through engines like InnoDB.

### 2.2 Key Features & Technical Comparison

| Feature | MongoDB (NoSQL) | MySQL (Relational SQL) |
| :--- | :--- | :--- |
| **Data Model** | Document-based (BSON/JSON); nested arrays & subdocuments | Table-based (Rows, Columns, Foreign Key relations) |
| **Schema Flexibility** | Dynamic / schema-optional; schema enforced at application layer via Mongoose | Rigid, predefined schema; schema alterations require `ALTER TABLE` migrations |
| **Relationships** | Embedded documents (denormalization) or Object ID references | Normalized tables with Foreign Keys and `JOIN` operations |
| **Scalability** | Horizontal scaling via native sharding and replica sets | Traditionally vertical scaling; complex sharding mechanisms |
| **Transactions** | Multi-document ACID transactions supported since v4.0 | Fully ACID compliant by default with InnoDB engine |
| **Query Language** | MongoDB Query Language (MQL) with rich Aggregation Framework | Structured Query Language (SQL) with standardized syntax |
| **Indexing** | B-Tree indexes, compound, multikey (array), text, and geospatial | B-Tree indexes, unique, full-text, and clustered primary keys |
| **Complex Queries** | High throughput for read/write on embedded trees; slow multi-collection lookups | Highly optimized for complex multi-table joins and analytical aggregations |

### 2.3 Advantages & Limitations

#### MongoDB
- **Advantages**:
  - Natural fit for JavaScript/Node.js: Documents map directly to JavaScript objects and JSON.
  - Native support for nested arrays (e.g., `whyTheyWon: [String]`, `rubrics: [{ parameter, maxScore, scoreAwarded, remarks }]`).
  - High write throughput and zero-downtime schema evolution when fields are added or modified.
  - Flexible semi-structured data handling.
- **Limitations**:
  - Memory consumption is higher due to duplicated key names across documents.
  - Multi-collection `$lookup` joins have performance overhead compared to relational SQL joins.
  - Requires diligent application-level validation (e.g., Mongoose schemas + Joi) to avoid data inconsistency.

#### MySQL
- **Advantages**:
  - Uncompromising data consistency and referential integrity via foreign key constraints (`ON DELETE CASCADE`).
  - Highly optimized joins across normalized tables.
  - Standardized ANSI SQL with decades of tooling, mature ORMs (Prisma, Sequelize, TypeORM), and DBAs.
- **Limitations**:
  - Storing nested variable structures requires either separate join tables (e.g., `rubrics`, `pointers`, `tags`) or JSON column types with limited ergonomics.
  - Schema migrations on large production tables can lock tables and cause operational friction.

### 2.4 Suitable Use Cases
- **MongoDB**: Content management systems, product catalogs with varying attributes, event logging, prototyping, hierarchical data structures, modern MERN-stack web applications.
- **MySQL**: Financial transaction ledgers, inventory systems with strict accounting requirements, relational enterprise ERPs/CRMs with deep relational constraints.

### 2.5 Justified Conclusion for Crackly
**Selected Technology**: **MongoDB (with Mongoose ODM)**  
**Justification**:  
Crackly models winning presentations with inherently nested, document-centric structures:
- Each presentation contains an array of string pointers (`whyTheyWon`).
- Each presentation contains an array of scored rubric criteria (`rubrics`: parameter, maxScore, scoreAwarded, remarks).
- Each presentation contains variable tags (`tags`: AI, Web3, DevTools, etc.).

In MySQL, storing a presentation would necessitate 4 normalized tables (`presentations`, `presentation_rubrics`, `presentation_pointers`, `presentation_tags`) requiring three table joins on every fetch. In MongoDB, the entire presentation entity is stored as a single cohesive BSON document retrieved in a single \(O(1)\) read operation. Coupled with Mongoose and an in-memory fallback mock dataset, MongoDB delivers peak performance, ergonomic development, and clean alignment with JavaScript object paradigms.

---

## 3. React vs. Angular

### 3.1 Introduction
- **React**: An open-source JavaScript library developed by Meta for building dynamic user interfaces based on component composition. React employs a declarative programming paradigm, a lightweight Virtual DOM (VDOM), and JSX syntax. It functions as the "View" layer and relies on a rich ecosystem for routing, state, and utilities.
- **Angular**: A comprehensive, enterprise-grade TypeScript-based frontend platform and framework maintained by Google. Angular is an opinionated, batteries-included framework that includes built-in routing, forms validation, HTTP clients, dependency injection, and CLI scaffolding out of the box.

### 3.2 Key Features & Technical Comparison

| Feature | React | Angular |
| :--- | :--- | :--- |
| **Type / Paradigm** | UI Library; Unopinionated | Full Application Framework; Highly Opinionated |
| **Language** | JavaScript (ES6+) or TypeScript; JSX syntax | TypeScript by default; HTML templates with custom directives |
| **DOM Manipulation** | Virtual DOM (diffing algorithm) | Incremental DOM / Signals (reactive state primitives) |
| **Architecture** | Component-driven; functional components with Hooks | Component-, Module-, and Service-driven with Dependency Injection |
| **Data Binding** | One-way data binding (predictable top-down data flow) | Two-way data binding (`[(ngModel)]`) and one-way binding |
| **Bundle Size & Overhead** | Extremely lean core (~40 KB minified + gzipped) | Larger initial bundle (~120–200 KB) due to full framework runtime |
| **Build Tooling** | Vite (lightning-fast ES modules), Next.js, or Webpack | Angular CLI (Webpack / esbuild) with strict compilation |
| **State Management** | Built-in React Hooks (`useState`, `useEffect`, `useCallback`) | RxJS Observables, Signals, NgRx store |

### 3.3 Advantages & Limitations

#### React
- **Advantages**:
  - Minimal boilerplate: Functional components and Hooks (`useState`, `useCallback`) produce concise code.
  - Fast developer feedback: Vite provides sub-second Hot Module Replacement (HMR).
  - Unmatched ecosystem and flexibility: Developers select best-of-breed libraries (Tailwind CSS, Lucide Icons, Axios).
  - Huge developer community and talent pool.
- **Limitations**:
  - Fast-moving ecosystem requires developers to make architectural choices (routing, styling, build tool).
  - Managing state without re-render cascades requires deliberate memoization (`useCallback`, `useMemo`).

#### Angular
- **Advantages**:
  - Consistent architectural standards across enterprise teams.
  - Complete toolset included: Form validation, HttpClient, RxJS, routing.
  - Robust dependency injection facilitates unit testing of enterprise services.
- **Limitations**:
  - Steep learning curve (TypeScript, Decorators, RxJS observables, Modules, Signals).
  - High boilerplate for simple to medium applications.
  - Heavier build and runtime footprints.

### 3.4 Suitable Use Cases
- **React**: Modern dynamic web applications, single-page portals, dashboards, content archives, startups and agile projects prioritizing fast iteration and clean UI.
- **Angular**: Large-scale enterprise suites, banking and insurance software with large engineering teams requiring strict standardization and built-in enterprise tooling.

### 3.5 Justified Conclusion for Crackly
**Selected Technology**: **React 18 (with Vite & Tailwind CSS)**  
**Justification**:  
Crackly is designed to provide an uncluttered, responsive user experience for exploring hackathon pitch decks and rubrics:
- React's functional component architecture enables modular, decoupled UI components: `Navbar`, `CategoryFilter`, `PresentationCard`, and `PresentationModal`.
- Native hooks (`useState`, `useEffect`, `useCallback`) handle instant debounced search filtering and category selection with zero external state library bloat.
- Paired with Vite, the production bundle is under 80 KB gzipped, loading in sub-second times on any device.
- Angular’s heavy dependency injection and RxJS stream pipelines would introduce unnecessary overhead for this application.

---

## 4. JWT-Based Authentication vs. Session-Based Authentication

### 4.1 Introduction
- **JWT (JSON Web Token) Authentication**: A stateless, token-based authentication mechanism standardized by RFC 7519. After a user authenticates with credentials, the server generates a cryptographically signed compact string comprising three Base64URL-encoded parts: Header, Payload, and Signature (`HMAC-SHA256` or `RSA`). The client stores this token and transmits it in the HTTP `Authorization: Bearer <token>` header on subsequent requests. The server validates the signature mathematically without consulting a database.
- **Session-Based Authentication (Stateful)**: A traditional authentication model where, upon verification of user credentials, the server creates a unique session record stored in memory, database, or a Redis cache. The server issues a cryptographically random session ID returned via an HTTP `Set-Cookie` header (`HttpOnly; Secure; SameSite`). On each incoming request, the browser automatically sends the cookie, and the server looks up the session state in storage.

### 4.2 Key Features & Technical Comparison

| Feature | JWT-Based Authentication | Session-Based Authentication |
| :--- | :--- | :--- |
| **State Storage** | Stateless; stored on client; server stores 0 session state | Stateful; stored in server memory, Redis, or database |
| **Verification Cost** | CPU cryptographic signature verification (`jwt.verify`) | I/O memory/database lookup by session identifier |
| **Server Scalability** | Outstanding across distributed clusters and microservices | Requires sticky sessions or centralized cache (e.g., Redis cluster) |
| **Revocation Capability** | Difficult before token expiration (requires token blacklists) | Immediate; delete session key from server storage |
| **Payload Capacity** | Can carry user claims (`userId`, `role`, permissions) directly | Stores only session ID; user data fetched from DB |
| **CSRF Susceptibility** | Immune to CSRF when stored in memory / sent via Authorization header | Vulnerable to CSRF unless protected by Anti-CSRF tokens |
| **Token Size** | Larger (typically 200–800 bytes sent on every request) | Very small (short session ID string ~32–64 bytes) |

### 4.3 Advantages & Limitations

#### JWT-Based Authentication
- **Advantages**:
  - Stateless architecture allows the API backend to scale horizontally without sharing session storage.
  - Cross-domain and mobile-friendly: Works natively across web, mobile apps, and third-party APIs.
  - Self-contained payload eliminates repeated database lookups for basic user identification and role checking.
- **Limitations**:
  - Tokens cannot be easily revoked mid-flight before expiration without introducing stateful token revocation lists.
  - Leaked tokens remain valid until expiration; requires short token lifespans with refresh token rotation.
  - Storing tokens in browser `localStorage` introduces risk if the client is vulnerable to XSS.

#### Session-Based Authentication
- **Advantages**:
  - Instant session revocation on logout or account compromise.
  - Cookies configured with `HttpOnly`, `Secure`, and `SameSite=Strict` are inaccessible to client-side JavaScript, mitigating XSS token theft.
- **Limitations**:
  - Scalability bottleneck: Requires centralized session infrastructure (e.g., Redis) across multiple server instances.
  - Requires Cross-Site Request Forgery (CSRF) tokens for all mutating HTTP verbs (`POST`, `PUT`, `DELETE`).
  - Less natural for mobile native applications or multi-domain microservice architectures.

### 4.4 Suitable Use Cases
- **JWT**: RESTful APIs, distributed microservices, single-page applications (SPAs), mobile applications, stateless serverless functions (AWS Lambda, Google Cloud Functions).
- **Session-Based**: Monolithic server-rendered web applications (e.g., Django, Ruby on Rails, Laravel, Express + EJS), high-security banking portals demanding instantaneous session invalidation.

### 4.5 Justified Conclusion for Crackly
**Selected Technology**: **JWT-Based Authentication (with bcrypt password encryption)**  
**Justification**:  
In Crackly, the Node/Express backend operates as a decoupled RESTful API service:
- Stateless authentication aligns with REST principles: the server retains no session state between requests.
- The signed token includes the user's `id` and `role` (`user` or `admin`), enabling route authorization middleware (`restrictTo('admin')`) to evaluate permissions without database round-trips.
- The authentication module operates uniformly whether Crackly runs locally in evaluation mode or scales in containerized environments.
- Enforced with reasonable expiration windows (`7d`), strong secret keys (`JWT_SECRET`), and input validation via Joi, JWT provides a secure, decoupled, and standard solution for modern web services.

---

## 5. Summary Table: Technology Selections for Crackly

| Layer / Concern | Option Evaluated | Selected Technology | Primary Architectural Justification |
| :--- | :--- | :--- | :--- |
| **API Architecture** | REST vs. GraphQL | **REST API** | Deterministic CRUD patterns, standard HTTP status codes, native HTTP caching, and low client overhead. |
| **Database** | MongoDB vs. MySQL | **MongoDB (Mongoose)** | Seamless document model for nested rubric tables and arrays without multi-table join overhead. |
| **Frontend UI** | React vs. Angular | **React 18 + Vite** | Lightweight component composition, instant search filtering via Hooks, and fast bundle execution. |
| **Authentication** | JWT vs. Session | **JWT Authentication** | Stateless token verification, cross-origin compatibility, decoupled client-server architecture, and role-based access. |

