'use client';

import React from 'react';

const feedItems = [
  { label: 'Currently', text: 'ServiceNow — Associate Software Intern (Incoming)', color: '#d88060' },
  { label: 'Latest project', text: 'WhisperCrawler — adaptive web scraping framework', color: '#4ADE80' },
  { label: 'Founding Member', text: 'DeadEnd Engineers — developer community', color: '#7aa8cd' },
  { label: 'Latest article', text: 'Agentic RAG — self-correcting retrieval pipelines', color: '#a795c8' },
  { label: 'Now building', text: 'Parallax.AI — unified open-source model platform', color: '#d9a85a' },
];

export default function LiveFeed() {
  const items = [...feedItems, ...feedItems];

  return (
    <div className="border-b border-[#0B1220] bg-[#0B1220] text-[#F4F1EA] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch">
        <div className="hidden sm:flex items-center gap-2 pr-4 py-2 border-r border-[#3a3a3a] shrink-0">
          <span className="inline-block w-1.5 h-1.5 bg-[#E07A5F] animate-pulse" />
          <span className="text-[9px] tracking-widest font-bold uppercase whitespace-nowrap">Live Feed</span>
        </div>
        <div className="flex-1 overflow-hidden py-2 pl-4">
          <div className="flex whitespace-nowrap gap-10 animate-marquee">
            {items.map((item, idx) => (
              <span key={idx} className="flex items-center gap-2 text-[10px] tracking-wide">
                <span className="inline-block w-1.5 h-1.5" style={{ backgroundColor: item.color }} />
                <span className="font-bold uppercase text-[#F4F1EA]/90">{item.label}</span>
                <span className="text-[#9c9790]">·</span>
                <span className="text-[#c9c4b8]">{item.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
