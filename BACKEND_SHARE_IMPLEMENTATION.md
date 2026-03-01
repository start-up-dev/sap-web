# Backend Implementation Spec: Stateful Report Sharing

## 1. Objective
Enable authenticated users (owners) to generate unique, time-bound, and revocable "Share Links" for their security reports. These links allow guests to view specific reports without a Clerk account.

---

## 2. Database Schema (New Table)
Implement a new table `shared_reports` to track the state of shared links.

**Table Name:** `shared_reports`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key | Unique ID for the share record. |
| `scan_id` | `Integer` | FK (scans.id), Indexed | The report being shared. |
| `owner_id` | `String` | Indexed | Clerk User ID of the owner. |
| `token` | `String` | Unique, Indexed | Secure random string (e.g., `secrets.token_urlsafe(32)`). |
| `created_at` | `DateTime` | Default: now() | When the link was generated. |
| `expires_at` | `DateTime` | Not Null | When the link becomes invalid. |
| `is_active` | `Boolean` | Default: True | Allows manual revocation by the owner. |
| `view_count` | `Integer` | Default: 0 | Analytics on how many times the link was opened. |

---

## 3. API Endpoints

### A. Generate Share Link
**Endpoint:** `POST /v1/reports/{scan_id}/share`
- **Auth:** Clerk Bearer Token Required.
- **Logic:**
  1. Verify the authenticated `user_id` matches the `owner_id` of the `scan_id`.
  2. If an active link for this scan already exists, you may either return it or deactivate it and create a fresh one.
  3. Generate a secure token.
  4. Set `expires_at` (Default: +24 hours).
- **Response:**
  ```json
  {
    "share_token": "sh_9a2b7...",
    "share_url": "https://shipsafe.com/reports/shared/sh_9a2b7...",
    "expires_at": "2026-03-03T10:00:00Z"
  }
  ```

### B. Public Report Fetch (The Gateway)
**Endpoint:** `GET /v1/public/reports/{token}`
- **Auth:** **None** (Public endpoint).
- **Logic:**
  1. Lookup the `token` in `shared_reports`.
  2. **Validation:**
     - If `token` not found: `404 Not Found`.
     - If `is_active` is `False`: `403 Forbidden` (Link revoked).
     - If `expires_at < current_time`: `410 Gone` (Link expired).
  3. Increment `view_count`.
  4. Fetch the associated `scan_id` report data.
- **Security:** **Surgical Data Return.** Only return report data (`score`, `findings`, `stats`, `target_url`). DO NOT return internal `user_id`, `domain_id`, or metadata unrelated to the audit findings.
- **Response:** Matches `ReportResponse` model.

### C. Revoke Share Link
**Endpoint:** `DELETE /v1/reports/{scan_id}/share`
- **Auth:** Clerk Bearer Token Required.
- **Logic:** Set `is_active = False` for all tokens associated with this `scan_id` for the owner.

---

## 4. Implementation Details (FastAPI / SQL Alchemy)

- **Token Generation:** Use `secrets.token_urlsafe(32)` for high entropy.
- **Middleware Bypass:** Ensure the `/v1/public/` prefix is exempted from any global authentication middleware in the backend.
- **CORS:** Ensure the public endpoint allows requests from the frontend origin.

---

## 5. Security Checklist
- [ ] **No ID Enumeration:** Tokens must be random strings, not IDs (e.g., `sh_v8Xj9...` NOT `123`).
- [ ] **Owner Check:** Strictly enforce that only the `owner_id` of the scan can generate or delete tokens.
- [ ] **Expiration Enforcement:** The `expires_at` check must be done on every request.
- [ ] **Limited Scope:** The public endpoint must only allow `GET` access to the specific `scan_id` mapped to the token.
