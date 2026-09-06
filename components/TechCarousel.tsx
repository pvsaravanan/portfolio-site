'use client';

import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
  'NEXT.JS', 'REACT.JS', 'PYTHON', 'FASTAPI', 'PYTORCH', 'TENSORFLOW', 
  'DOCKER', 'KUBERNETES', 'AWS', 'GCP', 'TYPESCRIPT', 'NODE.JS', 
  'POSTGRESQL', 'MONGODB', 'VSCODE', 'LINUX', 'LANGCHAIN', 'OPENCV'
];

export default function TechCarousel() {
  // Duplicate the array to create a seamless loop
  const duplicatedTech = [...techStack, ...techStack];

  return (
    <div className="border-b border-[#0B1220] bg-[var(--paper)] py-4 overflow-hidden relative">
      {/* Overlay gradients for fade effect at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--paper)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--paper)] to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap gap-12"
        animate={{
          x: [0, -1000], // Adjust based on content width
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedTech.map((tech, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-4 group"
          >
            <span className="text-[11px] font-bold tracking-[0.3em] text-[var(--ink-4)] group-hover:text-[var(--accent)] transition-colors">
              {tech}
            </span>
            <div className="w-1.5 h-1.5 bg-[var(--ink)] opacity-20 rotate-45" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
