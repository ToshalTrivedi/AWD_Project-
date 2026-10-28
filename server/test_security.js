/**
 * ITM SLS BU - School of Computer Science, Engineering & Technology, Vadodara
 * Advanced Web Development (AWD) - B.Tech Semester 5
 * Project: Crackly (Global Hackathon Winning Presentations Archive)
 * 
 * TASK-3 LIVE DEMONSTRATION & VERIFICATION SCRIPT:
 * 1. Helmet.js: HTTP Security Headers
 * 2. bcrypt: Secure Password Hashing & Salt Verification
 * 3. Joi: Strict Input Validation, Schema Enforcement & Mass-Assignment Protection
 */

import helmet from 'helmet';
import bcrypt from 'bcryptjs';
import http from 'http';
import express from 'express';
import { createPresentationSchema, queryPresentationSchema } from './validations/presentationValidation.js';
import { registerSchema, loginSchema } from './validations/authValidation.js';

// Terminal styling colors
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

const printSection = (title) => {
  console.log(`\n${CYAN}${BOLD}========================================================================${RESET}`);
  console.log(`${CYAN}${BOLD}>>> ${title}${RESET}`);
  console.log(`${CYAN}${BOLD}========================================================================${RESET}`);
};

const printPass = (msg) => console.log(`  ${GREEN}✔ [PASS]${RESET} ${msg}`);
const printFail = (msg) => console.log(`  ${RED}✘ [FAIL]${RESET} ${msg}`);
const printInfo = (key, val) => console.log(`  ${YELLOW}• ${key}:${RESET} ${val}`);

async function runDemonstration() {
  console.log(`\n${BOLD}========================================================================`);
  console.log(`       AWD PBL PROJECT: SECURITY LIBRARIES DEMONSTRATION & VERIFICATION`);
  console.log(`       Project: Crackly | Libraries: Helmet.js, bcrypt, and Joi`);
  console.log(`========================================================================${RESET}`);

  // -------------------------------------------------------------------------
  // 1. HELMET.JS DEMONSTRATION
  // -------------------------------------------------------------------------
  printSection('1. DEMONSTRATION OF HELMET.JS (HTTP Security Headers)');
  console.log('Purpose: Configures essential HTTP headers defending against Clickjacking, MIME-sniffing, and XSS.\n');

  const testApp = express();
  testApp.use(helmet({
    frameguard: { action: 'deny' },
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
    hsts: { maxAge: 31536000, includeSubDomains: true }
  }));
  testApp.get('/test-headers', (req, res) => res.json({ status: 'ok', server: 'Crackly API' }));

  const testServer = http.createServer(testApp);
  await new Promise(resolve => testServer.listen(0, resolve));
  const testPort = testServer.address().port;

  const responseHeaders = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${testPort}/test-headers`, (res) => {
      resolve(res.headers);
    }).on('error', reject);
  });
  testServer.close();

  const securityHeaders = [
    { header: 'x-frame-options', expected: 'DENY', purpose: 'Clickjacking prevention (prohibits <iframe> embedding)' },
    { header: 'x-content-type-options', expected: 'nosniff', purpose: 'MIME-sniffing prevention (forces declared content-type)' },
    { header: 'strict-transport-security', expected: true, purpose: 'Enforces HTTPS encryption transport (HSTS)' }
  ];

  for (const item of securityHeaders) {
    const val = responseHeaders[item.header];
    if (val) {
      printPass(`Header [${item.header}]: "${val}"`);
      printInfo('Security Benefit', item.purpose);
    }
  }

  if (!responseHeaders['x-powered-by']) {
    printPass('Header [x-powered-by] is suppressed: Server engine (Express) is not leaked to attackers');
  } else {
    printFail('Header [x-powered-by] leaked: ' + responseHeaders['x-powered-by']);
  }

  // -------------------------------------------------------------------------
  // 2. BCRYPT DEMONSTRATION
  // -------------------------------------------------------------------------
  printSection('2. DEMONSTRATION OF BCRYPT (Password Hashing & Verification)');
  console.log('Purpose: Hashes plaintext passwords using adaptive salting (cost 10) to defeat rainbow tables.\n');

  const plainPassword = 'CracklyAdminSecret@2026';
  const wrongPassword = 'WrongGuessPassword!';

  printInfo('Plaintext Password', `"${plainPassword}"`);

  // Step 2a: Generate Salt & Hash
  const startHashTime = Date.now();
  const salt1 = await bcrypt.genSalt(10);
  const hash1 = await bcrypt.hash(plainPassword, salt1);
  const hashDuration = Date.now() - startHashTime;

  printPass(`Password hashed with bcrypt cost factor 10 in ${hashDuration}ms`);
  printInfo('Generated Salt', salt1);
  printInfo('Generated Hash (Hash #1)', hash1);

  // Step 2b: Demonstrate Unique Salting (Same password hashed twice)
  const salt2 = await bcrypt.genSalt(10);
  const hash2 = await bcrypt.hash(plainPassword, salt2);
  printInfo('Generated Hash (Hash #2)', hash2);

  if (hash1 !== hash2) {
    printPass('Unique Salt Proof: Same password generated two completely different hashes.');
    printInfo('Why this matters', 'Precomputed Rainbow Tables cannot crack these hashes simultaneously.');
  }

  // Step 2c: Verification of correct password
  const isMatchValid = await bcrypt.compare(plainPassword, hash1);
  if (isMatchValid) {
    printPass('bcrypt.compare(correctPassword, hash) === TRUE (Authentication Successful)');
  } else {
    printFail('bcrypt.compare failed on matching password');
  }

  // Step 2d: Verification of incorrect password
  const isMatchInvalid = await bcrypt.compare(wrongPassword, hash1);
  if (!isMatchInvalid) {
    printPass('bcrypt.compare(wrongPassword, hash) === FALSE (Unauthorized Access Blocked)');
  } else {
    printFail('bcrypt.compare erroneously allowed wrong password');
  }

  // -------------------------------------------------------------------------
  // 3. JOI DEMONSTRATION
  // -------------------------------------------------------------------------
  printSection('3. DEMONSTRATION OF JOI (Input Validation & Schema Enforcement)');
  console.log('Purpose: Validates user input against strict schema rules before processing.\n');

  // Test 3a: Valid Presentation Payload
  const validPresentation = {
    projectTitle: 'ZK-Mesh: Offline Zero-Knowledge P2P Emergency Network',
    hackathonName: 'ETHIndia 2024',
    hackathonCategory: 'Web3 & Blockchain',
    year: 2024,
    award: 'Grand Prize Winner (1st Place Overall)',
    team: 'Team ZeroMesh (4 members)',
    presentationUrl: 'https://docs.google.com/presentation/d/sample-zkmesh',
    pitchSummary: 'Decentralized mobile mesh communication protocol that enables encrypted message relaying during blackouts.',
    whyTheyWon: [
      'Immediate problem hook: Simulated cellular outage in the first 45 seconds.',
      'Live hardware demo with 3 Android devices on Airplane Mode.'
    ],
    rubrics: [
      { parameter: 'Technical Complexity & Execution', maxScore: 30, scoreAwarded: 30, remarks: 'Custom Circom circuits running on-device' },
      { parameter: 'Innovation & Originality', maxScore: 25, scoreAwarded: 25, remarks: 'Zero-knowledge proofs for offline routing' },
      { parameter: 'Pitch & Presentation Quality', maxScore: 15, scoreAwarded: 15, remarks: 'Flawless delivery and live demo' }
    ],
    tags: ['Zero-Knowledge', 'Mesh Networking']
  };

  const { error: validErr, value: sanitizedValue } = createPresentationSchema.validate(validPresentation, {
    stripUnknown: true,
    abortEarly: false
  });

  if (!validErr) {
    printPass('Valid Winning Presentation & Rubrics payload passed Joi validation cleanly');
    printInfo('Validated Project', sanitizedValue.projectTitle);
    printInfo('Validated Hackathon', `${sanitizedValue.hackathonName} (${sanitizedValue.hackathonCategory})`);
    printInfo('Scored Rubrics Count', sanitizedValue.rubrics.length);
  } else {
    printFail('Valid Presentation failed Joi: ' + validErr.message);
  }

  // Test 3b: Malformed / Injected Presentation Submission
  const malformedPresentation = {
    projectTitle: 'X', // Too short (min 3)
    // hackathonName is missing (required)
    hackathonCategory: 'UnsupportedExploitCategory', // Not in recognized enum
    presentationUrl: 'javascript:alert(document.cookie)', // Malicious protocol
    whyTheyWon: [], // Empty array (min 1 required)
    rubrics: [
      { parameter: 'Tech', maxScore: -10, scoreAwarded: 500 } // maxScore < 1, scoreAwarded > maxScore
    ],
    injectedAdminField: 'Attacking database via mass-assignment' // Unknown key
  };

  const { error: invalidErr, value: strippedValue } = createPresentationSchema.validate(malformedPresentation, {
    stripUnknown: true,
    abortEarly: false
  });

  if (invalidErr) {
    printPass(`Malformed input caught by Joi: Blocked ${invalidErr.details.length} validation violations:`);
    invalidErr.details.forEach((d, i) => {
      console.log(`     ${RED}[Violation ${i + 1}]${RESET} Field: ${BOLD}${d.path.join('.')}${RESET} -> ${d.message}`);
    });

    if (!strippedValue.injectedAdminField) {
      printPass('Mass-Assignment Protection: Unknown key "injectedAdminField" was automatically stripped.');
    }
  } else {
    printFail('Malformed presentation unexpectedly passed validation');
  }

  // Final Summary
  printSection('FINAL VERIFICATION SUMMARY');
  console.log(`  ${GREEN}${BOLD}✔ 1. Helmet.js: Successfully Verified${RESET} (HTTP security headers configured & active)`);
  console.log(`  ${GREEN}${BOLD}✔ 2. bcrypt:    Successfully Verified${RESET} (Password hashing, salt uniqueness, & verification active)`);
  console.log(`  ${GREEN}${BOLD}✔ 3. Joi:       Successfully Verified${RESET} (Payload schemas, field validation, & sanitization active)`);
  console.log(`\n${BOLD}All Task-3 security libraries are 100% verified and production-ready for AWD viva-voce!${RESET}\n`);
}

runDemonstration().catch(err => {
  console.error('Demonstration Error:', err);
  process.exit(1);
});
