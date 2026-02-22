# Frontend API Integration Guideline — Security Audit Platform (SAP)

This document provides a comprehensive guide for frontend developers to integrate with the SAP Backend API.

## 1. Core Concepts

### Base URL
- **Local Development:** `http://localhost:8000`
- **Production:** (Refer to environment configuration)
- **OpenAPI Schema:** `http://localhost:8000/openapi.json`
- **Swagger UI:** `http://localhost:8000/docs`

### Authentication
The API uses **Clerk** for authentication. Every request (except health checks and webhooks) must include a valid Clerk session token.

**Header:**
```http
Authorization: Bearer <clerk_session_token>
```

### Type Safety
The backend is built with FastAPI and Pydantic. You can generate TypeScript types directly from the OpenAPI schema using tools like `openapi-typescript`.

---

## 2. Core User Flows

### Flow A: Free Quick Scan
1.  **Authenticate:** Get session token from Clerk.
2.  **Create Scan:** `POST /v1/scans` with `is_deep_scan: false`.
3.  **Poll Status:** `GET /v1/scans/{id}/status` every 3 seconds.
4.  **View Results:** Once status is `completed`, fetch `GET /v1/reports/{scan_id}`.
    - *Note:* Free scans have blurred findings; only 1 low-severity finding is unlocked.

### Flow B: Deep Audit (Active Testing)
1.  **Register Domain:** `POST /v1/domains`.
2.  **Initiate Verification:** `POST /v1/domains/{id}/verify` with chosen method (`dns_txt`, `file_upload`, or `meta_tag`).
3.  **Display Instructions:** Show the `token` and `instructions` returned to the user.
4.  **Check Verification:** `GET /v1/domains/{id}/verify/status`. Once `is_verified` is true, proceed.
5.  **Create Scan:** `POST /v1/scans` with `is_deep_scan: true` and `domain_id`.
6.  **Payment:** `POST /v1/payments/checkout` with `scan_id`. Redirect user to the returned `checkout_url`.
7.  **Webhook Sync:** Backend handles Stripe success and automatically triggers the worker.
8.  **Wait & Notify:** User waits on dashboard or waits for email.
9.  **View Results:** Fetch `GET /v1/reports/{scan_id}`. Findings are fully unlocked.

---

## 3. Endpoint Reference

### Domains (`/v1/domains`)
| Method | Endpoint | Description | Request Model | Response Model |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | List all user domains | - | `List[DomainResponse]` |
| `POST` | `/` | Register a new domain | `DomainCreate` | `DomainResponse` |
| `POST` | `/{id}/verify` | Get verification token/instr | `DomainVerificationInitiate` | `DomainVerificationResponse` |
| `GET` | `/{id}/verify/status` | Trigger verification check | - | `DomainVerificationStatus` |

### Scans (`/v1/scans`)
| Method | Endpoint | Description | Request Model | Response Model |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/` | Start a new scan job | `ScanCreate` | `ScanResponse` |
| `GET` | `/` | List all user scans | - | `List[ScanResponse]` |
| `GET` | `/{id}` | Get scan metadata | - | `ScanResponse` |
| `GET` | `/{id}/status` | **Real-time status (Poll)** | - | `ScanStatusResponse` |

### Reports (`/v1/reports`)
| Method | Endpoint | Description | Response Data |
| :--- | :--- | :--- | :--- |
| `GET` | `/{scan_id}` | Fetch final audit report | Score, stats, findings (blurred if free) |

### Payments (`/v1/payments`)
| Method | Endpoint | Description | Request Model | Response Model |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/checkout` | Create Stripe session | `CheckoutRequest` | `CheckoutResponse` |

---

## 4. Response Models (JSON Examples)

### Scan Status Response
Used for the progress screen while a scan is running.
```json
{
  "scan_id": 123,
  "status": "scanning",
  "phase": "zap",
  "progress": 45,
  "message": "Running active vulnerability tests...",
  "started_at": "2026-02-23T10:00:00Z",
  "estimated_remaining_seconds": 420
}
```

### Report Response
Note the `unlocked` field on findings.
```json
{
  "scan_id": 123,
  "target_url": "https://example.com",
  "score": 85,
  "stats": { "critical": 0, "high": 1, "medium": 2, "low": 5, "informational": 10 },
  "findings": [
    {
      "id": 1,
      "category": "XSS",
      "title": "Reflected Cross-Site Scripting found on /search",
      "severity": "high",
      "unlocked": true,
      "remediation": "Sanitize user input..."
    },
    {
      "id": 2,
      "category": "SQL Injection",
      "severity": "critical",
      "unlocked": false,
      "title": "Upgrade to Deep Audit to view details.",
      "description": "***"
    }
  ]
}
```

---

## 5. Error Handling
The API returns standard HTTP status codes:
- `401 Unauthorized`: Missing or invalid Clerk token.
- `403 Forbidden`: Domain not verified for deep scan.
- `404 Not Found`: Scan, Domain, or Report not found.
- `409 Conflict`: Domain already registered.
- `422 Unprocessable Entity`: Validation error (check response body for details).

All errors follow this shape:
```json
{
  "detail": "Error message description"
}
```
