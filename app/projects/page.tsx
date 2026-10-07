import type { Metadata } from 'next';
import AllProjects from '@/components/mobile/AllProjects';

export const metadata: Metadata = { title: 'Projects | saravananpv' };

export default function ProjectsPage() {
  return <AllProjects />;
}
