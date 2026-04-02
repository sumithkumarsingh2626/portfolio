'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: 'words' | 'characters';
  delay?: number;
}

export function AnimatedText({
  text,
  className = '',
  variant = 'words',
  delay = 0,
}: AnimatedTextProps) {
  const { ref, hasAnimated } = useScrollAnimation({ threshold: 0.3 });
  const words = text.split(' ');
  const characters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: variant === 'characters' ? 0.02 : 0.1,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={ref as any}
      variants={container}
      initial="hidden"
      animate={hasAnimated ? 'visible' : 'hidden'}
      className={className}
    >
      {variant === 'words' ? (
        words.map((word, index) => (
          <motion.span key={`${word}-${index}`} variants={item} className="inline-block mr-2">
            {word}
          </motion.span>
        ))
      ) : (
        characters.map((char, index) => (
          <motion.span key={`${char}-${index}`} variants={item} className="inline-block">
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))
      )}
    </motion.div>
  );
}
