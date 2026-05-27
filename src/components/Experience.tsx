'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/data/experience';
import { cn } from '@/utils/cn';

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Experience() {
  return (
    <section id="experience" className={cn('relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden')}>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="text-xs tracking-[0.28em] text-white/45">TIMELINE</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white/95">
            Experience & education.
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed max-w-2xl">
            A focused path: fundamentals, systems, and cinematic engineering.
          </p>
        </motion.div>

        <div className="relative pl-6 sm:pl-10">
          {/* Line */}
          <div className="absolute left-[10px] sm:left-[14px] top-0 bottom-0 w-px bg-white/12" />
          <div className="absolute left-[10px] sm:left-[14px] top-0 h-24 w-px bg-[linear-gradient(180deg,rgba(121,151,255,0.45),transparent)]" />

          <div className="space-y-6">
            {timeline.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-120px' }}
                className="relative"
              >
                <div className="absolute left-[-1px] sm:left-[3px] top-7 h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_0_6px_rgba(255,255,255,0.06)]" />
                <div className={cn('rounded-3xl glass p-7 sm:p-8')}>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-xs tracking-[0.28em] text-white/45">
                        {item.type.toUpperCase()}
                      </div>
                      <div className="mt-3 text-xl sm:text-2xl font-semibold text-white/95">
                        {item.title}
                      </div>
                      <div className="mt-2 text-white/60">{item.subtitle}</div>
                    </div>
                    <div className="text-xs tracking-[0.22em] text-white/45 whitespace-nowrap">
                      {item.date}
                    </div>
                  </div>
                  <p className="mt-5 text-white/70 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
