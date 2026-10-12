'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PROJECT_FILTERS, projects } from './data';
import { ProjectCard } from './ProjectsScreen';
import { FilterChips, ScreenHeader } from './ui';

export default function AllProjects() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>('ALL');
  const list = filter === 'ALL' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#F4F1EA] pb-[env(safe-area-inset-bottom)] text-[#0B1220]">
      <header className="sticky top-0 z-40 border-b border-[#0B1220] bg-[#F4F1EA] pt-[env(safe-area-inset-top)]">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/#projects" className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em]">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5m6-6l-6 6 6 6" strokeLinecap="square" />
            </svg>
            Back
          </Link>
          <span className="text-[9.8px] font-semibold tracking-[0.2em]">SARAVANAN P V</span>
        </div>
      </header>

      <main className="px-4 py-6">
        <ScreenHeader
          tag="05 • PROJECTS"
          title="All"
          muted="Projects"
          blurb="Ideas turned into products, and contributions to open source."
        />
        <FilterChips options={PROJECT_FILTERS} value={filter} onChange={setFilter} />

        {list.length === 0 && (
          <p className="border border-dashed border-[#9c9790] p-6 text-center text-[11px] text-[#6e6e6e]">
            Nothing here yet.
          </p>
        )}

        <div className="space-y-3">
          {list.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </main>
    </div>
  );
}
