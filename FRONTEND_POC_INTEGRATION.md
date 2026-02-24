# Frontend Integration Guide: Proof-of-Concept (PoC) & Active Pentest

## Overview
The backend has been upgraded to support **Active Exploitation** during Deep Scans. This provides the user with verified proof that a vulnerability is "hackable." The frontend must be updated to display this high-value evidence.

---

## 1. API Changes
**Endpoint:** `GET /v1/reports/{scan_id}`

The `findings` array now includes three new fields for every finding. 

### New Fields in Finding Object
| Field | Type | Description |
| :--- | :--- | :--- |
| `is_validated` | `boolean` | **CRITICAL:** If `true`, the scanner successfully "hacked" the target. Use this to trigger high-urgency UI elements. |
| `exploit_steps` | `string` | A plain-English narrative of how the scanner gained access. |
| `evidence` | `string` | Raw "smoking gun" data (e.g., terminal output, login success messages, or masked file content). |

---

## 2. UI/UX Recommendations

### A. The "Breach Verified" Badge
Findings where `is_validated: true` should be visually distinct from regular vulnerabilities.
*   **Design:** Add a pulsing amber/red badge that says **"BREACH VERIFIED"** or **"EXPLOIT PROVEN"**.
*   **Purpose:** This justifies the premium nature of the audit and creates immediate urgency.

### B. The "Evidence" Terminal Box
When a finding is validated, render the `evidence` string in a terminal-style component.
*   **Styling:**
    *   Background: `#111111` (Near black)
    *   Text Color: `#10b981` (Green) or `#fcd34d` (Amber)
    *   Font: `monospace`
    *   Padding: `1rem`
    *   Border: `1px solid #333`
*   **Logic:** Only render this component if `is_validated` is `true` and `evidence` is not null.

### C. The "Hacker's Path" Narrative
Use the `exploit_steps` field to show the user exactly how someone could copy the breach.
*   **Design:** Display this as a "Step-by-step" list or a small callout box above the technical details.

---

## 3. Quick Scan vs. Deep Scan Logic

| Frontend Action | Quick Scan | Deep Scan |
| :--- | :--- | :--- |
| **Verification Level** | Passive Only | **Active Exploitation** |
| **PoC Data** | Will always be `false` / `null` | **Will contain rich PoC data** |
| **Upsell Opportunity** | Show a "Blurred" PoC section asking to "Upgrade to Deep Audit to verify access." | Show full evidence. |

---

## 4. Example JSON Response (Deep Scan)
```json
{
  "category": "Network Service Exposure",
  "title": "Insecure FTP Service Exposed",
  "severity": "high",
  "is_validated": true,
  "exploit_steps": "1. Identified open Port 21. 2. Attempted 'anonymous' login. 3. Successfully bypassed authentication and listed files.",
  "evidence": "230 Login successful.
ftp> ls
drwxr-xr-x    2 0        0            4096 Feb 24 01:17 backups
-rw-r--r--    1 0        0             142 Feb 24 01:17 .env",
  "unlocked": true
}
```
