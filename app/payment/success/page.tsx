"use client";

import { useEffect, Suspense } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const router = useRouter();

  useEffect(() => {
    // Attempt to auto-close after 3 seconds if opened in a new tab
    const timer = setTimeout(() => {
      try {
        window.close();
      } catch {
        // Fallback or log if needed
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    try {
      window.close();
    } catch {
      // Fallback if window.close() is blocked
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex h-[80vh] flex-col items-center justify-center p-4 text-center">
      <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8 animate-in zoom-in duration-500">
        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
      </div>
      
      <h1 className="text-4xl font-black mb-4">Payment Successful!</h1>
      <p className="text-[#999] text-lg max-w-md mb-10">
        Thank you for upgrading. Your Deep Security Audit is now starting in your main dashboard tab.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={handleClose}
          className="bg-emerald-500 font-bold hover:bg-emerald-400 h-12 px-8"
        >
          Close This Tab
        </Button>
        <Button 
          variant="outline" 
          onClick={() => router.push("/dashboard")}
          className="border-[#222] h-12 px-8"
        >
          Return to Dashboard
        </Button>
      </div>

      <p className="mt-8 text-sm text-[#444] flex items-center gap-2">
        <Loader2 className="h-3 w-3 animate-spin" /> This tab will attempt to close automatically...
      </p>
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
