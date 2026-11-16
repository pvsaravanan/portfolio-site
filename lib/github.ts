export interface RepoStats {
  repo: string;
  url: string;
  commits: number | null;
  pushedAt: string | null;
  release: { tag: string; publishedAt: string; url: string; downloads: number } | null;
  languages: { name: string; pct: number }[];
}

const HEADERS = { Accept: 'application/vnd.github+json' };
const OPTS = { headers: HEADERS, next: { revalidate: 3600 } } as const;

/** "https://github.com/owner/name" -> "owner/name" (null for any other link). */
export const repoFromUrl = (link?: string) => link?.match(/^https:\/\/github\.com\/([\w.-]+\/[\w.-]+?)\/?$/)?.[1] ?? null;

const getJson = async <T>(path: string): Promise<T | null> => {
  try {
    const res = await fetch(`https://api.github.com/repos/${path}`, OPTS);
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
};

/** The commit count is the last page number of a one-per-page listing. */
async function countCommits(repo: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, OPTS);
    if (!res.ok) return null;
    const last = res.headers.get('link')?.match(/[?&]page=(\d+)>; rel="last"/)?.[1];
    return last ? Number(last) : ((await res.json()) as unknown[]).length;
  } catch {
    return null;
  }
}

/** Public repo stats, cached for an hour. Returns null if GitHub can't be reached, so callers can hide the card. */
export async function getRepoStats(repo: string): Promise<RepoStats | null> {
  const [meta, langs, rel, commits] = await Promise.all([
    getJson<{ pushed_at: string }>(repo),
    getJson<Record<string, number>>(`${repo}/languages`),
    getJson<{
      tag_name: string;
      published_at: string;
      html_url: string;
      assets: { download_count: number; name: string }[];
    }>(`${repo}/releases/latest`),
    countCommits(repo),
  ]);
  if (!meta && !langs && !rel && commits === null) return null;

  const total = Object.values(langs ?? {}).reduce((a, b) => a + b, 0);
  const languages = Object.entries(langs ?? {})
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({ name, pct: total ? (bytes / total) * 100 : 0 }));

  return {
    repo,
    url: `https://github.com/${repo}`,
    commits,
    pushedAt: meta?.pushed_at ?? null,
    release: rel
      ? {
          tag: rel.tag_name,
          publishedAt: rel.published_at,
          url: rel.html_url,
          downloads: rel.assets.filter((a) => !a.name.endsWith('.sha256')).reduce((n, a) => n + a.download_count, 0),
        }
      : null,
    languages,
  };
}
