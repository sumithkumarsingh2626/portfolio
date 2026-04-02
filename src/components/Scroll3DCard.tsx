'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/utils/cn';

interface Scroll3DCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Scroll3DCard({ children, className = '', delay = 0 }: Scroll3DCardProps) {
  const { ref, hasAnimated } = useScrollAnimation({ threshold: 0.2 });
  const internalRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref as any}
      initial={{
        opacity: 0,
        y: 100,
        rotateX: -20,
        z: -100,
      }}
      animate={
        hasAnimated
          ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
              z: 0,
            }
          : {
              opacity: 0,
              y: 100,
              rotateX: -20,
              z: -100,
            }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      style={{
        perspective: 1200,
      }}
      className={cn('transform-gpu', className)}
    >
      <div ref={internalRef}>{children}</div>
    </motion.div>
  );
}
