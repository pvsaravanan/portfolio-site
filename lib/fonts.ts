import localFont from 'next/font/local';

/** The site-wide typeface (Plus Jakarta Sans, OFL), loaded locally so nothing is fetched from Google. */
export const plusJakarta = localFont({
  src: '../app/fonts/PlusJakartaSans.ttf',
  weight: '200 800',
  display: 'swap',
  variable: '--font-jakarta',
});
