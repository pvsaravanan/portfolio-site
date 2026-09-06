'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface LeetCodeData {
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

const DAYS_TO_SHOW = 371; // roughly the last 52-53 weeks, to match a GitHub-style calendar

function levelForCount(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

function buildActivities(calendar: Record<string, number>) {
  const today = new Date();
  const activities = [];

  for (let i = DAYS_TO_SHOW - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayStartUtc = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 1000);
    const count = calendar[String(dayStartUtc)] ?? 0;

    activities.push({
      date: date.toISOString().slice(0, 10),
      count,
      level: levelForCount(count),
    });
  }

  return activities;
}

const CALENDAR_THEME = {
  light: ['#EBE7DE', '#FDE68A', '#FCD34D', '#F59E0B', '#B45309'],
  dark: ['#EBE7DE', '#FDE68A', '#FCD34D', '#F59E0B', '#B45309'],
};

export default function LeetCodeStats() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/leetcode')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const activities = useMemo(() => buildActivities(data?.submissionCalendar ?? {}), [data]);

  const difficultyBars = data
    ? [
        { label: 'Easy', count: data.easySolved, color: '#4ADE80' },
        { label: 'Medium', count: data.mediumSolved, color: '#FCD34D' },
        { label: 'Hard', count: data.hardSolved, color: '#E07A5F' },
      ]
    : [];
  const maxDifficultyCount = Math.max(1, ...difficultyBars.map((d) => d.count));

  if (status === 'error') {
    return (
      <div className="border border-dashed border-[var(--rule)] px-4 py-6 text-center text-[11px] text-[var(--ink-4)]">
        Unable to load LeetCode stats right now.
      </div>
    );
  }

  if (status === 'loading' || !data) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-[var(--rule)] border-t-[#0B1220] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Headline Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#0B1220]">
        <div className="px-4 py-3">
          <div className="text-xl font-bold text-[#0B1220]">{data.totalSolved}</div>
          <div className="flex items-center gap-1.5 text-[9px] tracking-widest text-[var(--ink-4)] mt-1 font-bold">
            <span className="w-1.5 h-1.5 shrink-0 bg-[#FCD34D]" />
            TOTAL SOLVED
          </div>
        </div>
        <div className="px-4 py-3 border-l border-[#0B1220]">
          <div className="text-xl font-bold text-[#0B1220]">{data.streak}D</div>
          <div className="flex items-center gap-1.5 text-[9px] tracking-widest text-[var(--ink-4)] mt-1 font-bold">
            <span className="w-1.5 h-1.5 shrink-0 bg-[#E07A5F]" />
            STREAK
          </div>
        </div>
        <div className="px-4 py-3 border-t border-[#0B1220] sm:border-t-0 sm:border-l">
          <div className="text-xl font-bold text-[#0B1220]">{data.totalActiveDays}</div>
          <div className="flex items-center gap-1.5 text-[9px] tracking-widest text-[var(--ink-4)] mt-1 font-bold">
            <span className="w-1.5 h-1.5 shrink-0 bg-[#60A5FA]" />
            ACTIVE DAYS
          </div>
        </div>
        <div className="px-4 py-3 border-t border-l border-[#0B1220] sm:border-t-0">
          <div className="text-xl font-bold text-[#0B1220]">
            {data.ranking !== null ? `#${data.ranking.toLocaleString()}` : '—'}
          </div>
          <div className="flex items-center gap-1.5 text-[9px] tracking-widest text-[var(--ink-4)] mt-1 font-bold">
            <span className="w-1.5 h-1.5 shrink-0 bg-[#A78BFA]" />
            GLOBAL RANK
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-4)]">Difficulty Breakdown</span>
          <div className="h-[1px] flex-grow bg-[var(--rule)] opacity-50" />
        </div>
        <div className="flex flex-col gap-3">
          {difficultyBars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-3">
              <span className="w-14 text-[10px] font-bold uppercase tracking-widest text-[#0B1220] shrink-0">
                {bar.label}
              </span>
              <div className="flex-1 h-3 border border-[#0B1220] bg-white overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${(bar.count / maxDifficultyCount) * 100}%`,
                    backgroundColor: bar.color,
                  }}
                />
              </div>
              <span className="w-8 text-right text-[11px] font-bold text-[#0B1220] shrink-0">{bar.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Heatmap */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-4)]">Submission Heatmap (Last 52 Weeks)</span>
          <div className="h-[1px] flex-grow bg-[var(--rule)] opacity-50" />
        </div>
        <div className="w-full flex justify-center py-4 bg-white/30 border border-[var(--rule)] rounded-sm px-4 [&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-none">
          <ActivityCalendar
            data={activities}
            theme={CALENDAR_THEME}
            colorScheme="light"
            fontSize={13}
            blockSize={14}
            blockMargin={4}
            showWeekdayLabels={false}
            renderBlock={(block, activity) =>
              React.cloneElement(block as React.ReactElement, {
                'data-tooltip-id': 'lc-tooltip',
                'data-tooltip-content': `${activity.count} submission${activity.count === 1 ? '' : 's'} on ${activity.date}`,
              })
            }
          />
        </div>
        <Tooltip
          id="lc-tooltip"
          style={{
            fontSize: '10px',
            backgroundColor: '#0B1220',
            color: '#fff',
            borderRadius: '2px',
            padding: '4px 8px',
            zIndex: 100,
          }}
        />
      </div>
    </div>
  );
}
