'use client';

import { motion } from 'framer-motion';
import { skills, type Skill } from '@/data/skills';
import { cn } from '@/utils/cn';
import { Scroll3DCard } from './Scroll3DCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

const categoryOrder = ['frontend', 'backend', 'tools', 'ai-ml'];
const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & DevOps',
  'ai-ml': 'AI/ML',
};

interface SkillGroupProps {
  category: 'frontend' | 'backend' | 'tools' | 'ai-ml';
  items: Skill[];
}

function SkillGroup({ category, items }: SkillGroupProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold text-white/90">
        {categoryLabels[category]}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((skill, idx) => (
          <motion.div
            key={idx}
            className={cn(
              'p-4 rounded-lg',
              'bg-linear-to-br from-gray-800/30 to-gray-900/30',
              'border border-gray-700/30',
              'backdrop-blur-sm',
              'hover:border-blue-500/50 hover:from-gray-800/50 hover:to-gray-900/50',
              'relative group overflow-hidden'
            )}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15)',
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-blue-600/0 via-purple-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-blue-600/10"
              transition={{ duration: 0.3 }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2">
                  {skill.icon && <span className="text-lg">{skill.icon}</span>}
                  <span className="text-sm font-medium text-white">{skill.name}</span>
                </span>
                <motion.span
                  className="text-xs text-gray-400 font-semibold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {skill.level}%
                </motion.span>
              </div>

              {/* Animated progress bar */}
              <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden border border-gray-700/30">
                <motion.div
                  className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-blue-500"
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: `${skill.level}%`, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                />
              </div>

              {/* Skill level indicator */}
              <motion.div
                className="mt-2 text-xs text-gray-500 flex items-center gap-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        i < Math.round(skill.level / 20)
                          ? 'bg-blue-400'
                          : 'bg-gray-700'
                      )}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      viewport={{ once: true }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className={cn(
        'py-20 px-4 sm:px-6 lg:px-8',
        'bg-linear-to-b from-gray-900 to-black',
        'relative overflow-hidden'
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Scroll3DCard delay={0}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-12"
          >
            <h2 className={cn(
              'text-4xl sm:text-5xl font-bold mb-4',
              'text-white'
            )}>
              Technical <span className={cn(
                'bg-linear-to-r from-blue-400 to-purple-500',
                'bg-clip-text text-transparent'
              )}>Skills</span>
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-400 to-purple-500 rounded-full" />
          </motion.div>
        </Scroll3DCard>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {categoryOrder.map((category, idx) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );
            return (
              <Scroll3DCard key={category} delay={idx * 0.1}>
                <SkillGroup
                  category={category as any}
                  items={categorySkills}
                />
              </Scroll3DCard>
            );
          })}
        </motion.div>

        {/* Skill summary card with 3D effect */}
        <Scroll3DCard delay={0.4}>
          <motion.div
            className={cn(
              'mt-12 p-6 rounded-xl',
              'bg-linear-to-r from-blue-900/20 to-purple-900/20',
              'border border-blue-500/20',
              'backdrop-blur-sm',
              'relative overflow-hidden group'
            )}
            whileHover={{
              borderColor: 'rgba(59, 130, 246, 0.4)',
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)',
            }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5"
              transition={{ duration: 0.3 }}
            />

            <p className="text-gray-300 leading-relaxed relative z-10">
              💡 I'm constantly learning and exploring new technologies. My goal is to master
              both the art and science of building incredible products that solve real-world problems.
            </p>
          </motion.div>
        </Scroll3DCard>
      </div>
    </section>
  );
}
