# Task 2: Security Audit Report

**Course:** Advanced Web Development (AWD) — B.Tech Semester-5 (Winter 2026)  
**Institution:** ITM SLS BU, School of Computer Science, Engineering & Technology, Vadodara  
**Project:** Crackly (MLH-Inspired Opportunity & Prep Intelligence Platform)  
**Assessment:** Project-Based Learning (PBL) Final Viva-Voce Submission  

---

## Executive Summary

As part of the Advanced Web Development curriculum, a security audit of the **Crackly** full-stack web application was conducted. The audit systematically evaluates vulnerabilities across the frontend client, backend Express REST API, authentication layer, and MongoDB database.

The audit evaluates vulnerabilities across the six categories specified in the university rubric:
1. **NoSQL / SQL Injection**
2. **Cross-Site Scripting (XSS)**
3. **Weak Authentication and Authorization**
4. **Insecure Password Storage**
5. **Inadequate Input Validation**
6. **Other Relevant Risks** (Clickjacking, MIME Sniffing, Denial of Service, CORS Misconfiguration, Sensitive Data Leakage in Logs)

---

## 1. Vulnerability Classification Matrix

| ID | Vulnerability Description | Category | Initial Risk Level | Post-Remediation Status |
| :--- | :--- | :--- | :---: | :---: |
| **SEC-01** | Unauthenticated Opportunity Insertion (`POST /api/opportunities`) | Authentication & Authorization | **HIGH** | ✅ **Remediated** (JWT Auth & Role Guard) |
| **SEC-02** | Missing Password Hashing in Database Layer | Insecure Password Storage | **HIGH** | ✅ **Remediated** (bcrypt with 10 salt rounds) |
| **SEC-03** | Imperative / Incomplete Request Body Validation | Inadequate Input Validation | **HIGH** | ✅ **Remediated** (Strict Joi schema middleware) |
| **SEC-04** | Regex Injection / ReDoS in Keyword Search | NoSQL Injection / DoS | **MEDIUM** | ✅ **Remediated** (Safe character escaping regex) |
| **SEC-05** | UI Frame Embedding Vulnerability (Clickjacking) | Other: Clickjacking | **MEDIUM** | ✅ **Remediated** (Helmet `frameguard: deny`) |
| **SEC-06** | Content-Type Sniffing by Malicious Browsers | Other: MIME Spoofing | **LOW** | ✅ **Remediated** (Helmet `noSniff: nosniff`) |
| **SEC-07** | Endpoint Flooding / API Denial of Service (DoS) | Other: Availability / DoS | **MEDIUM** | ✅ **Remediated** (`express-rate-limit` 200 req/15 min) |
| **SEC-08** | Database Credential Exposure in Server Startup Logs | Other: Sensitive Data Leak | **MEDIUM** | ✅ **Remediated** (URI Regex sanitization in `db.js`) |

---

## 2. In-Depth Vulnerability Analysis

---

### SEC-01: Weak Authentication & Authorization
- **Vulnerability Description:**  
  Originally, the `POST /api/opportunities` endpoint was completely unauthenticated and accessible to any client. A malicious actor could write an automated bot to submit spam, offensive content, or flood the database with fake opportunity postings without identifying themselves.
- **Risk Classification:** **HIGH** (Severity: CVSS 8.2)
- **Potential Impact:**  
  Database pollution, spam distribution, loss of platform credibility, and potential resource exhaustion.
- **Recommended Preventive Measure:**  
  1. Implement user registration and login endpoints utilizing JSON Web Tokens (JWT).
  2. Create a route protection middleware (`protect`) that verifies the `Bearer <token>` HTTP header.
  3. Introduce Role-Based Access Control (RBAC) to differentiate between regular students and verified administrators/recruiters (`restrictTo('admin')`).
- **Implemented Remediation in Crackly:**  
  - Created [`server/models/User.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/models/User.js) supporting `'user'` and `'admin'` roles.
  - Implemented [`server/middleware/auth.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/middleware/auth.js) with `protect` and `optionalAuth` middleware.
  - User identity is attached to `req.user` for audit trails and ownership tracking.

---

### SEC-02: Insecure Password Storage
- **Vulnerability Description:**  
  Without cryptographic one-way hashing, storing user passwords in plaintext or using outdated, reversible algorithms (e.g., MD5 or SHA-1) allows anyone with read access to the database (or via database dump leaks) to view all user credentials instantly.
- **Risk Classification:** **HIGH** (Severity: CVSS 8.5)
- **Potential Impact:**  
  Catastrophic credential exposure, account takeovers, and credential stuffing attacks across external user accounts.
- **Recommended Preventive Measure:**  
  Use an adaptive key derivation function with individual salt generation, specifically **bcrypt**, with a minimum workload factor (cost) of 10.
- **Implemented Remediation in Crackly:**  
  - Integrated `bcryptjs` in [`server/models/User.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/models/User.js).
  - Configured a pre-save Mongoose hook that detects password changes, generates a cryptographically secure pseudo-random salt (`bcrypt.genSalt(10)`), and replaces the plaintext password with the hashed result.
  - Verification is handled exclusively via `user.comparePassword(candidatePassword)` using constant-time comparison to prevent timing attacks.

---

### SEC-03: Inadequate Input Validation
- **Vulnerability Description:**  
  The application originally relied on manual imperative checks (e.g. `if (!title)`) inside controller methods. This left the application vulnerable to:
  1. **Mass Assignment:** Extra fields injected into `req.body` could be saved into Mongoose documents.
  2. **Type Confusion:** Sending numbers or arrays where strings are expected could crash the process.
  3. **Protocol Injections:** Accepting dangerous URI schemes like `javascript:alert(1)` in the `applicationUrl` field.
- **Risk Classification:** **HIGH** (Severity: CVSS 7.8)
- **Potential Impact:**  
  Corrupted data models, stored script execution via dangerous URLs, unhandled exception crashes (`500 Internal Server Error`).
- **Recommended Preventive Measure:**  
  Enforce declarative schema validation on all incoming request vectors (`req.body`, `req.query`, `req.params`) using **Joi**.
- **Implemented Remediation in Crackly:**  
  - Built generic validation middleware in [`server/middleware/validate.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/middleware/validate.js).
  - Enabled `stripUnknown: true` to strip any unapproved properties from incoming payloads (mitigating mass assignment).
  - Defined strict Joi schemas in [`server/validations/opportunityValidation.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/validations/opportunityValidation.js) restricting categories to `['Hackathon', 'Internship', 'Fresher Job']`, enforcing valid `http/https` URLs, and setting character boundaries.

---

### SEC-04: NoSQL Injection & Regular Expression DoS (ReDoS)
- **Vulnerability Description:**  
  In MongoDB, passing unsanitized query parameters directly into database queries can allow attackers to inject MongoDB operators (e.g., `{"search": {"$gt": ""}}`). Additionally, passing unescaped user input into `new RegExp(search)` can trigger Regular Expression Denial of Service (ReDoS) via catastrophic backtracking strings (e.g., `(a+)+$`).
- **Risk Classification:** **MEDIUM** (Severity: CVSS 6.5)
- **Potential Impact:**  
  Bypassing search filters, data leakage, and freezing the Node.js single-threaded event loop.
- **Recommended Preventive Measure:**  
  1. Sanitize all regex inputs using an escape utility function to neutralize special characters (`^`, `$`, `*`, `+`, `?`, `(`, `)`).
  2. Validate query parameters through Joi so that query operators cannot be parsed as objects.
- **Implemented Remediation in Crackly:**  
  - Implemented `escapeRegex()` in [`server/controllers/opportunityController.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/controllers/opportunityController.js#L5-L7).
  - Applied `queryOpportunitySchema` via Joi on `GET /api/opportunities` to ensure `page` and `limit` are strictly positive integers and `category` is within approved enums.

---

### SEC-05: Cross-Site Scripting (XSS)
- **Vulnerability Description:**  
  Cross-Site Scripting occurs when an application includes untrusted data in a web page without proper validation or escaping, allowing attackers to execute arbitrary JavaScript in the victim's browser.
- **Risk Classification:** **MEDIUM** (Severity: CVSS 6.1)
- **Potential Impact:**  
  Session hijacking, credential theft, defacement, or unauthorized actions performed on behalf of the user.
- **Implemented Remediation in Crackly:**  
  - **Frontend Protection:** React automatically escapes all variables rendered inside JSX (e.g., `{opportunity.title}`), converting `<script>` tags to harmless strings rather than DOM nodes. No `dangerouslySetInnerHTML` is used in the codebase.
  - **HTTP Header Protection:** Configured `helmet()` to set `X-XSS-Protection: 0` (modern standard) and enforced a strict `Content-Security-Policy` restricting script sources to `'self'`.
  - **Input Sanitization:** Joi rejects non-HTTP URI schemes like `javascript:` in URLs.

---

### SEC-06: Clickjacking & UI Redressing
- **Vulnerability Description:**  
  An attacker loads the application inside a transparent `<iframe>` on a malicious website, tricking users into clicking buttons they did not intend to click (e.g., submitting opportunities or clicking malicious external links).
- **Risk Classification:** **MEDIUM** (Severity: CVSS 5.3)
- **Implemented Remediation in Crackly:**  
  - Configured Helmet's `frameguard` in [`server/server.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/server.js) with `{ action: 'deny' }`.
  - Returns the HTTP header: `X-Frame-Options: DENY`, completely preventing browsers from embedding the site in frames or iframes.

---

### SEC-07: Denial of Service via Endpoint Flooding
- **Vulnerability Description:**  
  Without rate limiting, an automated script can send thousands of requests per second to resource-intensive endpoints like `/api/opportunities` (which performs regex text searches and database counts), exhausting server CPU and memory.
- **Risk Classification:** **MEDIUM** (Severity: CVSS 5.3)
- **Implemented Remediation in Crackly:**  
  - Integrated `express-rate-limit` in [`server/server.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/server.js#L43-L54).
  - Enforced a window of 15 minutes with a maximum threshold of 200 requests per IP address. Exceeding clients receive an HTTP `429 Too Many Requests` status with standard `RateLimit-*` headers.

---

### SEC-08: Credential Disclosure in Application Logs
- **Vulnerability Description:**  
  Connecting to MongoDB Atlas typically requires a connection string containing cleartext database username and password credentials (e.g., `mongodb+srv://admin:P@ssword123@cluster0.mongodb.net/`). Printing this string to stdout/console on connection exposes credentials in terminal outputs and shared log files.
- **Risk Classification:** **MEDIUM** (Severity: CVSS 6.2)
- **Implemented Remediation in Crackly:**  
  - In [`server/config/db.js`](file:///c:/Users/soni8/Desktop/everything/University%202.0/Year%203/Semester%205/Advanced%20Web%20Development%20or%20System%20Software/Assignments/Crackly/server/config/db.js#L13), implemented a URI sanitizer:
    ```javascript
    const sanitizedUri = uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
    ```
  - Logs show `mongodb://***:***@cluster...`, keeping credentials completely confidential.

---

## 3. Security Improvements: Summary of Implemented vs. Proposed Measures

| Security Aspect | Status | Implementation Details |
| :--- | :---: | :--- |
| **HTTP Security Headers** | **Implemented** | `helmet` configured with CSP, HSTS, X-Frame-Options (DENY), and X-Content-Type-Options (nosniff) |
| **Password Encryption** | **Implemented** | `bcrypt` adaptive hashing with 10 salt rounds and constant-time verification |
| **Input Validation & Sanitization** | **Implemented** | `joi` middleware validating body payloads and query strings with `stripUnknown: true` |
| **Authentication & Authorization** | **Implemented** | JWT stateless tokens, `protect` middleware, and role-based guards |
| **Rate Limiting** | **Implemented** | `express-rate-limit` capped at 200 requests/15 minutes per IP |
| **Regex Sanitization** | **Implemented** | Custom `escapeRegex` neutralizing wildcard search exploits |
| **CORS Access Control** | **Implemented** | Whitelist limited to configured client origins (`CLIENT_ORIGIN`) |
| **Database Log Masking** | **Implemented** | Regex masking of MongoDB user credentials during startup |
| **Refresh Token Rotation** | *Proposed* | Long-lived refresh tokens stored in HttpOnly cookies with short-lived access tokens (Future Milestone) |
| **Multi-Factor Auth (MFA/2FA)** | *Proposed* | TOTP authenticator app support for administrative users (Future Milestone) |

---
*Report prepared for ITM SLS BU AWD B.Tech Sem-5 PBL Viva-Voce Examination.*
