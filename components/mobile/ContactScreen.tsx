'use client';

import Image from 'next/image';
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import { EMAIL } from './data';
import { DotGrid, PrimaryButton } from './ui';

const links = [
  { label: 'GitHub', href: 'https://github.com/pvsaravanan', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saravananpv2005/', icon: FaLinkedin },
  { label: 'X (Twitter)', href: 'https://x.com/saravananpv3010', icon: FaXTwitter },
  { label: 'LeetCode', href: 'https://leetcode.com/u/saravananpv/', icon: SiLeetcode },
  { label: 'Instagram', href: 'https://www.instagram.com/saravanan30102005/', icon: FaInstagram },
  { label: 'Email', href: `mailto:${EMAIL}`, icon: FaEnvelope },
];

export default function ContactScreen() {
  return (
    <div className="px-4 py-6">
      <div className="flex items-start justify-between gap-2">
        <span className="border border-[#0B1220] px-2 py-1.5 text-[10px] font-bold tracking-[0.16em]">§ 08 • CONTACT</span>
        <span className="inline-flex items-center gap-2 border border-[#0B1220] px-2 py-1.5 text-[9px] font-bold tracking-[0.14em] uppercase">
          <span className="w-2 h-2 bg-[#4ADE80]" />
          Available for work
        </span>
      </div>

      <div className="relative mt-5">
        <DotGrid className="right-0 top-0 w-28 h-24" />
        <h2 className="relative text-[34px] leading-[0.95] font-bold tracking-tight uppercase">
          Let&apos;s build
          <br />
          <span className="text-[#9c9790]">something</span>
        </h2>
      </div>

      <p className="mt-6 text-[13px] leading-relaxed text-[#374151] max-w-[80%]">
        Open to internships, freelance collaborations, and interesting problems. Always happy to talk AI, RAG pipelines, or
        the next big idea.
      </p>
      <div className="mt-4 flex justify-end">
        <PrimaryButton href={`mailto:${EMAIL}`}>Send an email →</PrimaryButton>
      </div>

      <div className="mt-6 border-t border-[#0B1220] pt-5">
        <div className="border-l-[3px] border-[#0B1220] pl-3">
          <p className="text-[15px] font-bold tracking-wide">SARAVANAN P V</p>
          <p className="mt-1 text-[11px] text-[#374151]">B.Tech AI &amp; Data Science student @ Saveetha Engineering College.</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={l.label}
              className="flex items-center justify-center w-12 h-12 border border-[#0B1220] bg-white/60 active:bg-[#0B1220] active:text-[#F4F1EA]"
            >
              <l.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-[#0B1220] pt-4">
        <p className="text-[11px] text-[#374151]">Developed &amp; Signed by</p>
        <Image src="/signature.png" alt="Saravanan P V signature" width={376} height={167} className="mt-1 w-44 h-auto -ml-1" />
      </div>

      <div className="mt-4 border-t border-[#cfc8b7] pt-3 flex justify-between gap-2 text-[9px] tracking-widest text-[#374151] uppercase">
        <span>© 2026 Saravanan P V</span>
        <span>Built with Next.js &amp; Tailwind</span>
      </div>
    </div>
  );
}
