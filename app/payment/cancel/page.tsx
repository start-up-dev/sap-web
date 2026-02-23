"use client";

import { XCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/landing/Nav";
import { landingContent } from "@/content/landing";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav nav={landingContent.nav} />
      
      <main className="flex h-[80vh] flex-col items-center justify-center p-4 text-center">
        <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center mb-8">
          <XCircle className="h-10 w-10 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-black mb-4">Payment Cancelled</h1>
        <p className="text-[#999] text-lg max-w-md mb-10">
          The payment process was interrupted. Deep audits require a one-time payment to cover the costs of active probing and AI analysis.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => router.back()}
            className="bg-white text-black hover:bg-[#ddd] h-12 px-8"
          >
            Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push("/dashboard")}
            className="border-[#222] h-12 px-8 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
