import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleDateString();
}

export function formatDuration(start: string | null | undefined, end: string | null | undefined): string {
  if (!start || !end) return "--";
  
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  
  if (isNaN(startTime) || isNaN(endTime)) return "--";
  
  const diffMs = endTime - startTime;
  if (diffMs < 0) return "0s";
  
  const diffSec = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffSec / 60);
  const seconds = diffSec % 60;
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}
