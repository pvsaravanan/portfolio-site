import { format } from 'date-fns';
import { getRepoStats } from '@/lib/github';

// GitHub's language colours, so the bar matches what people expect.
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Java: '#B07219',
  Swift: '#F05138',
  CSS: '#563D7C',
  HTML: '#E34C26',
  Kotlin: '#A97BFF',
  Python: '#3572A5',
  Shell: '#89E051',
};
const MAX_LANGS = 4;

const label = 'text-[9px] font-bold tracking-[0.18em] uppercase text-[#6e6e6e]';

/** Live repo numbers for a project card: commits, latest release and language mix. */
export default async function GitHubStats({ repo }: { repo: string }) {
  const s = await getRepoStats(repo);
  if (!s) return null;

  const shown = s.languages.slice(0, MAX_LANGS);
  const rest = s.languages.slice(MAX_LANGS).reduce((n, l) => n + l.pct, 0);
  const langs = rest > 0.5 ? [...shown, { name: 'Other', pct: rest }] : shown;

  return (
    <div className="mt-5 space-y-4 border-t border-[#0B1220] pt-5 text-[11px]">
      <div className="flex items-end justify-between">
        <span className={label}>GitHub</span>
        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold tracking-widest uppercase hover:text-[#E07A5F]">
          {s.repo} ↗
        </a>
      </div>

      <div className="grid grid-cols-2 gap-px border border-[#0B1220] bg-[#0B1220]">
        <div className="bg-white p-3">
          <div className={label}>Commits</div>
          <div className="mt-1 text-2xl font-extrabold leading-none tabular-nums">{s.commits ?? '—'}</div>
          {s.pushedAt && <div className="mt-1.5 text-[9px] text-[#6e6e6e]">Last {format(new Date(s.pushedAt), 'd MMM yyyy')}</div>}
        </div>
        <div className="bg-white p-3">
          <div className={label}>Last release</div>
          {s.release ? (
            <>
              <a href={s.release.url} target="_blank" rel="noopener noreferrer" className="mt-1 block text-2xl font-extrabold leading-none hover:text-[#E07A5F]">
                {s.release.tag}
              </a>
              <div className="mt-1.5 text-[9px] text-[#6e6e6e]">
                {format(new Date(s.release.publishedAt), 'd MMM yyyy')}
                {s.release.downloads > 0 && ` · ${s.release.downloads} download${s.release.downloads === 1 ? '' : 's'}`}
              </div>
            </>
          ) : (
            <div className="mt-1 text-2xl font-extrabold leading-none">—</div>
          )}
        </div>
      </div>

      {langs.length > 0 && (
        <div>
          <div className={`${label} mb-2`}>Languages</div>
          <div className="flex h-2 w-full overflow-hidden border border-[#0B1220]" role="img" aria-label={langs.map((l) => `${l.name} ${l.pct.toFixed(0)}%`).join(', ')}>
            {langs.map((l) => (
              <span key={l.name} style={{ width: `${l.pct}%`, background: LANG_COLORS[l.name] ?? '#6e6e6e' }} />
            ))}
          </div>
          <ul className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {langs.map((l) => (
              <li key={l.name} className="flex items-center gap-1.5 text-[10px] font-bold">
                <span className="h-2 w-2 shrink-0" style={{ background: LANG_COLORS[l.name] ?? '#6e6e6e' }} />
                {l.name}
                <span className="ml-auto tabular-nums text-[#6e6e6e]">{l.pct < 1 ? '<1' : l.pct.toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
