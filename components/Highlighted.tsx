import { Fragment } from 'react';

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Renders `text` with every occurrence of the given keywords marked up as a highlight. */
export default function Highlighted({ text, keywords }: { text: string; keywords?: string[] }) {
  if (!keywords?.length) return <>{text}</>;
  // Longest first, so "on-device Postgres" wins over "Postgres".
  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  // Whole phrases only, so "CI" never matches inside another word.
  const re = new RegExp(`(?<!\\w)(${sorted.map(escape).join('|')})(?!\\w)`, 'gi');
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="bg-[linear-gradient(transparent_55%,#E07A5F55_55%)] px-[1px] font-semibold text-[#0B1220]"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
