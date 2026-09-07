'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FaAws,
  FaCodeBranch,
  FaComments,
  FaDatabase,
  FaDiagramProject,
  FaEye,
  FaJava,
  FaNetworkWired,
  FaRobot,
  FaUserSecret,
  FaWandMagicSparkles,
} from 'react-icons/fa6';
import {
  SiC,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiLinux,
  SiGit,
  SiGithub,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiLangchain,
  SiUipath,
} from 'react-icons/si';
import SectionHeader from './SectionHeader';

interface SkillMeta {
  icon?: IconType;
  color?: string;
}

// Real brand icons are used where available; domain icons represent conceptual skills.
const SKILL_META: Record<string, SkillMeta> = {
  'Python': { icon: SiPython, color: '#3776AB' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'Java': { icon: FaJava, color: '#E76F00' },
  'C': { icon: SiC, color: '#A8B9CC' },
  'SQL': { icon: FaDatabase, color: '#336791' },
  'React': { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#38BDF8' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express': { icon: SiExpress, color: '#000000' },
  'FastAPI': { icon: SiFastapi, color: '#009688' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'PostgreSQL': { icon: SiPostgresql, color: '#336791' },
  'Firebase': { icon: SiFirebase, color: '#FFCA28' },
  'AWS': { icon: FaAws, color: '#FF9900' },
  'GCP': { icon: SiGooglecloud, color: '#4285F4' },
  'Docker': { icon: SiDocker, color: '#2496ED' },
  'Kubernetes': { icon: SiKubernetes, color: '#326CE5' },
  'Linux': { icon: SiLinux, color: '#111111' },
  'CI/CD': { icon: FaCodeBranch, color: '#0B1220' },
  'Git': { icon: SiGit, color: '#F05033' },
  'GitHub': { icon: SiGithub, color: '#181717' },
  'PyTorch': { icon: SiPytorch, color: '#EE4C2C' },
  'TensorFlow': { icon: SiTensorflow, color: '#FF6F00' },
  'Scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },
  'LangChain': { icon: SiLangchain, color: '#1C3C3C' },
  'LLMs': { icon: FaRobot, color: '#0B1220' },
  'RAG Pipelines': { icon: FaDiagramProject, color: '#7C3AED' },
  'Prompt Engineering': { icon: FaWandMagicSparkles, color: '#D97706' },
  'NLP': { icon: FaComments, color: '#2563EB' },
  'Computer Vision': { icon: FaEye, color: '#0891B2' },
  'UiPath': { icon: SiUipath, color: '#FA4616' },
  'Ethical Hacking': { icon: FaUserSecret, color: '#B91C1C' },
  'Network Security': { icon: FaNetworkWired, color: '#15803D' },
};

const skillGroups = [
  {
    title: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C', 'SQL'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Firebase'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Linux', 'CI/CD'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'AI / ML',
    skills: ['LLMs', 'RAG Pipelines', 'Prompt Engineering', 'LangChain', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'NLP', 'Computer Vision'],
  },
  {
    title: 'Tools & Security',
    skills: ['Git', 'GitHub', 'UiPath', 'Ethical Hacking', 'Network Security'],
  },
];

const leftGroups = skillGroups.filter((_, idx) => idx % 2 === 0);
const rightGroups = skillGroups.filter((_, idx) => idx % 2 === 1);

function SkillChip({ name }: { name: string }) {
  const meta = SKILL_META[name];
  const Icon = meta?.icon;

  return (
    <span className="group inline-flex items-center gap-2.5 border-[1.5px] border-[#0B1220] bg-white pl-3 pr-3.5 py-2 text-[13px] font-medium text-[#0B1220] shadow-[2px_2px_0_0_#0B1220] hover:shadow-[3px_3px_0_0_#0B1220] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-150 cursor-default">
      {Icon ? (
        <Icon className="w-5 h-5 shrink-0" style={{ color: meta?.color }} />
      ) : (
        <span className="w-2 h-2 bg-[var(--accent)] shrink-0" />
      )}
      {name}
    </span>
  );
}

function SkillGroup({ title, skills, delay }: { title: string; skills: string[]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay }}
    >
      <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-4)] mb-4">
        <span className="w-1 h-1 bg-[var(--accent)]" />
        {title}
      </h4>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <SkillChip key={skill} name={skill} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="border-b border-[#0B1220] bg-[var(--paper-2)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <SectionHeader index="03" label="SKILLS" title="TECHNICAL" muted="ARSENAL" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          <div className="flex flex-col gap-10">
            {leftGroups.map((group, idx) => (
              <SkillGroup key={group.title} title={group.title} skills={group.skills} delay={idx * 0.08} />
            ))}
          </div>
          <div className="flex flex-col gap-10">
            {rightGroups.map((group, idx) => (
              <SkillGroup key={group.title} title={group.title} skills={group.skills} delay={idx * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
