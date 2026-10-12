export type ProjectCategory = 'PERSONAL' | 'OPEN SOURCE' | 'ACADEMIC';

export interface Project {
  slug: string;
  n: string;
  title: string;
  category: ProjectCategory;
  tag: string;
  tagColor: string;
  tint: string;
  date: string;
  author: string;
  /** Card copy on desktop. */
  desc: string;
  /** Shorter card copy on mobile. */
  shortDesc: string;
  /** Detail page lead paragraph. */
  summary: string;
  highlights: { title: string; body: string }[];
  stack: string[];
  status: string;
  link?: string;
  cover?: string;
  coverBg?: string;
  /** Blank slot with no detail page. */
  placeholder?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'baaki',
    n: '01',
    title: 'Baaki',
    category: 'PERSONAL',
    tag: 'PROJECT',
    tagColor: '#4ADE80',
    tint: '#F4F1EA',
    date: 'September 27, 2026',
    author: 'Saravanan P V',
    desc: 'Offline-first personal finance app for everyday money in India — budgets, goals, splits and reports, running entirely on your Android phone with an on-device Postgres. No account, no server.',
    shortDesc:
      'Offline-first personal finance app for everyday money in India: budgets, goals, splits and reports on an on-device Postgres. No account, no server.',
    summary:
      'Baaki is a personal finance app built for everyday money in India. Budgets, goals, splits and reports all run on your Android phone, backed by a Postgres database that lives on the device. There is no account to create and no server to trust with your data.',
    highlights: [
      { title: 'Offline-first', body: 'Everything works without a connection, because nothing depends on a backend.' },
      { title: 'On-device Postgres', body: 'PGlite (Postgres compiled to WebAssembly) keeps a real relational database on the phone.' },
      { title: 'Budgets, goals and splits', body: 'Plan monthly spending, save toward goals and split shared expenses.' },
      { title: 'Reports', body: 'See where the money went, computed locally from your own data.' },
      { title: 'No account, no server', body: 'Your data stays on your device.' },
    ],
    stack: ['Next.js', 'Capacitor', 'PGlite (WASM)', 'Offline-first'],
    status: 'Active',
    link: 'https://github.com/pvsaravanan/baaki',
    cover: '/images/projects/baaki-cover.jpg',
    coverBg: '#F4F1EA',
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug && !p.placeholder);
export const projectHref = (p: Project) => (p.placeholder ? undefined : `/projects/${p.slug}`);
