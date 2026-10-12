'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SectionHeader from './SectionHeader';
import { projects, projectHref } from '@/lib/projects';

export default function Projects() {
  const router = useRouter();
  return (
    <section id="projects" className="border-b border-[#0B1220]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <SectionHeader
          index="04"
          label="WORKS"
          title="PROJECTS &"
          muted="CONTRIBUTIONS"
          right={
            <p className="hidden sm:block text-[10px] text-[#374151] tracking-wider">
              {projects.length} RECENT · PROJECTS, ARTICLES, RESEARCH, TALKS
            </p>
          }
        />

        <div className="flex flex-col gap-3 sm:gap-4">
          {projects.map((project, idx) => {
            const reversed = idx % 2 === 1;
            const number = project.n;
            const href = projectHref(project);

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`group border ${project.placeholder ? 'border-dashed' : ''} border-[#0B1220] bg-[#F6F1E7] hover:bg-[#F3EDE1] transition-colors ${href ? 'cursor-pointer' : ''}`}
                role={href ? 'link' : undefined}
                tabIndex={href ? 0 : undefined}
                onClick={() => {
                  if (href) router.push(href);
                }}
                onKeyDown={(e) => {
                  if (!href) return;
                  if (e.key !== 'Enter' && e.key !== ' ') return;
                  e.preventDefault();
                  router.push(href);
                }}
              >
                <div className={`flex flex-col lg:flex-row ${reversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual Panel */}
                  <div
                    className={`relative w-full lg:w-1/2 aspect-[2/1] sm:aspect-[16/9] lg:aspect-auto overflow-hidden border-b lg:border-b-0 border-[#0B1220] ${
                      reversed ? 'lg:border-l' : 'lg:border-r'
                    }`}
                    style={{ background: `linear-gradient(135deg, ${project.tagColor}2A, var(--paper-2) 70%)` }}
                  >
                    {/* dot-grid texture */}
                    <div
                      className="absolute inset-0 opacity-[0.18]"
                      style={{
                        backgroundImage: 'radial-gradient(#0B1220 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                      }}
                    />
                    {/* oversized index numeral */}
                    <span
                      className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-3 text-[72px] sm:text-[130px] lg:text-[160px] font-black leading-none select-none pointer-events-none"
                      style={{ color: project.tagColor, opacity: 0.4 }}
                    >
                      {number}
                    </span>
                    {/* corner accents */}
                    <span className="absolute top-3 left-3 w-2 h-2 bg-[#0B1220]" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-[#0B1220]" />
                    <span className="absolute bottom-3 left-3 w-2 h-2 bg-[#0B1220]" />
                    <span className="absolute bottom-3 right-3 w-2 h-2 bg-[#0B1220]" />
                    {/* tag badge */}
                    <span
                      className="absolute top-4 left-4 px-2 py-1 text-[9px] font-bold tracking-widest uppercase text-[#0B1220]"
                      style={{ backgroundColor: project.tagColor }}
                    >
                      {project.tag}
                    </span>
                  </div>

                  {/* Details Panel */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold tracking-widest text-[var(--ink-4)]">W-{project.n}</span>
                      <span className="w-1 h-1 bg-[var(--ink-4)]" />
                      <span className="text-[10px] font-bold tracking-widest text-[#E07A5F] uppercase">
                        {project.date.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight leading-[1.05] text-[#0B1220] mb-2 sm:mb-3">
                      {project.title.toUpperCase()}
                    </h3>

                    <p className="text-[14px] text-[#374151] leading-relaxed mb-3 sm:mb-4 max-w-md text-justify font-['Inter',system-ui,sans-serif]">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                      {project.stack.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-[9px] font-bold tracking-widest uppercase border border-[#0B1220] bg-white"
                        >
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-dashed border-[#cbd5e1]">
                      <span className="text-[9px] tracking-widest text-[#374151] font-bold uppercase">
                        BY {project.author.toUpperCase()}
                      </span>
                      {href && (
<span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#0B1220] group-hover:gap-2.5 transition-all">
                        VIEW PROJECT
                        <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
                      </span>
)}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
