export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'ai-ml';
  level: number; // 0-100
  icon?: string;
}

export const skills: Skill[] = [
  // Frontend
  {
    name: 'HTML',
    category: 'frontend',
    level: 90,
    icon: '🏗️',
  },
  {
    name: 'CSS',
    category: 'frontend',
    level: 85,
    icon: '🎨',
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    level: 85,
    icon: '⚡',
  },
  {
    name: 'React',
    category: 'frontend',
    level: 70,
    icon: '⚛️',
  },
  {
    name: 'Responsive Design',
    category: 'frontend',
    level: 80,
    icon: '📱',
  },

  // Backend
  {
    name: 'Python',
    category: 'backend',
    level: 75,
    icon: '🐍',
  },
  {
    name: 'Database Design',
    category: 'backend',
    level: 70,
    icon: '🗄️',
  },
  {
    name: 'REST APIs',
    category: 'backend',
    level: 65,
    icon: '🔌',
  },
  {
    name: 'Backend Development',
    category: 'backend',
    level: 70,
    icon: '🖥️',
  },

  // Tools
  {
    name: 'Git & GitHub',
    category: 'tools',
    level: 85,
    icon: '🐙',
  },
  {
    name: 'Version Control',
    category: 'tools',
    level: 85,
    icon: '📋',
  },
  {
    name: 'Linux',
    category: 'tools',
    level: 75,
    icon: '🐧',
  },
  {
    name: 'Problem Solving',
    category: 'tools',
    level: 90,
    icon: '🧩',
  },

  // Cybersecurity & AI/ML
  {
    name: 'Cybersecurity',
    category: 'ai-ml',
    level: 80,
    icon: '🔐',
  },
  {
    name: 'Network Security',
    category: 'ai-ml',
    level: 75,
    icon: '🛡️',
  },
  {
    name: 'Security Best Practices',
    category: 'ai-ml',
    level: 80,
    icon: '🔒',
  },
];
