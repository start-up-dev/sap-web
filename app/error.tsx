"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/landing/Nav";
import { landingContent } from "@/content/landing";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav nav={landingContent.nav} />
      
      <main className="flex h-[80vh] flex-col items-center justify-center p-4 text-center">
        <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center mb-8">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-black mb-4">Something went wrong</h1>
        <p className="text-[#999] text-lg max-w-md mb-10">
          An unexpected error occurred. Our team has been notified. 
          Please try refreshing the page.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => reset()}
            className="bg-emerald-500 font-bold hover:bg-emerald-400 h-12 px-8 flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" /> Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/"}
            className="border-[#222] h-12 px-8"
          >
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
}
