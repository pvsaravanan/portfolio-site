'use client';

import { usePathname } from 'next/navigation';
import { splash } from '@/lib/splash';

// Records which page this document was first loaded on. Runs during render so it is set
// before the home page decides whether to show the splash.
export default function EntryTracker() {
  const pathname = usePathname();
  if (typeof window !== 'undefined' && splash.entryIsHome === null) {
    splash.entryIsHome = pathname === '/';
  }
  return null;
}
