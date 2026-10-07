export const EMAIL = 'saravananpv30102005@gmail.com';

export type TabId =
  | 'home'
  | 'education'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'insights'
  | 'coding'
  | 'contact';

export const TABS: { id: TabId; label: string }[] = [
  { id: 'home', label: 'HOME' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'insights', label: 'INSIGHTS' },
  { id: 'coding', label: 'CODING' },
  { id: 'contact', label: 'CONTACT' },
];

export const ROLES = ['AI/ML Engineer', 'Full-Stack Developer', 'RPA Developer'];

export const ABOUT =
  'AI engineer with a strong foundation in building LLM-powered applications, backend systems, and scalable infrastructure. I enjoy working on open-source, automation, and developer tools.';

export const INTERESTS = ['AI Systems', 'Open Source', 'Product Building', 'Design'];

export const education = [
  {
    id: 'UG',
    n: '01',
    period: '2023 — 2027',
    institution: 'Saveetha Engineering College',
    degree: 'B.Tech Artificial Intelligence & Data Science',
    location: 'Chennai, India',
    details: [
      'Focusing on Software Engineering, Data Structures, Algorithms, and AI.',
      'Building real-world AI and software projects.',
      'Current CGPA: 8.52 / 10.0',
    ],
  },
  {
    id: 'HSC',
    n: '02',
    period: '2022 — 2023',
    institution: 'NPSBSSS',
    degree: 'Higher Secondary (Bio-Maths)',
    location: 'Chennai, India',
    details: [
      'Built a strong foundation in Mathematics, Physics, Chemistry & Biology.',
      'Developed analytical thinking and problem-solving skills.',
      'Score: 87%',
    ],
  },
];

export const experiences = [
  {
    n: '01',
    company: 'ServiceNow',
    role: 'Associate Software Engineer Intern',
    period: 'Aug 2026 – Present',
    location: 'Chennai, India · Office',
    bullets: [
      'Designing a QR-based mobile authentication feature for instant desktop-to-mobile login.',
      'Architecting time-bound secret validation and rate limiting.',
      'Working with OAuth 2.0, API security, GlideRecord, and the ServiceNow platform.',
    ],
    tags: ['OAuth 2.0', 'API Security', 'GlideRecord', 'ServiceNow'],
  },
  {
    n: '02',
    company: 'DeadEnd Engineers',
    role: 'Founding Member & Developer',
    period: 'Jan 2026 – Present',
    location: 'Community',
    bullets: ['Co-founded a developer community focused on experimental software projects and collaborative tools.'],
    tags: ['Open Source', 'Community', 'Collaboration'],
  },
  {
    n: '03',
    company: 'Zybeak Technologies',
    role: 'Cybersecurity Intern',
    period: 'Jan 2025 – Feb 2025',
    location: 'Chennai, India · On-site',
    bullets: [
      'Worked on network and application security.',
      'Performed vulnerability assessments and penetration testing.',
      'Gained hands-on experience with firewalls, IDS, and threat detection.',
    ],
    tags: ['Network Security', 'Penetration Testing', 'Threat Detection'],
  },
  {
    n: '04',
    company: 'DLK Technologies',
    role: 'Full-Stack Developer Intern',
    period: 'Jul 2024 – Aug 2024',
    location: 'Chennai, India · On-site',
    bullets: [
      'Built TeamOrigin, a platform connecting founders with technical contributors.',
      'Developed a full-stack application using React, Node.js, Express, and MySQL.',
      'Implemented JWT authentication and REST APIs.',
    ],
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'JWT'],
  },
];

export type ProjectCategory = 'PERSONAL' | 'OPEN SOURCE' | 'ACADEMIC';

export const projects: {
  title: string;
  category: ProjectCategory;
  desc: string;
  tags: string[];
  link: string;
  tint: string;
  cover?: string;
  coverPos?: string;
}[] = [
  {
    title: 'baaki',
    category: 'PERSONAL',
    desc: 'Offline-first personal finance app for everyday money in India: budgets, goals, splits and reports on an on-device Postgres. No account, no server.',
    tags: ['Next.js', 'Capacitor', 'PGlite', 'Offline-first'],
    link: 'https://github.com/pvsaravanan/baaki',
    tint: '#F4F1EA',
    cover: '/projects/baaki-cover.jpg',
  },
  {
    title: 'CradleSense',
    category: 'ACADEMIC',
    desc: 'IoT-based neonatal care monitoring system for NICU with real-time vitals, dashboards, and alerting.',
    tags: ['IoT', 'React', 'Node.js', 'Real-time'],
    link: 'https://github.com/pvsaravanan/CradleSense',
    tint: '#E3F1E1',
    cover: '/projects/cradlesense-cover.jpg',
  },
  {
    title: 'Clara.ai',
    category: 'PERSONAL',
    desc: 'Privacy-first AI answer engine with search + documents + local/cloud LLM support.',
    tags: ['RAG', 'Vector Search', 'Next.js'],
    link: 'https://github.com/pvsaravanan/Clara.ai',
    tint: '#F9DDD3',
    cover: '/projects/clara-cover.jpg',
  },
  {
    title: 'Parallax.ai',
    category: 'PERSONAL',
    desc: 'Unified open-source AI model platform with chat modes, OpenAI-compatible API, and ELO research leaderboard.',
    tags: ['Next.js', 'OpenAI API', 'Multi-Model'],
    link: 'https://github.com/pvsaravanan/parallax.ai',
    tint: '#DDE8F7',
    cover: '/projects/parallax-cover.jpg',
  },
  {
    title: 'WhisperCrawler',
    category: 'PERSONAL',
    desc: 'Adaptive web scraping framework with stealth mode and self-healing selectors.',
    tags: ['Python', 'Playwright', 'Async I/O'],
    link: 'https://github.com/pvsaravanan/whispercrawler',
    tint: '#F9DDD3',
    cover: '/projects/whispercrawler-cover.jpg',
    coverPos: '50% 12%',
  },
  {
    title: 'DevMe',
    category: 'OPEN SOURCE',
    desc: 'Contributed features for a customizable developer dashboard, first-time setup, and bug fixes.',
    tags: ['Chrome Extension', 'JS', 'UI/UX'],
    link: 'https://github.com/pvsaravanan',
    tint: '#EDE7DA',
  },
];

export const PROJECT_FILTERS = ['ALL', 'ACADEMIC', 'OPEN SOURCE', 'PERSONAL'] as const;

// How many projects the home page lists before "See more".
export const PROJECT_PREVIEW_COUNT = 3;

export const posts = [
  {
    n: '01',
    title: 'Agentic RAG: The Upgrade Your AI Pipeline Desperately Needs',
    date: 'MAY 09, 2026',
    category: 'TECH',
    excerpt: "From one-shot retrieval to self-correcting, multi-hop reasoning — a developer's breakdown in 3 levels.",
    link: 'https://medium.com/@saravananpv30102005/agentic-rag-the-upgrade-your-ai-pipeline-desperately-needs-92d224f39a40',
  },
  {
    n: '02',
    title: 'RAG vs HyDE — Choosing the Right Retrieval Strategy',
    date: 'FEB 01, 2026',
    category: 'LEARNINGS',
    excerpt: 'A practical comparison of RAG and HyDE to help you pick the right retrieval approach for your LLM application.',
    link: 'https://medium.com/@saravananpv30102005/rag-vs-hyde-choosing-the-right-retrieval-strategy-for-your-llm-application-01216f21c519',
  },
];

export const POST_FILTERS = ['ALL', 'TECH', 'LEARNINGS', 'CAREER', 'NOTES'] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  PERSONAL: 'bg-[#F9DDD3] text-[#C96A52]',
  'OPEN SOURCE': 'bg-[#DDE8F7] text-[#2563EB]',
  ACADEMIC: 'bg-[#FBF0C9] text-[#A16207]',
  TECH: 'bg-[#F9DDD3] text-[#C96A52]',
  LEARNINGS: 'bg-[#DDF2DF] text-[#15803D]',
  CAREER: 'bg-[#F9DDD3] text-[#C96A52]',
  NOTES: 'bg-[#DDE8F7] text-[#2563EB]',
};
