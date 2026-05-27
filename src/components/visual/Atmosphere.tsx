'use client';

import { cn } from '@/utils/cn';

export function Atmosphere() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      <div
        className={cn(
          'absolute inset-0 atmo-shift',
          'bg-[linear-gradient(120deg,rgba(7,8,10,1),rgba(12,14,20,1),rgba(8,11,18,1))]'
        )}
      />

      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_18%_12%,rgba(121,151,255,0.18),transparent_42%),radial-gradient(circle_at_82%_52%,rgba(130,220,255,0.10),transparent_46%),radial-gradient(circle_at_40%_82%,rgba(255,255,255,0.05),transparent_40%)]" />

      {/* Cursor-reactive lighting */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(720px circle at var(--px,50%) var(--py,40%), rgba(121,151,255,0.14), transparent 60%)',
        }}
      />

      {/* Dust texture (CSS, lightweight) */}
      <div
        className={cn(
          'absolute inset-[-20%] opacity-[0.35] atmo-dust',
          'bg-[radial-gradient(circle,rgba(255,255,255,0.10)_1px,transparent_1px)]',
          'bg-[length:22px_22px]'
        )}
        style={{
          filter: 'blur(0.3px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
