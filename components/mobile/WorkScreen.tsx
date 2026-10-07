'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { FaBookOpen, FaGraduationCap, FaLocationDot } from 'react-icons/fa6';
import { education, experiences } from './data';
import Skills from '../Skills';
import { Corners, ScreenHeader, Tag } from './ui';

// The rail draws itself as you scroll; each square fills in when the line reaches it, and cards ease in.
function EducationTimeline() {
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const items = useRef<Array<HTMLElement | null>>([]);
  const [reached, setReached] = useState<boolean[]>(() => education.map(() => !!reduce));

  const { scrollYProgress } = useScroll({ target: track, offset: ['start 78%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(progress, 'change', (v) => {
    const h = track.current?.offsetHeight || 1;
    // Rail runs from 10px to (h - 10px); a marker is "reached" once the drawn line passes its centre.
    const drawn = 10 + v * (h - 20);
    const next = items.current.map((el) => (el ? el.offsetTop + 17 <= drawn : false));
    setReached((prev) => (prev.every((x, i) => x === next[i]) ? prev : next));
  });

  return (
    <div ref={track} className="relative pl-[18px]">
      <span className="absolute left-[3px] top-[10px] bottom-[10px] w-px bg-[#cfc8b7]" aria-hidden="true" />
      <motion.span
        className="absolute left-[3px] top-[10px] bottom-[10px] w-px origin-top bg-[#0B1220]"
        style={{ scaleY: reduce ? 1 : progress }}
        aria-hidden="true"
      />
      <div className="space-y-3">
        {education.map((e, i) => {
          const Icon = i === 0 ? FaGraduationCap : FaBookOpen;
          return (
            <motion.article
              key={e.id}
              ref={(el) => {
                items.current[i] = el;
              }}
              initial={reduce ? false : { opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-[#0B1220] bg-[#F4F1EA] p-3"
            >
              <motion.span
                className="absolute -left-[19px] top-[14px] h-[7px] w-[7px] border border-[#0B1220]"
                animate={{ backgroundColor: reached[i] ? '#0B1220' : '#F4F1EA', scale: reached[i] ? 1.25 : 1 }}
                transition={{ duration: 0.25 }}
                aria-hidden="true"
              />
              <Corners />
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-wider text-[#E07A5F]">{e.period}</span>
                <span className="bg-[#0B1220] text-[#F4F1EA] px-2 py-0.5 text-[9px] font-bold tracking-widest">{e.id}</span>
              </div>
              <div className="mt-2.5 flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[#0B1220]">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[13px] leading-tight font-bold uppercase tracking-tight">{e.institution}</h3>
                  <p className="mt-0.5 text-[10.5px] leading-snug text-[#E07A5F]">{e.degree}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[10px] text-[#374151]">
                    <FaLocationDot className="h-2.5 w-2.5" /> {e.location}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

type Experience = (typeof experiences)[number];

// Header always visible; bullets and tags collapse. Tap anywhere on the header to toggle.
function ExperienceCard({ x }: { x: Experience }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelId = `exp-${x.n}`;

  return (
    <article className="relative border border-[#0B1220] bg-[#F4F1EA]">
      <Corners />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="block w-full p-4 text-left"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-wider text-[#E07A5F]">{x.period}</span>
          <span className="bg-[#0B1220] text-[#F4F1EA] px-2 py-0.5 text-[9px] font-bold tracking-widest">
            EXP - {x.n}
          </span>
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[17px] font-bold tracking-tight">{x.company}</h3>
            <p className="text-[12px] text-[#E07A5F]">{x.role}</p>
            <p className="mt-1 text-[10px] text-[#6e6e6e]">{x.location}</p>
          </div>
          <motion.svg
            className="mt-1 h-3.5 w-3.5 shrink-0 text-[#0B1220]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            aria-hidden="true"
          >
            <path d="M5 9l7 7 7-7" strokeLinecap="square" />
          </motion.svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0.5">
              <ul className="space-y-2 border-t border-dotted border-[#9c9790] pt-3">
                {x.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-[11px] leading-relaxed text-[#374151]">
                    <span className="w-1 h-1 bg-[#E07A5F] mt-1.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {x.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function WorkScreen() {
  return (
    <div className="px-4 py-6 space-y-10">
      {/* Education */}
      <section id="m-education">
        <ScreenHeader
          tag="02 • ACADEMICS"
          title="Academic"
          muted="Background"
          blurb="The foundation that shaped my problem-solving and engineering mindset."
        />
        <EducationTimeline />
      </section>

      {/* Skills: the original Technical Arsenal section, unchanged */}
      <div id="m-skills" className="-mx-4 border-y border-[#0B1220]">
        <Skills />
      </div>

      {/* Experience */}
      <section id="m-experience">
        <ScreenHeader
          tag="04 • EXPERIENCE"
          title="Work &"
          muted="Internships"
          blurb="Real-world experience in building, deploying, and scaling intelligent systems."
        />
        <div className="space-y-4">
          {experiences.map((x) => (
            <ExperienceCard key={x.company} x={x} />
          ))}
        </div>
      </section>
    </div>
  );
}
