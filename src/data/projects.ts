export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'web' | 'ai' | 'automation' | 'fullstack';
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  highlights?: string[];
  challenges?: string[];
  architecture?: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'College Canteen Website',
    description: 'Frontend website for college canteen with menu display system',
    longDescription:
      'Built a responsive frontend website for a college canteen using HTML, CSS, and JavaScript. The website displays menu items in an organized manner and provides a simple, intuitive interface for students to browse and view food options. Backend integration is planned for future development to enable ordering functionality.',
    category: 'web',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    liveUrl: 'https://sumithkumarsingh2626.github.io/CollMenu/',
    githubUrl: 'https://github.com/sumithkumarsingh2626/CollMenu',
    featured: true,
  },
  {
    id: '2',
    title: 'Smart Student System',
    description: 'Comprehensive student management system with intelligent features',
    longDescription:
      'An intelligent student management system currently in development. Designed to streamline student information management, academic tracking, and administrative workflows. Features include student profiles, attendance tracking, grade management, and reporting capabilities.',
    category: 'web',
    technologies: ['JavaScript', 'Database', 'UI/UX', 'System Design'],
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    liveUrl: 'https://smart-student-system.vercel.app/login',
    githubUrl: 'https://github.com/sumithkumarsingh2626/smart-student-system',
    featured: true,
  },
  {
    id: '3',
    title: 'AI Price Drop Alert Tool',
    description:
      'Smart tool to monitor product prices and receive alerts when prices drop.',
    longDescription:
      'A price monitoring tool that tracks product pricing and helps users catch drops quickly. Designed for automation workflows with reliable change detection and a clean UI for quick checks.',
    category: 'automation',
    technologies: ['React', 'APIs', 'JavaScript', 'Automation'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    liveUrl: 'https://price-drop-one.vercel.app',
    githubUrl: 'https://github.com/sumithkumarsingh2626',
    featured: false,
    highlights: [
      'Price tracking + change detection',
      'Automation-friendly design',
      'Extensible alerts + history',
    ],
  },
];

