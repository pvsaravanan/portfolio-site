import Image from 'next/image';
import Link from 'next/link';
import { CATEGORY_COLORS, PROJECT_PREVIEW_COUNT, projects } from './data';
import { ArrowUpRight, DotGrid, ScreenHeader, Tag } from './ui';

export type Project = (typeof projects)[number];

export function ProjectCard({ p }: { p: Project }) {
  return (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative border border-[#0B1220] bg-[#F4F1EA] active:bg-[#ece7db] ${p.cover ? 'block' : 'flex gap-3 p-2'}`}
    >
      {p.cover && (
        <div className="relative aspect-[1983/793] w-full border-b border-[#0B1220] bg-[#0f0f0f]">
          <Image src={p.cover} alt={`${p.title} cover`} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" style={{ objectPosition: p.coverPos ?? '50% 50%' }} />
        </div>
      )}
      {!p.cover && <div className="relative w-[92px] shrink-0 self-start aspect-square border border-[#0B1220]" style={{ background: p.tint }}>
        <DotGrid className="inset-0" />
        <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-[#0B1220]/25">
          {p.title[0]}
        </span>
      </div>}
      <div className={`min-w-0 flex-1 pb-6 ${p.cover ? 'p-3 pb-9' : ''}`}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-bold leading-tight">{p.title}</h3>
          <span className={`shrink-0 px-1.5 py-0.5 text-[8px] font-bold tracking-wider ${CATEGORY_COLORS[p.category]}`}>
            {p.category}
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-snug text-[#374151]">{p.desc}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <div className={`absolute bottom-2 flex items-center justify-between ${p.cover ? 'left-3 right-3' : 'left-2 right-2'} text-[10px] font-bold tracking-[0.14em]`}>
        <span>{p.category === 'OPEN SOURCE' ? 'VIEW CONTRIBUTION' : 'VIEW PROJECT'}</span>
        <ArrowUpRight className="w-3 h-3" />
      </div>
    </a>
  );
}

// Home-page preview: the first few projects, then a link to the full, filterable page.
export default function ProjectsScreen() {
  return (
    <div className="px-4 py-6">
      <ScreenHeader
        tag="05 • PROJECTS"
        title="Projects &"
        muted="Contributions"
        blurb="Ideas turned into products, and contributions to open source."
      />

      <div className="space-y-3">
        {projects.slice(0, PROJECT_PREVIEW_COUNT).map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>

      <Link
        href="/projects"
        className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] underline underline-offset-4"
      >
        See more <ArrowUpRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
