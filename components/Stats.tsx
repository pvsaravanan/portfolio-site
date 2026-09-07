'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { FaGithub, FaChartLine, FaCodeMerge } from 'react-icons/fa6';
import SectionHeader from './SectionHeader';
import RecentActivity from './RecentActivity';
import LeetCodeStats from './LeetCodeStats';

const GITHUB_USERNAME = 'pvsaravanan';

type Activity = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

interface YearStats {
  total: number;
  activeDays: number;
  bestStreak: number;
  busiest: number;
}

const EMPTY_STATS: YearStats = { total: 0, activeDays: 0, bestStreak: 0, busiest: 0 };

const STAT_CARD_BORDERS = [
  '',
  'border-l border-[#0B1220]',
  'border-t border-[#0B1220] sm:border-t-0 sm:border-l',
  'border-t border-l border-[#0B1220] sm:border-t-0',
];

type GitHubTab = 'contributions' | 'merges';

export default function Stats() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedTheme, setSelectedTheme] = useState('orange');
  const [mounted, setMounted] = useState(false);
  const [yearStats, setYearStats] = useState<YearStats>(EMPTY_STATS);
  const [activeTab, setActiveTab] = useState<GitHubTab>('contributions');
  const [lastYearTotal, setLastYearTotal] = useState<number | null>(null);
  const years = [2026, 2025, 2024];

  // Rolling "last 365 days" total for the prominent username header, independent of
  // whichever calendar year is currently selected below.
  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.total?.lastYear !== undefined) {
          setLastYearTotal(data.total.lastYear);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const themes = {
    orange: {
      label: 'Portfolio',
      colors: ['#ebedf0', '#d88060', '#c56442', '#a04d32', '#1a1a1a'],
      preview: '#c56442'
    },
    green: {
      label: 'GitHub',
      colors: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
      preview: '#40c463'
    },
    blue: {
      label: 'Electric',
      colors: ['#ebedf0', '#93c5fd', '#60a5fa', '#3b82f6', '#1d4ed8'],
      preview: '#3b82f6'
    },
    purple: {
      label: 'Royal',
      colors: ['#ebedf0', '#d8b4fe', '#a855f7', '#9333ea', '#6b21a8'],
      preview: '#a855f7'
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const githubTheme = {
    light: themes[selectedTheme as keyof typeof themes].colors,
    dark: themes[selectedTheme as keyof typeof themes].colors,
  };

  // The calendar library calls transformData on every one of its own renders (not just when
  // the underlying data changes), so we track the last computed values ourselves and only
  // setState when they actually differ — otherwise this becomes an infinite render loop
  // (setState -> re-render -> transformData runs again -> setState -> ...) that freezes the tab.
  const lastStatsRef = useRef<YearStats>(EMPTY_STATS);

  // Reset headline stats when the selected year changes so stale numbers from the
  // previous year don't linger while the new year's data loads.
  useEffect(() => {
    lastStatsRef.current = EMPTY_STATS;
    setYearStats(EMPTY_STATS);
  }, [selectedYear]);

  // Derive headline stats (total / active days / best streak / busiest day) from the
  // calendar's own fetched data for whichever year is selected, without a second API call.
  const deriveStats = useCallback((data: Activity[]) => {
    let total = 0;
    let activeDays = 0;
    let bestStreak = 0;
    let currentStreak = 0;
    let busiest = 0;

    for (const day of data) {
      total += day.count;
      if (day.count > 0) {
        activeDays += 1;
        currentStreak += 1;
        bestStreak = Math.max(bestStreak, currentStreak);
        busiest = Math.max(busiest, day.count);
      } else {
        currentStreak = 0;
      }
    }

    const next: YearStats = { total, activeDays, bestStreak, busiest };
    const prev = lastStatsRef.current;
    const changed =
      prev.total !== next.total ||
      prev.activeDays !== next.activeDays ||
      prev.bestStreak !== next.bestStreak ||
      prev.busiest !== next.busiest;

    if (changed) {
      lastStatsRef.current = next;
      // Deferred so we don't setState while the calendar library is mid-render.
      Promise.resolve().then(() => setYearStats(next));
    }

    return data;
  }, []);

  const statCards = [
    { label: 'TOTAL CONTRIBUTIONS', value: yearStats.total, color: '#4ADE80' },
    { label: 'ACTIVE DAYS', value: yearStats.activeDays, color: '#60A5FA' },
    { label: 'BEST STREAK', value: `${yearStats.bestStreak}D`, color: '#FCD34D' },
    { label: 'BUSIEST DAY', value: yearStats.busiest, color: '#E07A5F' },
  ];

  return (
    <section id="stats" className="border-b border-[#0B1220] bg-[var(--paper-2)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader index="06" label="ACTIVITY" title="CODING" muted="ACTIVITY" />

        <div className="grid grid-cols-1 gap-8">
          {/* Interactive GitHub Calendar */}
          <div className="border-2 border-[#0B1220] bg-[var(--paper)] p-5 sm:p-6 lg:p-8 shadow-[var(--sh-2)] relative group hover:shadow-[var(--sh-hover)] transition-all duration-150">
            <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
            <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
            <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />

            {/* Username Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <FaGithub className="w-8 h-8 text-[#0B1220] shrink-0" />
                <div>
                  <div className="text-lg font-bold text-[#0B1220] leading-tight">@{GITHUB_USERNAME}</div>
                  <div className="text-[11px] text-[var(--ink-4)]">
                    {lastYearTotal !== null ? `${lastYearTotal} contributions in the last year` : 'Loading contributions…'}
                  </div>
                </div>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold underline decoration-1 underline-offset-4 shrink-0"
              >
                VIEW PROFILE →
              </a>
            </div>

            {/* Tab Toggle */}
            <div className="flex sm:inline-flex items-center gap-1 bg-[var(--paper-2)] border border-[var(--rule)] rounded-full p-1 mb-8 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('contributions')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-[11px] font-bold whitespace-nowrap transition-all duration-150 ${
                  activeTab === 'contributions'
                    ? 'bg-white text-[#0B1220] shadow-sm'
                    : 'text-[var(--ink-4)] hover:text-[#0B1220]'
                }`}
              >
                <FaChartLine className="w-3.5 h-3.5 shrink-0" />
                Contributions
              </button>
              <button
                onClick={() => setActiveTab('merges')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-[11px] font-bold whitespace-nowrap transition-all duration-150 ${
                  activeTab === 'merges'
                    ? 'bg-white text-[#0B1220] shadow-sm'
                    : 'text-[var(--ink-4)] hover:text-[#0B1220]'
                }`}
              >
                <FaCodeMerge className="w-3.5 h-3.5 shrink-0" />
                Recent Merges
              </button>
            </div>

            {activeTab === 'contributions' ? (
              <>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#4ADE80]" />
                        GitHub Contribution Graph
                      </h3>
                      <div className="flex gap-2 mt-2">
                        {years.map((year) => (
                          <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-3 py-1 text-[10px] font-bold border transition-all duration-150 relative ${
                              selectedYear === year
                                ? 'bg-[#0B1220] text-white border-[#0B1220]'
                                : 'bg-transparent text-[var(--ink-4)] border-[var(--rule)] hover:border-[#0B1220] hover:text-[#0B1220]'
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--ink-4)]">Theme Style</span>
                      <div className="flex gap-2.5 h-[26px] items-center">
                        {Object.entries(themes).map(([key, theme]) => (
                          <button
                            key={key}
                            onClick={() => setSelectedTheme(key)}
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
                </div>

                {/* Headline Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#0B1220] mb-8">
                  {statCards.map((stat, i) => (
                    <div key={stat.label} className={`px-4 py-3 ${STAT_CARD_BORDERS[i]}`}>
                      <div className="text-xl font-bold text-[#0B1220]">{stat.value}</div>
                      <div className="flex items-center gap-1.5 text-[9px] tracking-widest text-[var(--ink-4)] mt-1 font-bold">
                        <span className="w-1.5 h-1.5 shrink-0" style={{ backgroundColor: stat.color }} />
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-4)]">{selectedYear} Contributions</span>
                    <div className="h-[1px] flex-grow bg-[var(--rule)] opacity-50" />
                  </div>
                  
                  <div className="relative min-h-[180px]">
                    {mounted ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${selectedYear}-${selectedTheme}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="w-full pb-4"
                        >
                          <div className="w-full flex justify-center py-4 bg-white/30 border border-[var(--rule)] rounded-sm px-4 [&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-none">
                            <GitHubCalendar 
                              username={GITHUB_USERNAME}
                              year={selectedYear}
                              theme={githubTheme}
                              fontSize={13}
                              blockSize={14}
                              blockMargin={4}
                              transformData={deriveStats}
                              renderBlock={(block, activity) => (
                                React.cloneElement(block as React.ReactElement, {
                                  'data-tooltip-id': 'gh-tooltip',
                                  'data-tooltip-content': `${activity.count} contributions on ${activity.date}`,
                                })
                              )}
                            />
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-2 border-[var(--rule)] border-t-[#0B1220] rounded-full animate-spin" />
                      </div>
                    )}
                    <Tooltip 
                      id="gh-tooltip" 
                      style={{ 
                        fontSize: '10px', 
                        backgroundColor: '#0B1220',
                        color: '#fff',
                        borderRadius: '2px',
                        padding: '4px 8px',
                        zIndex: 100
                      }} 
                    />
                  </div>
                </div>
              </>
            ) : (
              <RecentActivity />
            )}
          </div>

          {/* LeetCode Stats */}
          <div className="border-2 border-[#0B1220] bg-[var(--paper)] p-5 sm:p-6 lg:p-8 shadow-[var(--sh-2)] relative group hover:shadow-[var(--sh-hover)] transition-all duration-150">
            <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
            <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
            <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FCD34D]" />
                LeetCode Performance
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-[9px] text-[var(--ink-4)] uppercase tracking-[0.2em]">@saravananpv</span>
                <a href="https://leetcode.com/u/saravananpv/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold underline decoration-1 underline-offset-4">VIEW PROFILE →</a>
              </div>
            </div>

            <LeetCodeStats />
          </div>
        </div>
      </div>
    </section>
  );
}
