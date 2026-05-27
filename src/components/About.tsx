'use client';

import { useEffect, useMemo, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { timeline } from '@/data/experience';
import { projects } from '@/data/projects';
import { cn } from '@/utils/cn';

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px', once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const controls = animate(mv, value, { duration: 1.25, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, mv, value]);

  return (
    <div ref={ref} className={cn('rounded-2xl p-5 glass', 'relative overflow-hidden')}>
      <div className="text-xs tracking-[0.24em] text-white/45">{label}</div>
      <div className="mt-3 text-3xl sm:text-4xl font-semibold text-white/95">
        <motion.span>{rounded}</motion.span>
        {suffix ?? ''}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </div>
  );
}

export function About() {
  const highlights = useMemo(
    () => [
      'Fullstack development with clean architecture',
      'DevOps + deployment workflows (CI/CD mindset)',
      'Cybersecurity interest: best practices + VAPT',
      'Automation for faster, reliable delivery',
      'Focused on UI/UX and premium interactions',
    ],
    []
  );

  const stats = useMemo(() => {
    const tech = new Set(projects.flatMap((p) => p.technologies));
    const categories = new Set(projects.map((p) => p.category));
    const achievements = timeline.filter((t) => t.type === 'achievement').length;

    return [
      { value: projects.length, label: 'PROJECTS BUILT' },
      { value: achievements, label: 'ACHIEVEMENTS' },
      { value: tech.size, label: 'TECH USED' },
      { value: categories.size, label: 'DOMAINS' },
    ];
  }, []);

  return (
    <section id="about" className={cn('relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden')}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="text-xs tracking-[0.28em] text-white/45">ABOUT</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white/95">
            Calm, minimal — deeply engineered.
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl leading-relaxed">
            I build premium-feeling interfaces and reliable systems: motion that feels physical, visuals that feel cinematic, and code that stays maintainable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* 3D info card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={cn('rounded-3xl glass-strong p-7 sm:p-8', 'relative overflow-hidden')}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(121,151,255,0.18),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(130,220,255,0.10),transparent_45%)] opacity-60" />
            <div className="relative">
              <div className="text-xs tracking-[0.28em] text-white/45">SUMITH KUMAR SINGH</div>
              <div className="mt-3 text-2xl sm:text-3xl font-semibold text-white/95">
                Fullstack Developer
              </div>
              <div className="mt-2 text-white/65">CSE Student @ BITS Vizag • DevOps • Cybersecurity</div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl p-4 bg-white/4 border border-white/10">
                  <div className="text-xs tracking-[0.24em] text-white/45">UI</div>
                  <div className="mt-2 text-sm text-white/80 leading-relaxed">
                    Motion systems, depth, polish
                  </div>
                </div>
                <div className="rounded-2xl p-4 bg-white/4 border border-white/10">
                  <div className="text-xs tracking-[0.24em] text-white/45">APIs</div>
                  <div className="mt-2 text-sm text-white/80 leading-relaxed">
                    Clean contracts, auth, data
                  </div>
                </div>
                <div className="rounded-2xl p-4 bg-white/4 border border-white/10">
                  <div className="text-xs tracking-[0.24em] text-white/45">AUTO</div>
                  <div className="mt-2 text-sm text-white/80 leading-relaxed">
                    Scrapers, alerts, pipelines
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-xs tracking-[0.28em] text-white/45">WHAT I’M BUILDING</div>
                <p className="mt-3 text-white/70 leading-relaxed">
                  A price drop alert tool and a full-stack student management system — focused on clean UX, scalable APIs, and reliable deployments.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Highlights + counters */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={cn('rounded-3xl glass p-7 sm:p-8')}
            >
              <div className="text-xs tracking-[0.28em] text-white/45">HIGHLIGHTS</div>
              <ul className="mt-5 space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="text-white/70 leading-relaxed flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((s) => (
                <Counter key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
