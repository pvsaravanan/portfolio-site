'use client';

import React from 'react';

const exploreLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Works', href: '#projects' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Activity', href: '#stats' },
];
const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/pvsaravanan' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saravananpv2005/' },
  { label: 'X (Twitter)', href: 'https://x.com/saravananpv3010' },
  { label: 'Leetcode', href: 'https://leetcode.com/u/saravananpv/' },
  { label: 'Instagram', href: 'https://www.instagram.com/saravanan30102005/' },
  { label: 'Email', href: 'mailto:saravananpv30102005@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#0B1220] bg-[#EBE7DE]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 text-sm font-semibold tracking-tight mb-3">
              <span className="inline-block w-[3px] h-3 bg-[#0B1220]" />
              <span>SARAVANAN P V</span>
              <span className="inline-block w-[3px] h-3 bg-[#0B1220]" />
            </a>
            <p className="text-[10px] text-[#374151] leading-relaxed">
              B.Tech AI & Data Science student 
              <br />
              @ Saveetha Engineering College. 
              <br />
              Building scalable, intelligent solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[9px] tracking-widest font-semibold mb-3 flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 bg-[#E07A5F]" />
              EXPLORE
            </h4>
            <ul className="space-y-1.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[11px] text-[#374151] hover:text-[#0B1220] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[9px] tracking-widest font-semibold mb-3 flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 bg-[#0B1220]" />
              CONTACT
            </h4>
            <ul className="space-y-1.5">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[11px] text-[#374151] hover:text-[#0B1220] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#cbd5e1] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-[#374151] tracking-widest uppercase">
            © 2026 SARAVANAN P V
          </p>
          <p className="text-[10px] text-[#374151] tracking-widest uppercase">
            BUILT WITH NEXT.JS &amp; TAILWIND
          </p>
        </div>
      </div>
    </footer>
  );
}
