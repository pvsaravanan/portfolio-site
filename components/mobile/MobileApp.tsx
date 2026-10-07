'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TABS, type TabId } from './data';
import HomeScreen from './HomeScreen';
import WorkScreen from './WorkScreen';
import ProjectsScreen from './ProjectsScreen';
import InsightsScreen from './InsightsScreen';
import CodingScreen from './CodingScreen';
import ContactScreen from './ContactScreen';
import { warmCodingData } from './useLiveStats';

const HEADER_H = 56;
const isTab = (v: string): v is TabId => TABS.some((t) => t.id === v);

export default function MobileApp() {
  const [active, setActive] = useState<TabId>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const lock = useRef<number>(0);

  const scrollTo = useCallback((t: TabId, smooth = true) => {
    const el = document.getElementById(`m-${t}`);
    if (!el) return;
    const top = t === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - HEADER_H - 12;
    lock.current = Date.now() + 900;
    window.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  const go = (t: TabId) => {
    setMenuOpen(false);
    setActive(t);
    scrollTo(t);
    history.replaceState(null, '', t === 'home' ? window.location.pathname : `#${t}`);
  };

  // Scroll-spy: the last section whose top has passed just under the header is "current".
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (Date.now() < lock.current) return;
      let cur: TabId = 'home';
      for (const t of TABS) {
        const el = document.getElementById(`m-${t.id}`);
        if (el && el.getBoundingClientRect().top <= HEADER_H + window.innerHeight * 0.3) cur = t.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = 'contact';
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Fetch the Coding data in the background so that tab is instant when opened.
  useEffect(() => {
    warmCodingData();
  }, []);

  // Deep link: /#projects jumps to that section once the content has rendered.
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (isTab(h)) requestAnimationFrame(() => scrollTo(h, false));
  }, [scrollTo]);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0B1220] pb-[env(safe-area-inset-bottom)]">
      <header className="sticky top-0 z-40 bg-[#F4F1EA] border-b border-[#0B1220] pt-[env(safe-area-inset-top)]">
        <div className="flex h-14 items-center justify-between px-4">
          <button onClick={() => go('home')} className="text-[9.8px] font-semibold tracking-[0.2em]">
            SARAVANAN P V
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
          >
            <span className={`h-[2px] w-5 bg-[#0B1220] transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-3 bg-[#0B1220] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-5 bg-[#0B1220] transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
        {menuOpen && (
          <nav className="absolute inset-x-0 top-full border-b border-[#0B1220] bg-[#F4F1EA]" aria-label="Sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => go(t.id)}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left text-[12px] font-semibold tracking-[0.18em] border-t border-[#cfc8b7] ${
                  active === t.id ? 'bg-[#0B1220] text-[#F4F1EA]' : ''
                }`}
              >
                <span className={`h-2 w-2 ${active === t.id ? 'bg-[#E07A5F]' : 'bg-[#0B1220]'}`} />
                {t.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="m-home"><HomeScreen go={go} /></section>
        <section className="border-t-[1.5px] border-[#0B1220]"><WorkScreen /></section>
        <section id="m-projects" className="border-t-[1.5px] border-[#0B1220]"><ProjectsScreen /></section>
        <section id="m-insights" className="border-t-[1.5px] border-[#0B1220]"><InsightsScreen /></section>
        <section id="m-coding" className="border-t-[1.5px] border-[#0B1220]"><CodingScreen /></section>
        <section id="m-contact" className="border-t-[1.5px] border-[#0B1220]"><ContactScreen /></section>
      </main>

    </div>
  );
}
