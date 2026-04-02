'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  offset?: number;
}

export function ParallaxSection({ children, className = '', offset = 50 }: ParallaxSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * 0.5);

  return (
    <motion.div
      style={{ y }}
      className={cn('relative w-full', className)}
    >
      {children}
    </motion.div>
  );
}
