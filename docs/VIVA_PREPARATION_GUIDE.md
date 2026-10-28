# AWD Final Viva-Voce Master Preparation & Defense Guide

**Course:** Advanced Web Development (AWD) — B.Tech Semester-5 (Winter-2026)  
**Institution:** ITM SLS BU, School of Computer Science, Engineering & Technology, Vadodara  
**Project Name:** Crackly (MLH-Inspired Opportunity & Prep Intelligence Platform)  
**Deliverable Files:**  
- 📄 **Word Document:** [`docs/AWD_Final_Viva_Submission_Crackly.docx`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/docs/AWD_Final_Viva_Submission_Crackly.docx)  
- 📊 **PowerPoint Presentation:** [`docs/AWD_Final_Viva_Presentation_Crackly.pptx`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/docs/AWD_Final_Viva_Presentation_Crackly.pptx)  
- 🛡️ **Security Test Suite:** [`server/demonstrate_security.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/demonstrate_security.js)  

---

## 1. Quick Demonstration Commands for Viva

When the professor or external examiner asks to see the running system or verify your security libraries, run these exact commands in your terminal:

### Step 1: Demonstrate Security Libraries (Task 3)
```bash
cd server
npm run demonstrate:security
```
*What this shows the examiner:*
- **Helmet.js:** Validates that `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Content-Security-Policy` are active and that `X-Powered-By` is suppressed.
- **bcrypt:** Hashes passwords with cost factor 10, proves unique salting (same password produces two different hashes), and verifies matches and rejections.
- **Joi:** Validates clean opportunity and auth payloads, catches malformed inputs (invalid URLs, out-of-range strings, invalid categories), and demonstrates mass-assignment stripping.

### Step 2: Start Backend Server
```bash
cd server
npm start
```
*Backend runs on `http://localhost:5000`.*  
- Health check: `http://localhost:5000/api/health`
- Opportunities: `http://localhost:5000/api/opportunities`

### Step 3: Start Frontend Client
```bash
cd client
npm run dev
```
*Frontend runs on `http://localhost:5173`.*  
- Show the interactive opportunity catalog, debounced keyword search, category filtering, and open the slide-over **Prep Intelligence Drawer**.
- Show that if the server is stopped, the client stays functional with its **Offline Demo Fallback**.

---

## 2. High-Yield Viva Questions & Master Answers

### Task 1: Comparative Technology Study

#### Q1: Why did you choose a REST API architecture instead of GraphQL for Crackly?
> **Answer:**  
> Crackly is an opportunity catalog where the entity structure (title, company, deadline, tags, and prep roadmap) is consistent and predictable across views. REST was chosen because:
> 1. **Native HTTP Caching:** REST leverages standard HTTP caching headers (`Cache-Control`, `ETags`, `304 Not Modified`) on browsers and CDNs, which is trivial compared to normalized client-side GraphQL caches like Apollo InMemoryCache.
> 2. **Standard Status Codes:** REST uses native HTTP status codes (`200`, `201`, `400`, `401`, `404`, `500`) allowing standard reverse-proxy monitoring and health checking, whereas GraphQL returns `200 OK` for almost all queries including errors.
> 3. **Offline Fallback Resilience:** In our project, Axios interceptors seamlessly fall back to local mock data when the server is offline. Building an equivalent offline fallback for arbitrary GraphQL AST queries would introduce high operational complexity without added benefit.

#### Q2: Why MongoDB (Mongoose) over MySQL for this application?
> **Answer:**  
> Crackly’s opportunity data model is inherently hierarchical. Every opportunity contains an attached 4-week preparation roadmap (`roadmap: [{ week, title, goal, tasks, milestone }]`), technical modules, and an interview question bank.  
> - In a relational database like MySQL, this requires 4 normalized tables connected via foreign keys. To display a single card's prep drawer, the server would need to perform 4 multi-table SQL `JOIN`s, increasing latency.  
> - MongoDB stores the entire entity as a rich BSON document. Retrieving an opportunity and its complete prep intelligence requires a single indexed read (`Opportunity.findById(id).lean()`), which is $O(1)$ on the `_id` index. Furthermore, MongoDB's dynamic schema allows educational curricula to evolve without database migration downtime (`ALTER TABLE`).

#### Q3: Why React + Vite instead of Angular?
> **Answer:**  
> React's lightweight, component-driven model with unidirectional data flow and hooks (`useState`, `useEffect`, `useCallback`) allowed us to cleanly manage UI state, drawer slide-overs, and focus trapping without boilerplate. Vite uses native ES modules (ESM) during development, giving sub-50ms Hot Module Replacement (HMR) and compiling the production build in under 5 seconds. Angular is an opinionated, heavier framework utilizing RxJS streams, decorators, and dependency injection, which would have introduced unnecessary bundle overhead for our Single Page Application.

#### Q4: Why JWT-based stateless authentication instead of Session cookies?
> **Answer:**  
> Crackly has a decoupled architecture: the Vite React client runs on port 5173, while the Express API runs on port 5000.  
> - Session-based authentication requires the server to maintain a stateful session store (e.g., in RAM or a Redis cluster) and depends on browser cookie handling with strict CORS credentials.  
> - JWT authentication is completely stateless: the server digitally signs user claims using HMAC-SHA256. The client passes this token in the `Authorization: Bearer <token>` header. Any backend server instance can verify the signature mathematically without querying a shared session database, enabling horizontal scalability.

---

### Task 2: Security Audit Report

#### Q5: What security risks did you identify during your project audit?
> **Answer:**  
> We identified and audited six primary categories:
> 1. **Weak Authentication & Authorization (High):** `POST /api/opportunities` was originally unauthenticated. We remediated this by introducing a JWT-protected User model and authorization middleware.
> 2. **Insecure Password Storage (High):** Addressed by implementing `bcrypt` with 10 salt rounds in a Mongoose pre-save hook.
> 3. **Inadequate Input Validation (High):** Replaced manual `if/else` checks with declarative `Joi` schema validation and enabled `stripUnknown: true` to prevent mass-assignment attacks.
> 4. **NoSQL / Regex Injection (Medium):** Neutralized wildcard search exploits via `escapeRegex()` before passing queries into MongoDB.
> 5. **Clickjacking & UI Redressing (Medium):** Mitigated by configuring Helmet's `frameguard: { action: 'deny' }` which sets `X-Frame-Options: DENY`.
> 6. **Endpoint Flooding / DoS (Medium):** Addressed via `express-rate-limit` capped at 200 requests per 15-minute window per IP.

#### Q6: How does Crackly prevent Cross-Site Scripting (XSS)?
> **Answer:**  
> XSS is mitigated through a defense-in-depth approach:
> 1. **React Auto-Escaping:** React treats strings rendered inside JSX expressions (e.g., `{opportunity.title}`) as data rather than executable HTML, encoding characters like `<`, `>`, `&`, and `"` into HTML entities. No `dangerouslySetInnerHTML` is used in the codebase.
> 2. **Helmet HTTP Headers:** Helmet configures a strict `Content-Security-Policy` restricting script execution to trusted origins (`'self'`) and sets `X-XSS-Protection: 0` (modern standard replacing buggy legacy browser filters).
> 3. **Input Protocol Sanitization:** Joi rejects non-HTTP URI schemes such as `javascript:alert(1)` in the `applicationUrl` field.

#### Q7: How did you mitigate sensitive credential leakage in server logs?
> **Answer:**  
> Connecting to MongoDB Atlas requires a connection string containing passwords. In [`server/config/db.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/config/db.js), we implemented regex masking:
> ```javascript
> const sanitizedUri = uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
> ```
> This guarantees that passwords are never printed to terminal stdout or log files.

---

### Task 3: Security Libraries Implementation

#### Q8: How does Helmet.js improve application security?
> **Answer:**  
> Express by default leaves HTTP headers unconfigured and advertises `X-Powered-By: Express`. Helmet configures 15 security sub-middlewares setting standard HTTP response headers:
> - `X-Frame-Options: DENY` (prevents Clickjacking).
> - `X-Content-Type-Options: nosniff` (prevents MIME-type confusion attacks).
> - `Strict-Transport-Security` (enforces HTTPS communication).
> - `hidePoweredBy` (removes the Express signature to hinder attacker reconnaissance).
> - `Content-Security-Policy` (mitigates XSS and data injection).

#### Q9: What makes bcrypt superior to SHA-256 for password storage?
> **Answer:**  
> SHA-256 is a general-purpose cryptographic hash function designed to be extremely fast. Modern GPUs and ASICs can compute billions of SHA-256 hashes per second, allowing attackers to perform high-speed offline dictionary and brute-force attacks.  
> In contrast, **bcrypt** is an adaptive key derivation function based on the Blowfish cipher:
> 1. **Unique Salting:** bcrypt automatically generates a 128-bit cryptographically secure pseudo-random salt for every password. Hashing the same password twice yields completely different hashes, rendering precomputed Rainbow Tables useless.
> 2. **Work Factor (Cost):** The number of iterations scales exponentially ($2^{\text{cost}}$). At cost 10, it runs 1,024 rounds taking ~86ms per hash. This tiny delay is imperceptible to a legitimate logging-in user, but makes brute-forcing millions of hashes computationally prohibitive for an attacker.

#### Q10: How does Joi protect against "Mass Assignment" attacks?
> **Answer:**  
> In Express and MongoDB, if a developer writes `new Opportunity(req.body)`, an attacker could inject unauthorized fields (e.g., `role: 'admin'`, `isVerified: true`, or unmapped malicious subdocuments).  
> Joi protects against this through its `stripUnknown: true` configuration. When request data is validated against our `createOpportunitySchema`, any field not explicitly defined in the schema is automatically discarded before the controller receives the payload.

---

## 3. Deliverables Checklist for Submission

| Deliverable | Location | Status |
| :--- | :--- | :---: |
| **Comparative Technology Study (Task 1)** | [`docs/TASK_1_COMPARATIVE_STUDY.md`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/docs/TASK_1_COMPARATIVE_STUDY.md) | ✅ Complete |
| **Security Audit Report (Task 2)** | [`docs/TASK_2_SECURITY_AUDIT.md`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/docs/TASK_2_SECURITY_AUDIT.md) | ✅ Complete |
| **Security Libraries Implementation (Task 3)** | [`docs/TASK_3_SECURITY_LIBRARIES_DEMO.md`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/docs/TASK_3_SECURITY_LIBRARIES_DEMO.md) | ✅ Complete |
| **Automated Demonstration Script** | [`server/demonstrate_security.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/demonstrate_security.js) | ✅ Verified (Exit Code 0) |
| **Final Microsoft Word Document** | [`docs/AWD_Final_Viva_Submission_Crackly.docx`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/docs/AWD_Final_Viva_Submission_Crackly.docx) | ✅ Generated |
| **Final PowerPoint Presentation** | [`docs/AWD_Final_Viva_Presentation_Crackly.pptx`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/docs/AWD_Final_Viva_Presentation_Crackly.pptx) | ✅ Generated |
| **Backend Build & Syntax Check** | [`server/server.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/server.js) | ✅ Verified (0 Errors) |
| **Frontend Production Build** | [`client/dist/`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/client/dist) | ✅ Built in 4.66s |

---
*Prepared for ITM SLS BU AWD B.Tech Sem-5 PBL Final Viva-Voce Examination.*
