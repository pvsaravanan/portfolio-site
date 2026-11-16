import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        // The site no longer uses a monospace face; `font-mono` maps to the same family.
        mono: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#F5F1E8',
        'cream-dark': '#EBE7DE',
        coral: '#E07A5F',
        'coral-dark': '#C96A52',
        green: '#4ADE80',
        'green-dark': '#22C55E',
        purple: '#A78BFA',
      },
    },
  },
  plugins: [],
};

export default config;
