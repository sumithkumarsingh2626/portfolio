'use client';

import { useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { skills, type Skill } from '@/data/skills';
import { cn } from '@/utils/cn';

const categoryLabels: Record<Skill['category'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Other',
  'ai-ml': 'AI',
};

function SkillCard({ skill }: { skill: Skill }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 24, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 220, damping: 24, mass: 0.3 });
  const rx = useTransform(sy, (v) => v * -6);
  const ry = useTransform(sx, (v) => v * 10);

  return (
    <motion.div
      className={cn('rounded-2xl glass p-5', 'relative overflow-hidden')}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6 }}
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
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-medium text-white/90">{skill.name}</div>
        <div className="text-xs text-white/50 tabular-nums">{skill.level}%</div>
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-white/6 border border-white/10 overflow-hidden">
        <motion.div
          className="h-full"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: `${skill.level}%`, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.75), rgba(121,151,255,0.55))',
          }}
        />
      </div>
    </motion.div>
  );
}

function SkillGroup({ category, items }: { category: Skill['category']; items: Skill[] }) {
  return (
    <div className="space-y-4">
      <div className="text-xs tracking-[0.28em] text-white/45">
        {categoryLabels[category].toUpperCase()}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const grouped = useMemo(() => {
    const byCategory: Record<Skill['category'], Skill[]> = {
      frontend: [],
      backend: [],
      tools: [],
      'ai-ml': [],
    };
    for (const skill of skills) byCategory[skill.category].push(skill);
    return byCategory;
  }, []);

  return (
    <section id="skills" className={cn('relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden')}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="text-xs tracking-[0.28em] text-white/45">SKILLS</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white/95">
            Strong fundamentals, modern stack.
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl leading-relaxed">
            Clean UI systems, reliable APIs, and automation that doesn’t flake out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <SkillGroup category="frontend" items={grouped.frontend} />
          <SkillGroup category="backend" items={grouped.backend} />
          <SkillGroup category="tools" items={grouped.tools} />
          <SkillGroup category="ai-ml" items={grouped['ai-ml']} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 rounded-3xl glass p-7 sm:p-8"
        >
          <div className="text-xs tracking-[0.28em] text-white/45">NOTE</div>
          <p className="mt-4 text-white/70 leading-relaxed">
            I optimize for feel and longevity: performance budgets, predictable state, and motion that respects real-world physics — without visual noise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
