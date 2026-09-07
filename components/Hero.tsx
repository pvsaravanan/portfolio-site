'use client';

import React from 'react';
import Button from './Button';

import Image from 'next/image';

const socialLinks = [
  {
    href: 'https://github.com/pvsaravanan',
    label: 'GitHub',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  {
    href: 'https://medium.com/@saravananpv30102005',
    label: 'Medium',
    path: 'M13.54 12a6.77 6.77 0 0 1-6.77 6.77A6.77 6.77 0 0 1 0 12a6.77 6.77 0 0 1 6.77-6.77A6.77 6.77 0 0 1 13.54 12Zm7.42 0c0 3.53-1.52 6.39-3.39 6.39-1.88 0-3.4-2.86-3.4-6.39s1.52-6.39 3.4-6.39c1.87 0 3.39 2.86 3.39 6.39Zm3.04 0c0 3.17-.54 5.74-1.2 5.74-.67 0-1.21-2.57-1.21-5.74s.54-5.74 1.21-5.74c.66 0 1.2 2.57 1.2 5.74Z',
  },
  {
    href: 'https://www.linkedin.com/in/saravananpv2005/',
    label: 'LinkedIn',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
  {
    href: 'https://x.com/saravananpv3010',
    label: 'X (Twitter)',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
];

export default function Hero() {
  return (
    <section id="home" className="border-b border-[#0B1220] bg-[var(--paper-2)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="border-2 border-[#0B1220] bg-[var(--paper)] shadow-[var(--sh-3)] relative">
          <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
          <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />
          <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--ink)] opacity-20" />

          {/* Banner */}
          <div className="relative">
            <div className="h-32 sm:h-48 lg:h-56 border-b-2 border-[#0B1220] overflow-hidden bg-gradient-to-br from-[#E07A5F] via-[#EFC9BC] to-[var(--paper-2)]">
              <div
                className="absolute inset-0 opacity-[0.18]"
                style={{ backgroundImage: 'radial-gradient(#0B1220 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                aria-hidden="true"
              />
              <span className="hidden sm:inline-flex absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#0B1220] text-[#F4F1EA] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 border border-[#0B1220]">
                Open to opportunities
              </span>
            </div>

            {/* Avatar overlapping the banner */}
            <div className="absolute left-6 sm:left-10 lg:left-12 bottom-0 translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 border-2 border-[#0B1220] bg-[var(--paper-2)] shadow-[6px_6px_0px_0px_var(--accent)] overflow-hidden z-10">
              <Image
                src="/profile.jpg"
                alt="Saravanan P V"
                fill
                className="object-cover object-[50%_20%] grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#0B1220] m-1.5" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#0B1220] m-1.5" />
            </div>
          </div>

          {/* Content */}
          <div className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 px-6 sm:px-10 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1220]">SARAVANAN P V</h2>
                <span className="text-[10px] tracking-[0.2em] font-bold text-[#374151] uppercase">
                  AI/ML Engineer · Full-stack Developer · SDE · RPA Developer
                </span>
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[#0B1220] hover:bg-[#0B1220] hover:text-[#F4F1EA] transition-all"
                    title={social.label}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-[0.95] sm:leading-[0.9] mb-6 text-[#0B1220] max-w-2xl">
              BUILDING SCALABLE
              <br />
              <span className="inline-block bg-[#E07A5F] text-white px-3 py-1 mt-2">
                INTELLIGENT
              </span>
              <br />
              <em className="font-light italic">SOLUTIONS.</em>
            </h1>

            <p className="text-sm text-[#374151] leading-relaxed mb-8 max-w-2xl">
              AI engineer focused on building production-ready intelligent systems powered by LLMs, RAG pipelines, and multi-modal AI architectures. Experienced in developing scalable backend infrastructure, local AI deployments, and high-performance inference workflows using modern AI and full-stack technologies.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Button href="#projects" variant="primary">View My Works</Button>
              <Button href="mailto:saravananpv30102005@gmail.com" variant="outline">Hire Me</Button>
            </div>

            <div className="grid grid-cols-3 border border-[#0B1220] bg-white/50 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] max-w-xl">
              <div className="px-3 sm:px-6 py-3 sm:py-4 border-r border-[#0B1220]">
                <div className="text-xl sm:text-2xl font-bold">10+</div>
                <div className="text-[8px] sm:text-[9px] tracking-widest text-[#374151] mt-1 font-bold">
                  <span className="inline-block w-1.5 h-1.5 bg-[#4ADE80] mr-2" />
                  PROJECTS
                </div>
              </div>
              <div className="px-3 sm:px-6 py-3 sm:py-4 border-r border-[#0B1220]">
                <div className="text-xl sm:text-2xl font-bold">3</div>
                <div className="text-[8px] sm:text-[9px] tracking-widest text-[#374151] mt-1 font-bold">
                  <span className="inline-block w-1.5 h-1.5 bg-[#60A5FA] mr-2" />
                  INTERNSHIPS
                </div>
              </div>
              <div className="px-3 sm:px-6 py-3 sm:py-4">
                <div className="text-xl sm:text-2xl font-bold">8.52</div>
                <div className="text-[8px] sm:text-[9px] tracking-widest text-[#374151] mt-1 font-bold">
                  <span className="inline-block w-1.5 h-1.5 bg-[#FCD34D] mr-2" />
                  CGPA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
