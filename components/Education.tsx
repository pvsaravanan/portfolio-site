'use client';

import React from 'react';
import SectionHeader from './SectionHeader';

const education = [
  {
    institution: 'Saveetha Engineering College',
    degree: 'B.Tech AI&DS',
    period: '2023 — 2027',
    location: 'Chennai, India',
    details: [
      'Focusing on Software Engineering, Data Structures, and Algorithms.',
      'Active member of the Coding Club and Cybersecurity research group.',
      'Current CGPA: 8.52/10.0'
    ],
    id: 'EDU-02',
    color: 'var(--c-programs)',
  },
  {
    institution: 'NPSBSSS',
    degree: 'Bio-Maths',
    period: '2022 — 2023',
    location: 'Chennai, India',
    details: [
      'Secured 95% in Mathematics and Computer Science.',
      'Represented school in regional programming contests.'
    ],
    id: 'EDU-01',
    color: 'var(--c-careers)',
  }
];

export default function Education() {
  return (
    <section id="education" className="border-b border-[var(--ink)] bg-[var(--paper-2)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader index="02" label="EDUCATION" title="ACADEMIC" muted="BACKGROUND" ink="light" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div 
              key={edu.id}
              className="border-2 border-[var(--ink)] bg-[var(--paper)] p-6 shadow-[var(--sh-2)] relative group hover:shadow-[var(--sh-hover)] transition-all duration-150"
            >
              {/* Corner brackets */}
              <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
              <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
              <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />

              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <span className="text-[10px] tracking-widest font-bold mb-1 block" style={{ color: edu.color }}>
                    {edu.period}
                  </span>
                  <h3 className="text-xl font-bold leading-tight uppercase tracking-tight mb-1">
                    {edu.institution}
                  </h3>
                  <p className="text-sm font-bold text-[var(--accent)] uppercase tracking-wide">
                    {edu.degree}
                  </p>
                </div>
                <div className="text-right">
                   <span className="px-2 py-0.5 bg-[var(--ink)] text-[var(--paper)] text-[9px] tracking-widest font-bold">
                      {edu.id}
                    </span>
                </div>
              </div>

              <div className="mb-4">
                 <span className="text-[10px] text-[var(--ink-4)] uppercase tracking-wider block mb-2">
                   {edu.location}
                 </span>
              </div>

              <ul className="space-y-2 border-t border-dashed border-[var(--rule)] pt-4">
                {edu.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-[var(--ink)] mt-1.5 shrink-0" />
                    <span className="text-[11px] text-[var(--ink-3)] leading-relaxed">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
