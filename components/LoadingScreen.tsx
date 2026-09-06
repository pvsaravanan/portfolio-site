'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
          setTimeout(() => setIsVisible(false), 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#F4F1EA] flex flex-col items-center justify-center"
        >
          <div className="w-full max-w-md px-8">
            {/* Progress Bar Container */}
            <div className="relative">
              {/* Background Track */}
              <div className="h-1 bg-[#E5E5E5] rounded-full overflow-hidden">
                {/* Progress Fill */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  className="h-full bg-[#0B1220]"
                />
              </div>
            </div>

            {/* Percentage Text */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-[10px] tracking-widest text-[#374151] font-medium">
                LOADING
              </span>
              <motion.span
                key={Math.floor(progress)}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] tracking-widest text-[#0B1220] font-bold"
              >
                {Math.floor(progress)}%
              </motion.span>
            </div>

            {/* Loading Text */}
            <div className="mt-8 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[11px] tracking-widest text-[#374151]"
              >
                SARAVANAN P V
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
