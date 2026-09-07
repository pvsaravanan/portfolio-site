# Portfolio

Personal portfolio website for Saravanan P V — an AI/ML engineer and full-stack
developer. A single-page site built with Next.js, styled with an editorial,
neo-brutalist aesthetic (hard borders, offset shadows, monospace type).

**Live site:** [saravananpv.vercel.app](https://saravananpv.vercel.app)

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router) + [React 18](https://react.dev/)
- **Language:** TypeScript (strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/), [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling
- **Data viz:** [react-github-calendar](https://github.com/grubersjoe/react-github-calendar), [react-activity-calendar](https://github.com/grubersjoe/react-activity-calendar), [react-tooltip](https://github.com/ReactTooltip/react-tooltip)
- **Icons:** [react-icons](https://react-icons.github.io/react-icons/)

## Sections

The homepage (`app/page.tsx`) composes the following sections in order:

1. **Header** — sticky nav with scroll-spy
2. **Hero** — headline, bio, CTAs, and quick stats
3. **Live Feed** — scrolling ticker of current activity
4. **About**
5. **Education**
6. **Tech Carousel** — scrolling marquee of tools/technologies
7. **Skills** — categorized technical arsenal with icons
8. **Experience** — scroll-linked timeline
9. **Projects**
10. **Blogs** — editorial-style highlights list
11. **Stats** — GitHub contribution calendar, recent merges, and LeetCode performance
12. **Footer**

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm

### Installation

```bash
git clone https://github.com/pvsaravanan/portfolio-site.git
cd portfolio-site
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The app
supports Fast Refresh, so most edits appear instantly.

### Build & Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
app/
  api/leetcode/route.ts   # Server route that proxies LeetCode's GraphQL API
  layout.tsx              # Root layout (metadata, smooth scroll wrapper)
  page.tsx                # Composes all homepage sections
  globals.css             # Tailwind layers + theme CSS variables
components/                # One component per homepage section/UI primitive
public/                    # Static assets (images, icons)
```

### Notes on the LeetCode API route

LeetCode's public GraphQL endpoint doesn't send CORS headers, so
`app/api/leetcode/route.ts` proxies requests server-side for the
`LeetCodeStats` client component. Responses are revalidated at most once an
hour.

## License

This project is private and not licensed for reuse.
