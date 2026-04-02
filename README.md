# Premium Portfolio Website 🎨

A stunning, modern personal portfolio website built with Next.js, React, Tailwind CSS, and Framer Motion. Features a sleek dark/light mode, smooth animations, and an Apple/Notion-inspired UI/UX design.

website(https://portfolio-six-orcin-g54w0jxf9f.vercel.app/)

## ✨ Features

### 🎯 Core Sections
- **Hero Section** - Full-screen landing with animated background and CTA buttons
- **About Me** - Personal introduction with highlights and stats
- **Skills** - Categorized technical skills with progress bars
- **Projects** - Featured projects with filtering and detailed cards
- **Experience** - Timeline-based education and work experience
- **Contact** - Contact form and social media links

### 🎨 Design Features
- **Minimal & Clean UI** - Inspired by Apple and Notion design language
- **Dark/Light Mode** - Toggle between themes with persistent storage
- **Smooth Animations** - Framer Motion for engaging interactions
- **Responsive Design** - Mobile-first approach (mobile, tablet, desktop)
- **Glassmorphism Effects** - Soft shadows and blur effects
- **Gradient Accents** - Beautiful color gradients throughout
- **Perfect Typography** - Hierarchy and spacing for readability

### 🚀 Premium Features
- Sticky navbar with blur effect
- Smooth scrolling with scroll-based reveal animations
- Project filtering by category
- Hover effects and micro-interactions
- Loading optimizations with Turbopack
- TypeScript for type safety
- ESLint configuration

## 🛠 Tech Stack

- **Framework**: [Next.js 16.2.2](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev)
- **Build**: Turbopack (fastest build tool)

## 📦 Installation

### Prerequisites
- Node.js 18+ (Recommended: 20 LTS)
- npm or yarn

### Setup

1. **Navigate to the project directory**
   ```bash
   cd your-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Getting Started

### Customization Guide

#### 1. **Update Personal Info**

**Edit `src/components/Hero.tsx`:**
```typescript
<h1>Hi, I'm <span>Your Name</span></h1>
<p>Your Title | Your Role | Your Passion</p>
```

**Edit `src/components/About.tsx`:**
- Update introduction text
- Modify stats (projects, years, etc.)

#### 2. **Customize Projects**

**Edit `src/data/projects.ts`:**
```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: 'Your Project Title',
    description: 'Brief description',
    longDescription: 'Detailed description',
    category: 'web', // 'web' | 'ai' | 'mobile' | 'data'
    technologies: ['React', 'Next.js', 'Tailwind'],
    image: 'https://your-image-url.jpg',
    liveUrl: 'https://project-url.com',
    githubUrl: 'https://github.com/user/repo',
    featured: true,
  },
];
```

#### 3. **Update Skills**

**Edit `src/data/skills.ts`:**
```typescript
export const skills: Skill[] = [
  {
    name: 'React',
    category: 'frontend', // 'frontend' | 'backend' | 'tools' | 'ai-ml'
    level: 95,
    icon: '⚛️',
  },
];
```

#### 4. **Modify Experience**

**Edit `src/data/experience.ts`:**
```typescript
export const timeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Job Title',
    subtitle: 'Company Name',
    description: 'What you did',
    date: '2023 - Present',
    type: 'experience', // 'experience' | 'education'
    icon: '💼',
  },
];
```

#### 5. **Update Contact Info**

**Edit `src/components/Contact.tsx`:**
```typescript
const socialLinks = [
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
  { icon: Link, href: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
  // Add more links
];
```

#### 6. **Customize Colors**

**Edit `tailwind.config.ts`:**
```typescript
theme: {
  extend: {
    colors: {
      'blue-400': '#your-color',
      'purple-500': '#your-color',
    },
  },
}
```

## 📝 Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles & animations
├── components/
│   ├── Navbar.tsx         # Navigation bar
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── Skills.tsx         # Skills showcase
│   ├── Projects.tsx       # Projects grid
│   ├── Experience.tsx     # Timeline
│   ├── Contact.tsx        # Contact section
│   ├── ThemeToggle.tsx    # Dark/light mode
│   └── index.ts           # Barrel exports
├── data/
│   ├── projects.ts        # Projects data
│   ├── skills.ts          # Skills data
│   └── experience.ts      # Timeline data
├── hooks/
│   └── useTheme.ts        # Theme hook
└── utils/
    └── cn.ts              # Class name utility
```

## 🎨 Customization

### Colors
Primary gradient: `blue-400` → `purple-500` → `pink-500`
Background: `#0f0f0f` (dark mode)
Accents: Purple glow effects

### Fonts
- Font family: Geist (from next/font/google)
- Fallback: System fonts

### Animations
- Framer Motion for complex animations
- Tailwind CSS utilities for basic transitions
- Custom keyframes in `globals.css`

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the .next folder
```

**AWS, Google Cloud, etc.:**
See official Next.js deployment docs

## 🔒 Performance

- **Optimized Images** - Next.js Image optimization
- **Code Splitting** - Automatic chunking
- **Minification** - Production-ready builds
- **TypeScript** - Type safety and fewer bugs
- **Turbopack** - Lightning-fast builds

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Feel free to customize and improve this portfolio. Some ideas:
- Add dark/light mode animations
- Create project modal details
- Add blog section
- Implement contact form backend
- Add analytics

## 📄 License

This portfolio template is free to use and modify for personal and commercial projects.

## 💡 Tips for Success

1. **Update with Real Content** - Replace all placeholder text with your actual information
2. **High-Quality Images** - Use professional images for projects (1200x600px recommended)
3. **Keep It Updated** - Update projects and experience regularly
4. **Mobile Testing** - Test on various devices
5. **SEO Optimization** - Update metadata in `layout.tsx`
6. **Custom Domain** - Connect a custom domain for professionalism
7. **Analytics** - Add Google Analytics or similar

## 📞 Support

- Check [Next.js Documentation](https://nextjs.org/docs)
- See [Tailwind CSS Docs](https://tailwindcss.com/docs)
- Explore [Framer Motion Examples](https://www.framer.com/motion/)

---

**Built with ❤️ using Next.js, React, and modern web technologies.**

Made to stand out for placements and career opportunities! 🚀
