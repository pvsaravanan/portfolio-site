'use client';

import React from 'react';
import SectionHeader from './SectionHeader';

export default function About() {
  return (
    <section id="about" className="border-b border-[#0B1220]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <SectionHeader index="01" label="ABOUT" title="WHAT I" muted="DO" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-lg leading-relaxed mb-6 font-medium text-[#0B1220]">
              <span className="text-[#E07A5F] font-bold">AI engineer and builder</span> focused on transforming ambitious ideas into <span className="text-[#E07A5F]">production-ready intelligent systems</span>. From multi-modal AI assistants to privacy-first RAG pipelines, I enjoy creating software that combines strong engineering with practical usability.
            </p>
            <p className="text-sm leading-relaxed text-[#374151]">
              Experienced in architecting <span className="text-[#E07A5F]">LLM workflows</span>, scalable backend systems, and end-to-end AI pipelines using <span className="inline-block bg-[#4ADE80] text-[#0B1220] px-1 font-medium">PyTorch</span>, <span className="inline-block bg-[#4ADE80] text-[#0B1220] px-1 font-medium">LangChain</span>, <span className="inline-block bg-[#4ADE80] text-[#0B1220] px-1 font-medium">FastAPI</span>, <span className="inline-block bg-[#4ADE80] text-[#0B1220] px-1 font-medium">Docker</span>, and modern cloud tooling.
            </p>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-[#374151] mb-6">
              I’ve built systems that run across local LLMs, edge devices, and multi-model inference environments with a focus on performance, reliability, and real-world deployment.
            </p>
            <p className="text-sm leading-relaxed text-[#374151] mb-8">
              Currently exploring transformer architectures, agentic AI systems, and scalable inference infrastructure while continuously building products that push beyond prototypes into usable experiences.
            </p>
            <p className="text-sm text-[#374151]">
              Always open to collaborating on high-impact projects.{' '}
              <a href="mailto:saravananpv30102005@gmail.com" className="text-[#0B1220] underline decoration-1 underline-offset-4 font-medium">
                Reach out to start a conversation.
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
