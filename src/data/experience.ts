export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  type: 'education' | 'experience';
  icon: string;
}

export const timeline: TimelineItem[] = [
  {
    id: '1',
    title: 'BTech in Computer Science',
    subtitle: 'BITS Vizag (Birla Institute of Technology and Science)',
    description: 'Pursuing BTech with focus on cybersecurity and software development. Developing expertise in secure coding practices and application development.',
    date: 'Sept 2023 – Present',
    type: 'education',
    icon: '🎓',
  },
  {
    id: '2',
    title: 'Merit Student - Cyber Security Hackathon Level 1',
    subtitle: 'SUPRAJA TECHNOLOGY',
    description: 'Achieved merit recognition in cybersecurity hackathon, demonstrating practical knowledge in security vulnerabilities and defensive techniques.',
    date: '2024',
    type: 'experience',
    icon: '🏆',
  },
  {
    id: '3',
    title: 'Intermediate',
    subtitle: 'Sri Chaitanya Junior College',
    description: 'Completed intermediate education with strong foundation in mathematics, physics, and chemistry. Developed strong analytical and problem-solving skills.',
    date: 'Aug 2021 – Apr 2023',
    type: 'education',
    icon: '📚',
  },
  {
    id: '4',
    title: 'SSC (Secondary School Certificate)',
    subtitle: 'Saraswati Vidya Vihar',
    description: 'Completed secondary education with focus on academics. Built strong fundamentals in science and mathematics.',
    date: 'Nov 2013 – Apr 2021',
    type: 'education',
    icon: '🏫',
  },
];
