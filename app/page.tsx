'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
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
    // Mount the real content just as LoadingScreen starts fading out
    // (2000ms progress fill + 400ms pause), so the two cross-fade together
    // instead of the page flashing in empty after the splash disappears.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />
      {!isLoading && (
        <main className="relative">
          <Header />
          <Hero />
          <Education />
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
