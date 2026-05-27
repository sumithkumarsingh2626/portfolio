'use client';

import { useMemo } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code2, ExternalLink } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { cn } from '@/utils/cn';

function ActionButton({
  href,
  icon: Icon,
  children,
}: {
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  const disabled = !href;
  return (
    <a
      href={href || '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noreferrer noopener' : undefined}
      aria-disabled={disabled}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium',
        disabled
          ? 'bg-white/5 text-white/35 border border-white/10 cursor-not-allowed'
          : 'bg-white text-black hover:translate-y-[-1px] transition-transform',
        'focus-ring'
      )}
    >
      <Icon className="w-4 h-4" />
      {children}
      {!href && <span className="text-xs opacity-60">(soon)</span>}
    </a>
  );
}

function TechChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="px-3 py-1 rounded-full text-xs text-white/70 bg-white/5 border border-white/10"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 24, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 220, damping: 24, mass: 0.3 });
  const rx = useTransform(sy, (v) => v * -4);
  const ry = useTransform(sx, (v) => v * 6);
  const glowX = useTransform(sx, (v) => `${(v + 0.5) * 100}%`);
  const glowY = useTransform(sy, (v) => `${(v + 0.5) * 100}%`);
  const glowBg = useMotionTemplate`radial-gradient(500px circle at ${glowX} ${glowY}, rgba(121,151,255,0.16), transparent 55%)`;

  return (
    <motion.article
      className={cn('rounded-3xl glass overflow-hidden', 'relative')}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.25 }}
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
      <motion.div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background: glowBg,
        }}
      />

      <div className="relative">
        <div className="relative h-56 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.65))]" />
          <div className="absolute left-5 bottom-5">
            <div className="text-xs tracking-[0.28em] text-white/55">
              {project.category.toUpperCase()}
            </div>
            <div className="mt-2 text-xl font-semibold text-white/95">{project.title}</div>
            <div className="mt-2 text-white/65 max-w-[52ch] text-sm leading-relaxed">
              {project.description}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-7 space-y-6">
          <TechChips items={project.technologies.slice(0, 10)} />

          {project.highlights?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.slice(0, 6).map((h) => (
                <div
                  key={h}
                  className="rounded-2xl p-4 bg-white/4 border border-white/10 text-sm text-white/75 leading-relaxed"
                >
                  {h}
                </div>
              ))}
            </div>
          ) : null}

          {(project.challenges?.length || project.architecture?.length) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl p-5 bg-white/3 border border-white/10">
                <div className="text-xs tracking-[0.28em] text-white/45">CHALLENGES SOLVED</div>
                <ul className="mt-4 space-y-2">
                  {(project.challenges ?? []).slice(0, 4).map((c) => (
                    <li key={c} className="text-sm text-white/70 leading-relaxed flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-5 bg-white/3 border border-white/10">
                <div className="text-xs tracking-[0.28em] text-white/45">ARCHITECTURE</div>
                <ul className="mt-4 space-y-2">
                  {(project.architecture ?? []).slice(0, 4).map((a) => (
                    <li key={a} className="text-sm text-white/70 leading-relaxed flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35 shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            <ActionButton href={project.liveUrl} icon={ExternalLink}>
              Live Preview
            </ActionButton>
            <ActionButton href={project.githubUrl} icon={Code2}>
              GitHub
            </ActionButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const featured = useMemo(() => projects.find((p) => p.featured) ?? projects[0], []);
  const rest = useMemo(() => projects.filter((p) => p.id !== featured.id), [featured.id]);

  return (
    <section id="projects" className={cn('relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden')}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="text-xs tracking-[0.28em] text-white/45">PROJECTS</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white/95">
            Featured case study.
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl leading-relaxed">
            Luxury-grade presentation, real engineering under the hood.
          </p>
        </motion.div>

        <ProjectCard project={featured} />

        {rest.length ? (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rest.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
