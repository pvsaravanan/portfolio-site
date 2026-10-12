import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/projects';

type Params = { slug: string };

const realProjects = projects.filter((p) => !p.placeholder);

export function generateStaticParams(): Params[] {
  return realProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return { title: `${p.title} | saravananpv`, description: p.desc };
}

export default function ProjectPage({ params }: { params: Params }) {
  const p = getProject(params.slug);
  if (!p) notFound();

  const i = realProjects.findIndex((x) => x.slug === p.slug);
  const prev = realProjects[i - 1];
  const next = realProjects[i + 1];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0B1220] pb-[env(safe-area-inset-bottom)]">
      <header className="sticky top-0 z-40 border-b border-[#0B1220] bg-[#F4F1EA] pt-[env(safe-area-inset-top)]">
        <div className="max-w-[1100px] mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
          <Link href="/#projects" className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em]">
            <span aria-hidden="true">←</span> Back
          </Link>
          <span className="text-[10px] font-semibold tracking-[0.2em]">SARAVANAN P V</span>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Title block */}
        <div className="relative border border-[#0B1220] overflow-hidden mb-6"
          style={{ background: `linear-gradient(135deg, ${p.tagColor}2A, #EDE7DA 70%)` }}>
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#0B1220 1px, transparent 1px)', backgroundSize: '18px 18px' }}
            aria-hidden="true"
          />
          <span
            className="absolute -bottom-6 -right-3 text-[110px] sm:text-[200px] font-black leading-none select-none pointer-events-none"
            style={{ color: p.tagColor, opacity: 0.4 }}
            aria-hidden="true"
          >
            {p.n}
          </span>
          <div className="relative p-5 sm:p-10">
            <span
              className="inline-block px-2 py-1 text-[9px] font-bold tracking-widest uppercase"
              style={{ backgroundColor: p.tagColor }}
            >
              {p.tag}
            </span>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
              <span className="text-[#6e6e6e]">{p.n}</span>
              <span className="w-1 h-1 bg-[#6e6e6e]" />
              <span className="text-[#E07A5F]">{p.date}</span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-6xl font-extrabold uppercase tracking-tight leading-[1.02]">{p.title}</h1>
          </div>
        </div>

        {p.cover && (
          <div className="relative aspect-[1983/793] w-full border border-[#0B1220] mb-8" style={{ background: p.coverBg ?? '#0f0f0f' }}>
            <Image src={p.cover} alt={`${p.title} cover`} fill priority sizes="(min-width: 1100px) 1100px, 100vw" className="object-contain" />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <h2 className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#6e6e6e] mb-3">Overview</h2>
            <p className="text-[15px] leading-relaxed text-[#374151] font-['Inter',system-ui,sans-serif]">{p.summary}</p>

            <h2 className="mt-10 mb-3 text-[10px] font-bold tracking-[0.18em] uppercase text-[#6e6e6e]">Highlights</h2>
            <ul className="border-t border-[#0B1220]">
              {p.highlights.map((h, idx) => (
                <li key={h.title} className="flex gap-4 border-b border-[#cfc8b7] py-4">
                  <span className="text-[11px] font-bold tracking-widest text-[#E07A5F]">{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-[13px] font-bold uppercase tracking-wide">{h.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#374151] font-['Inter',system-ui,sans-serif]">{h.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-20 self-start border border-[#0B1220] bg-[#F6F1E7] p-5">
            <dl className="space-y-4 text-[11px]">
              <div>
                <dt className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#6e6e6e]">Status</dt>
                <dd className="mt-1 font-bold uppercase tracking-wider">{p.status}</dd>
              </div>
              <div>
                <dt className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#6e6e6e]">Category</dt>
                <dd className="mt-1 font-bold uppercase tracking-wider">{p.category}</dd>
              </div>
              <div>
                <dt className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#6e6e6e]">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="px-2 py-1 text-[9px] font-bold tracking-widest uppercase border border-[#0B1220] bg-white">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between border border-[#0B1220] bg-[#0B1220] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F4F1EA] hover:bg-[#E07A5F] hover:text-[#0B1220] transition-colors"
              >
                View on GitHub <span aria-hidden="true">↗</span>
              </a>
            )}
          </aside>
        </div>

        {(prev || next) && (
          <nav className="mt-12 grid grid-cols-2 gap-3 text-[10px] font-bold uppercase tracking-[0.18em]" aria-label="More projects">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="border border-[#0B1220] p-4 hover:bg-[#F3EDE1]">← {prev.title}</Link>
            ) : <span />}
            {next ? (
              <Link href={`/projects/${next.slug}`} className="border border-[#0B1220] p-4 text-right hover:bg-[#F3EDE1]">{next.title} →</Link>
            ) : <span />}
          </nav>
        )}
      </main>
    </div>
  );
}
