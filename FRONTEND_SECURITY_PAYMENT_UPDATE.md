# Frontend Integration: Security & Payment Gate Update

This document outlines the mandatory frontend changes required to align with the backend security hardening and the corrected payment gateway logic implemented on February 24, 2026.

## 1. Deep Scan Workflow (Breaking Change)

The backend no longer triggers deep scans immediately upon creation. Deep scans now require a verified domain **AND** a successful Stripe payment.

### New Sequence:
1. **Create Scan**: Call `POST /v1/scans` with `{ "is_deep_scan": true, "domain_id": X, "target_url": "..." }`.
2. **Get Checkout URL**: Immediately call `POST /v1/payments/checkout` with `{ "scan_id": <ID_FROM_STEP_1> }`.
3. **Redirect**: Redirect the user to the `checkout_url` returned by the checkout endpoint.
4. **Poll Status**: Once the user returns from Stripe, poll `GET /v1/scans/{id}/status`. The scan will transition to `QUEUED` only after the webhook is processed.

## 2. Mandatory Authorization Headers

All report requests are now protected by an ownership check. Requests without a valid Clerk token will be rejected with `401` or `403`.

**Endpoint**: `GET /v1/reports/{scan_id}`
**Required Header**: `Authorization: Bearer <clerk_token>`

## 3. Error Handling

### Domain Verification (403 Forbidden)
If `POST /v1/scans` returns a `403`, it means the domain is not verified. 
- **Action**: Redirect the user to the Domain Verification screen.

### Unauthorized Report Access (403 Forbidden)
If `GET /v1/reports/{scan_id}` returns a `403`, it means the user is trying to access a report they don't own.
- **Action**: Show an "Access Denied" state or redirect to dashboard.

## 4. UI State Updates

### Scan List / Dashboard
- **`is_paid` field**: The `ScanResponse` now includes `is_paid: boolean`.
- **Logic**: If `is_deep_scan` is true and `is_paid` is false, the scan is effectively "Pending Payment."
- **Recommendation**: Show a "Complete Payment" button on the dashboard for these items.

### Report Preview
- **Logic**: The backend now automatically "blurs" findings for free scans. You do not need to implement blurring logic on the frontend; just render the `unlocked: false` findings as locked/blurred items in your UI.

---
**Status**: Backend implementation complete. Frontend alignment required for production parity.
