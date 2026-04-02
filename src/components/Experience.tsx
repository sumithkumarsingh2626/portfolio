'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/data/experience';
import { cn } from '@/utils/cn';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

interface TimelineItemProps {
  item: (typeof timeline)[0];
  isOdd: boolean;
}

function TimelineItemComponent({ item, isOdd }: TimelineItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'flex gap-8 sm:gap-12',
        isOdd ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      {/* Left side - Content */}
      <div className="flex-1">
        <motion.div
          className={cn(
            'p-6 rounded-xl',
            'bg-gradient-to-br from-gray-800/50 to-gray-900/50',
            'border border-gray-700/50',
            'hover:border-blue-500/50',
            'transition-all duration-300'
          )}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-blue-400 font-semibold">{item.subtitle}</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-4">{item.description}</p>
          <p className="text-xs text-gray-500 font-medium">{item.date}</p>
        </motion.div>
      </div>

      {/* Center - Timeline dot */}
      <div className="flex flex-col items-center">
        <motion.div
          className={cn(
            'w-6 h-6 rounded-full border-4',
            'bg-gradient-to-r from-blue-500 to-purple-600',
            'border-black'
          )}
          whileHover={{ scale: 1.2 }}
        />
        <div className="w-1 h-24 bg-gradient-to-b from-gray-600 to-transparent" />
      </div>

      {/* Right side - Empty space for desktop layout */}
      <div className="flex-1" />
    </motion.div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className={cn(
        'py-20 px-4 sm:px-6 lg:px-8',
        'bg-gradient-to-b from-gray-900 to-black'
      )}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h2 className={cn(
            'text-4xl sm:text-5xl font-bold mb-4',
            'text-white'
          )}>
            Experience & <span className={cn(
              'bg-gradient-to-r from-blue-400 to-purple-500',
              'bg-clip-text text-transparent'
            )}>Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {timeline.map((item, idx) => (
            <TimelineItemComponent
              key={item.id}
              item={item}
              isOdd={idx % 2 === 0}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className={cn(
              'inline-block px-8 py-4 rounded-lg font-semibold',
              'border border-gray-600 text-white',
              'hover:border-blue-400 hover:text-blue-400',
              'transition-all duration-300'
            )}
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
