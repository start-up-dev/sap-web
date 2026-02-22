# ShipSafe (Security Audit Platform - SAP)

ShipSafe is an AI-powered, automated security auditing platform designed for business owners, "vibe coders," and AI app builders. It enables users to submit a website or REST API URL and receive a detailed vulnerability report interpreted into plain English by Gemini 2.5 Pro.

## Project Overview

- **Core Mission:** Provide affordable, understandable, and fast security audits ($29 one-time) as an alternative to expensive traditional pentesting.
- **Technology Stack:**
  - **Frontend:** Next.js 16.1.6 (App Router), React 19, TypeScript.
  - **Styling:** Tailwind CSS v4, Framer Motion (animations), Lucide React (icons).
  - **Authentication:** Clerk (Email/Password + Google/GitHub OAuth).
  - **Backend (External):** FastAPI (Python) running at `localhost:8000`.
  - **AI Integration:** Gemini 2.5 Pro (for report orchestration and interpretation).
  - **Security Tools (Worker):** OWASP ZAP, Nmap, Nikto, SSLyze, FFUF, Playwright.

## Directory Structure

- `app/`: Next.js App Router pages and layouts.
- `components/landing/`: Modular React components for the landing page (Hero, Features, Pricing, etc.).
- `content/`: `landing.ts` serves as the single source of truth for all marketing copy.
- `public/`: Static assets (SVGs, images).
- `FRONTEND_API_GUIDELINE.md`: Detailed instructions for backend integration, authentication, and polling.
- `security_audit_platform_PRD.md`: Full product requirements, including the legal framework, scanning model, and scoring algorithm.

## Key Developer Workflows

### Building and Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Lint the project
npm run lint
```

### Development Conventions

1.  **Content-First:** Marketing copy should be edited in `content/landing.ts` rather than directly in components.
2.  **Tailwind v4:** Use modern Tailwind v4 syntax. Configuration is handled in `postcss.config.mjs` and `app/globals.css`.
3.  **Type Safety:** Generate TypeScript types from the FastAPI OpenAPI schema (see `FRONTEND_API_GUIDELINE.md`).
4.  **UI Components:** Use and extend `shadcn/ui` components (based on Radix UI).
5.  **Authentication:** Use Clerk's `<SignedIn>`, `<SignedOut>`, and `useAuth()` hooks for session management.

## Backend Integration Details

- **Auth Header:** `Authorization: Bearer <clerk_session_token>`
- **Scan Flow:**
  1. `POST /v1/scans` (Create)
  2. `GET /v1/scans/{id}/status` (Poll every 3s)
  3. `GET /v1/reports/{scan_id}` (View)
- **Deep Audits:** Require domain verification via DNS TXT, file upload, or meta tag before initiation.

## Important Documentation

- Refer to `security_audit_platform_PRD.md` for the 18 vulnerability categories and scoring logic.
- Refer to `FRONTEND_API_GUIDELINE.md` for exact API response models and error handling.
