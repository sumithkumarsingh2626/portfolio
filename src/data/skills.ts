export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'ai-ml';
  level: number; // 0-100
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', level: 86 },
  { name: 'Next.js', category: 'frontend', level: 78 },
  { name: 'Tailwind CSS', category: 'frontend', level: 88 },
  { name: 'Bootstrap', category: 'frontend', level: 80 },
  { name: 'JavaScript', category: 'frontend', level: 86 },
  { name: 'TypeScript', category: 'frontend', level: 72 },
  { name: 'HTML', category: 'frontend', level: 90 },
  { name: 'CSS', category: 'frontend', level: 86 },

  // Backend & Database
  { name: 'Node.js', category: 'backend', level: 80 },
  { name: 'Express.js', category: 'backend', level: 74 },
  { name: 'MongoDB', category: 'backend', level: 76 },
  { name: 'REST APIs', category: 'backend', level: 82 },
  { name: 'Python', category: 'backend', level: 74 },

  // DevOps & Tools
  { name: 'Git', category: 'tools', level: 88 },
  { name: 'GitHub', category: 'tools', level: 88 },
  { name: 'Linux', category: 'tools', level: 76 },
  { name: 'Vercel', category: 'tools', level: 78 },
  { name: 'CI/CD', category: 'tools', level: 70 },
  { name: 'DevOps', category: 'tools', level: 72 },

  // Security / Automation
  { name: 'Cybersecurity', category: 'ai-ml', level: 76 },
  { name: 'VAPT', category: 'ai-ml', level: 70 },
  { name: 'Ethical Hacking', category: 'ai-ml', level: 68 },
  { name: 'Automation', category: 'ai-ml', level: 74 },
];

