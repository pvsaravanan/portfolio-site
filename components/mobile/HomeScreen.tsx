'use client';

import Image from 'next/image';
import { EMAIL, TabId } from './data';

const DOTS: React.CSSProperties = {
  backgroundImage: 'radial-gradient(#0B1220 1px, transparent 1px)',
  backgroundSize: '16px 16px',
};

const stats = [
  { label: 'PROJECTS', value: '10+', color: '#4ADE80' },
  { label: 'INTERNSHIPS', value: '3', color: '#60A5FA' },
  { label: 'CGPA', value: '8.52', color: '#FCD34D' },
];

function HeroButton({
  children,
  href,
  onClick,
  primary,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
}) {
  const cls = `relative h-[42px] inline-flex items-center justify-center border-[1.5px] border-[#0B1220] px-5 text-[11px] font-semibold tracking-[0.06em] uppercase whitespace-nowrap shadow-[2px_2px_0_rgba(26,26,26,0.9)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
    primary ? 'bg-[#D88060] text-[#F4F1EA]' : 'bg-[#F4F1EA] text-[#0B1220]'
  }`;
  const inner = (
    <>
      <span className="absolute top-1.5 left-1.5 w-1 h-1 bg-current opacity-80" aria-hidden="true" />
      <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-current opacity-80" aria-hidden="true" />
      <span className="absolute bottom-1.5 left-1.5 w-1 h-1 bg-current opacity-80" aria-hidden="true" />
      <span className="absolute bottom-1.5 right-1.5 w-1 h-1 bg-current opacity-80" aria-hidden="true" />
      {children}
    </>
  );
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <button onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export default function HomeScreen({ go }: { go: (t: TabId) => void }) {
  return (
    <div className="text-[#0B1220]">
      {/* Banner */}
      <div className="relative h-[clamp(130px,19svh,170px)] border-b-2 border-[#0B1220] bg-[linear-gradient(135deg,#D8826A_0%,#E5AE9D_55%,#EFD9CF_100%)]">
        <div className="absolute inset-0 opacity-[0.18]" style={DOTS} aria-hidden="true" />

        <span className="absolute top-3.5 right-[22px] border border-[#0B1220] bg-[#0B1220] px-2.5 py-1.5 text-[8.5px] font-bold uppercase leading-none tracking-[0.2em] text-[#F4F1EA]">
          Open to opportunities
        </span>

        {/* Avatar straddles the banner's bottom edge */}
        <div className="absolute left-[22px] bottom-0 translate-y-1/2 z-10">
          <div className="relative h-[104px] w-[104px]">
            <div className="absolute inset-0 translate-x-[5px] translate-y-[5px] bg-[#D88060]" aria-hidden="true" />
            <div className="absolute inset-0 overflow-hidden border-2 border-[#0B1220] bg-[#ece7db]">
              <Image
                src="/images/profile.jpg"
                alt="Saravanan P V"
                fill
                sizes="104px"
                priority
                className="object-cover object-[50%_20%] grayscale"
              />
            </div>
            <span className="absolute top-[6px] left-[6px] h-[9px] w-[9px] border-t-2 border-l-2 border-[#0B1220]" aria-hidden="true" />
            <span className="absolute bottom-[6px] right-[6px] h-[9px] w-[9px] border-b-2 border-r-2 border-[#0B1220]" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-[22px] pt-[72px] pb-6">
        <h2 className="text-[clamp(18px,5.4vw,22px)] font-bold leading-none tracking-tight">SARAVANAN P V</h2>
        <p className="mt-2 text-[9px] font-bold leading-relaxed tracking-[0.18em] text-[#374151] uppercase">
          AI/ML Engineer · Full-stack Developer · SDE · RPA Developer
        </p>

        <h1 className="mt-5 text-[clamp(22px,7.6vw,34px)] font-bold leading-[0.98] tracking-tighter">
          BUILDING SCALABLE
          <br />
          <span className="mt-1.5 inline-block bg-[#D88060] px-2.5 py-0.5 text-[#F4F1EA]">INTELLIGENT</span>
          <br />
          <em className="font-light">SOLUTIONS.</em>
        </h1>

        <p className="mt-5 text-[11.5px] leading-[1.65] text-[#374151]">
          AI engineer focused on building production-ready intelligent systems powered by LLMs, RAG pipelines, and
          multi-modal AI architectures. Experienced in developing scalable backend infrastructure, local AI deployments,
          and high-performance inference workflows using modern AI and full-stack technologies.
        </p>

        <div className="mt-6 flex gap-4">
          <HeroButton primary onClick={() => go('projects')}>
            View my works
          </HeroButton>
          <HeroButton href={`mailto:${EMAIL}`}>Hire me</HeroButton>
        </div>

        <div className="mt-6 grid grid-cols-3 border border-[#0B1220] bg-white/50">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-3 py-3 ${i > 0 ? 'border-l border-[#0B1220]' : ''}`}>
              <div className="text-xl font-bold leading-none">{s.value}</div>
              <div className="mt-2 flex items-center gap-1.5 text-[8px] font-bold tracking-widest text-[#374151]">
                <span className="h-1.5 w-1.5 shrink-0" style={{ background: s.color }} aria-hidden="true" />
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
