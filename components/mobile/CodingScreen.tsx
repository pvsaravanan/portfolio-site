'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import RecentActivity from '../RecentActivity';
import { useGitHubCalendar, useLeetCode, type LeetCodeData } from './useLiveStats';
import { ArrowUpRight, DotGrid, FilterChips, ScreenHeader } from './ui';

const TABS = ['LEETCODE', 'GITHUB'] as const;
const WEEKS = 26;
const GITHUB_GREEN = ['#EBE7DE', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const HEAT = ['#EBE7DE', '#C6EFD0', '#86DFA0', '#4ADE80', '#22A55A'];

function Card({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="relative border border-[#0B1220] p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase">
          <span className="w-1.5 h-1.5 bg-[#E07A5F]" />
          {title}
        </h3>
        {right}
      </div>
      {children}
    </section>
  );
}

function buildGrid(calendar: Record<string, number>) {
  const dayMs = 86400000;
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  // Align the last column to the current week (Mon-first rows).
  const dow = (today.getDay() + 6) % 7;
  const start = todayUtc - (dow + (WEEKS - 1) * 7) * dayMs;
  const cols: { count: number; future: boolean; date: number }[][] = [];
  let last30 = 0;
  for (let w = 0; w < WEEKS; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const t = start + (w * 7 + d) * dayMs;
      const count = calendar[String(t / 1000)] ?? 0;
      if (t <= todayUtc && t > todayUtc - 30 * dayMs) last30 += count;
      col.push({ count, future: t > todayUtc, date: t });
    }
    cols.push(col);
  }
  return { cols, last30 };
}

function Heatmap({ data }: { data: LeetCodeData }) {
  const { cols, last30 } = useMemo(() => buildGrid(data.submissionCalendar), [data]);
  const scroller = useRef<HTMLDivElement>(null);
  const level = (n: number) => (n === 0 ? 0 : n < 2 ? 1 : n < 4 ? 2 : n < 7 ? 3 : 4);

  // Start scrolled to the most recent weeks, like the GitHub calendar.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [cols]);

  return (
    <Card title="Solving Activity" right={<span className="text-[9px] text-[#6e6e6e]">Last {WEEKS} weeks</span>}>
      <div ref={scroller} className="overflow-x-auto no-scrollbar">
        <div className="flex w-max gap-[3px]" role="img" aria-label={`Submission heatmap for the last ${WEEKS} weeks`}>
          {cols.map((col, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {col.map((c) => (
                <div
                  key={c.date}
                  title={c.future ? undefined : `${c.count} submissions on ${new Date(c.date).toISOString().slice(0, 10)}`}
                  className="h-[11px] w-[11px]"
                  style={{ background: c.future ? 'transparent' : HEAT[level(c.count)] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 text-center">
        <Metric value={last30} label="Submissions (30d)" />
        <Metric value={data.streak} label="Current streak" border />
        <Metric value={data.totalActiveDays} label="Active days" border />
      </div>
    </Card>
  );
}

function Metric({ value, label, border }: { value: number | string; label: string; border?: boolean }) {
  return (
    <div className={border ? 'border-l border-[#cfc8b7]' : ''}>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-[9px] text-[#374151]">{label}</div>
    </div>
  );
}

function LeetCodeCard({ data }: { data: LeetCodeData }) {
  return (
    <section className="relative border border-[#0B1220] bg-[#FBE3DA] p-3 overflow-hidden">
      <DotGrid className="right-3 top-8 w-20 h-14" />
      <div className="flex items-center justify-between mb-3">
        <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-[0.16em]">
          <span className="w-1.5 h-1.5 bg-[#E07A5F]" />
          LEETCODE
        </h3>
        <a
          href="https://leetcode.com/u/saravananpv/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[9px] tracking-wider"
        >
          VIEW PROFILE <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
      <p className="text-[13px] font-semibold">{data.username}</p>
      {data.ranking !== null && <p className="text-[10px] text-[#374151]">Rank {data.ranking.toLocaleString()}</p>}
      <div className="mt-4 grid grid-cols-4 text-center">
        <Metric value={data.totalSolved} label="Total" />
        <Metric value={data.easySolved} label="Easy" border />
        <Metric value={data.mediumSolved} label="Medium" border />
        <Metric value={data.hardSolved} label="Hard" border />
      </div>
    </section>
  );
}

function Breakdown({ data }: { data: LeetCodeData }) {
  const rows = [
    { label: 'Easy', n: data.easySolved, color: '#4ADE80' },
    { label: 'Medium', n: data.mediumSolved, color: '#FCD34D' },
    { label: 'Hard', n: data.hardSolved, color: '#E07A5F' },
  ];
  const total = Math.max(1, data.totalSolved);
  return (
    <Card title="Problem Breakdown">
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-[11px] mb-1">
              <span>{r.label}</span>
              <span className="font-bold">
                {r.n} <span className="font-normal text-[#6e6e6e]">· {Math.round((r.n / total) * 100)}%</span>
              </span>
            </div>
            <div className="h-2 bg-[#EBE7DE]">
              <div className="h-full" style={{ width: `${(r.n / total) * 100}%`, background: r.color }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function GitHubPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { data, failed } = useGitHubCalendar();

  useEffect(() => {
    const f = requestAnimationFrame(() => {
      // The calendar renders its own inner scroller, so scroll whichever element actually overflows.
      const root = ref.current;
      if (!root) return;
      for (const el of [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))]) {
        if (el.scrollWidth > el.clientWidth + 1) el.scrollLeft = el.scrollWidth;
      }
    });
    return () => cancelAnimationFrame(f);
  }, [data]);

  return (
    <div className="space-y-3">
      <Card
        title="GitHub Contributions"
        right={
          <a href="https://github.com/pvsaravanan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[9px] tracking-wider">
            PROFILE <ArrowUpRight className="w-3 h-3" />
          </a>
        }
      >
        <div ref={ref} className="overflow-x-auto no-scrollbar [&>*]:shrink-0">
          {failed ? (
            <p className="py-6 text-center text-[11px] text-[#6e6e6e]">Couldn&apos;t load contributions right now.</p>
          ) : (
            <ActivityCalendar
              data={data?.contributions ?? []}
              loading={!data}
              maxLevel={4}
              fontSize={11}
              blockSize={11}
              blockMargin={3}
              colorScheme="light"
              theme={{ light: GITHUB_GREEN, dark: GITHUB_GREEN }}
              labels={{ totalCount: '{{count}} contributions in the last year' }}
            />
          )}
        </div>
      </Card>
      <RecentActivity />
    </div>
  );
}

export default function CodingScreen() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('LEETCODE');
  const { data, failed } = useLeetCode();

  return (
    <div className="px-4 py-6">
      <ScreenHeader
        tag="07 • CODING ACTIVITY"
        title="Coding"
        muted="Activity"
        blurb="Consistency turns concepts into confidence."
      />
      <FilterChips options={TABS} value={tab} onChange={setTab} />

      {tab === 'GITHUB' ? (
        <GitHubPanel />
      ) : failed ? (
        <p className="border border-dashed border-[#9c9790] p-6 text-center text-[11px] text-[#6e6e6e]">
          Couldn&apos;t load LeetCode stats right now.
        </p>
      ) : !data ? (
        <div className="flex justify-center py-16" role="status" aria-label="Loading">
          <div className="w-7 h-7 border-2 border-[#cfc8b7] border-t-[#0B1220] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          <LeetCodeCard data={data} />
          <Heatmap data={data} />
          <Breakdown data={data} />
          <div className="relative border border-[#E07A5F]/50 bg-[#FBE3DA]/60 p-4 text-[12px] italic">
            &ldquo;Discipline today, compounds into freedom tomorrow.&rdquo;
          </div>
        </div>
      )}
    </div>
  );
}
