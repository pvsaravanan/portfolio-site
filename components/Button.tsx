'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'dark';
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  className = '',
}: ButtonProps) {
  // Styles based on the provided CSS specification
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    px-4 py-2.5
    border-[1.5px] border-[var(--ink)]
    shadow-[var(--sh-2)]
    font-mono text-[12px] font-semibold tracking-[.06em]
    uppercase cursor-pointer
    transition-all duration-150
    relative whitespace-nowrap
    hover:shadow-[var(--sh-hover)]
    hover:-translate-x-[1px] hover:-translate-y-[1px]
    active:translate-x-[2px] active:translate-y-[2px]
    active:shadow-[var(--sh-1)]
    -webkit-appearance-button
    ${className}
  `;

  const variantClasses = variant === 'primary' 
    ? 'bg-[var(--accent)] text-[var(--paper)]' 
    : variant === 'outline'
    ? 'bg-[var(--paper)] text-[var(--ink)]'
    : 'bg-[var(--ink)] text-[var(--paper)]';

  // Corner markers from the design
  const corners = (
    <>
      <span className="absolute top-1.5 left-1.5 w-1 h-1 bg-current opacity-80" aria-hidden="true" />
      <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-current opacity-80" aria-hidden="true" />
      <span className="absolute bottom-1.5 left-1.5 w-1 h-1 bg-current opacity-80" aria-hidden="true" />
      <span className="absolute bottom-1.5 right-1.5 w-1 h-1 bg-current opacity-80" aria-hidden="true" />
    </>
  );

  const content = (
    <>
      {corners}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${variantClasses}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {content}
    </button>
  );
}

