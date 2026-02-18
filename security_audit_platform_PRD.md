# AI-Powered Security Audit Platform
## Product Requirements Document — MVP

> **Status:** Draft — Reviewed & Revised
> **Version:** 1.1
> **Date:** February 2026
> **Phase:** MVP
> **Scope:** Web Apps + REST APIs
> **Target Users:** Non-technical business owners, vibe coders, AI app builders

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Solution Overview](#3-solution-overview)
4. [Target Users & Personas](#4-target-users--personas)
5. [Legal & Ethical Framework](#5-legal--ethical-framework)
6. [Feature Specification](#6-feature-specification)
7. [Tech Stack](#7-tech-stack)
8. [System Architecture](#8-system-architecture)
9. [Monetization & Pricing](#9-monetization--pricing)
10. [Core User Flows](#10-core-user-flows)
11. [MVP Scope](#11-mvp-scope)
12. [Success Metrics](#12-success-metrics)
13. [Risks & Mitigations](#13-risks--mitigations)
14. [Testing Strategy](#14-testing-strategy)
15. [Build Timeline](#15-build-timeline)

---

## 1. Executive Summary

The platform is an AI-powered, automated security auditing tool that enables any business owner — and especially the new wave of vibe coders and AI app builders who are shipping products without a security background — to submit their website or REST API and receive a detailed vulnerability report in minutes.

Traditional penetration testing requires hiring specialized security professionals at a cost of $5,000–$50,000 per engagement, takes weeks to complete, and produces reports that are only understandable to engineers. This product eliminates all three barriers.

A user submits a URL. An AI agent — acting as an ethical hacker — automatically crawls, probes, and tests the target for security weaknesses across all major vulnerability categories. The quick scan is completely free. When they're ready for a full deep audit, they pay a single one-time fee per report — no subscription, no commitment. Within minutes of payment, they receive a plain-English report explaining what was found, how serious it is, and exactly how to fix it.

> **Core Value Proposition:** "You built the app. We'll find the holes. One audit, one payment, plain English — no security knowledge required."

---

## 2. Problem Statement

### The Gap in the Market

Over 43% of cyber attacks target small businesses, yet 83% of SMBs have no dedicated security budget or team. Existing tools fall into two buckets:

- **Enterprise tools** (Burp Suite, Nessus, Metasploit): Require deep technical expertise, cost thousands per year, and produce raw data unreadable to a non-technical person.
- **Basic scanners** (free online tools): Surface-level only, no active testing, no AI interpretation, and no actionable remediation guidance.

The result is that most small businesses are running web applications with known, fixable vulnerabilities — completely unaware.

### User Pain Points

- *"I built this with AI/Cursor and have no idea if it's secure."*
- *"I don't know if my website is secure or not."*
- *"I can't afford a $10,000 security audit."*
- *"Even if I got a security report, I wouldn't understand it."*
- *"I just shipped my app and someone told me I should get it pen-tested — what does that even mean?"*
- *"I launched a SaaS product and need to tell enterprise customers I've been pen-tested."*

---

## 3. Solution Overview

The platform wraps a suite of industry-standard, open-source security scanning tools inside an AI orchestration layer. The AI agent (powered by **Gemini 2.5 Pro**) coordinates the tools, interprets their raw output, and translates findings into plain English. The entire experience is wrapped in a clean, consumer-grade interface.

### The Two-Tier Scanning Model

| | Quick Scan | Deep Scan |
|---|---|---|
| **Authentication Required** | Yes — free account + ToS consent | Yes — free account + domain ownership verified |
| **Scan Type** | Passive, read-only | Active, exploit-testing |
| **Duration** | 2–5 minutes | 15–30 minutes |
| **Legal Basis** | Equivalent to a browser/Googlebot reading public info | Gated by proof of ownership |
| **Access** | Free — always | $29 one-time payment per audit |

This model is industry-standard. Tools like SSL Labs and SecurityHeaders.com scan any URL passively with no verification. Active testing (injecting payloads, testing login forms) requires domain verification — just like Detectify and Intruder.

---

## 4. Target Users & Personas

### Primary Persona — Alex, the Vibe Coder

| Field | Detail |
|---|---|
| Role | Solo builder shipping SaaS apps using AI tools (Cursor, v0, Bolt, Lovable) |
| Technical Level | Can build and deploy apps but has no security training |
| Security Knowledge | Knows security is important, has no idea how to evaluate it |
| Trigger | Shipped an app with user data and realized they never checked if it's safe |
| Goal | Get a quick, clear answer to "is my app secure?" before sharing it publicly |
| Willingness to Pay | $29 one-time per audit — low friction, no commitment |

### Secondary Persona — Sarah, the SaaS Founder

| Field | Detail |
|---|---|
| Role | Founder of a small B2B SaaS startup |
| Technical Level | None — handles sales and product, not engineering |
| Security Knowledge | Knows it matters, doesn't know how to address it |
| Trigger | Enterprise prospect asks "have you done a pen test?" |
| Goal | Get a credible security audit report to share with prospects |
| Willingness to Pay | $29 per audit as needed, no monthly commitment |

### Tertiary Persona — Marcus, the Agency Owner

| Field | Detail |
|---|---|
| Role | Owner of a web design & development agency |
| Technical Level | Moderate — builds sites but not a security expert |
| Security Knowledge | Knows the basics (SSL, passwords) but not vulnerability testing |
| Trigger | Client asks if their new website is secure before launch |
| Goal | Offer security auditing as a value-add service to clients |
| Willingness to Pay | $29 per client site audit, passed on as a billable service |

---

## 5. Legal & Ethical Framework

### The Law

The **Computer Fraud and Abuse Act (CFAA)** in the US (and equivalent laws like the UK Computer Misuse Act) make it illegal to access a computer system without authorization — regardless of intent. A passive ToS checkbox shifts moral responsibility to the user but does not fully protect the platform operator for active scanning.

### How the Platform Handles This

**Quick Scan (passive):** Authentication required (free account), no domain verification required. The user accepts ToS and a clear consent statement: *"By scanning this URL, you confirm you own or have permission to test this domain."* Legally defensible because passive scanning is equivalent to what any browser or search engine does. Requiring authentication ensures accountability and enables per-account rate limiting.

**Deep Scan (active):** Domain verification required before any active testing begins. Three methods available:

1. **DNS TXT Record** — Add a specific TXT record to the domain's DNS settings
2. **File Upload** — Place a verification file at `/.well-known/security-verify.txt`
3. **Meta Tag** — Add a specific `<meta>` tag to the homepage HTML

Verification is stored permanently — the user does not re-verify on subsequent scans of the same domain.

### Non-Negotiable Platform Safeguards

- **Blocklist** — Hardcoded list of domains that can never be scanned (government infrastructure, financial institutions, known sensitive targets)
- **Rate limiting** — Maximum 3 concurrent scans per authenticated account, plus IP-based throttling as a secondary layer
- **Scan fingerprinting** — All scan traffic includes a custom `User-Agent` and `X-Scan-Authorized` header
- **No exploit storage** — Platform records that a vulnerability exists, not proof-of-concept payloads
- **ToS agreement** — Explicit authorized-use agreement signed at registration

### Data Retention & Privacy (GDPR)

| Data Type | Retention Period | Deletion Policy |
|---|---|---|
| User account data | Until account deletion | Deleted within 30 days of account deletion request |
| Quick scan results (free) | 90 days | Auto-purged after 90 days; users can delete anytime from dashboard |
| Deep audit reports (paid) | Permanent (as long as account exists) | Deleted on account deletion request |
| Raw tool output (ZAP, Nmap, etc.) | 7 days | Auto-purged — only the structured report persists long-term |
| PDF reports in GCS | Same as audit report | Deleted when parent report is deleted |
| Scan job logs | 30 days | Auto-purged via Cloud Logging retention policy |

**User Rights:**

- **Right to deletion:** Users can delete their account and all associated data from the dashboard. Triggers a cascade delete of all domains, scans, reports, and PDFs within 30 days.
- **Right to export:** Users can download all their report data as JSON or PDF from the dashboard.
- **Privacy policy:** Must clearly state what data is collected, how scan results are stored, and that raw tool output is purged after 7 days.
- **No third-party data sharing:** Scan results and vulnerability data are never shared with third parties or used for training AI models.

---

## 6. Feature Specification

### 6.1 Scan Engine

#### Vulnerability Categories Tested

The platform covers **18 vulnerability categories** — matching or exceeding the breadth of enterprise tools like Penti ($300+/mo) at a fraction of the cost ($29 one-time).

**Web Application Vulnerabilities (OWASP Top 10)**

| Category | What It Tests | Severity | Tool(s) |
|---|---|---|---|
| SQL Injection | Form fields, URL params, API inputs, blind SQL injection | Critical | ZAP |
| XSS (Cross-Site Scripting) | Reflected, stored, DOM-based XSS | High–Critical | ZAP |
| Command Injection | OS command injection via input fields and API params | Critical | ZAP |
| Broken Authentication | Weak passwords, missing rate limiting, session fixation, predictable tokens | High–Critical | ZAP, Nikto |
| IDOR | Insecure direct object references in URLs and API endpoints | High | ZAP |
| SSRF | Server-side request forgery via URL parameters | High | ZAP |
| Security Misconfiguration | Open admin panels, debug mode, directory listing, default credentials | Medium–High | Nikto, FFUF |

**Infrastructure & Network**

| Category | What It Tests | Severity | Tool(s) |
|---|---|---|---|
| Port & Service Discovery | Open ports, running services, OS fingerprinting | Medium–High | Nmap |
| SSL/TLS Issues | Certificate validity, expiry, weak cipher suites, protocol version | Medium–High | SSLyze |
| Security Headers | Missing CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy | Low–Medium | ZAP (passive), Nikto |
| CORS Misconfiguration | Overly permissive cross-origin policies, wildcard origins | Medium–High | ZAP |
| Cookie Security | Missing Secure/HttpOnly/SameSite flags on session cookies | Medium | ZAP (passive) |

**Data & Dependency Scanning**

| Category | What It Tests | Severity | Tool(s) |
|---|---|---|---|
| Sensitive Data Exposure | Exposed .env files, API keys in JS, hardcoded credentials, unencrypted data in transit | High–Critical | Nikto, FFUF, ZAP |
| Information Leakage | Server banners, error messages, stack traces, version disclosure in responses | Low–Medium | Nikto, Nmap |
| Outdated Dependencies & Known CVEs | Vulnerable JavaScript libraries (via page source analysis), known CMS vulnerabilities | Variable | ZAP (passive), Nikto |
| Hidden Endpoints & Files | Backup files, admin panels, config files, `.git` directories, `robots.txt` secrets | Medium–High | FFUF |

**API-Specific Testing**

| Category | What It Tests | Severity | Tool(s) |
|---|---|---|---|
| API Authorization | Unauthenticated endpoints, broken object-level authorization, missing auth on sensitive routes | High–Critical | ZAP |
| API Input Validation | Malformed payloads, oversized inputs, unexpected content types, parameter pollution | Medium–High | ZAP |

#### Available Tests (33+ Individual Checks)

For landing page and marketing copy: the platform runs **38 individual security tests**. Each test is a distinct check; findings are grouped into the 18 categories above for the report. Use this list for credibility (e.g. *"Over 33 security tests"*, *"38 checks covering OWASP Top 10 and more"*).

| # | Test | Category |
|---|---|---|
| 1 | SQL injection in form fields | SQL Injection |
| 2 | SQL injection in URL parameters | SQL Injection |
| 3 | SQL injection in API inputs | SQL Injection |
| 4 | Blind SQL injection | SQL Injection |
| 5 | Reflected XSS | XSS |
| 6 | Stored XSS | XSS |
| 7 | DOM-based XSS | XSS |
| 8 | OS command injection | Command Injection |
| 9 | Missing login rate limiting | Broken Authentication |
| 10 | Session fixation / predictable session tokens | Broken Authentication |
| 11 | Weak or missing password policy | Broken Authentication |
| 12 | Insecure direct object references (IDOR) | IDOR |
| 13 | Server-side request forgery (SSRF) | SSRF |
| 14 | Open admin panels / default paths | Security Misconfiguration |
| 15 | Debug mode or verbose errors enabled | Security Misconfiguration |
| 16 | Directory listing enabled | Security Misconfiguration |
| 17 | Default credentials / common backup paths | Security Misconfiguration |
| 18 | Open port scan | Port & Service Discovery |
| 19 | Service and version detection | Port & Service Discovery |
| 20 | Certificate validity and expiry | SSL/TLS |
| 21 | Weak cipher suites | SSL/TLS |
| 22 | Insecure TLS protocol (e.g. TLS 1.0) | SSL/TLS |
| 23 | Missing Content-Security-Policy (CSP) | Security Headers |
| 24 | Missing Strict-Transport-Security (HSTS) | Security Headers |
| 25 | Missing X-Frame-Options | Security Headers |
| 26 | Missing X-Content-Type-Options | Security Headers |
| 27 | Missing Referrer-Policy | Security Headers |
| 28 | Overly permissive CORS / wildcard origin | CORS Misconfiguration |
| 29 | Missing Secure/HttpOnly/SameSite on cookies | Cookie Security |
| 30 | Exposed .env or config files | Sensitive Data Exposure |
| 31 | API keys or credentials in client-side code | Sensitive Data Exposure |
| 32 | Server/version banners in responses | Information Leakage |
| 33 | Verbose error messages or stack traces | Information Leakage |
| 34 | Known CVEs in detected libraries or CMS | Outdated Dependencies |
| 35 | Hidden endpoints (backup files, .git, admin paths) | Hidden Endpoints & Files |
| 36 | Unauthenticated or under-protected API endpoints | API Authorization |
| 37 | Broken object-level authorization (BOLA) | API Authorization |
| 38 | Missing or weak API input validation | API Input Validation |

**Landing page copy suggestions:** *"38 security tests"*, *"Over 33 checks in every audit"*, *"Covers OWASP Top 10 plus infrastructure, headers, and API security — one audit, one price."*

#### Competitive Positioning

At $29 per audit, this platform delivers comparable scan coverage to Penti's $300/mo Launch plan and enterprise tools costing $5,000+ per engagement — made possible by fully automated AI orchestration with zero human pentesters in the loop. The trade-off: no human verification of findings (mitigated by conservative AI scoring and false-positive tracking) and no compliance certification (SOC 2 mapping is a post-MVP feature).

#### Open-Source Tool Stack (Zero Licensing Cost)

| Tool | Role | License |
|---|---|---|
| **OWASP ZAP** | Core web vulnerability scanner — active and passive modes, API scanning, passive analysis | Apache 2.0 |
| **Nmap** | Port scanning, service detection, OS fingerprinting | GPL |
| **Nikto** | Web server misconfiguration, known vulnerability checks, CMS detection | GPL |
| **SSLyze** | SSL/TLS certificate and cipher suite analysis | LGPL |
| **FFUF** | Directory and endpoint fuzzing — hidden paths, backup files, admin panels | MIT |
| **Playwright** | Crawls JavaScript-heavy SPAs, discovers all routes and dynamic content | Apache 2.0 |
| **WeasyPrint** | HTML/CSS to PDF rendering for audit reports | BSD |
| **Docker** | Sandboxed container environment for all tool execution | Various (free) |

All scanning tools are 100% free and open source. The only recurring costs are cloud compute, the Gemini API, and Clerk (free tier).

#### Scan Execution Flow

```
1. SUBMIT     User submits URL → job created in Cloud Tasks queue → scan ID returned to frontend
              → Redis key scan:{id}:status set to "queued"

2. RECON      Worker picks job → status updated to "crawling"
              → Playwright crawls site → builds full sitemap + endpoint list
              → FFUF runs directory fuzzing in parallel with crawl

3. SCAN       AI agent receives sitemap → status updated to "scanning"
              → spawns targeted tool runs IN PARALLEL:
                 - ZAP (active vulnerability scanning)
                 - Nmap (port/service discovery)
                 - Nikto (server misconfiguration checks)
                 - SSLyze (SSL/TLS analysis)
              → tools run as parallel subprocesses within the container
              → each tool has a 10-minute timeout (configurable)
              → raw outputs collected as each tool completes

4. INTERPRET  Status updated to "analyzing" → raw tool outputs sent to Gemini 2.5 Pro
              → deduplicated → classified by severity
              → plain-English summaries and remediation steps generated

5. REPORT     Structured JSON report saved to PostgreSQL → status updated to "generating_report"
              → WeasyPrint renders PDF from HTML template → stored in GCS
              → status set to "completed" → user notified via email → dashboard updated
```

#### Failure States & Error Handling

| Failure | User Experience | System Behavior |
|---|---|---|
| **Target unreachable** (DNS failure, server down) | Scan fails immediately with message: *"We couldn't reach your site. Please check the URL and try again."* | Job marked as `failed`, reason logged, no charge for deep scans (Stripe refund triggered automatically) |
| **Target blocks scan traffic** (WAF, Cloudflare challenge) | Partial results shown with warning: *"Some tests were blocked by your site's security firewall. Results may be incomplete."* | Scan completes with available data, report includes a "blocked tests" section listing what couldn't run |
| **Individual tool crash** (e.g., ZAP OOM) | Scan continues with remaining tools. Report notes: *"One scanning tool encountered an issue. Other tools completed successfully."* | Failed tool logged with error details, other tools' results used, finding coverage noted in report metadata |
| **Gemini API failure** | Scan paused, retried automatically up to 3 times. If all retries fail: *"Your scan completed but report generation failed. We're retrying automatically."* | Exponential backoff retry (5s, 15s, 45s). If all fail, raw results saved, job enters `retry_queue`, ops team alerted |
| **Scan timeout** (exceeds 45-minute max) | *"Your scan is taking longer than expected. We'll email you when it's ready."* | Cloud Run request timeout set to 60 minutes. At 45 min, graceful shutdown: save whatever results exist, generate partial report, flag as `partial` |
| **Payment succeeded but scan fails** | User receives email: *"Your audit encountered an issue. We're re-running it automatically."* | Auto-retry once. If second attempt fails, flag for manual review, issue Stripe refund within 24 hours |

#### Real-Time Progress Updates

The frontend displays live scan progress using **short polling** over REST (simplest to implement, sufficient for MVP).

- **Polling endpoint:** `GET /v1/scans/:id/status` — returns current phase, progress percentage, and a human-readable message
- **Polling interval:** Every 3 seconds during active scan, back off to every 10 seconds after 15 minutes
- **Data flow:** Worker writes status updates to Redis (`scan:{id}:status`) at each phase transition. The API reads from Redis on each poll — no database load.
- **Status payload:**

```json
{
  "status": "scanning",
  "phase": "nmap",
  "progress": 45,
  "message": "Scanning open ports and services...",
  "started_at": "2026-02-18T10:30:00Z",
  "estimated_remaining_seconds": 420
}
```

- **Phase progression:** `queued` → `crawling` → `scanning` → `analyzing` → `generating_report` → `completed` (or `failed` / `partial`)
- **Post-MVP upgrade path:** Replace polling with Server-Sent Events (SSE) for lower latency and reduced server load. WebSockets are unnecessary — the data flow is unidirectional (server → client).

### 6.2 Reporting

#### Security Score

Every report opens with a single score (0–100) calculated from the weighted severity of all findings.

**Scoring Algorithm:**

Start at 100 points. Deduct points per finding based on severity:

| Severity | Deduction per Finding | Cap (max deduction from this severity) |
|---|---|---|
| Critical | -25 points | -50 (2 critical = floor) |
| High | -15 points | -45 |
| Medium | -8 points | -24 |
| Low | -3 points | -12 |
| Informational | -0 points | 0 |

Final score = max(0, 100 − total deductions). Duplicate findings (same vulnerability type on different endpoints) count as a single finding for scoring purposes but are listed separately in the report.

**Grade Thresholds:**

| Score | Grade | Meaning |
|---|---|---|
| 90–100 | A — Excellent | No critical or high findings |
| 70–89 | B — Good | One or more high findings. Action within 30 days. |
| 50–69 | C — Fair | Multiple high findings. Action this week. |
| 30–49 | D — Poor | Critical vulnerability present. Immediate action. |
| 0–29 | F — Dangerous | Actively exploitable. Consider taking offline. |

#### Finding Cards

Each vulnerability is presented as a finding card with:

- **Severity Badge** — Critical / High / Medium / Low / Informational (color-coded)
- **Plain-English Title** — e.g. *"Your login page can be bypassed with a simple trick"*
- **What This Means** — 2–3 sentences for a non-technical reader
- **What a Hacker Could Do** — Concrete real-world impact description
- **Technical Detail** — Collapsible section with raw technical finding for developers
- **How to Fix It** — Step-by-step remediation instructions
- **Estimated Fix Time** — Easy / Medium / Hard with estimated developer hours

#### Free vs. Paid Report Access

| | Free (Quick Scan) | Paid (Deep Audit — $29) |
|---|---|---|
| Security Score | ✅ Shown | ✅ Shown |
| Issue count by severity | ✅ Shown | ✅ Shown |
| 1 low-severity finding | ✅ Unlocked | ✅ Unlocked |
| All other findings | 🔒 Blurred | ✅ Fully unlocked |
| Remediation guidance | 🔒 Locked | ✅ Full detail |
| PDF export | ❌ | ✅ |
| Shareable report link | ❌ | ✅ |
| Report validity | 90 days (on dashboard) | Permanent |

### 6.3 User Dashboard

- **Domain manager** — All verified domains with current security score and last scan date
- **Scan history** — Timeline of all past scans per domain
- **Score trend chart** — Visual graph of security posture over time
- **Finding tracker** — Mark findings as In Progress or Fixed, re-scan to verify
- **Report archive** — Download or share any previous report

---

## 7. Tech Stack

### Overview

The stack is split across two repositories — a TypeScript/Next.js frontend and a Python backend — hosted entirely on Google Cloud Platform.

```
Repos
├── security-audit-web        # Next.js frontend (TypeScript)
└── security-audit-backend    # FastAPI + scan worker (Python)
```

Two repos instead of a monorepo is the right call here because the frontend and backend have different deployment cycles, different languages, different Docker requirements, and the Python backend/worker are so tightly coupled they belong together. Type safety across the boundary is handled via OpenAPI codegen (FastAPI auto-generates the schema; a codegen step in the frontend repo produces TypeScript types automatically).

---

### Frontend — `security-audit-web`

#### Next.js 14 (App Router)

The primary framework for the user-facing application.

- **Why Next.js:** Server-side rendering for fast initial loads and good SEO on the marketing pages. The App Router gives clean layouts for the dashboard vs. public-facing pages. API routes handle lightweight frontend-adjacent logic without needing a separate server.
- **Deployment:** Vercel (zero-config deploys, edge network, preview deployments per PR) or Google Cloud Run if you want everything on GCP.
- **Key pages:** Homepage with URL input, scan progress screen, results/report page, user dashboard, domain management, pricing/upgrade page.

#### Tailwind CSS

Utility-first CSS framework. No separate CSS files to manage. Fast to build with. Consistent design system from day one. Works natively with Next.js.

#### shadcn/ui

Pre-built, unstyled component library built on Radix UI primitives. Components like tables, modals, badges, progress bars, and cards are used extensively across the dashboard and report pages. Fully customizable — you own the code, not a third-party dependency.

#### Clerk

Managed authentication service. Handles sign up, login, session management, OAuth providers (Google, GitHub), email verification, and pre-built UI components (sign-in, sign-up, user button).

- **Why Clerk:** Pre-built UI components save 2–3 days of frontend development. Native cross-language support — Clerk's Python SDK (`clerk-backend-api`) allows the FastAPI backend to validate sessions and access user data without custom JWT plumbing. Free up to 10,000 MAUs, which is well beyond MVP needs (one-time scan users have low monthly active rates). 15-minute setup with the Next.js middleware adapter.
- **Integration:** Clerk middleware on Next.js handles frontend auth. The Python backend validates Clerk session tokens via the Clerk Python SDK or by verifying Clerk-issued JWTs with the public key. Both sides share the same `userId` as the foreign key into application tables.
- **Trade-off:** Vendor dependency and per-user pricing at scale. If costs become an issue post-growth, migrate to a self-hosted solution like BetterAuth. For MVP velocity, this trade-off is worth it.
- **Setup time:** ~2 hours for a competent full-stack developer.

#### Drizzle ORM (Frontend — read-only)

Used on the frontend for direct DB reads in server components and API routes (e.g., fetching scan results, report data for display). Drizzle does **not** own migrations — it operates in read-only mode against the schema defined by the Python backend.

- **Why Drizzle over Prisma:** Drizzle generates pure, readable SQL. No magic, no abstraction surprises. TypeScript-native with excellent type inference. Lightweight — no separate query engine process.
- **Schema sync:** Drizzle schema file is manually kept in sync with the SQLAlchemy models in the Python backend. The Python backend is the single source of truth for the database schema (see below).

#### Simple Analytics

Privacy-first, lightweight analytics. Tracks pageviews and basic custom events (scan submitted, upgrade clicked, report downloaded). GDPR-compliant by design — no cookie banner required.

- **Limitation to know:** Not suitable for deep funnel analysis or cohort tracking. If you need that later, add Mixpanel or PostHog alongside it. For MVP it's sufficient.

---

### Backend — `security-audit-backend`

#### Python + FastAPI

The core API server handling all business logic.

- **Why Python:** Every security scanning tool in the stack (ZAP, Nmap, Nikto, SSLyze) has mature Python bindings and automation libraries. The Google AI SDK (Gemini) is Python-first. It's the natural language for security tooling.
- **Why FastAPI:** Modern, async-native Python framework. Auto-generates OpenAPI schema from your Pydantic models — this is how TypeScript types stay in sync with the backend without manual effort. Fast, well-documented, and production-proven.
- **API versioning:** All endpoints are prefixed with `/v1/` (e.g., `/v1/scans`). This allows non-breaking API evolution. The OpenAPI spec includes the version prefix, so generated TypeScript types are version-aware.
- **Key endpoints:** `POST /v1/scans` (create scan job), `GET /v1/scans/:id` (poll status), `GET /v1/scans/:id/status` (lightweight progress polling), `GET /v1/reports/:id` (fetch report), `POST /v1/domains/verify` (trigger verification check), `POST /webhooks/stripe` (payment events — unversioned, Stripe-controlled).

#### Pydantic

Data validation layer for FastAPI. Every request and response is typed and validated. Pydantic models also serve as the source of truth for the OpenAPI schema that generates TypeScript types in the frontend repo.

#### PostgreSQL (Google Cloud SQL)

Primary database. Stores users, domains, scan jobs, scan results, finding records, and report metadata.

- **Why Cloud SQL:** Managed PostgreSQL on GCP. Automatic backups, point-in-time recovery, read replicas when needed. No database operations overhead for your team.
- **Schema key tables:** `users`, `domains`, `domain_verifications`, `scan_jobs`, `scan_findings`, `reports`, `payments`.

#### SQLAlchemy + Alembic (Backend — source of truth)

The Python backend uses **SQLAlchemy** for all database access and **Alembic** for schema migrations. This is the single source of truth for the database schema.

- **Why SQLAlchemy owns migrations:** The Python backend is the primary database consumer — it writes scan results, manages domain verifications, records payments, and handles all business logic. Having the primary consumer own the schema eliminates the dual-ORM sync problem.
- **Migration workflow:** Developer creates/modifies SQLAlchemy models → runs `alembic revision --autogenerate` → reviews and applies migration → updates the Drizzle schema file in the frontend repo to match. The Drizzle schema update is a lightweight manual step since the frontend only reads a subset of tables.
- **Key models:** `User`, `Domain`, `DomainVerification`, `ScanJob`, `ScanFinding`, `Report`, `Payment`.

#### Redis (Google Cloud Memorystore)

Used for two purposes:
1. **Scan status caching** — The frontend polls for scan progress every few seconds. Rather than hitting PostgreSQL on every poll, the worker writes status updates to Redis (`scan:{id}:status`). Fast, cheap, and doesn't hammer the database.
2. **Rate limiting** — Track scan counts per user/IP to enforce limits.

#### Google Cloud Tasks

Managed job queue for scan jobs. When a user submits a URL, the API creates a Cloud Tasks task rather than running the scan synchronously. A worker service picks up the task and runs the scan in the background.

- **Why Cloud Tasks over BullMQ/Redis queue:** Native GCP service. No extra infrastructure to manage. Built-in retries, dead-letter queues, and rate limiting. Scales automatically. Since you're already on GCP, it's the simplest choice.

#### Scan Worker (Python, same repo as API)

A separate Python process (deployed as a dedicated **Cloud Run Service**) that receives HTTP push requests from Cloud Tasks, orchestrates the security tools, calls Gemini, and writes results back to PostgreSQL.

```
worker/
├── main.py              # Entry point — receives Cloud Tasks HTTP push
├── orchestrator.py      # AI agent logic — decides what tools to run
├── tools/
│   ├── zap.py           # OWASP ZAP automation
│   ├── nmap.py          # Nmap automation
│   ├── nikto.py         # Nikto automation
│   ├── sslyze.py        # SSLyze automation
│   ├── ffuf.py          # FFUF directory/endpoint fuzzing
│   └── crawler.py       # Playwright crawler
├── parser.py            # Normalizes raw tool output into structured format
├── reporter.py          # Calls Gemini API, generates finding cards + WeasyPrint PDF
└── Dockerfile           # Container with all tools pre-installed
```

The worker runs as a Docker container with ZAP, Nmap, Nikto, SSLyze, FFUF, and Playwright all pre-installed. Each scan gets its own container instance — complete isolation between scans.

---

### AI Orchestration — Gemini 2.5 Pro

The AI layer is what transforms raw, unreadable security tool output into a professional, plain-English report.

#### Why Gemini 2.5 Pro

- **Context window:** Massive context window handles the full raw output from ZAP, Nmap, and Nikto in a single API call without chunking — critical because security scan output can be very large.
- **Reasoning quality:** 2.5 Pro has significantly better reasoning than earlier models, which matters for correctly classifying severity and generating accurate remediation steps.
- **GCP native:** Runs on Google AI Studio / Vertex AI — same billing account as the rest of your infrastructure, no additional vendor relationship.
- **Cost:** Roughly $0.15–0.40 per deep scan at current API pricing. At $29 per audit, the AI cost represents less than 2% of revenue per scan.

#### How the AI is Used

The AI is called at two points in the scan pipeline:

**Step 1 — Orchestration (before scanning):** Given the crawled sitemap and endpoint list, Gemini decides which tools to prioritize and what parameters to use. For example, if it detects a WordPress site, it prioritizes CMS-specific checks. If it finds an API, it focuses ZAP on the API endpoints.

**Step 2 — Interpretation (after scanning):** The raw outputs from all tools are passed to Gemini with a structured prompt. Gemini's job is to:
- Deduplicate findings (multiple tools often report the same issue)
- Classify each finding by severity (Critical / High / Medium / Low)
- Write a plain-English title and description for each finding
- Generate specific, actionable remediation steps
- Write the executive summary and calculate the security score

#### Prompt Strategy

The interpretation prompt follows this structure:

```
System: You are a senior security auditor. Your job is to analyze raw 
security scan output and produce a structured report for a non-technical 
business owner. You must be accurate, avoid false positives, and write 
in clear plain English.

User: Here is the raw output from security scans of [domain]:

[ZAP output]
[Nmap output]  
[Nikto output]
[SSLyze output]

Produce a JSON report following this exact schema: [schema]
```

Gemini returns structured JSON that maps directly to the database schema — no free-form text that needs further parsing.

---

### Infrastructure & DevOps

#### Google Cloud Run

Hosts both the FastAPI backend and the scan workers as containerized services.

- **API service:** Cloud Run service. Handles HTTP requests. Auto-scales based on traffic.
- **Worker service:** Separate Cloud Run **service** (not a Job). Receives HTTP push requests from Cloud Tasks. Each request triggers one scan execution. Set `concurrency=1` so each container instance handles exactly one scan at a time — complete isolation. Cloud Run auto-scales by spinning up additional instances for concurrent scans.
- **Why Cloud Run Service over Cloud Run Job:** Cloud Tasks pushes work via HTTP to a service endpoint. Cloud Run Jobs are batch processes triggered via the Jobs API, not via incoming HTTP. Since our queue (Cloud Tasks) delivers work as HTTP requests, a Cloud Run Service is the correct target.
- **Cold start mitigation:** Set `min-instances=1` to keep one warm container ready at all times (~$10–15/mo). Combined with multi-stage Docker builds and aggressive layer caching to keep the worker image under 2GB. For the heavyweight image (ZAP + Nmap + Nikto + SSLyze + FFUF + Playwright), use a common base image layer shared across builds.

#### Docker

Every component runs in Docker containers.

- **API container:** Python + FastAPI + dependencies (~200MB, fast cold starts)
- **Worker container:** Python + ZAP + Nmap + Nikto + SSLyze + FFUF + Playwright + WeasyPrint + all Python dependencies. This is the heavyweight container (~1.5–2GB). Use multi-stage builds: install OS-level tools in the base stage, Python dependencies in a second stage, and application code in the final stage. Pin base image versions and cache aggressively.

#### Google Cloud Storage

Stores generated PDF reports. Each report gets a signed URL with an expiry — users access their reports through the dashboard, which generates a fresh signed URL on each view.

#### Stripe

Handles all payment logic — one-time Checkout sessions per audit, payment confirmation webhooks, and receipt emails. Since there are no subscriptions, the integration is simpler than typical SaaS: user clicks pay, Stripe Checkout opens, payment succeeds, webhook fires to queue the deep scan, done. No subscription management UI needed.

#### Resend

Transactional email. Used for:
- Scan completion notification: *"Your scan of example.com is ready"*
- Domain verification instructions
- Payment receipt confirmation
- Account welcome email

#### WeasyPrint

Python-native HTML/CSS to PDF rendering library. Used by the worker to generate audit report PDFs.

- **Why WeasyPrint:** The report is styled HTML — WeasyPrint converts it directly to PDF with support for headers, footers, page numbers, and proper print styling. Lighter and faster than Playwright-based PDF rendering. No headless browser required. Open source (BSD license).
- **Workflow:** Gemini generates structured JSON → worker renders JSON into an HTML template → WeasyPrint converts HTML to PDF → PDF uploaded to GCS.

#### Google Cloud Logging

Native GCP logging. Captures all API requests, worker logs, scan errors, and AI API calls. Set up alerts for scan failure rates exceeding 5% and worker crash rates.

---

### Cost Model

| Cost Item | Estimate | Notes |
|---|---|---|
| Google Cloud SQL | ~$25/month | Shared-core instance, sufficient for MVP |
| Google Cloud Run (API) | ~$5–15/month | Auto-scales based on traffic |
| Google Cloud Run (Worker) | ~$10–15/month + ~$0.10–0.30 per scan | min-instances=1 for warm container + per-scan compute |
| Google Cloud Memorystore (Redis) | ~$15/month | Basic tier |
| Gemini 2.5 Pro API | ~$0.15–0.40 per deep scan | Largest per-scan variable cost |
| Google Cloud Storage | ~$1–5/month | PDF storage |
| Resend | Free (3k emails/month) | Sufficient for early growth |
| Clerk | Free | Free up to 10,000 MAUs |
| Vercel (Frontend) | Free | Hobby tier covers MVP traffic |
| **Total at 0 paid users** | **~$75/month** | Fixed baseline infra cost |
| **Total at 100 paid audits/month** | **~$225–375/month** | Infra + per-scan variable costs |

At $29 per audit, 100 paid audits/month = $2,900 revenue against ~$300 infra cost. Very healthy margin. Revenue scales linearly with scan volume.

---

## 8. System Architecture

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
┌──────────────────────────▼──────────────────────────────────┐
│              NEXT.JS FRONTEND (Vercel / Cloud Run)          │
│         Clerk  │  Drizzle (read-only)  │  Simple Analytics      │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST API
┌──────────────────────────▼──────────────────────────────────┐
│              FASTAPI BACKEND (Cloud Run)                    │
│         Clerk Session Validation (Python SDK)                │
│         Stripe Webhooks  │  Domain Verification             │
└──────┬──────────────┬────┴──────────────┬───────────────────┘
       │              │                   │
       ▼              ▼                   ▼
┌──────────┐   ┌─────────────┐   ┌───────────────┐
│PostgreSQL│   │Cloud Tasks  │   │Cloud Memorystore│
│(Cloud SQL)│  │(Job Queue)  │   │(Redis Cache)  │
└──────────┘   └──────┬──────┘   └───────────────┘
                      │ Triggers
┌─────────────────────▼───────────────────────────────────────┐
│              SCAN WORKER (Cloud Run Service, concurrency=1) │
│                                                             │
│  ┌──────────┐ ┌─────┐ ┌──────┐ ┌──────┐ ┌───────┐ ┌──────┐│
│  │Playwright│ │ ZAP │ │ Nmap │ │Nikto │ │SSLyze │ │ FFUF ││
│  └──────────┘ └─────┘ └──────┘ └──────┘ └───────┘ └──────┘│
│                           │                                 │
│              ┌────────────▼────────────┐                   │
│              │   Gemini 2.5 Pro API    │                   │
│              │  (Orchestrate + Report) │                   │
│              └────────────┬────────────┘                   │
└───────────────────────────┼─────────────────────────────────┘
                            │ Results
              ┌─────────────▼────────────┐
              │  PostgreSQL + GCS (PDF)  │
              └──────────────────────────┘
```

### Repository Structure

**`security-audit-web` (TypeScript)**
```
security-audit-web/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              # Homepage — URL submission
│   │   └── pricing/page.tsx
│   ├── (app)/
│   │   ├── dashboard/page.tsx    # User dashboard
│   │   ├── scans/[id]/page.tsx   # Scan progress + results
│   │   └── domains/page.tsx      # Domain management
│   └── api/
│       ├── auth/                 # Clerk webhook handler
│       └── stripe/webhook/       # Stripe webhook proxy
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── scan/                     # Scan-specific components
│   │   ├── ScoreRing.tsx
│   │   ├── FindingCard.tsx
│   │   └── ScanProgress.tsx
│   └── dashboard/
├── lib/
│   ├── auth.ts                   # Clerk config + middleware
│   ├── db/
│   │   ├── schema.ts             # Drizzle schema (read-only, mirrors SQLAlchemy models)
│   │   └── index.ts              # DB client
│   └── api-client.ts             # Generated from OpenAPI schema
├── generated/
│   └── api-types.ts              # Auto-generated from FastAPI OpenAPI spec
└── package.json
```

**`security-audit-backend` (Python)**
```
security-audit-backend/
├── api/
│   ├── main.py                   # FastAPI app entry point
│   ├── routers/
│   │   ├── scans.py              # POST /scans, GET /scans/:id
│   │   ├── reports.py            # GET /reports/:id
│   │   ├── domains.py            # Domain verification
│   │   └── webhooks.py           # Stripe one-time payment webhooks
│   ├── models/                   # Pydantic models (generates OpenAPI)
│   ├── db/                       # SQLAlchemy models + Alembic migrations + connection
│   └── middleware/               # Clerk session validation, rate limiting
├── worker/
│   ├── main.py                   # Cloud Tasks HTTP push handler
│   ├── orchestrator.py           # AI agent logic
│   ├── tools/
│   │   ├── zap.py
│   │   ├── nmap.py
│   │   ├── nikto.py
│   │   ├── sslyze.py
│   │   ├── ffuf.py
│   │   └── crawler.py
│   ├── parser.py                 # Normalize raw tool output
│   └── reporter.py               # Gemini API calls + WeasyPrint PDF generation
├── alembic/                      # Database migrations (source of truth)
│   ├── versions/
│   └── env.py
├── Dockerfile.api
├── Dockerfile.worker             # Heavyweight — includes all security tools
├── docker-compose.yml            # Local development
└── requirements.txt
```

---

## 9. Monetization & Pricing

The MVP uses a simple freemium + one-time payment model. No subscriptions, no recurring billing, no commitment. This is intentional — the primary audience (vibe coders, AI app builders) responds better to low-friction, pay-as-you-go pricing than to monthly commitments.

### Pricing Model

| | Quick Scan | Deep Audit |
|---|---|---|
| **Price** | Free — always | $29 one-time per audit |
| **Scan Type** | Passive only | Full active testing |
| **Domain Verification** | Not required | Required |
| **Full Report** | No — teaser only | Yes — complete |
| **Finding Detail** | Score + issue count + 1 finding | All findings unlocked |
| **Remediation Steps** | No | Yes — step-by-step |
| **PDF Export** | No | Yes |
| **Shareable Report Link** | No | Yes |
| **Report Validity** | 7 days | Permanent |

### Why One-Time Pricing

- **Zero commitment barrier** — vibe coders just want to check their app once, not sign up for a monthly tool they may not need again for months
- **Natural repeat purchase** — every time they ship something new or make significant changes, they buy another audit
- **Lower CAC** — no need to convince someone of long-term value; the single $29 decision is easy
- **Word of mouth friendly** — easy to share ("just pay $29 and get your app checked")

### Unit Economics

| Item | Cost per Deep Audit |
|---|---|
| Gemini 2.5 Pro API | ~$0.20–0.40 |
| Cloud Run compute | ~$0.10–0.30 |
| PDF storage + delivery | ~$0.01 |
| **Total cost** | **~$0.31–0.71** |
| **Revenue** | **$29.00** |
| **Gross margin** | **~97%** |

### Future Pricing (Post-MVP)

Once repeat purchase patterns are established and user base reaches sufficient scale:

1. **Audit Pack** — 5 audits for $99 (for agency owners and frequent builders)
2. **Monthly subscription** — Unlimited scans for a monthly fee (introduce only when data shows users auditing more than once per month and retention metrics justify recurring billing)
3. **Compliance add-on** — SOC 2 / ISO 27001 report mapping as a premium upsell

---

## 10. Core User Flows

### Flow 1 — New User, Free Quick Scan

1. User lands on homepage, sees a URL input field prominently displayed
2. User types their website URL and clicks **Scan Now**
3. User is prompted to create a free account (email + password or Google OAuth via Clerk) or log in if they already have one
4. After authentication, user checks a consent checkbox: *"I confirm I own or have permission to scan this domain"* and accepts ToS
5. Scan begins — user sees a real-time progress screen showing what the agent is doing (*"Crawling pages... Testing SSL certificate... Checking security headers..."*)
6. After 2–5 minutes, user is redirected to their results page
7. User sees Security Score, count of issues per severity, and one unlocked low-severity finding
8. All other findings are blurred with a lock icon and a **Get Full Audit — $29** CTA
9. Scan results are saved to the user's dashboard permanently (free scans) for future reference

### Flow 2 — User Purchases a Deep Audit

1. User on the quick scan results page clicks **Get Full Audit — $29**
2. First-time on this domain: prompted to verify domain ownership (DNS TXT record, file upload, or meta tag)
3. Stripe Checkout opens — user pays $29 (one-time, no subscription)
4. On successful payment, Stripe webhook fires → backend queues the deep scan job
5. User sees a waiting screen: *"Your deep audit is running — we'll email you when it's ready (usually 15–30 min)"*
6. Email arrives with link to full report
7. Full report loads with all findings unlocked, remediation steps, and PDF download available

### Flow 3 — Returning User, New Audit

1. Logged-in user goes to their dashboard
2. Sees list of past audits with scores and dates
3. Clicks **New Audit** → enters a URL (verified domains skip verification step)
4. Stripe Checkout opens for another $29 one-time payment
5. Same flow as above — scan queued, email on completion

---

## 11. MVP Scope

### In Scope

- Domain verification (DNS TXT record, file upload at `/.well-known/security-verify.txt`, and HTML meta tag)
- Quick Scan — passive checks, authentication required, ToS consent, always free
- Deep Scan — active testing across all 18 vulnerability categories, domain verification required, $29 one-time
- Full vulnerability coverage: SQL injection, XSS, command injection, broken auth, IDOR, SSRF, security misconfig, port/service discovery, SSL/TLS, security headers, CORS, cookie security, sensitive data exposure, information leakage, dependency CVEs, hidden endpoints, API auth, API input validation
- Security Score (0–100) with weighted algorithm + finding cards with plain-English descriptions and remediation
- One-time payment gate via Stripe Checkout — no subscription billing
- User authentication (Clerk — email/password + Google OAuth) — required for all scans
- User dashboard with audit history and domain management
- Email notifications on scan completion (Resend)
- PDF report generation (WeasyPrint) and download (paid audits)
- Shareable report link (paid audits)
- REST API endpoint scanning — headers, auth, input validation, common vulnerabilities
- Domain blocklist for protected targets
- Real-time scan progress polling via Redis
- Failure handling — partial reports, auto-retry, refunds for failed paid scans
- Data retention policy and user data deletion capability (GDPR)

### Out of Scope (Post-Launch Roadmap)

- Monthly subscription / audit pack pricing (5 audits for $99) — revisit when repeat purchase data is available
- Mobile app scanning
- White-label / agency reseller portal
- Slack, Jira, GitHub integrations
- CI/CD pipeline integration (scan on every deployment)
- Compliance reporting (SOC2, PCI-DSS, HIPAA mapping)
- Custom scan rules or configurations
- Developer finding assignment and commenting workflow
- Authenticated area scanning (user provides test credentials for scanning behind login pages)
- Re-scan to verify fixes (mark finding as fixed + trigger targeted re-scan)
- Server-Sent Events (SSE) for real-time progress (replace polling)

---

## 12. Success Metrics

| Metric | Month 3 Target | Month 6 Target |
|---|---|---|
| Free quick scans completed | 500 / month | 2,000 / month |
| Free → Paid audit conversion | 5% | 10% |
| Paid audits purchased | 25 / month | 200 / month |
| Scan completion rate | > 90% | > 95% |
| Avg. scan time (Quick) | < 5 min | < 3 min |
| Report clarity score | 4.0 / 5.0 | 4.5 / 5.0 |
| False positive rate | < 15% | < 8% |
| Revenue (one-time audits) | ~$725 / month | ~$5,800 / month |
| Repeat purchase rate | — | > 20% of buyers |

---

## 13. Risks & Mitigations

| Risk | Description | Mitigation |
|---|---|---|
| **Legal liability** | Platform used to scan sites without permission | Domain verification for active scans + ToS + blocklist |
| **False positives** | Reporting vulnerabilities that don't exist erodes user trust | Conservative scoring, Gemini double-check pass, user feedback loop |
| **Scan abuse** | Bad actor uses platform as a hacking tool | Rate limiting, account verification, anomaly detection on scan patterns |
| **IP blocks** | Target servers blocking scan traffic | Rotate IPs, flag in report when blocked, graceful degradation |
| **AI hallucinations** | Gemini generates incorrect remediation advice | Ground AI output strictly in tool results, structured JSON output schema, human review queue for critical findings |
| **High infra costs** | Security scanning is compute-heavy | Queue-based scanning, Cloud Run billed per-second, cost per scan monitoring, spending alerts |
| **ZAP licensing change** | ZAP is now Checkmarx-backed — could change | Apache 2.0 is permanent for existing versions; monitor for changes; Nikto + custom scripts as fallback |

---

## 14. Testing Strategy

### Scan Accuracy Validation

- **Baseline test suite:** Maintain a set of 5–10 intentionally vulnerable test applications (e.g., OWASP Juice Shop, DVWA, WebGoat) as scan targets. Run the full scan pipeline against these on every worker container build to catch regressions.
- **False positive tracking:** Every report includes a "Report an inaccuracy" button. User feedback is logged and reviewed weekly. Target: <15% false positive rate at month 3, <8% at month 6.
- **Gemini output validation:** Each Gemini response is validated against a JSON schema before being accepted. If validation fails, the response is rejected and retried with a stricter prompt.

### Automated Tests

| Layer | Tool | What's Tested |
|---|---|---|
| Backend unit tests | pytest | Pydantic models, score algorithm, parser logic, domain verification |
| Backend integration tests | pytest + testcontainers | Full scan pipeline against a local vulnerable app, DB operations, Cloud Tasks mock |
| Frontend unit tests | Vitest | Component rendering, API client, state management |
| Frontend E2E tests | Playwright | Full user flows — sign up, submit scan, view results, purchase audit |
| Worker tests | pytest | Individual tool wrappers (ZAP, Nmap, etc.) against known targets |
| API contract tests | schemathesis | Auto-generated tests from OpenAPI spec to catch request/response mismatches |

### CI/CD

- Run unit tests on every PR. Integration tests run nightly or on merge to main.
- Worker container builds trigger the baseline vulnerability scan suite before deployment.
- E2E tests run against staging environment before production deploy.

---

## 15. Build Timeline

| Sprint | Deliverables |
|---|---|
| **Sprint 1** | Repo setup, GCP project, Cloud SQL + Redis, Clerk auth integration, domain verification flow |
| **Sprint 2** | FastAPI skeleton, Pydantic models, OpenAPI → TypeScript codegen pipeline, Stripe one-time Checkout integration |
| **Sprint 3** | Docker worker container with all tools installed (ZAP, Nmap, Nikto, SSLyze, FFUF, Playwright), Cloud Tasks queue, basic ZAP + Nmap integration |
| **Sprint 4** | Gemini 2.5 Pro orchestration, raw output parsing, JSON report generation, score algorithm |
| **Sprint 5** | Frontend — homepage, scan flow, real-time progress polling, results page with finding cards |
| **Sprint 6** | Dashboard, domain management, payment gate, PDF export, shareable report links, email notifications |
| **Sprint 7** | QA, security hardening, blocklist, rate limiting, load testing, baseline vulnerability test suite (OWASP Juice Shop, DVWA), fix false positives |
| **Launch** | Private beta with 20 target users — iterate on report quality and UX before public launch |

---

## Next Steps

1. **Name the product** — needed before domain registration and branding work begins
2. **Validate pricing** — show the $29 one-time price point to 5 vibe coders / AI builders before building
3. **Set up GCP project** — Cloud SQL, Cloud Run, Cloud Tasks, Memorystore, GCS
4. **Build Sprint 1** — auth + domain verification is the logical starting point; unblocks everything else
5. **Test Gemini 2.5 Pro on sample data** — feed it real ZAP output and evaluate report quality before committing to the architecture

---

*Document maintained by product team. Update version number on each significant change.*
