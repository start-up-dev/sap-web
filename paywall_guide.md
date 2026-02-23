# Frontend Implementation: Upgrade & Instant Unlock Guide

This guide covers the logic required to implement the "Upgrade to Deep Audit" button and the instant unblurring of report findings after payment.

## 1. Finding Card Component (`FindingCard.tsx`)

The backend now returns an `unlocked` boolean for every finding. Your UI should use this to toggle between a "blurred/teaser" state and a "full detail" state.

```tsx
interface Finding {
  id: number;
  category: string;
  severity: "critical" | "high" | "medium" | "low" | "informational";
  title: string;
  description: string;
  unlocked: boolean; // <--- The key field
  impact?: string;
  technical_detail?: string;
  remediation?: string;
  fix_time?: string;
}

export const FindingCard = ({ finding }: { finding: Finding }) => {
  if (!finding.unlocked) {
    return (
      <div className="relative border rounded-lg p-4 bg-gray-50 overflow-hidden">
        {/* Blurry Teaser Content */}
        <div className="filter blur-sm opacity-50 select-none pointer-events-none">
          <Badge>{finding.category}</Badge>
          <h3 className="text-lg font-bold">
            Encrypted finding title placeholder
          </h3>
          <p>This is a description that the user cannot read yet...</p>
        </div>

        {/* Lock Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40">
          <LockIcon className="w-6 h-6 mb-2 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">
            Upgrade to unlock this finding
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <Badge variant={finding.severity}>{finding.severity}</Badge>
        <span className="text-xs text-gray-500">{finding.category}</span>
      </div>
      <h3 className="text-lg font-bold mb-2">{finding.title}</h3>
      <p className="text-gray-700 mb-4">{finding.description}</p>

      <div className="space-y-3">
        <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
          <h4 className="font-bold text-red-800 text-sm">Real-world Impact</h4>
          <p className="text-sm text-red-700">{finding.impact}</p>
        </div>

        <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
          <h4 className="font-bold text-green-800 text-sm">How to fix</h4>
          <p className="text-sm text-green-700">{finding.remediation}</p>
          <p className="text-xs mt-2 text-green-600 font-medium">
            Estimated time: {finding.fix_time}
          </p>
        </div>
      </div>
    </div>
  );
};
```

## 2. The Upgrade Button Logic

When the user clicks "Upgrade to Deep Audit ($29)", call the checkout endpoint. The backend handles creating the new Deep Scan record and redirecting you to Stripe.

```tsx
const handleUpgrade = async (scanId: number) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/v1/payments/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clerkToken}`,
      },
      body: JSON.stringify({ scan_id: scanId }),
    });

    if (!response.ok) throw new Error("Checkout failed");

    const { checkout_url } = await response.json();

    // Redirect the user to Stripe Checkout
    window.location.href = checkout_url;
  } catch (error) {
    toast.error("Could not initiate payment. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
```

## 3. Handling Payment Success (`/scans/[id]?payment=success`)

When the user returns from Stripe, the backend has already marked the current scan as `is_paid: true`. You just need to refresh the UI.

```tsx
// Inside your Scan/Report Page component
useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("payment") === "success") {
    toast.success("Payment confirmed! Results unlocked.");
    // Re-fetch report data immediately
    refreshReport();

    // Optional: Show a notification that a new Deep Scan is running in background
    setDeepScanActive(true);
  }
}, [scanId]);
```

## 4. Why this flow is better for the user:

1.  **Immediate Gratification**: They don't have to wait for the new Deep Scan to finish to see the results they just "unlocked."
2.  **Seamless Transition**: The payment covers both the "Unlocking" of current data and the "Creation" of more advanced data.
3.  **No Data Loss**: The original Quick Scan remains in their history but is now fully visible.

## Important Note on "New Deep Scan"

When payment succeeds, the backend creates a **separate** scan record with `is_deep_scan: true`. You can find this new scan by listing all user scans (`GET /v1/scans`) or by checking the dashboard. The original Quick Scan ID remains the same but its `is_paid` property is now `true`.
