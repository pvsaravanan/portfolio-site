'use client';

import { useState } from 'react';
import { CATEGORY_COLORS, POST_FILTERS, posts } from './data';
import { ArrowUpRight, DotGrid, FilterChips, ScreenHeader } from './ui';

export default function InsightsScreen() {
  const [filter, setFilter] = useState<(typeof POST_FILTERS)[number]>('ALL');
  const list = filter === 'ALL' ? posts : posts.filter((p) => p.category === filter);

  return (
    <div className="px-4 py-6">
      <ScreenHeader
        tag="06 • INSIGHTS"
        title="Latest"
        muted="Insights"
        blurb="Thoughts, learnings, and notes from my journey in tech."
      />
      <FilterChips options={POST_FILTERS} value={filter} onChange={setFilter} />

      {list.length === 0 && (
        <p className="border border-dashed border-[#9c9790] p-6 text-center text-[11px] text-[#6e6e6e]">
          No posts in this category yet.
        </p>
      )}

      <div className="space-y-3">
        {list.map((p) => (
          <a
            key={p.n}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex gap-3 border border-[#0B1220] bg-[#F4F1EA] p-2 overflow-hidden"
          >
            <div className="relative w-[84px] shrink-0 self-stretch min-h-[120px] bg-[#0B1220]">
              <DotGrid className="inset-0 !opacity-30 invert" />
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[#F4F1EA]/80">
                {p.n}
              </span>
            </div>
            <div className="min-w-0 flex-1 py-1">
              <div className="flex items-center gap-2 text-[9px] tracking-wider text-[#6e6e6e]">
                {p.date}
                <span className={`px-1.5 py-0.5 font-bold ${CATEGORY_COLORS[p.category]}`}>{p.category}</span>
              </div>
              <h3 className="mt-2 text-[14px] font-bold leading-snug">{p.title}</h3>
              <p className="mt-1 text-[11px] leading-snug text-[#374151]">{p.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] underline underline-offset-4">
                READ MORE <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
