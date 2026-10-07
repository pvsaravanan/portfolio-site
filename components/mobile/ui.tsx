import React from 'react';

export const DOTS = {
  backgroundImage: 'radial-gradient(#0B1220 1px, transparent 1px)',
  backgroundSize: '10px 10px',
} as const;

export function Corners() {
  return (
    <>
      <span className="absolute top-1 left-1 w-1 h-1 bg-[#E07A5F]" aria-hidden="true" />
      <span className="absolute top-1 right-1 w-1 h-1 bg-[#E07A5F]" aria-hidden="true" />
      <span className="absolute bottom-1 left-1 w-1 h-1 bg-[#0B1220]" aria-hidden="true" />
      <span className="absolute bottom-1 right-1 w-1 h-1 bg-[#0B1220]" aria-hidden="true" />
    </>
  );
}

export function DotGrid({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`absolute opacity-[0.18] pointer-events-none ${className}`} style={DOTS} />;
}

export function ScreenHeader({
  tag,
  title,
  muted,
  blurb,
}: {
  tag: string;
  title: string;
  muted: string;
  blurb: string;
}) {
  return (
    <header className="mb-5">
      <span className="inline-block border border-[#0B1220] px-2 py-1 text-[9px] font-bold tracking-[0.18em] uppercase mb-3">
        {tag}
      </span>
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-[26px] leading-[0.95] font-bold tracking-tight uppercase">
          {title}
          <br />
          <span className="text-[#9c9790]">{muted}</span>
        </h2>
        <p className="text-[10px] leading-relaxed text-[#374151] max-w-[42%] pt-1">{blurb}</p>
      </div>
    </header>
  );
}

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 mb-4" role="tablist">
      {options.map((o) => (
        <button
          key={o}
          role="tab"
          aria-selected={o === value}
          onClick={() => onChange(o)}
          className={`shrink-0 border border-[#0B1220] px-3 py-2 text-[10px] font-bold tracking-[0.12em] uppercase transition-colors ${
            o === value ? 'bg-[#0B1220] text-[#F4F1EA]' : 'bg-transparent text-[#0B1220]'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-[#cfc8b7] bg-[#ece7db] px-2 py-1 text-[10px] text-[#374151]">{children}</span>
  );
}

export function StatStrip({ items }: { items: { value: string; label: string; color: string }[] }) {
  return (
    <div className="grid grid-cols-3 border border-[#0B1220] bg-white/40">
      {items.map((s, i) => (
        <div key={s.label} className={`px-3 py-3 ${i > 0 ? 'border-l border-[#0B1220]' : ''}`}>
          <div className="text-xl font-bold leading-none">{s.value}</div>
          <div className="mt-2 text-[8px] font-bold tracking-[0.14em] text-[#374151] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 shrink-0" style={{ background: s.color }} />
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArrowUpRight({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17L17 7M8 7h9v9" strokeLinecap="square" />
    </svg>
  );
}

export function PrimaryButton({
  href,
  children,
  variant = 'primary',
  onClick,
  className = '',
}: {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  onClick?: () => void;
  className?: string;
}) {
  const cls = `relative inline-flex items-center justify-center gap-2 border border-[#0B1220] px-3 py-3 text-[11px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap active:translate-y-px ${
    variant === 'primary' ? 'bg-[#E07A5F] text-[#F4F1EA]' : 'bg-transparent text-[#0B1220]'
  } ${className}`;
  const inner = (
    <>
      <Corners />
      <span>{children}</span>
    </>
  );
  return href ? (
    <a href={href} className={cls} onClick={onClick}>
      {inner}
    </a>
  ) : (
    <button className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
