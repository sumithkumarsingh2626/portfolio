'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { profile } from '@/data/profile';
import { cn } from '@/utils/cn';

type Command = {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
};

function scrollToHash(hash: string) {
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', hash);
}

const sectionCommands: Command[] = [
  { id: 'go-home', label: 'Go to Home', hint: '#home', run: () => scrollToHash('#home') },
  { id: 'go-about', label: 'Go to About', hint: '#about', run: () => scrollToHash('#about') },
  { id: 'go-skills', label: 'Go to Skills', hint: '#skills', run: () => scrollToHash('#skills') },
  { id: 'go-projects', label: 'Go to Projects', hint: '#projects', run: () => scrollToHash('#projects') },
  { id: 'go-timeline', label: 'Go to Timeline', hint: '#experience', run: () => scrollToHash('#experience') },
  { id: 'go-contact', label: 'Go to Contact', hint: '#contact', run: () => scrollToHash('#contact') },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPalette = useCallback(() => {
    setQuery('');
    setActive(0);
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const closePalette = useCallback(() => setOpen(false), []);

  const commands = useMemo<Command[]>(
    () => [
      ...sectionCommands,
      {
        id: 'copy-email',
        label: 'Copy Email',
        hint: profile.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            toast.success('Email copied');
          } catch {
            toast.error('Could not copy email');
          }
        },
      },
      {
        id: 'open-github',
        label: 'Open GitHub',
        hint: profile.socials.github,
        run: () => window.open(profile.socials.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'open-linkedin',
        label: 'Open LinkedIn',
        hint: profile.socials.linkedin,
        run: () => window.open(profile.socials.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'open-instagram',
        label: 'Open Instagram',
        hint: profile.socials.instagram,
        run: () => window.open(profile.socials.instagram, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'open-portfolio',
        label: 'Open Portfolio',
        hint: profile.socials.portfolio,
        run: () => window.open(profile.socials.portfolio, '_blank', 'noopener,noreferrer'),
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => (c.label + ' ' + (c.hint ?? '')).toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      if (isK && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (open) closePalette();
        else openPalette();
      }
      if (!open) return;
      if (e.key === 'Escape') closePalette();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((v) => Math.min(v + 1, Math.max(filtered.length - 1, 0)));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((v) => Math.max(v - 1, 0));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = filtered[active];
        cmd?.run();
        closePalette();
      }
    };

    const onOpen: EventListener = () => {
      if (open) return;
      openPalette();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('app:openPalette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('app:openPalette', onOpen);
    };
  }, [active, closePalette, filtered, open, openPalette]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close command palette"
        onClick={closePalette}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="absolute left-1/2 top-[18%] w-[min(720px,92vw)] -translate-x-1/2">
        <div className={cn('rounded-3xl glass-strong overflow-hidden')}>
          <div className="px-5 py-4 border-b border-white/10 bg-white/3">
            <div className="text-[10px] tracking-[0.28em] text-white/45">COMMAND PALETTE</div>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command…"
              className={cn(
                'mt-3 w-full bg-transparent outline-none',
                'text-base text-white/90 placeholder:text-white/35'
              )}
            />
          </div>

          <div className="max-h-[360px] overflow-auto">
            {filtered.length ? (
              filtered.map((c, idx) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => {
                    c.run();
                    setOpen(false);
                  }}
                  onMouseEnter={() => setActive(idx)}
                  className={cn(
                    'w-full text-left px-5 py-4 flex items-center justify-between gap-6',
                    'border-b border-white/6',
                    idx === active ? 'bg-white/6' : 'bg-transparent hover:bg-white/4'
                  )}
                >
                  <div>
                    <div className="text-sm text-white/85">{c.label}</div>
                    {c.hint ? <div className="mt-1 text-xs text-white/45">{c.hint}</div> : null}
                  </div>
                  <div className="text-[10px] tracking-[0.22em] text-white/35">ENTER</div>
                </button>
              ))
            ) : (
              <div className="px-5 py-6 text-sm text-white/55">No matching commands.</div>
            )}
          </div>

          <div className="px-5 py-4 text-[10px] tracking-[0.22em] text-white/35 bg-white/2">
            Tip: Press <span className="text-white/55">Ctrl K</span> anytime.
          </div>
        </div>
      </div>
    </div>
  );
}
