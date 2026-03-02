"use client";

import { useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UpgradeButtonProps {
  scanId: number;
  className?: string;
  children?: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function UpgradeButton({ 
  scanId, 
  className, 
  children,
  size = "default",
  variant = "default"
}: UpgradeButtonProps) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!isLoaded || !isSignedIn) {
      toast.error("Please wait for authentication to load.");
      return;
    }

    try {
      setIsLoading(true);
      const token = await getToken({ template: 'safeship-jwt' });
      
      if (!token) {
        toast.error("Auth session expired. Please refresh the page.");
        return;
      }
      
      // Ensure scanId is a valid number
      const numericScanId = Number(scanId);
      
      if (isNaN(numericScanId)) {
        throw new Error(`Invalid Scan ID: ${scanId}`);
      }
      
      if (process.env.NODE_ENV === "development") {
        console.log("Initiating upgrade for scan:", numericScanId);
      }

      const response = await api.post(
        "/v1/payments/checkout",
        { 
          scan_id: numericScanId,
          success_url: `${window.location.origin}/payment/success`,
          cancel_url: `${window.location.origin}/dashboard`
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe Checkout
      if (response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        throw new Error("Missing checkout URL");
      }
    } catch (error: unknown) {
      console.error("Error creating checkout session:", error);
      let errorMessage = "Failed to initiate payment. Please try again.";
      
      if (error && typeof error === "object" && "response" in error) {
        const response = (error as { response?: { data?: { detail?: string } } }).response;
        errorMessage = response?.data?.detail || errorMessage;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleUpgrade}
      disabled={isLoading}
      className={className}
      size={size}
      variant={variant}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : !children ? (
        <Zap className="h-4 w-4 mr-2" />
      ) : null}
      {children || "Upgrade to Deep Audit — $29"}
    </Button>
  );
}
