# B.Tech Semester-5 AWD — Regular Final Viva-Voce Question Bank

**Course**: Advanced Web Development (AWD)  
**Institution**: ITM SLS BU, School of Computer Science, Engineering & Technology, Vadodara  
**Project**: Crackly — Global Hackathon Winning Presentations & Rubrics Archive  

---

## Task 1: Comparative Technology Study Questions

### Q1: Why did you choose a REST API architecture over GraphQL for Crackly?
**Answer**:  
Crackly has well-defined, resource-oriented access patterns: listing presentation cards (`GET /api/presentations`), filtering by category and search, and viewing the full rubric detail (`GET /api/presentations/:id`). REST leverages standard HTTP verbs and status codes (`200`, `400`, `404`, `500`), enables native browser/CDN caching without additional client libraries, and avoids the complexity of GraphQL query depth limits, resolvers, and N+1 query problems.

### Q2: Why is MongoDB more appropriate than MySQL for storing winning presentations?
**Answer**:  
Each hackathon presentation in Crackly naturally encapsulates hierarchical, variable data: an array of key reasons why they won (`whyTheyWon`), an array of scored rubric criteria (`rubrics`: parameter, maxScore, scoreAwarded, remarks), and domain tags. In a relational database like MySQL, this would require 4 normalized tables and 3 joins on every read query. MongoDB stores each presentation as a single cohesive BSON document retrieved in a single \(O(1)\) disk operation.

### Q3: Why React instead of Angular?
**Answer**:  
Crackly is a focused single-page application requiring fast search and category filtering. React’s component-based functional model with Hooks (`useState`, `useEffect`, `useCallback`) provides a clean separation of concerns without the boilerplate of Angular’s dependency injection, modules, and RxJS streams. Paired with Vite, the production bundle is under 80 KB gzipped, loading in sub-second times.

### Q4: Compare JWT-based authentication with session-based authentication.
**Answer**:  
- **JWT (JSON Web Token)** is stateless: the server cryptographically signs a payload (`id`, `role`) with a secret key. The client sends it via the `Authorization: Bearer <token>` header, allowing horizontal server scaling without a shared session cache.
- **Session-based authentication** is stateful: the server creates a session record in memory/database/Redis and returns a session ID cookie. It allows immediate revocation but requires centralized session storage across distributed servers.

---

## Task 2: Security Audit Report Questions

### Q5: How do you prevent NoSQL injection in Crackly?
**Answer**:  
1. All query parameters (`search`, `category`, `page`, `limit`) are strictly validated using Joi schemas (`queryPresentationSchema`), rejecting any injected MongoDB query operators like `{ "$gt": "" }` or `{ "$ne": null }`.
2. Free-text search terms are sanitized with a regex escaping function (`escapeRegex`) before constructing Mongoose `$regex` queries.

### Q6: How does Crackly defend against Cross-Site Scripting (XSS)?
**Answer**:  
1. **React JSX auto-escaping**: React automatically escapes text interpolated in JSX before rendering into the DOM.
2. **Protocol Validation**: Joi enforces that URLs (`presentationUrl`, `githubUrl`, `demoVideoUrl`) must strictly match `http` or `https` schemes, blocking `javascript:...` payload execution.
3. **Helmet Content Security Policy (CSP)**: Configures HTTP response headers restricting script and connection sources.

### Q7: What is Mass Assignment and how does Crackly mitigate it?
**Answer**:  
Mass assignment occurs when client input (`req.body`) is directly saved into the database, allowing attackers to inject unauthorized fields (e.g., `role: 'admin'`). Crackly’s Joi middleware uses `{ stripUnknown: true }`, which strips out any key not explicitly defined in the schema before the controller processes the request.

---

## Task 3: Security Libraries Implementation Questions

### Q8: What does Helmet.js do and which headers does it set?
**Answer**:  
Helmet.js sets 15+ secure HTTP headers on Express responses. In Crackly:
- `X-Frame-Options: DENY`: Prevents Clickjacking by disallowing iframe embedding.
- `X-Content-Type-Options: nosniff`: Prevents MIME-type sniffing exploits.
- `hidePoweredBy`: Removes `X-Powered-By: Express` to prevent server fingerprinting.
- `Strict-Transport-Security` (HSTS): Enforces encrypted HTTPS connections.
- `Content-Security-Policy` (CSP): Dictates approved resource sources.

### Q9: How does bcrypt hash passwords and why is it superior to SHA-256?
**Answer**:  
1. **Salt**: bcrypt automatically generates a cryptographically random salt per user, preventing precomputed Rainbow Table attacks.
2. **Work Factor (Cost)**: bcrypt uses an adaptive cost factor (Crackly uses `10`, meaning \(2^{10} = 1024\) rounds), making brute-force cracking computationally impractical. SHA-256 is designed to be fast (billions of hashes/sec on GPUs), making it vulnerable to offline cracking.
3. **Constant-Time Verification**: `bcrypt.compare()` compares hashes in constant time to prevent timing attacks.

### Q10: How is Joi integrated as Express middleware?
**Answer**:  
We created a reusable higher-order function: `validate(schema, property)`. It validates `req.body` or `req.query` with `{ abortEarly: false, stripUnknown: true }`. If validation fails, it returns an HTTP `400 Bad Request` with an array of specific error messages. If valid, `req[property]` is overwritten with the sanitized and typed data, and `next()` is called.

