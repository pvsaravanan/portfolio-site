'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEGMENTS = 20;

const BOOT_LINES = [
  { threshold: 0, label: 'BOOTING PORTFOLIO' },
  { threshold: 20, label: 'LOADING AI MODULES' },
  { threshold: 45, label: 'COMPILING COMPONENTS' },
  { threshold: 70, label: 'OPTIMIZING RENDER' },
  { threshold: 92, label: 'READY' },
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2000; // 2 seconds to load
    const interval = 20; // Update every 20ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Wait a moment at 100% before hiding
          setTimeout(() => setIsVisible(false), 400);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Walk the boot log forward as progress crosses each threshold, so the status
  // line reads like a real startup sequence rather than a static "loading" label.
  const activeLine = useMemo(() => {
    let current = BOOT_LINES[0];
    for (const line of BOOT_LINES) {
      if (progress >= line.threshold) current = line;
    }
    return current;
  }, [progress]);

  const filledSegments = Math.round((progress / 100) * SEGMENTS);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#F4F1EA] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Dot-grid texture, matching the Hero banner treatment */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{ backgroundImage: 'radial-gradient(#0B1220 1px, transparent 1px)', backgroundSize: '18px 18px' }}
            aria-hidden="true"
          />

          {/* Corner brackets framing the viewport */}
          <span className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-[#0B1220]" aria-hidden="true" />
          <span className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-[#0B1220]" aria-hidden="true" />
          <span className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-[#0B1220]" aria-hidden="true" />
          <span className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-[#0B1220]" aria-hidden="true" />

          <div className="relative w-full max-w-md px-8">
            {/* Identity mark */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2 mb-10"
            >
              <span className="inline-block w-[3px] h-4 bg-[#E07A5F]" />
              <span className="text-lg font-bold tracking-tight text-[#0B1220]">SARAVANAN P V</span>
              <span className="inline-block w-[3px] h-4 bg-[#E07A5F]" />
            </motion.div>

            {/* Boot log */}
            <div className="h-4 mb-6 text-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeLine.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-[10px] tracking-widest text-[#374151] font-medium"
                >
                  <span className="text-[#E07A5F]">&gt;</span> {activeLine.label}
                  <span className="inline-block w-1.5 h-3 bg-[#0B1220] ml-1 animate-pulse align-middle" aria-hidden="true" />
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Segmented progress bar */}
            <div className="flex gap-[3px] h-2 border border-[#0B1220] p-[2px]">
              {Array.from({ length: SEGMENTS }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 transition-colors duration-150 ${
                    i < filledSegments ? 'bg-[#0B1220]' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* Percentage Text */}
            <div className="flex justify-between items-center mt-3">
              <span className="text-[9px] tracking-widest text-[#374151] font-bold">
                LOADING
              </span>
              <motion.span
                key={Math.floor(progress)}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[9px] tracking-widest text-[#0B1220] font-bold"
              >
                {Math.floor(progress)}%
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
