'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const projects = [
  {
    id: 'W-04',
    tag: 'PROJECT',
    tagColor: '#4ADE80',
    title: 'WHISPERCRAWLER',
    desc: 'Adaptive web scraping framework — fast, stealthy, and self-healing selectors.',
    date: 'APRIL 15, 2026',
    author: 'SARAVANAN P V',
    link: 'https://github.com/pvsaravanan/whispercrawler',
    tags: ['PYTHON', 'PLAYWRIGHT', 'ANTI-DETECTION', 'ASYNC I/O'],
  },
  {
    id: 'W-03',
    tag: 'PROJECT',
    tagColor: '#4ADE80',
    title: 'PARALLAX.AI',
    desc: 'Unified open-source AI model platform with chat modes, OpenAI-compatible API, and ELO research leaderboard.',
    date: 'APRIL 18, 2026',
    author: 'SARAVANAN P V',
    link: 'https://github.com/pvsaravanan/parallax.ai',
    tags: ['NEXT.JS', 'OPENAI-COMPATIBLE API', 'ELO RANKING', 'MULTI-MODEL'],
  },
  {
    id: 'W-02',
    tag: 'PROJECT',
    tagColor: '#4ADE80',
    title: 'CLARA.AI',
    desc: 'Privacy-first AI answer engine running on your hardware with search + documents + local/cloud LLM support.',
    date: 'MARCH 01, 2026',
    author: 'SARAVANAN P V',
    link: 'https://github.com/pvsaravanan/Clara.ai',
    tags: ['RAG PIPELINE', 'LOCAL LLM', 'VECTOR SEARCH', 'NEXT.JS'],
  },
  {
    id: 'W-01',
    tag: 'PROJECT',
    tagColor: '#4ADE80',
    title: 'CRADLESENSE',
    desc: 'IoT-based neonatal care monitoring system for NICU with real-time vitals, dashboards, and alerting.',
    date: 'JANUARY 10, 2026',
    author: 'SARAVANAN P V',
    link: 'https://github.com/pvsaravanan/CradleSense',
    tags: ['IOT', 'REACT', 'REAL-TIME DASHBOARD', 'NODE.JS'],
  },
];

export default function Projects() {
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
            const number = project.id.split('-')[1];

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group border border-[#0B1220] bg-[#F6F1E7] hover:bg-[#F3EDE1] transition-colors cursor-pointer"
                role={project.link ? 'link' : undefined}
                tabIndex={project.link ? 0 : undefined}
                onClick={() => {
                  if (!project.link) return;
                  window.open(project.link, '_blank', 'noopener,noreferrer');
                }}
                onKeyDown={(e) => {
                  if (!project.link) return;
                  if (e.key !== 'Enter' && e.key !== ' ') return;
                  e.preventDefault();
                  window.open(project.link, '_blank', 'noopener,noreferrer');
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
                      <span className="text-[10px] font-bold tracking-widest text-[var(--ink-4)]">{project.id}</span>
                      <span className="w-1 h-1 bg-[var(--ink-4)]" />
                      <span className="text-[10px] font-bold tracking-widest text-[#E07A5F] uppercase">
                        {project.date}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight leading-[1.05] text-[#0B1220] mb-2 sm:mb-3">
                      {project.title}
                    </h3>

                    <p className="text-[13px] text-[#374151] leading-snug mb-3 sm:mb-4 max-w-md">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-[9px] font-bold tracking-widest uppercase border border-[#0B1220] bg-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-dashed border-[#cbd5e1]">
                      <span className="text-[9px] tracking-widest text-[#374151] font-bold uppercase">
                        BY {project.author}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#0B1220] group-hover:gap-2.5 transition-all">
                        VIEW PROJECT
                        <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
                      </span>
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
