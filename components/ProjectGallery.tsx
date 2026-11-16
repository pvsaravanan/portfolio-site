'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import type { GalleryItem } from '@/lib/projects';

const SWIPE = 60;
const PREVIEW = 3;

const slide = {
  enter: (d: number) => ({ x: d * 48, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ x: d * -48, opacity: 0, scale: 0.96 }),
};

/** Phone-framed screenshot viewer: swipe or arrow through screens, tap to enlarge. */
export default function ProjectGallery({ items, title }: { items: GalleryItem[]; title: string }) {
  const [[sel, dir], setSel] = useState<[number, number]>([0, 0]);
  const [open, setOpen] = useState(false);

  const go = useCallback(
    (d: number) => setSel(([i]) => [(i + d + items.length) % items.length, d]),
    [items.length],
  );
  const swipe = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE) go(info.offset.x < 0 ? 1 : -1);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go]);

  const cur = items[sel];

  return (
    <section
      aria-label={`${title} gallery`}
      className="relative"
    >
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6e6e6e]">Gallery</h2>
        <span className="border border-[#0B1220] bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-widest">
          {items.length} screens
        </span>
      </div>

      <ul className="relative grid grid-cols-3 gap-3 sm:gap-5">
        {items.slice(0, PREVIEW).map((it, i) => {
          const more = i === PREVIEW - 1 ? items.length - PREVIEW : 0;
          return (
            <li key={it.src}>
              <button
                onClick={() => { setSel([i, 0]); setOpen(true); }}
                aria-label={more > 0 ? `Show all ${items.length} screens` : `Enlarge ${it.caption}`}
                className="group relative block w-full overflow-hidden rounded-[10%/4.8%] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07A5F]"
              >
                <Image src={it.src} alt={`${title}: ${it.caption}`} width={720} height={1510} sizes="(min-width: 1024px) 230px, 30vw" className="h-auto w-full" />
                {more > 0 && (
                  <span className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B1220]/85 text-[#F4F1EA] transition-colors group-hover:bg-[#E07A5F] group-hover:text-[#0B1220]">
                    <span className="text-xl font-extrabold">+{more}</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em]">more</span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => { setSel([0, 0]); setOpen(true); }}
        className="mt-4 flex w-full items-center justify-between border border-[#0B1220] bg-[#0B1220] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F4F1EA] transition-colors hover:bg-[#E07A5F] hover:text-[#0B1220]"
      >
        View all screens <span aria-hidden="true">→</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={cur.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B1220]/90 p-4"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-[#F4F1EA] text-[#F4F1EA] transition-colors hover:bg-[#F4F1EA] hover:text-[#0B1220]"
            >
              ✕
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous screen" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-[#F4F1EA] text-xl text-[#F4F1EA] transition-colors hover:bg-[#F4F1EA] hover:text-[#0B1220] sm:left-8">←</button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next screen" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-[#F4F1EA] text-xl text-[#F4F1EA] transition-colors hover:bg-[#F4F1EA] hover:text-[#0B1220] sm:right-8">→</button>

            <div className="relative h-[78vh] w-[min(80vw,37vh)]" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="popLayout" custom={dir} initial={false}>
                <motion.div
                  key={sel}
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.35}
                  onDragEnd={swipe}
                  className="absolute inset-0"
                >
                  <Image
                    src={cur.src}
                    alt={`${title}: ${cur.caption}`}
                    fill
                    priority
                    sizes="(min-width: 640px) 400px, 80vw"
                    draggable={false}
                    className="pointer-events-none select-none object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-4 border border-[#F4F1EA] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F4F1EA]">
              {cur.caption} <span className="text-[#E07A5F]">{sel + 1}/{items.length}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
