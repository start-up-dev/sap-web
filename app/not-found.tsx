import Link from "next/link";
import { ShieldQuestion, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/landing/Nav";
import { landingContent } from "@/content/landing";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav nav={landingContent.nav} />
      
      <main className="flex h-[80vh] flex-col items-center justify-center p-4 text-center">
        <div className="h-20 w-20 rounded-full bg-[#111] flex items-center justify-center mb-8 border border-[#222]">
          <ShieldQuestion className="h-10 w-10 text-[#444]" />
        </div>
        
        <h1 className="text-4xl font-black mb-4">404 - Page Not Found</h1>
        <p className="text-[#999] text-lg max-w-md mb-10">
          The page you are looking for doesn&apos;t exist or has been moved. 
          Return to safety below.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <Button className="bg-white text-black hover:bg-[#ddd] h-12 px-8">
              Back to Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button 
              variant="outline" 
              className="border-[#222] h-12 px-8 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Go to Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
