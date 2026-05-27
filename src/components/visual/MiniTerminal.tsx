'use client';

import { useMemo, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

type Line = { kind: 'in' | 'out'; text: string };

function runCommand(raw: string): string[] {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return [];
  if (cmd === 'help') {
    return [
      'Commands:',
      '  about      — short intro',
      '  skills     — jump to skills',
      '  projects   — jump to projects',
      '  contact    — jump to contact',
      '  clear      — clear terminal',
    ];
  }
  if (cmd === 'about') {
    return [
      'Sumith Kumar Singh — Fullstack Developer • DevOps • Cybersecurity',
      'Focus: scalable web apps, reliable deployments, security-minded engineering.',
    ];
  }
  if (cmd === 'skills') {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return ['Scrolling to #skills…'];
  }
  if (cmd === 'projects') {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return ['Scrolling to #projects…'];
  }
  if (cmd === 'contact') {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return ['Scrolling to #contact…'];
  }
  if (cmd === 'clear') return ['__CLEAR__'];
  return [`Unknown command: "${raw.trim()}"`, 'Type "help" to see available commands.'];
}

export function MiniTerminal() {
  const [value, setValue] = useState('');
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'Type "help" and press Enter.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = useMemo(() => 'sumith@portfolio:~$', []);

  return (
    <div className={cn('rounded-3xl glass p-5 sm:p-6', 'text-left')}>
      <div className="flex items-center justify-between">
        <div className="text-[10px] tracking-[0.28em] text-white/45">INTERACTIVE TERMINAL</div>
        <button
          type="button"
          className="text-[10px] tracking-[0.22em] text-white/40 hover:text-white/60"
          onClick={() => setLines([{ kind: 'out', text: 'Cleared.' }])}
        >
          CLEAR
        </button>
      </div>

      <div className="mt-4 font-mono text-[12px] leading-relaxed text-white/70 space-y-1 max-h-[160px] overflow-auto">
        {lines.map((l, i) => (
          <div key={i} className={l.kind === 'in' ? 'text-white/85' : 'text-white/65'}>
            {l.kind === 'in' ? `${prompt} ${l.text}` : l.text}
          </div>
        ))}
      </div>

      <form
        className="mt-4 flex items-center gap-3 font-mono text-[12px]"
        onSubmit={(e) => {
          e.preventDefault();
          const raw = value;
          const out = runCommand(raw);
          if (!raw.trim()) return;

          setLines((prev) => {
            const next: Line[] = [...prev, { kind: 'in', text: raw.trim() }];
            for (const o of out) {
              if (o === '__CLEAR__') return [{ kind: 'out', text: 'Cleared.' }];
              next.push({ kind: 'out', text: o });
            }
            return next.slice(-22);
          });
          setValue('');
          inputRef.current?.focus();
        }}
      >
        <div className="text-white/55 select-none">{prompt}</div>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            'flex-1 bg-transparent outline-none',
            'text-white/85 placeholder:text-white/35'
          )}
          placeholder="help"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
