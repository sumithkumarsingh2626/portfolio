'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code2, Mail, Send } from 'lucide-react';
import { cn } from '@/utils/cn';
import { AnimatedText } from './AnimatedText';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        'bg-linear-to-b from-black via-gray-900 to-black',
        'pt-20 px-4 sm:px-6 lg:px-8'
      )}
    >
      {/* Animated background elements with 3D depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={cn(
            'absolute top-1/4 left-1/4 w-96 h-96',
            'bg-blue-500/20 rounded-full blur-3xl',
            'animate-pulse'
          )}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={cn(
            'absolute bottom-1/4 right-1/4 w-96 h-96',
            'bg-purple-500/20 rounded-full blur-3xl',
            'animate-pulse'
          )}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className={cn(
            'absolute top-1/2 right-1/3 w-72 h-72',
            'bg-pink-500/10 rounded-full blur-3xl'
          )}
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Content with 3D perspective */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Badge with scale animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-block"
        >
          <motion.div
            className={cn(
              'px-4 py-2 rounded-full',
              'bg-gray-800/50 border border-gray-700',
              'backdrop-blur-sm'
            )}
            whileHover={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              borderColor: 'rgba(59, 130, 246, 0.5)',
            }}
          >
            <span className="text-sm text-gray-300">
              ✨ Welcome to my portfolio
            </span>
          </motion.div>
        </motion.div>

        {/* Main heading with 3D text effect */}
        <div className="mb-6 perspective">
          <motion.h1
            initial={{ opacity: 0, rotateX: -20, y: 30 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn(
              'text-5xl sm:text-6xl lg:text-7xl font-bold',
              'text-white leading-tight'
            )}
            style={{
              transformStyle: 'preserve-3d' as any,
            }}
          >
            Hi, I'm{' '}
            <motion.span
              className={cn(
                'bg-linear-to-r from-blue-400 via-purple-500 to-pink-500',
                'bg-clip-text text-transparent',
                'inline-block'
              )}
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Sumith Kumar Singh
            </motion.span>
          </motion.h1>
        </div>

        {/* Animated subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          <AnimatedText
            text="Cybersecurity Expert | Software Development Engineer | BITS Vizag Student"
            variant="words"
            delay={0.4}
          />
        </motion.div>

        {/* Description with character animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          I'm passionate about building secure software and developing innovative solutions. 
          Currently pursuing BTech at BITS Vizag with expertise in cybersecurity and software development.
        </motion.p>

        {/* CTA Buttons with 3D hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            className={cn(
              'px-8 py-4 rounded-lg font-semibold',
              'bg-linear-to-r from-blue-500 to-purple-600',
              'text-white hover:shadow-lg hover:shadow-purple-500/50',
              'transition-all duration-300 transform',
              'flex items-center justify-center gap-2'
            )}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
            }}
            whileTap={{ scale: 0.95 }}
          >
            View My Projects
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            className={cn(
              'px-8 py-4 rounded-lg font-semibold',
              'border border-gray-600 text-white',
              'hover:bg-gray-800 transition-colors duration-300'
            )}
            whileHover={{
              scale: 1.05,
              borderColor: '#a78bfa',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>

        {/* Social Links with stagger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center gap-6"
        >
          {[Code2, Mail, Send].map((Icon, idx) => (
            <motion.a
              key={idx}
              href="#"
              className={cn(
                'p-3 rounded-lg',
                'bg-gray-800/50 border border-gray-700',
                'text-gray-300 hover:text-white',
                'hover:border-purple-500 hover:bg-purple-500/10',
                'transition-all duration-300'
              )}
              whileHover={{
                y: -8,
                rotateZ: 10,
                boxShadow: '0 20px 30px rgba(168, 85, 247, 0.3)',
              }}
              transition={{
                delay: idx * 0.1,
              }}
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex justify-center">
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-linear-to-b from-purple-400 to-transparent rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
