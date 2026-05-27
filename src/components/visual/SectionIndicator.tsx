'use client';

import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/utils/cn';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
];

export function SectionIndicator() {
  const [active, setActive] = useState(sections[0]?.id ?? 'home');

  const ids = useMemo(() => sections.map((s) => s.id), []);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: '-20% 0px -55% 0px' }
    );

    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [ids]);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[55] hidden lg:flex flex-col gap-3">
      {sections.map((s) => {
        const isActive = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={`Jump to ${s.label}`}
            className={cn(
              'group relative h-3 w-3 rounded-full transition-all',
              isActive ? 'bg-white/80 shadow-[0_0_0_6px_rgba(255,255,255,0.06)]' : 'bg-white/25 hover:bg-white/45'
            )}
          >
            <span
              className={cn(
                'absolute right-5 top-1/2 -translate-y-1/2',
                'px-3 py-1 rounded-full text-xs tracking-[0.18em]',
                'bg-black/40 border border-white/10 backdrop-blur-md text-white/60',
                'opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all'
              )}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

