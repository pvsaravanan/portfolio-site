'use client';

import { useEffect, useState } from 'react';
import { loadRecentActivity } from '../RecentActivity';

export interface LeetCodeData {
  username: string;
  ranking: number | null;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  streak: number;
  totalActiveDays: number;
  submissionCalendar: Record<string, number>;
}

export interface GitHubDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubCalendarData {
  contributions: GitHubDay[];
  total: number;
}

const GITHUB_USER = 'pvsaravanan';
const CACHE_KEY = 'gh-calendar-v1';
const CACHE_TTL = 60 * 60 * 1000;

// Module-level caches, so switching tabs never refetches and the data can be warmed ahead of time.
let leetcodeCache: LeetCodeData | null = null;
let leetcodePromise: Promise<LeetCodeData> | null = null;
let githubCache: GitHubCalendarData | null = null;
let githubPromise: Promise<GitHubCalendarData> | null = null;

export function loadLeetCode(): Promise<LeetCodeData> {
  if (!leetcodePromise) {
    leetcodePromise = fetch('/api/leetcode')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((json: LeetCodeData) => (leetcodeCache = json))
      .catch((e) => {
        leetcodePromise = null;
        throw e;
      });
  }
  return leetcodePromise;
}

function readStoredGitHub(): GitHubCalendarData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    return Date.now() - at < CACHE_TTL ? (data as GitHubCalendarData) : null;
  } catch {
    return null;
  }
}

export function loadGitHubCalendar(): Promise<GitHubCalendarData> {
  if (!githubPromise) {
    const stored = readStoredGitHub();
    if (stored) {
      githubCache = stored;
      githubPromise = Promise.resolve(stored);
    } else {
      githubPromise = fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`)
        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
        .then((json) => {
          const data: GitHubCalendarData = {
            contributions: json.contributions,
            total: json?.total?.lastYear ?? 0,
          };
          githubCache = data;
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
          } catch {
            /* storage unavailable: fine, the in-memory cache still works */
          }
          return data;
        })
        .catch((e) => {
          githubPromise = null;
          throw e;
        });
    }
  }
  return githubPromise;
}

// Start every Coding-tab request up front (the user is probably still reading the hero).
export function warmCodingData() {
  loadLeetCode().catch(() => {});
  loadGitHubCalendar().catch(() => {});
  loadRecentActivity().catch(() => {});
}

export function useLeetCode() {
  const [data, setData] = useState<LeetCodeData | null>(leetcodeCache);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (leetcodeCache) return;
    let cancelled = false;
    loadLeetCode()
      .then((d) => !cancelled && setData(d))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, failed };
}

export function useGitHubCalendar() {
  const [data, setData] = useState<GitHubCalendarData | null>(githubCache);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (githubCache) return;
    let cancelled = false;
    loadGitHubCalendar()
      .then((d) => !cancelled && setData(d))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, failed };
}
