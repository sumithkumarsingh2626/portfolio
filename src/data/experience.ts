export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  type: 'education' | 'experience' | 'project' | 'achievement';
}

export const timeline: TimelineItem[] = [
  {
    id: '1',
    title: 'B.Tech (CSE) Student',
    subtitle: 'BITS Vizag',
    description:
      'Building strong CS fundamentals while shipping real projects in fullstack development, DevOps, and security-minded engineering.',
    date: 'Sep 2023 — Present',
    type: 'education',
  },
  {
    id: '2',
    title: 'Merit Student — Cyber Security Hackathon (CTF)',
    subtitle: 'Supraja Technologies',
    description:
      'Recognized for performance in a cybersecurity hackathon, applying practical security knowledge and problem-solving under constraints.',
    date: '2024',
    type: 'achievement',
  },
  {
    id: '3',
    title: 'Fullstack Development',
    subtitle: 'Projects + continuous learning',
    description:
      'Building end-to-end web apps with responsive UI, REST APIs, and database-backed features — with emphasis on clean code and scalability.',
    date: '2023 — Present',
    type: 'experience',
  },
  {
    id: '4',
    title: 'DevOps & Cloud Exploration',
    subtitle: 'Deployment, CI/CD, and automation',
    description:
      'Learning modern deployment workflows: version control, CI/CD, cloud hosting, and practical automation for faster shipping.',
    date: '2024 — Present',
    type: 'experience',
  },
];

