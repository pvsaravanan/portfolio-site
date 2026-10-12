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
import MobileApp from '@/components/mobile/MobileApp';
import { splash, splashPending } from '@/lib/splash';

export default function Home() {
  const [showSplash] = useState(splashPending);
  const [isLoading, setIsLoading] = useState(showSplash);
  // Phones get a dedicated app-style layout; the desktop page is untouched.
  // On a return visit (client render only) pick the layout immediately to avoid a flash.
  const [isMobile, setIsMobile] = useState(
    () => !showSplash && window.matchMedia('(max-width: 767px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!showSplash) return;
    // Mount the real content just as LoadingScreen starts fading out
    // (2000ms progress fill + 400ms pause), so the two cross-fade together
    // instead of the page flashing in empty after the splash disappears.
    const timer = setTimeout(() => {
      splash.shown = true;
      setIsLoading(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, [showSplash]);

  return (
    <>
      {showSplash && <LoadingScreen />}
      {!isLoading && isMobile && <MobileApp />}
      {!isLoading && !isMobile && (
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
