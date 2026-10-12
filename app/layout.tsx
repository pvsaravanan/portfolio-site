import type { Metadata } from 'next';
import './globals.css';
import EntryTracker from '@/components/EntryTracker';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'saravananpv',
  description: 'A directory of builders, projects, and opportunities.',
  authors: [{ name: 'Saravanan P V' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <EntryTracker />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
