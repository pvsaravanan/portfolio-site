'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--paper)] px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl border-2 border-[#0B1220] bg-[var(--paper-2)] shadow-[var(--sh-3)] relative overflow-hidden"
      >
        {/* Corner markers */}
        <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
        <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
        <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />

        {/* Decorative top stripe */}
        <div className="h-6 sm:h-8 border-b-2 border-[#0B1220] bg-[var(--accent)] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(#0B1220 1px, transparent 1px)', backgroundSize: '12px 12px' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#0B1220]">
              Error 404
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-12 text-center">
          {/* Large 404 */}
          <div className="relative inline-block mb-6 sm:mb-8">
            <h1 className="text-[120px] sm:text-[160px] lg:text-[200px] font-bold leading-none tracking-tighter text-[#0B1220] select-none">
              404
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-3 sm:h-4 bg-[var(--accent)] -z-10" />
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#0B1220] mb-3 sm:mb-4">
            PAGE NOT FOUND
          </h2>

          <p className="text-sm sm:text-base text-[#374151] leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto">
            Looks like this route took a wrong turn. The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Status box */}
          <div className="border border-[#0B1220] bg-white/60 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] max-w-md mx-auto mb-6 sm:mb-8 p-3 sm:p-4 text-left">
            <div className="flex items-start gap-3">
              <span className="inline-flex w-2 h-2 mt-1.5 bg-[#E07A5F] shrink-0" />
              <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-[#374151] space-y-1">
                <p>&gt; ROUTE: <span className="text-[#0B1220] font-semibold">UNKNOWN</span></p>
                <p>&gt; STATUS: <span className="text-[#0B1220] font-semibold">NOT_FOUND</span></p>
                <p>&gt; SUGGESTION: <span className="text-[#0B1220] font-semibold">RETURN_HOME</span></p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button href="/" variant="primary">Back to Home</Button>
            <Button href="mailto:saravananpv30102005@gmail.com" variant="outline">Report Issue</Button>
          </div>
        </div>

        {/* Bottom barcode-like strip */}
        <div className="h-4 sm:h-6 border-t-2 border-[#0B1220] bg-[#0B1220] flex items-center justify-center overflow-hidden">
          <div className="flex gap-[2px] opacity-40">
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className="h-3 sm:h-4 bg-[var(--paper)]"
                style={{ width: `${Math.random() > 0.5 ? 3 : 1}px` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
