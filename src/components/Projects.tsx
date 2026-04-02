'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { cn } from '@/utils/cn';
import { Scroll3DCard } from './Scroll3DCard';

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
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const categories: { value: string; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'web', label: 'Web' },
  { value: 'ai', label: 'AI/ML' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'data', label: 'Data' },
];

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'group relative h-full rounded-xl overflow-hidden',
        'bg-linear-to-br from-gray-800/50 to-gray-900/50',
        'border border-gray-700/50',
        'hover:border-purple-500/50',
        'transition-all duration-300'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -15,
        boxShadow: '0 30px 60px rgba(168, 85, 247, 0.3)',
      }}
      style={{
        perspective: 1200,
      }}
    >
      {/* Image container with 3D effect */}
      <motion.div
        className="relative h-48 overflow-hidden bg-gray-800"
        animate={{
          rotateX: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* eslint-disable-next-line @next/next/no-image-element */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500"
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className={cn(
            'absolute inset-0 bg-linear-to-t from-black/80 to-transparent',
            'transition-opacity duration-300'
          )}
          animate={{
            opacity: isHovered ? 0.9 : 0.6,
          }}
        />

        {/* Featured badge with rotate animation */}
        {project.featured && (
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-xs font-semibold text-yellow-300"
            animate={{
              rotate: isHovered ? 5 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
          >
            Featured
          </motion.div>
        )}
      </motion.div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <motion.h3
            className="text-xl font-bold text-white mb-2"
            animate={{
              color: isHovered ? '#93c5fd' : '#ffffff',
            }}
          >
            {project.title}
          </motion.h3>
          <p className="text-gray-300 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Technologies with stagger animation */}
        <motion.div
          className="flex flex-wrap gap-2"
          animate={{
            y: isHovered ? -2 : 0,
          }}
        >
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <motion.span
              key={idx}
              className={cn(
                'px-2 py-1 text-xs rounded-lg',
                'bg-gray-700/50 text-gray-300',
                'border border-gray-600/50'
              )}
              whileHover={{
                scale: 1.1,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 0.5)',
              }}
              transition={{ delay: idx * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </motion.div>

        {/* Links with hover effects */}
        <div className="flex gap-3 pt-2">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg',
                'bg-linear-to-r from-blue-500 to-purple-600',
                'text-white text-sm font-medium',
                'hover:shadow-lg hover:shadow-purple-500/50',
                'transition-all duration-300'
              )}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg',
                'border border-gray-600 text-gray-300',
                'hover:border-purple-500 hover:text-white',
                'text-sm font-medium',
                'transition-all duration-300'
              )}
              whileHover={{
                scale: 1.05,
                borderColor: '#a78bfa',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 className="w-4 h-4" />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className={cn(
        'py-20 px-4 sm:px-6 lg:px-8',
        'bg-linear-to-b from-black to-gray-900',
        'relative overflow-hidden'
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
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
              Featured <span className={cn(
                'bg-linear-to-r from-blue-400 to-purple-500',
                'bg-clip-text text-transparent'
              )}>Projects</span>
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-400 to-purple-500 rounded-full" />
          </motion.div>
        </Scroll3DCard>

        {/* Category filters with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category, idx) => (
            <motion.button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={cn(
                'px-6 py-2 rounded-lg font-medium transition-all duration-300',
                activeCategory === category.value
                  ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              )}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All projects CTA */}
        <Scroll3DCard delay={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.button
              className={cn(
                'px-8 py-4 rounded-lg font-semibold',
                'border border-gray-600 text-white',
                'hover:border-blue-400 hover:text-blue-400',
                'transition-all duration-300'
              )}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.button>
          </motion.div>
        </Scroll3DCard>
      </div>
    </section>
  );
}
