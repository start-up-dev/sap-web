"use client";

import { motion } from "framer-motion";

interface SecurityScoreRingProps {
  score: number;
}

export function SecurityScoreRing({ score }: SecurityScoreRingProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 90) return "#10b981"; // emerald-500
    if (s >= 70) return "#f59e0b"; // amber-500
    if (s >= 50) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  const getGrade = (s: number) => {
    if (s >= 90) return "A";
    if (s >= 80) return "B";
    if (s >= 70) return "C";
    if (s >= 60) return "D";
    return "F";
  };

  const color = getColor(score);
  const grade = getGrade(score);

  return (
    <div className="relative flex items-center justify-center">
      <svg className="h-48 w-48 -rotate-90 transform">
        {/* Background track */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="#222"
          strokeWidth="12"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          stroke={color}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}44)` }}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-6xl font-black text-white"
        >
          {grade}
        </motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-sm font-bold uppercase tracking-widest text-[#666]"
        >
          Score: {score}
        </motion.span>
      </div>
    </div>
  );
}
