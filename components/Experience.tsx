'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import SectionHeader from './SectionHeader';

const experiences = [
  {
    company: 'ServiceNow',
    role: 'Associate Software Intern',
    period: 'Aug 2026 — Feb 2027 (Incoming)',
    location: 'Remote/Office',
    description: 'Successfully recruited for the Associate Software Intern role at ServiceNow. Preparing to contribute to enterprise-level software engineering projects.',
    tags: ['SOFTWARE ENGINEERING', 'ENTERPRISE SOFTWARE', 'INTERNSHIP'],
    color: '#d88060',
    id: 'EXP-04',
  },
  {
    company: 'DeadEnd Engineers',
    role: 'Founding Member & Developer',
    period: 'Jan 2026 — Present',
    location: 'Remote',
    description: 'Co-founded a developer community focused on building experimental software projects and collaborative tools.',
    tags: ['COMMUNITY BUILDING', 'EXPERIMENTAL SOFTWARE', 'LEADERSHIP'],
    color: '#d88060',
    id: 'EXP-03',
  },
  {
    company: 'Zybeak Technologies',
    role: 'Cybersecurity Intern',
    period: 'Jan 2025 — Feb 2025',
    location: 'Chennai, India',
    description: 'Developed security protocols for systems and networks, monitored network traffic for threats, conducted vulnerability assessments and penetration testing, and supported firewalls and IDS systems.',
    tags: ['CYBERSECURITY', 'NETWORK SECURITY', 'VULNERABILITY ASSESSMENT', 'IDS'],
    color: '#d88060',
    id: 'EXP-02',
  },
  {
    company: 'DLK Technologies',
    role: 'Full-stack Developer Intern',
    period: 'Jul 2024 — Aug 2024',
    location: 'Chennai, India',
    description: 'Built responsive web applications using HTML, CSS, JavaScript, and React. Developed REST APIs with Node.js and Express, integrated third-party services via JSON, and designed robust database systems.',
    tags: ['REACT', 'NODE.JS', 'EXPRESS', 'REST APIS', 'DATABASE DESIGN'],
    color: '#d88060',
    id: 'EXP-01',
  },
];

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  // Fraction (0-1) along the timeline where each item's checkpoint dot sits.
  // Defaults to just-out-of-reach (>1) so nothing reveals before it's measured.
  const [checkpoints, setCheckpoints] = useState<number[]>(() => experiences.map(() => 2));
  const [reached, setReached] = useState<boolean[]>(() => experiences.map(() => false));

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Measure where each dot sits (as a fraction of the timeline's total height)
  // so we know exactly when the growing line reaches it.
  useEffect(() => {
    const measure = () => {
      const container = timelineRef.current;
      if (!container) return;
      const containerHeight = container.getBoundingClientRect().height;
      if (!containerHeight) return;

      const fractions = itemRefs.current.map((el) => {
        if (!el) return 2;
        const dotCenter = el.offsetTop + 14; // dot is ~14px (top-1.5 + half of 16px) into the row
        return Math.min(1, Math.max(0, dotCenter / containerHeight));
      });
      setCheckpoints(fractions);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // The line's own rendered fill (scaleY) is what visually "touches" each checkpoint,
  // so cards/dots reveal in lockstep with the line rather than an independent viewport check.
  useMotionValueEvent(scaleY, 'change', (latest) => {
    setReached((prev) => {
      let changed = false;
      const next = prev.map((wasReached, i) => {
        const isReached = latest >= checkpoints[i];
        if (isReached !== wasReached) changed = true;
        return isReached;
      });
      return changed ? next : prev;
    });
  });

  return (
    <section id="experience" className="border-b border-[var(--ink)] bg-[var(--paper)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader index="04" label="EXPERIENCE" title="WORK &" muted="INTERNSHIPS" ink="light" />

        <div className="relative" ref={timelineRef}>
          {/* Vertical Timeline Line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[var(--rule)] md:left-1/2 md:-ml-[1px]" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[var(--ink)] z-[5] md:left-1/2 md:-ml-[1px]" 
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0, rotate: 45 }}
                  animate={reached[index] ? { scale: 1, rotate: 45 } : { scale: 0, rotate: 45 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 top-1.5 w-4 h-4 bg-[var(--paper)] border-2 border-[var(--ink)] z-10 md:left-1/2 md:-ml-2 shadow-[var(--sh-1)]" 
                />

                {/* Content Card */}
                <div
                  className={`w-full pl-8 md:pl-0 md:w-[45%] ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 text-left'
                  }`}
                >
                  <motion.article
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 20 }}
                    animate={
                      reached[index]
                        ? { opacity: 1, x: 0, y: 0 }
                        : { opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 20 }
                    }
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a smooth 'pop-in' feel
                    }}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    className="border border-[var(--ink)] p-5 hover:bg-[var(--paper-2)] transition-colors group relative cursor-default"
                  >
                    {/* ID Tag */}
                    <span className="absolute -top-3 right-4 px-2 py-0.5 bg-[var(--ink)] text-[var(--paper)] text-[9px] tracking-widest font-bold">
                      {exp.id}
                    </span>

                    <div className="flex flex-col mb-3">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold leading-tight uppercase tracking-tight">
                          {exp.role}
                        </h3>
                        <div className="text-right">
                          <span className="text-[10px] tracking-tight text-[var(--ink-3)] font-medium block">
                            {exp.period}
                          </span>
                          <span className="text-[9px] text-[var(--ink-4)] block uppercase">
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-[var(--accent)] mb-2 uppercase tracking-wide">
                        {exp.company}
                      </p>
                    </div>
                    
                    <p className="text-[11px] text-[var(--ink-3)] leading-relaxed mb-6">
                      {exp.description}
                      {exp.company === 'DeadEnd Engineers' && (
                        <span className="block mt-2">
                          <a 
                            href="https://codebynj.github.io/deadend.github.io/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] underline decoration-1 underline-offset-4 mr-3"
                          >
                            Website
                          </a>
                          <a 
                            href="https://www.notion.so/DeadEnd-Engineers-3139801ed37b80e1ac97e8c1ccabe0d0" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] underline decoration-1 underline-offset-4"
                          >
                            Notion Workspace
                          </a>
                        </span>
                      )}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-[8px] border border-[var(--rule)] text-[var(--ink-3)] tracking-widest font-medium bg-[var(--paper-2)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                </div>

                {/* Date for Mobile/Desktop Spacer */}
                <div className="hidden md:flex md:w-[10%] justify-center items-center" />
                <div className="md:w-[45%] hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
