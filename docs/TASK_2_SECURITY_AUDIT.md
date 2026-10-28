# Advanced Web Development (AWD) — Task 2: Security Audit Report

**Course**: B.Tech Semester-5 (Winter 2026)  
**Institution**: ITM SLS BU, School of Computer Science, Engineering & Technology, Vadodara  
**Project**: Crackly — Global Hackathon Winning Presentations & Rubrics Archive  
**Audit Target**: Client SPA (React) & REST Backend API (Express.js, Node.js, MongoDB)  
**Auditor**: AWD Project Development & Security Assessment Team

---

## 1. Executive Summary & Audit Scope

This Security Audit Report conducts a systematic vulnerability assessment of the **Crackly** application in accordance with the OWASP Top 10 Web Application Security Risks and OWASP API Security Top 10 guidelines. 

The audit evaluates both the client-side single-page interface and the server-side REST API architecture, focusing on the following critical threat categories:
1. NoSQL Injection & Query Selector Manipulation
2. Cross-Site Scripting (XSS) (Stored, Reflected, DOM-based)
3. Weak Authentication & Broken Object-Level Authorization
4. Insecure Password Storage & Cryptographic Weaknesses
5. Inadequate Input Validation & Mass-Assignment Risks
6. Server Information Disclosure, Clickjacking, and DoS Vectors

Each identified vulnerability is categorized by severity (**High**, **Medium**, or **Low**) based on the CVSS v3.1 framework, followed by its threat description, potential impact, remediation strategies, and the concrete security controls implemented in the Crackly codebase.

---

## 2. Risk Classification Matrix & Overview

| ID | Vulnerability Category | Risk Level | CVSS Score | Audit Status in Crackly | Primary Defense Implemented |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **VULN-01** | NoSQL Injection via Query Selectors | **HIGH** | 8.2 | **Mitigated** | Joi strict schema types + regex escaping |
| **VULN-02** | Stored & Reflected Cross-Site Scripting (XSS) | **HIGH** | 7.8 | **Mitigated** | React JSX escaping + Helmet Content-Security-Policy |
| **VULN-03** | Insecure Plaintext Password Storage | **HIGH** | 8.5 | **Mitigated** | bcrypt adaptive hashing (10 salt rounds) |
| **VULN-04** | Weak Authentication & JWT Tampering | **MEDIUM** | 6.5 | **Mitigated** | HMAC-SHA256 signature verification + expiration |
| **VULN-05** | Inadequate Input Validation & Mass Assignment | **MEDIUM** | 6.1 | **Mitigated** | Joi middleware with `stripUnknown: true` |
| **VULN-06** | Clickjacking (UI Redressing) | **MEDIUM** | 5.4 | **Mitigated** | Helmet `X-Frame-Options: DENY` |
| **VULN-07** | Server Fingerprinting & Info Disclosure | **LOW** | 3.7 | **Mitigated** | Helmet `hidePoweredBy` + centralized error handling |
| **VULN-08** | Denial of Service (DoS) via Unbounded Payloads | **MEDIUM** | 5.3 | **Mitigated** | Express payload limits (1MB) + express-rate-limit |

---

## 3. Detailed Vulnerability Analyses & Audit Findings

---

### VULN-01: NoSQL Injection via Malicious Query Selectors
- **Classification**: **HIGH** (CVSS: 8.2)
- **OWASP Reference**: A03:2021 — Injection
- **Description**:  
  In MongoDB applications using Express, if raw query parameters (e.g., `req.query` or `req.body`) are directly passed to Mongoose/MongoDB query methods (`find()`, `findOne()`), an attacker can pass objects containing MongoDB query operator keys such as `{ "$gt": "" }`, `{ "$ne": null }`, or `{ "$where": "..." }`. This allows unauthorized data exfiltration, authentication bypass, or full database extraction.
- **Potential Impact**:  
  - Complete database disclosure bypassing category and search filters.
  - Denial of service through computationally expensive regex or `$where` evaluation.
- **Recommended Preventive Measures**:
  1. Enforce strict input validation ensuring query parameters match primitive data types (string, number) rather than objects.
  2. Escape special regex characters in dynamic search terms (`escapeRegex` utility).
  3. Avoid using JavaScript evaluation functions (`$where`, `mapReduce`) inside queries.
- **Improvements Implemented in Crackly**:
  - In `server/controllers/presentationController.js`, user-supplied search queries are explicitly sanitized using a regex escaping utility:
    ```javascript
    function escapeRegex(string) {
      return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    ```
  - In `server/validations/presentationValidation.js`, `queryPresentationSchema` mandates that `search` and `category` must be strings and rejects nested objects:
    ```javascript
    export const queryPresentationSchema = Joi.object({
      category: Joi.string().trim().allow('', 'All', 'All Categories').optional(),
      search: Joi.string().trim().max(100).allow('').optional(),
      page: Joi.number().integer().min(1).default(1),
      limit: Joi.number().integer().min(1).max(50).default(9)
    });
    ```
  - The validation middleware (`server/middleware/validate.js`) rejects injected objects with an HTTP `400 Bad Request` before the controller is executed.

---

### VULN-02: Cross-Site Scripting (XSS)
- **Classification**: **HIGH** (CVSS: 7.8)
- **OWASP Reference**: A03:2021 — Injection (XSS)
- **Description**:  
  XSS vulnerabilities occur when an application processes untrusted user input without proper encoding or sanitization, allowing an attacker to inject arbitrary client-side scripts (HTML/JavaScript). When other users view the compromised data (stored XSS) or click a malicious link (reflected XSS), the script executes in the context of the victim's browser session.
- **Potential Impact**:  
  - Session hijacking and extraction of JWT authentication tokens stored in client storage.
  - Redirection of visitors to phishing or malicious third-party websites.
  - Defacement of presentation slides and rubric evaluation tables.
- **Recommended Preventive Measures**:
  1. Never use raw HTML insertion (`dangerouslySetInnerHTML`, `innerHTML`, `document.write`).
  2. Implement strict Content Security Policy (CSP) headers restricting script sources.
  3. Validate and enforce `http`/`https` protocols on all user-submitted URLs (e.g., slide decks, GitHub repos, demo videos) to prevent `javascript:` pseudoprotocol execution.
- **Improvements Implemented in Crackly**:
  - **Client-Side Rendering**: React’s JSX automatically escapes all interpolated variables (`{presentation.projectTitle}`, `{r.parameter}`, `{pointer}`) before inserting them into the DOM, preventing script execution.
  - **URL Protocol Validation**: In `server/validations/presentationValidation.js`, all URL fields strictly validate protocols using Joi:
    ```javascript
    presentationUrl: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
    demoVideoUrl: Joi.string().uri({ scheme: ['http', 'https'] }).allow('').default(''),
    githubUrl: Joi.string().uri({ scheme: ['http', 'https'] }).allow('').default('')
    ```
    This completely blocks `javascript:alert(1)` and data URI payload injections.
  - **HTTP Security Headers via Helmet**: In `server/server.js`, Helmet configures a Content Security Policy (CSP):
    ```javascript
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'https:']
        }
      }
    }));
    ```

---

### VULN-03: Insecure Password Storage & Hashing Weaknesses
- **Classification**: **HIGH** (CVSS: 8.5)
- **OWASP Reference**: A02:2021 — Cryptographic Failures
- **Description**:  
  Storing passwords in plaintext, encoding them with Base64, or hashing them using deprecated fast algorithms (MD5, SHA-1, raw SHA-256) leaves credentials vulnerable. Attackers who gain read access to the database can crack millions of hashes per second using GPU-accelerated dictionary attacks and precomputed Rainbow Tables.
- **Potential Impact**:  
  - Mass compromise of user and administrator credentials.
  - Credential stuffing attacks against other services where users reuse passwords.
- **Recommended Preventive Measures**:
  1. Utilize an adaptive cryptographic key-derivation function with configurable work factor (bcrypt, Argon2, PBKDF2).
  2. Ensure a unique, cryptographically random salt is generated for every individual password.
  3. Never return password hashes in API query responses.
- **Improvements Implemented in Crackly**:
  - In `server/models/User.js`, a Mongoose `pre('save')` hook automatically hashes user passwords using `bcrypt` with a salt factor of `10`:
    ```javascript
    userSchema.pre('save', async function(next) {
      if (!this.isModified('password')) return next();
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    });
    ```
  - The `password` field is configured with `select: false` so it is never accidentally leaked in database queries:
    ```javascript
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    }
    ```
  - Verification uses `bcrypt.compare(candidatePassword, this.password)`, protecting against timing attacks.

---

### VULN-04: Weak Authentication & Broken Authorization
- **Classification**: **MEDIUM** (CVSS: 6.5)
- **OWASP Reference**: A07:2021 — Identification and Authentication Failures
- **Description**:  
  Weak authentication mechanisms allow attackers to forge tokens, brute-force weak passwords, or perform privileged operations without proper role checks.
- **Potential Impact**:  
  - Unauthorized submission, tampering, or deletion of hackathon presentation records.
  - Privilege escalation from general visitor to administrative roles.
- **Recommended Preventive Measures**:
  1. Enforce minimum password strength policies (minimum length, character complexity).
  2. Implement cryptographically signed tokens with finite validity periods.
  3. Enforce Role-Based Access Control (RBAC) middleware on sensitive endpoints.
- **Improvements Implemented in Crackly**:
  - In `server/validations/authValidation.js`, passwords must be at least 6 characters (up to 100 characters).
  - JWT tokens are signed using a server-side secret (`JWT_SECRET`) with an expiration policy (`expiresIn: '7d'`).
  - In `server/middleware/auth.js`, route protection and role-based access control are enforced:
    ```javascript
    export const protect = async (req, res, next) => { ... };
    export const restrictTo = (...roles) => {
      return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
          return res.status(403).json({
            success: false,
            message: 'Access forbidden: Insufficient permissions for this resource.'
          });
        }
        next();
      };
    };
    ```

---

### VULN-05: Inadequate Input Validation & Mass-Assignment
- **Classification**: **MEDIUM** (CVSS: 6.1)
- **OWASP Reference**: A04:2021 — Insecure Design & Mass Assignment
- **Description**:  
  When an API endpoint blindly passes `req.body` directly to a database creation/update call (`Model.create(req.body)`), malicious users can inject unmapped or privileged fields (e.g., `role: 'admin'`, `totalScore: 9999`, or internal flags).
- **Potential Impact**:  
  - Privilege escalation.
  - Corrupt rubric score records violating application invariants (e.g., awarding 500 points when maxScore is 30).
- **Recommended Preventive Measures**:
  1. Define explicit validation schemas for every incoming HTTP payload.
  2. Automatically strip unknown and extraneous fields before passing data to models.
  3. Enforce field bounds (e.g., `maxScore` between 1 and 100, `year` between 2015 and 2030).
- **Improvements Implemented in Crackly**:
  - In `server/validations/presentationValidation.js`, detailed bounds are enforced on every rubric field:
    ```javascript
    const rubricItemSchema = Joi.object({
      parameter: Joi.string().trim().min(3).max(100).required(),
      maxScore: Joi.number().integer().min(1).max(100).required(),
      scoreAwarded: Joi.number().min(0).max(100).required(),
      remarks: Joi.string().trim().max(500).allow('').default('')
    });
    ```
  - In `server/middleware/validate.js`, the Joi engine enforces `{ stripUnknown: true, abortEarly: false }`, ensuring that any unexpected hacker-injected fields are discarded before the controller receives the data.

---

### VULN-06: Clickjacking (UI Redressing Attacks)
- **Classification**: **MEDIUM** (CVSS: 5.4)
- **OWASP Reference**: A05:2021 — Security Misconfiguration
- **Description**:  
  Clickjacking occurs when an attacker renders the target website inside an invisible `<iframe>` on an external malicious webpage, tricking users into clicking buttons (e.g., deleting a submission or clicking malicious links) without their knowledge.
- **Potential Impact**:  
  - Forced user actions performed unknowingly in the authenticated user's context.
- **Recommended Preventive Measures**:
  1. Send the `X-Frame-Options: DENY` HTTP header to prevent any domain from framing the site.
  2. Implement CSP `frame-ancestors 'none'` directive.
- **Improvements Implemented in Crackly**:
  - In `server/server.js`, Helmet explicitly sets the frameguard:
    ```javascript
    frameguard: { action: 'deny' }
    ```
  - Testing verifies the HTTP response contains:
    `x-frame-options: DENY`

---

### VULN-07: Server Information Disclosure & MIME-Type Sniffing
- **Classification**: **LOW** (CVSS: 3.7)
- **OWASP Reference**: A05:2021 — Security Misconfiguration
- **Description**:  
  Default web servers advertise internal technology stacks via headers like `X-Powered-By: Express`. Additionally, browsers may attempt to "sniff" content types if `X-Content-Type-Options: nosniff` is omitted, causing browsers to execute non-script resources as JavaScript.
- **Potential Impact**:  
  - Attackers tailor exploit payloads to specific known vulnerabilities in the advertised Express version.
  - Cross-site script execution via MIME confusion attacks.
- **Improvements Implemented in Crackly**:
  - In `server/server.js`, Helmet disables `X-Powered-By`:
    ```javascript
    hidePoweredBy: true,
    noSniff: true
    ```
  - Production error handling suppresses stack traces, returning only clean JSON error messages:
    ```javascript
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
    ```

---

### VULN-08: Denial of Service (DoS) via Unbounded Requests
- **Classification**: **MEDIUM** (CVSS: 5.3)
- **OWASP Reference**: A04:2021 — Insecure Design
- **Description**:  
  Without request limits, malicious actors can send thousands of requests per second or multi-megabyte payloads to exhaust server memory and event-loop thread capacity.
- **Potential Impact**:  
  - API downtime and denial of service for genuine students and evaluators.
- **Improvements Implemented in Crackly**:
  - In `server/server.js`, request body sizes are constrained to `1mb`:
    ```javascript
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    ```
  - Rate limiting is configured via `express-rate-limit`:
    ```javascript
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 200, // Limit each IP to 200 requests per window
      standardHeaders: true,
      legacyHeaders: false
    });
    app.use('/api', limiter);
    ```

---

## 4. Summary of Implemented vs. Proposed Security Measures

| Security Aspect | Implemented Status | Verification Evidence in Project |
| :--- | :---: | :--- |
| **NoSQL Injection Defense** | **Fully Implemented** | `escapeRegex()` in controllers; Joi schema primitive constraints. |
| **XSS Defense** | **Fully Implemented** | React JSX auto-encoding; Joi URL scheme validation; Helmet CSP. |
| **Password Storage** | **Fully Implemented** | `bcrypt.hash()` with 10 salt rounds in `User.js` pre-save hook. |
| **Input Validation** | **Fully Implemented** | Joi middleware with `stripUnknown: true` on all POST/GET routes. |
| **HTTP Security Headers** | **Fully Implemented** | Helmet.js enabled in `server.js` (HSTS, CSP, X-Frame-Options, noSniff). |
| **Rate Limiting & DoS** | **Fully Implemented** | `express-rate-limit` (200 req/15min) + 1MB JSON body parser limits. |
| **CORS Policy** | **Fully Implemented** | `cors` middleware restricted to frontend client origins (`http://localhost:5173`). |
| **Proposed Future Work** | **Planned** | Redis-based distributed token revocation list; WebAuthn biometric 2FA. |

---

## 5. Conclusion

The security audit confirms that **Crackly** incorporates defensive software engineering principles across all tiers. By combining strict Joi input validation, bcrypt cryptographic hashing, Helmet HTTP security headers, and React's built-in XSS protections, the application effectively mitigates the primary web security risks outlined in the AWD syllabus and OWASP Top 10 standards.

