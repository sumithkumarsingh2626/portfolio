'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Scroll3DCard } from './Scroll3DCard';
import { AnimatedText } from './AnimatedText';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export function About() {
  const stats = [
    { number: '1+', label: 'Projects Completed' },
    { number: '2+', label: 'Years in Tech' },
    { number: '15+', label: 'Skills' },
    { number: '1', label: 'Award' },
  ];

  return (
    <section
      id="about"
      className={cn(
        'py-20 px-4 sm:px-6 lg:px-8',
        'bg-linear-to-b from-black to-gray-900',
        'relative overflow-hidden'
      )}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <Scroll3DCard delay={0}>
          <motion.div className="mb-12">
            <h2 className={cn(
              'text-4xl sm:text-5xl font-bold mb-4',
              'text-white'
            )}>
              About <span className={cn(
                'bg-linear-to-r from-blue-400 to-purple-500',
                'bg-clip-text text-transparent'
              )}>Me</span>
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-400 to-purple-500 rounded-full" />
          </motion.div>
        </Scroll3DCard>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Bio with Scroll3D */}
          <Scroll3DCard delay={0.1}>
            <motion.div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a motivated BTech student at BITS Vizag with a passion for cybersecurity
                and software development. I'm dedicated to building secure, scalable applications
                and exploring innovative solutions in the tech space.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                As a Merit Student in the Cyber Security Hackathon, I've demonstrated my commitment
                to learning and excellence. I bring strong technical skills combined with excellent
                time management, leadership, and decision-making abilities to every project I undertake.
              </p>

              <div className="pt-4">
                <h3 className="text-xl font-semibold text-white mb-4">What I'm passionate about:</h3>
                <ul className="space-y-3">
                  {[
                    'Cybersecurity and secure software development',
                    'Building scalable web applications',
                    'Learning cutting-edge technologies',
                    'Problem-solving and innovation',
                    'Mentoring and continuous growth',
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-3 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <ChevronRight className="w-5 h-5 text-blue-400 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Scroll3DCard>

          {/* Right - Stats with 3D cards */}
          <Scroll3DCard delay={0.2}>
            <motion.div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className={cn(
                    'p-6 rounded-xl',
                    'bg-linear-to-br from-gray-800/50 to-gray-900/50',
                    'border border-gray-700/50',
                    'backdrop-blur-sm',
                    'relative overflow-hidden group'
                  )}
                  whileHover={{
                    y: -15,
                    borderColor: '#8b5cf6',
                    boxShadow: '0 20px 40px rgba(168, 85, 247, 0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10"
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className={cn(
                        'text-3xl sm:text-4xl font-bold mb-2',
                        'bg-linear-to-r from-blue-400 to-purple-500',
                        'bg-clip-text text-transparent'
                      )}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Scroll3DCard>
        </div>
      </div>
    </section>
  );
}
