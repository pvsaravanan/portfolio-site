'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
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

const HEATMAP_THEMES = {
  green: {
    label: 'Green',
    colors: ['#EBE7DE', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    preview: '#40c463',
  },
  amber: {
    label: 'Amber',
    colors: ['#EBE7DE', '#FDE68A', '#FCD34D', '#F59E0B', '#B45309'],
    preview: '#F59E0B',
  },
  blue: {
    label: 'Electric',
    colors: ['#EBE7DE', '#93c5fd', '#60a5fa', '#3b82f6', '#1d4ed8'],
    preview: '#3b82f6',
  },
  purple: {
    label: 'Royal',
    colors: ['#EBE7DE', '#d8b4fe', '#a855f7', '#9333ea', '#6b21a8'],
    preview: '#a855f7',
  },
};

export default function LeetCodeStats() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof HEATMAP_THEMES>('green');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
  const totalDifficultyCount = Math.max(1, difficultyBars.reduce((sum, d) => sum + d.count, 0));

  const activeHeatmapTheme = HEATMAP_THEMES[selectedTheme];
  const heatmapTheme = {
    light: activeHeatmapTheme.colors,
    dark: activeHeatmapTheme.colors,
  };

  // On mobile the calendar renders at its natural (legible) size instead of being squeezed
  // to fit the viewport, so the wrapper scrolls horizontally. Default that scroll to the
  // right edge so the most recent submissions are visible without the user needing to swipe first.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const el = scrollContainerRef.current;
      if (el) el.scrollLeft = el.scrollWidth;
    });
    return () => cancelAnimationFrame(frame);
  }, [selectedTheme, activities]);

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
    <div className="flex flex-col gap-6 sm:gap-8">
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
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-4)]">Difficulty Breakdown</span>
          <div className="h-[1px] flex-grow bg-[var(--rule)] opacity-50" />
        </div>
        <div className="flex h-3 border border-[#0B1220] overflow-hidden">
          {difficultyBars.map((bar) => (
            <div
              key={bar.label}
              className="h-full border-r border-white last:border-r-0 transition-all duration-500"
              style={{
                width: `${(bar.count / totalDifficultyCount) * 100}%`,
                backgroundColor: bar.color,
              }}
              title={`${bar.label}: ${bar.count}`}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3">
          {difficultyBars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0B1220]">
              <span className="w-2 h-2 shrink-0" style={{ backgroundColor: bar.color }} />
              {bar.label}
              <span className="text-[var(--ink-4)]">{bar.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Heatmap */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-4)] whitespace-nowrap">Submission Heatmap (Last 52 Weeks)</span>
            <div className="h-[1px] flex-grow bg-[var(--rule)] opacity-50" />
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--ink-4)]">Theme Style</span>
            <div className="flex gap-2.5 h-[26px] items-center">
              {Object.entries(HEATMAP_THEMES).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTheme(key as keyof typeof HEATMAP_THEMES)}
                  title={theme.label}
                  className={`relative w-5 h-5 border-[1.5px] transition-all duration-150 ${
                    selectedTheme === key
                      ? 'border-[#0B1220] scale-110'
                      : 'border-[var(--rule)] hover:border-[#0B1220]'
                  }`}
                  style={{ backgroundColor: theme.preview }}
                >
                  {selectedTheme === key && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#0B1220]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          className="w-full flex justify-start sm:justify-center overflow-x-auto py-4 bg-white/30 border border-[var(--rule)] rounded-sm px-4 [&>*]:shrink-0 [&_svg]:h-auto sm:[&_svg]:w-full sm:[&_svg]:max-w-none"
        >
          <ActivityCalendar
            data={activities}
            theme={heatmapTheme}
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
