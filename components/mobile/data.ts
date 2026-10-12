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
    logo: '/images/ServiceNow.png',
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
    logo: '/images/DeadEnd_Engineers.png',
    role: 'Founding Member & Developer',
    period: 'Jan 2026 – Present',
    location: 'Community',
    bullets: ['Co-founded a developer community focused on experimental software projects and collaborative tools.'],
    tags: ['Open Source', 'Community', 'Collaboration'],
  },
  {
    n: '03',
    company: 'Zybeak Technologies',
    logo: '/images/zybeak_technologies_logo.jpeg',
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
    logo: '/images/dlktechnologies_logo.jpeg',
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

export type { ProjectCategory } from '@/lib/projects';
export { projects } from '@/lib/projects';

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
