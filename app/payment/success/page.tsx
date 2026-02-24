"use client";

import { useEffect, Suspense } from "react";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scanId = searchParams.get("scan_id");

  useEffect(() => {
    // If we have a scanId, we might want to redirect automatically after a few seconds
    if (scanId) {
      const timer = setTimeout(() => {
        router.push(`/scans/${scanId}`);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [scanId, router]);

  return (
    <main className="flex h-[80vh] flex-col items-center justify-center p-4 text-center">
      <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8 animate-in zoom-in duration-500">
        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
      </div>
      
      <h1 className="text-4xl font-black mb-4">Payment Successful!</h1>
      <p className="text-[#999] text-lg max-w-md mb-10">
        Thank you for upgrading. Your Deep Security Audit is now starting. 
        We&apos;ll notify you as soon as it&apos;s ready.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => router.push(scanId ? `/scans/${scanId}` : "/dashboard")}
          className="bg-emerald-500 font-bold hover:bg-emerald-400 h-12 px-8"
        >
          Track Progress <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          onClick={() => router.push("/dashboard")}
          className="border-[#222] h-12 px-8"
        >
          Go to Dashboard
        </Button>
      </div>

      {scanId && (
        <p className="mt-8 text-sm text-[#444] flex items-center gap-2">
          <Loader2 className="h-3 w-3 animate-spin" /> Redirecting to scan progress in 5 seconds...
        </p>
      )}
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Suspense fallback={
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
