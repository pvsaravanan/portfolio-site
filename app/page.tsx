'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LiveFeed from '@/components/LiveFeed';
import TechCarousel from '@/components/TechCarousel';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Blogs from '@/components/Blogs';
import Stats from '@/components/Stats';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // The loading screen handles its own timing (2.5 seconds total)
    // We just need to wait for it to complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />
      {!isLoading && (
        <main>
          <Header />
          <Hero />
          <LiveFeed />
          <Education />
          <TechCarousel />
          <Skills />
          <Experience />
          <Projects />
          <Blogs />
          <Stats />
          <Footer />
        </main>
      )}
    </>
  );
}
