/**
 * Manual Type Definitions based on FRONTEND_API_GUIDELINE.md
 * In a real-world scenario, these would be generated from openapi.json
 */

export type ScanStatus = "queued" | "crawling" | "scanning" | "analyzing" | "generating_report" | "completed" | "failed" | "partial";

export type Severity = "critical" | "high" | "medium" | "low" | "informational";

export type VerificationMethod = "dns_txt" | "file_upload" | "meta_tag";

export interface DomainResponse {
  id: number;
  url?: string;
  domain_name?: string;
  is_verified: boolean;
  last_scan_date: string | null;
  security_score: number | null;
}

export interface DomainCreate {
  domain_name: string;
}

export interface DomainVerificationInitiate {
  method: VerificationMethod;
}

export interface DomainVerificationResponse {
  method: VerificationMethod;
  token: string;
  instructions: string;
}

export interface DomainVerificationStatus {
  is_verified: boolean;
  message: string;
}

export interface ScanResponse {
  id: number;
  domain_id: number;
  target_url: string;
  is_deep_scan: boolean;
  is_paid: boolean;
  status: ScanStatus;
  created_at: string;
  started_at: string;
  completed_at: string | null;
}

export interface ScanCreate {
  target_url: string;
  domain_id?: number;
  is_deep_scan: boolean;
}

export interface ScanStatusResponse {
  scan_id: number;
  status: ScanStatus;
  phase: string;
  progress: number;
  message: string;
  started_at: string;
  estimated_remaining_seconds: number;
}

export interface Finding {
  id: number;
  category: string;
  title: string;
  severity: Severity;
  unlocked: boolean;
  description?: string;
  impact?: string;
  technical_proof?: string;
  remediation?: string;
  estimated_fix_time?: string;
  is_validated?: boolean;
  exploit_steps?: string;
  evidence?: string;
}

export interface ReportResponse {
  scan_id: number;
  target_url: string;
  score: number;
  is_deep_scan: boolean;
  stats: Record<Severity, number>;
  findings: Finding[];
  generated_at: string;
  started_at: string;
  completed_at: string;
  pdf_url?: string;
}

export interface CheckoutRequest {
  scan_id: number;
  success_url?: string;
  cancel_url?: string;
}

export interface CheckoutResponse {
  checkout_url: string;
}

export interface ReportDownloadResponse {
  download_url: string;
}
