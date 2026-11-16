export type ProjectCategory = 'PERSONAL' | 'OPEN SOURCE' | 'ACADEMIC';

export interface GalleryItem {
  src: string;
  caption: string;
}

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
  /** Muted looping video shown in place of the cover image; `cover` is its poster. */
  coverVideo?: string;
  /** Cover aspect ratio as width / height (default 1983 / 793). */
  coverRatio?: number;
  /** Screenshots shown in a gallery on the detail page. */
  gallery?: GalleryItem[];
  /** Phrases highlighted (case-insensitive) in the summary and highlight text. */
  keywords?: string[];
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
    date: 'November 16, 2026',
    author: 'Saravanan P V',
    desc: 'Offline-first personal finance app for everyday money in India: budgets, splits, recurring bills and reports, running entirely on your Android or iPhone with an on-device Postgres. No account, no server, no internet.',
    shortDesc:
      'Offline-first finance app for India on Android and iOS: budgets, splits, recurring bills and reports on an on-device Postgres. No account, no server.',
    summary:
      'Baaki ("know where your money goes") is a personal finance app built for everyday money in India. Transactions, budgets, splits, recurring bills and reports all run on your phone, backed by a real Postgres database that lives on the device. There is no account to create, no server to trust with your data, and the app makes no network requests. It ships for Android and iOS from one codebase, with about 27,000 lines of TypeScript and 39 test files.',
    highlights: [
      { title: 'Offline-first, no network', body: 'Screens, calculations and the database all run on the phone, so nothing depends on a backend.' },
      { title: 'On-device Postgres', body: 'PGlite (Postgres compiled to WebAssembly) runs behind Prisma through an adapter, with versioned SQL migrations applied on the device.' },
      { title: 'Android and iOS', body: 'The same Next.js static build runs in Capacitor shells on both platforms, with native launch animations and a privacy screen for the app switcher.' },
      { title: 'Budgets and recurring bills', body: 'Plan monthly spending per category and account, and let recurring transactions post themselves when they fall due.' },
      { title: 'Splits and money to collect', body: 'Split a purchase between people and track who still owes you, then settle each share into an account.' },
      { title: 'Reports and spending calendar', body: 'Overview, cash flow, income, expense, category and account reports, plus a spending calendar drawn as sized bubbles, all computed locally.' },
      { title: 'Import and export', body: 'Bring in CSV or Excel statements through a map-and-preview flow, and export your data whenever you want.' },
      { title: 'Encrypted backups and app lock', body: 'Backups are locked with a password using AES-256-GCM and PBKDF2 (600,000 iterations), and restore on any phone. Biometric app lock guards the app itself.' },
      { title: 'Guided first run', body: 'A setup tour, profile pictures and demo data get a new install useful within a minute.' },
      { title: 'Tested and automated', body: 'Vitest covers money maths, split logic, backup crypto, migrations and importers, and CI runs lint, type-check, tests, the build and a debug APK on every push.' },
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Capacitor 8', 'PGlite (WASM)', 'Prisma', 'Tailwind', 'Recharts', 'Vitest', 'Android + iOS'],
    status: 'Active',
    link: 'https://github.com/pvsaravanan/baaki',
    cover: '/images/projects/baaki-cover.jpg',
    coverBg: '#F4F1EA',
    keywords: ['personal finance', 'real Postgres', 'on the device', 'no account', 'no server', 'no network requests', 'Android and iOS', 'one codebase', 'Offline-first', 'PGlite', 'Prisma', 'Capacitor', 'Next.js', 'budgets', 'splits', 'recurring', 'reports', 'spending calendar', 'CSV or Excel', 'AES-256-GCM', 'PBKDF2', '600,000 iterations', 'Biometric app lock', 'privacy screen', 'Vitest', 'CI', 'debug APK', 'setup tour', 'demo data'],
    coverVideo: '/videos/baaki-launch.mp4',
    coverRatio: 16 / 9,
    gallery: [
      { src: '/images/projects/baaki/welcome.webp', caption: 'Welcome' },
      { src: '/images/projects/baaki/dashboard.webp', caption: 'Dashboard' },
      { src: '/images/projects/baaki/spending-calendar.webp', caption: 'Spending calendar' },
      { src: '/images/projects/baaki/transactions.webp', caption: 'Transactions' },
      { src: '/images/projects/baaki/add-transaction.webp', caption: 'Add a transaction' },
      { src: '/images/projects/baaki/filters.webp', caption: 'Filters' },
      { src: '/images/projects/baaki/budgets.webp', caption: 'Budgets' },
      { src: '/images/projects/baaki/recurring.webp', caption: 'Recurring bills' },
      { src: '/images/projects/baaki/reports.webp', caption: 'Reports' },
      { src: '/images/projects/baaki/accounts.webp', caption: 'Accounts' },
      { src: '/images/projects/baaki/categories.webp', caption: 'Categories' },
      { src: '/images/projects/baaki/import.webp', caption: 'Import' },
      { src: '/images/projects/baaki/settings.webp', caption: 'Settings' },
      { src: '/images/projects/baaki/avatar.webp', caption: 'Profile picture' },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug && !p.placeholder);
export const projectHref = (p: Project) => (p.placeholder ? undefined : `/projects/${p.slug}`);
