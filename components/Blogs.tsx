'use client';

import React from 'react';
import Button from './Button';
import SectionHeader from './SectionHeader';

const blogPosts = [
  {
    title: 'Agentic RAG: The Upgrade Your AI Pipeline Desperately Needs',
    date: 'May 09, 2026',
    category: 'ARTICLE',
    readTime: '6 MIN READ',
    excerpt: "From one-shot retrieval to self-correcting, multi-hop reasoning — a developer's breakdown in 3 levels.",
    tags: ['RAG', 'AGENTIC AI', 'LLM PIPELINES'],
    id: 'BLOG-02',
    author: 'SARAVANAN P V',
    link: 'https://medium.com/@saravananpv30102005/agentic-rag-the-upgrade-your-ai-pipeline-desperately-needs-92d224f39a40',
  },
  {
    title: 'RAG VS HYDE — CHOOSING THE RIGHT RETRIEVAL STRATEGY',
    date: 'Feb 01, 2026',
    category: 'ARTICLE',
    readTime: '5 MIN READ',
    excerpt: 'A practical comparison of RAG and HyDE to help you pick the right retrieval approach for your LLM application.',
    tags: ['RAG', 'HYDE', 'RETRIEVAL'],
    id: 'BLOG-01',
    author: 'SARAVANAN P V',
    link: 'https://medium.com/@saravananpv30102005/rag-vs-hyde-choosing-the-right-retrieval-strategy-for-your-llm-application-01216f21c519',
  }
];

export default function Blogs() {
  return (
    <section id="blogs" className="border-b border-[var(--ink)] bg-[var(--paper)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          index="06"
          label="BLOGS"
          title="LATEST"
          muted="INSIGHTS"
          right={<Button href="#" variant="outline" className="hidden sm:inline-flex">View All Posts</Button>}
        />

        <div className="border-t border-[var(--ink)]">
          {blogPosts.map((post) => {
            const number = post.id.split('-')[1];

            return (
              <article
                key={post.id}
                className="group relative border-b border-[var(--ink)] py-8 cursor-pointer hover:bg-[var(--paper-2)] transition-colors duration-150"
                role={post.link ? 'link' : undefined}
                tabIndex={post.link ? 0 : undefined}
                onClick={() => {
                  if (!post.link) return;
                  window.open(post.link, '_blank', 'noopener,noreferrer');
                }}
                onKeyDown={(e) => {
                  if (!post.link) return;
                  if (e.key !== 'Enter' && e.key !== ' ') return;
                  e.preventDefault();
                  window.open(post.link, '_blank', 'noopener,noreferrer');
                }}
              >
                <div className="flex items-start gap-4 sm:gap-8 px-1">
                  {/* Ghost index numeral */}
                  <span
                    className="hidden sm:block text-[64px] sm:text-[84px] font-black leading-none select-none shrink-0 text-transparent transition-colors group-hover:text-[var(--accent)]/10"
                    style={{ WebkitTextStroke: '1.5px var(--ink)' }}
                  >
                    {number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest">
                        {post.date}
                      </span>
                      <span className="w-1 h-1 bg-[var(--ink-4)]" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--ink-4)]">
                        {post.readTime}
                      </span>
                      <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.15em] border border-[var(--ink)] text-[var(--ink-2)]">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold leading-snug uppercase tracking-tight mb-3 group-hover:text-[var(--accent)] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-[12px] text-[var(--ink-3)] leading-relaxed max-w-2xl mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest border border-[var(--rule)] text-[var(--ink-3)] bg-[var(--paper)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-[var(--rule)]">
                      <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--ink-2)]">
                        BY {post.author}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[var(--ink)] group-hover:gap-2.5 transition-all">
                        Read Article
                        <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Button href="#" variant="outline" className="w-full">View All Posts</Button>
        </div>
      </div>
    </section>
  );
}
