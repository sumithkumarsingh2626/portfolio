'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, CornerDownLeft } from 'lucide-react';
import { cn } from '@/utils/cn';
import { MiniTerminal } from '@/components/visual/MiniTerminal';
import { profile } from '@/data/profile';

export function Hero() {
  const ambientRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 26, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 160, damping: 26, mass: 0.4 });

  const panelX = useTransform(sx, (v) => v * 18);
  const panelY = useTransform(sy, (v) => v * 14);
  const tiltX = useTransform(sy, (v) => v * -4);
  const tiltY = useTransform(sx, (v) => v * 6);

  useEffect(() => {
    const el = ambientRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        x: 28,
        y: 18,
        scale: 1.06,
        duration: 9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        'pt-24 px-4 sm:px-6 lg:px-8'
      )}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        mx.set(nx);
        my.set(ny);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* Ambient gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={ambientRef}
          className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(121,151,255,0.18),transparent_60%)] blur-3xl"
        />
        <div className="absolute bottom-[-140px] right-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(130,220,255,0.10),transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.03),transparent_40%)]" />
      </div>

      {/* Floating glass panels */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className={cn(
            'absolute left-[8%] top-[18%] w-[260px] h-[160px] rounded-2xl glass',
            'hidden md:block'
          )}
          style={{ x: panelX, y: panelY }}
        >
          <div className="h-full w-full p-5 flex flex-col justify-between">
            <div className="text-xs tracking-[0.2em] text-white/50">NOW</div>
            <div className="text-sm text-white/85 leading-relaxed">
              Building immersive UI systems with motion depth and clean architecture.
            </div>
          </div>
        </motion.div>

        <motion.div
          className={cn(
            'absolute right-[10%] bottom-[18%] w-[300px] h-[180px] rounded-2xl glass-strong',
            'hidden md:block'
          )}
          style={{ x: useTransform(panelX, (v) => v * -0.8), y: useTransform(panelY, (v) => v * -0.8) }}
        >
          <div className="h-full w-full p-5">
            <div className="text-xs tracking-[0.2em] text-white/50 mb-3">FOCUS</div>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-center justify-between">
                <span>Performance</span>
                <span className="text-white/55">60 FPS</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Motion</span>
                <span className="text-white/55">Physical</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Systems</span>
                <span className="text-white/55">Scalable</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">


        <motion.h1
          initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-base sm:text-lg text-white/70"
        >
          {profile.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-lg sm:text-xl text-white/65 leading-relaxed max-w-3xl mx-auto"
        >
          Building scalable web applications, deploying smartly with DevOps workflows, and engineering with a security mindset.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className={cn(
              'group inline-flex items-center justify-center gap-2',
              'px-6 py-3 rounded-xl',
              'bg-white text-black font-medium',
              'shadow-[0_20px_60px_rgba(0,0,0,0.55)]',
              'hover:translate-y-[-1px] transition-transform focus-ring'
            )}
          >
            Explore Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'px-6 py-3 rounded-xl',
              'bg-white/5 text-white/85 border border-white/12',
              'hover:bg-white/8 hover:border-white/18 transition-colors focus-ring'
            )}
          >
            Let’s Talk
            <CornerDownLeft className="w-4 h-4 opacity-70" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.55 }}
          className="mt-10 text-xs tracking-[0.22em] text-white/45"
        >
          “{profile.tagline}”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <MiniTerminal />
        </motion.div>

        <motion.div
          className="mt-14 flex items-center justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="h-10 w-6 rounded-full border border-white/20 flex items-start justify-center p-2">
            <div className="h-2 w-1 rounded-full bg-white/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
