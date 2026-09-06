'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from './Button';

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'WORKS', href: '#projects' },
  { label: 'BLOGS', href: '#blogs' },
  { label: 'ACTIVITY', href: '#stats' },
];

export default function Header() {
  const headerOffset = 56;

  const items = useMemo(() => navItems, []);
  const [activeHref, setActiveHref] = useState<string>('#home');
  const navLockRef = useRef<{ href: string; targetTop: number; until: number } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToHref = useCallback(
    (href: string) => {
      setMobileMenuOpen(false);
      
      if (href === '#home') {
        navLockRef.current = { href, targetTop: 0, until: Date.now() + 1200 };
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      navLockRef.current = { href, targetTop: Math.max(0, top), until: Date.now() + 1200 };
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    },
    [headerOffset]
  );

  useEffect(() => {
    const sectionHrefs = items
      .map((i) => i.href)
      .filter((h) => h !== '#home');

    let ticking = false;

    const updateActive = () => {
      ticking = false;

      const scrollY = window.scrollY;

      const lock = navLockRef.current;
      if (lock && Date.now() < lock.until) {
        if (Math.abs(scrollY - lock.targetTop) <= 6) {
          navLockRef.current = null;
        } else {
          return;
        }
      } else if (lock) {
        navLockRef.current = null;
      }

      let bestHref = '#home';
      let bestTop = Number.NEGATIVE_INFINITY;

      for (const href of sectionHrefs) {
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top + scrollY - headerOffset;
        if (top <= scrollY + 2 && top > bestTop) {
          bestTop = top;
          bestHref = href;
        }
      }

      setActiveHref(bestHref);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [headerOffset, items]);

  return (
    <header className="sticky top-0 z-50 bg-[#F4F1EA] border-b border-[#0B1220]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="inline-block w-[3px] h-3 bg-[#0B1220]" />
            <span>SARAVANAN P V</span>
            <span className="inline-block w-[3px] h-3 bg-[#0B1220]" />
          </a>

          {/* Nav - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHref(item.href);
                  setActiveHref(item.href);
                }}
                className={`px-3 py-1.5 text-[11px] tracking-widest font-medium transition-colors ${
                  activeHref === item.href
                    ? 'text-[#0B1220] border-b-2 border-[#0B1220]'
                    : 'text-[#374151] hover:text-[#0B1220]'
                }`}
              >
                <span className="inline-block w-1 h-1 bg-current mr-1.5 mb-0.5" />
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/pvsaravanan"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase border border-[#0B1220] bg-[#F4F1EA] text-[#0B1220] hover:bg-[#E7E1D2] transition-colors"
            >
              Resume
            </a>
            <a
              href="mailto:saravananpv30102005@gmail.com"
              className="hidden sm:inline-flex px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase border border-[#0B1220] bg-[#E07A5F] text-white hover:bg-[#C96A52] transition-colors"
            >
              Hire Me
            </a>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border border-[#0B1220] hover:bg-[#0B1220] hover:text-[#F4F1EA] transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#0B1220] bg-[#F4F1EA]">
            <nav className="px-4 py-4 space-y-2">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHref(item.href);
                    setActiveHref(item.href);
                  }}
                  className={`block px-4 py-3 text-[11px] tracking-widest font-medium transition-colors border-l-2 ${
                    activeHref === item.href
                      ? 'text-[#0B1220] border-[#0B1220] bg-[#E7E1D2]'
                      : 'text-[#374151] border-transparent hover:text-[#0B1220] hover:border-[#0B1220]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-[#0B1220] flex flex-col gap-2">
                <Button href="https://github.com/pvsaravanan" variant="outline" className="w-full">Resume</Button>
                <Button href="mailto:saravananpv30102005@gmail.com" variant="primary" className="w-full">Hire Me</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
