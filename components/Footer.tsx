'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import Button from './Button';
import SectionHeader from './SectionHeader';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/pvsaravanan', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saravananpv2005/', icon: FaLinkedin },
  { label: 'X (Twitter)', href: 'https://x.com/saravananpv3010', icon: FaXTwitter },
  { label: 'LeetCode', href: 'https://leetcode.com/u/saravananpv/', icon: SiLeetcode },
  { label: 'Instagram', href: 'https://www.instagram.com/saravanan30102005/', icon: FaInstagram },
  { label: 'Email', href: 'mailto:saravananpv30102005@gmail.com', icon: FaEnvelope },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#0B1220] bg-[#EBE7DE]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* CTA */}
        <div className="mb-4 pb-4 sm:mb-6 sm:pb-6 border-b border-dashed border-[#cbd5e1]">
          <SectionHeader
            index="08"
            label="CONTACT"
            title="LET'S BUILD"
            muted="SOMETHING"
            right={
              <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#0B1220] bg-white text-[9px] font-bold tracking-widest uppercase">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex w-full h-full bg-[#4ADE80] opacity-75 animate-ping" />
                  <span className="relative inline-flex w-1.5 h-1.5 bg-[#4ADE80]" />
                </span>
                Available for work
              </span>
            }
          />
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <p className="text-sm text-[#374151] leading-relaxed max-w-xl">
              Open to internships, freelance collaborations, and interesting problems. Always happy
              to talk AI, RAG pipelines, or the next big idea.
            </p>
            <Button href="mailto:saravananpv30102005@gmail.com" variant="primary" className="shrink-0">
              Send an Email
            </Button>
          </div>
        </div>

        {/* Brand + Contact */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <a href="#home" className="flex items-center gap-2 text-sm font-semibold tracking-tight shrink-0">
              <span className="inline-block w-[3px] h-3 bg-[#0B1220]" />
              <span>SARAVANAN P V</span>
              <span className="inline-block w-[3px] h-3 bg-[#0B1220]" />
            </a>
            <p className="text-[10px] text-[#374151]">
              B.Tech AI & Data Science student @ Saveetha Engineering College.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                title={link.label}
                className="flex items-center justify-center w-8 h-8 border border-[#0B1220] bg-white hover:bg-[#0B1220] hover:text-[#EBE7DE] transition-all"
              >
                <link.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 sm:mt-6 sm:pt-4 border-t border-[#cbd5e1] flex flex-col sm:flex-row items-center justify-between gap-2">
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
