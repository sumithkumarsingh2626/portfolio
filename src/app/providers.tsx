'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { Toaster } from 'react-hot-toast';
import { CinematicCanvas } from '@/components/scene/CinematicCanvas';
import { Atmosphere } from '@/components/visual/Atmosphere';
import { CinematicCursor } from '@/components/visual/CinematicCursor';
import { CommandPalette } from '@/components/visual/CommandPalette';
import { SectionIndicator } from '@/components/visual/SectionIndicator';
import { TimeWidget } from '@/components/visual/TimeWidget';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--px', `${x.toFixed(2)}%`);
      document.documentElement.style.setProperty('--py', `${y.toFixed(2)}%`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Toaster position="bottom-center" />
      <Atmosphere />
      <CinematicCanvas />
      <CinematicCursor />
      <SectionIndicator />
      <TimeWidget />
      <CommandPalette />
      {children}
    </>
  );
}
