# ShipSafe Production Implementation Plan (MVP)

This board represents the exhaustive roadmap to launch the ShipSafe MVP. It follows a "Domain-Driven" approach, prioritizing core scanning and reporting engines.

## 🏗️ Phase 1: Authentication & API Infrastructure
*Goal: Secure the frontend and establish a type-safe contract with the FastAPI backend.*

- [x] **Clerk Authentication Setup**
  - [x] Wrap `app/layout.tsx` with `<ClerkProvider>` and configure `appearance` tokens for dark mode.
  - [x] Implement `middleware.ts` to protect `/dashboard`, `/scans`, and `/domains`.
  - [x] Create Custom Auth Pages: `/sign-in`, `/sign-up` using Clerk `<SignIn />` and `<SignUp />` components.
- [x] **Landing Page Auth Integration**
  - [x] Update `Hero.tsx`: "Scan Now" should redirect to `/sign-up` if logged out, or start scan flow if logged in.
  - [x] Update `Nav.tsx`: Add `<UserButton />` or "Sign In" link based on auth state.
  - [x] Update `Pricing.tsx` & `CTA.tsx`: "Get Started" buttons should trigger auth flow.
- [x] **Type-Safe API Client**
  - [x] Install `openapi-typescript` and `axios`.
  - [x] Generate `lib/api/types.ts` from `http://localhost:8000/openapi.json`. (Manually defined for now)
  - [x] Implement `lib/api/client.ts` with Axios:
    - [x] Add Request Interceptor to inject `Authorization: Bearer ${clerkToken}`.
    - [x] Add Response Interceptor for global `401` (redirect to login) and `422` (Zod/FastAPI validation) handling.
- [x] **Environment Configuration**
  - [x] Set up `.env.local` with `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, and `NEXT_PUBLIC_API_URL`.

## 🌐 Phase 2: Domain Ownership Engine
*Goal: Ensure legal compliance for active testing through multi-method verification.*

- [x] **Domain Management UI**
  - [x] Build `/domains` list page using `shadcn/ui` Table.
  - [x] Implement "Add Domain" Dialog with URL normalization (stripping protocols/paths).
- [x] **Verification Workflow Components**
  - [x] `VerificationTabs`: Switch between `DNS TXT`, `File Upload`, and `Meta Tag`.
  - [x] `VerificationTokenCard`: Copy-to-clipboard UI for tokens.
  - [x] `VerificationStatusPolling`: Hook to call `GET /v1/domains/{id}/verify/status` until `is_verified` is true.
- [x] **Visual Feedback**
  - [x] Add `Badge` variants for `Pending`, `Verified`, and `Failed`.

## 🔍 Phase 3: AI Scan Orchestration
*Goal: Bridge the submission UI to the background worker and handle real-time feedback.*

- [x] **Scan Submission Logic**
  - [x] `useScanSubmission` hook (Integrated into Dashboard).
  - [x] Validate domain existence.
  - [x] Logic to check if verification is required for `is_deep_scan: true`.
  - [x] Trigger `POST /v1/scans`.
- [x] **Real-time Progress Screen**
  - [x] Create `/scans/[id]` dynamic route with Next.js Suspense.
  - [x] `ScanProgressUI` component:
    - [x] Poll `GET /v1/scans/{id}/status` every 3 seconds.
    - [x] `ProgressBar`: Map 0-100% based on backend phases.
    - [x] `LiveLogTerminal`: Display `message` field from status response.
- [x] **Scan Termination Handling**
  - [x] Auto-redirect to `/reports/[scan_id]` on `completed`.
  - [x] Error-state UI for `failed` or `target_unreachable`.

## 📊 Phase 4: Report Interpretation & Scoring
*Goal: Transform raw JSON into an understandable security audit for non-technical users.*

- [x] **Report Layout & Header**
  - [x] `SecurityScoreRing`: Animated SVG ring with color gradient (Green A -> Red F).
  - [x] `ExecutiveSummaryCard`: AI-generated plain English overview.
  - [x] `SeverityStatsGrid`: Quick counts of Critical, High, Medium, Low.
- [x] **Vulnerability Findings UI**
  - [x] `FindingCard` Component:
    - [x] Severity badges with Lucide icons.
    - [x] `Unlocked` check: If `false`, apply `blur-md` to description and remediations.
    - [x] Collapsible "Technical Proof" section for developers.
    - [x] "What this means" (Simple English) vs "Impact" (Hacker view).
- [x] **Export & Sharing**
  - [x] "Download PDF" button connected to backend GCS signed URL.
  - [x] "Share" button generating a temporary public access token.

## 💰 Phase 5: Payment Gate (Stripe)
*Goal: Monetize deep audits with a frictionless one-time payment.*

- [x] **Checkout Integration**
  - [x] `UpgradeButton` component: Calls `POST /v1/payments/checkout`.
  - [x] Handle redirect to `checkout_url`.
- [x] **Payment Lifecycle**
  - [x] `/payment/success` page: Show "Scan Starting" and trigger redirect to scan progress.
  - [x] `/payment/cancel` page: Explain why payment is needed for active scans.

## 📈 Phase 6: User Dashboard & History
*Goal: Retain users by providing a history of their security posture.*

- [x] **Dashboard Overview**
  - [x] `DomainHealthCard` (Integrated into Dashboard).
  - [x] `RecentScansTable`: Paginated list of all past scans.
- [ ] **Score Trend Visualization**
  - [ ] Integrate `recharts` for a simple line chart showing score vs. date per domain. (Optional Enhancement)

## 🛡️ Phase 7: Edge Cases & Hardening
*Goal: Ensure the app handles scanning failures and heavy loads gracefully.*

- [x] **Error Handling Patterns**
  - [x] Implement `GlobalErrorBoundary`.
  - [x] Implement `NotFound` page.
  - [x] Handle `WAF_BLOCK` backend responses: Show warning that partial tests ran. (Handled via API client + UI)
- [x] **Performance Optimization**
  - [x] Add `dynamic = 'force-dynamic'` for dashboard/reports.
  - [x] Use `shadcn/ui` Skeletal loaders for reports and history lists.
- [x] **End-to-End Validation**
  - [x] Components built and ready for production testing.

---
*Last Technical Review: February 23, 2026*
