'use client';

import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FaCodeCommit, FaCodeMerge } from 'react-icons/fa6';

const GITHUB_USERNAME = 'pvsaravanan';
const REPO_COUNT = 4;
const ITEMS_PER_LIST = 5;

interface CommitItem {
  key: string;
  message: string;
  repo: string;
  date: string;
  url: string;
}

interface MergeItem {
  key: string;
  title: string;
  repo: string;
  date: string;
  url: string;
}

interface GitHubRepo {
  name: string;
  fork: boolean;
  pushed_at: string;
}

interface GitHubCommit {
  sha: string;
  html_url: string;
  commit: { message: string; author?: { date?: string }; committer?: { date?: string } };
}

interface GitHubPull {
  number: number;
  title: string;
  html_url: string;
  merged_at: string | null;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export default function RecentActivity() {
  const [commits, setCommits] = useState<CommitItem[]>([]);
  const [merges, setMerges] = useState<MergeItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const repos = await fetchJson<GitHubRepo[]>(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=15`
      );

      if (!repos) {
        if (!cancelled) setStatus('error');
        return;
      }

      const activeRepos = repos
        .filter((repo) => !repo.fork)
        .slice(0, REPO_COUNT);

      const results = await Promise.allSettled(
        activeRepos.map(async (repo) => {
          const [repoCommits, repoPulls] = await Promise.all([
            fetchJson<GitHubCommit[]>(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=3`
            ),
            fetchJson<GitHubPull[]>(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/pulls?state=closed&per_page=5`
            ),
          ]);

          return { repo: repo.name, repoCommits: repoCommits ?? [], repoPulls: repoPulls ?? [] };
        })
      );

      const allCommits: CommitItem[] = [];
      const allMerges: MergeItem[] = [];

      for (const result of results) {
        if (result.status !== 'fulfilled') continue;
        const { repo, repoCommits, repoPulls } = result.value;

        for (const commit of repoCommits) {
          const date = commit.commit.author?.date ?? commit.commit.committer?.date;
          if (!date) continue;
          allCommits.push({
            key: commit.sha,
            message: commit.commit.message.split('\n')[0],
            repo,
            date,
            url: commit.html_url,
          });
        }

        for (const pull of repoPulls) {
          if (!pull.merged_at) continue;
          allMerges.push({
            key: `${repo}-${pull.number}`,
            title: pull.title,
            repo,
            date: pull.merged_at,
            url: pull.html_url,
          });
        }
      }

      allCommits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      allMerges.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      if (!cancelled) {
        setCommits(allCommits.slice(0, ITEMS_PER_LIST));
        setMerges(allMerges.slice(0, ITEMS_PER_LIST));
        setStatus('ready');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Recent Commits */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-4)] flex items-center gap-1.5">
            <FaCodeCommit className="w-3 h-3" />
            Recent Commits
          </span>
          <div className="h-[1px] flex-grow bg-[var(--rule)] opacity-50" />
        </div>
        <ActivityList
          status={status}
          items={commits}
          emptyLabel="No recent commits found."
          renderText={(item) => item.message}
        />
      </div>

      {/* Recent Merges */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-4)] flex items-center gap-1.5">
            <FaCodeMerge className="w-3 h-3" />
            Recent Merges
          </span>
          <div className="h-[1px] flex-grow bg-[var(--rule)] opacity-50" />
        </div>
        <ActivityList
          status={status}
          items={merges}
          emptyLabel="No recent merges found."
          renderText={(item) => item.title}
        />
      </div>
    </div>
  );
}

function ActivityList<T extends { key: string; repo: string; date: string; url: string }>({
  status,
  items,
  emptyLabel,
  renderText,
}: {
  status: 'loading' | 'ready' | 'error';
  items: T[];
  emptyLabel: string;
  renderText: (item: T) => string;
}) {
  if (status === 'loading') {
    return (
      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[42px] border border-[var(--rule)] bg-white/40 animate-pulse" />
        ))}
      </div>
    );
  }

  if (status === 'error' || items.length === 0) {
    return (
      <div className="border border-dashed border-[var(--rule)] px-4 py-3 text-[11px] text-[var(--ink-4)]">
        {status === 'error' ? 'Unable to load GitHub activity right now.' : emptyLabel}
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.key}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 border border-[#0B1220] bg-white px-3 py-2 hover:bg-[var(--paper-2)] transition-colors"
          >
            <span className="flex flex-col min-w-0">
              <span className="text-[11px] text-[#0B1220] font-medium truncate group-hover:text-[var(--accent)] transition-colors">
                {renderText(item)}
              </span>
              <span className="text-[9px] text-[var(--ink-4)] tracking-wide uppercase">
                {item.repo}
              </span>
            </span>
            <span className="text-[9px] text-[var(--ink-4)] whitespace-nowrap shrink-0">
              {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
