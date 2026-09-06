'use client';

import React from 'react';

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  muted: string;
  right?: React.ReactNode;
  ink?: 'dark' | 'light';
}

export default function SectionHeader({ index, label, title, muted, right, ink = 'dark' }: SectionHeaderProps) {
  const borderColor = ink === 'dark' ? 'border-[#0B1220]' : 'border-[var(--ink)]';
  const textColor = ink === 'dark' ? 'text-[#374151]' : 'text-[var(--ink-3)]';

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-8 md:mb-10">
      <div className="flex items-center gap-3">
        <span className={`px-2 py-1 text-[9px] tracking-widest border ${borderColor} ${textColor}`}>
          § {index} · {label}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight uppercase">
          {title} <span className="text-[var(--ink-4)] font-medium">{muted}</span>
        </h2>
      </div>
      {right}
    </div>
  );
}
