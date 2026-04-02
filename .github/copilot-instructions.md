# Portfolio Website Development Guide

This is a premium, modern personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion. It's designed to showcase projects, skills, and experience in a visually appealing way.

## Project Overview

- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS v4 with custom animations
- **Animations**: Framer Motion
- **UI/UX**: Apple/Notion-inspired minimal design
- **Dark Mode**: Built-in toggle between dark and light themes

## Key Features

- Hero section with animated background
- Projects showcase with filtering and detailed cards
- Skills section with categorized display and progress bars
- About section with personal highlights
- Experience/Education timeline
- Contact form with validation
- Fully responsive design (mobile-first)
- Smooth page transitions and micro-interactions
- Sticky navbar with blur effect

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (imports all components)
│   └── globals.css        # Global styles and animations
├── components/            # Reusable React components
│   ├── Navbar.tsx         # Navigation component
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── Skills.tsx         # Skills showcase
│   ├── Projects.tsx       # Projects grid with filtering
│   ├── Experience.tsx     # Timeline component
│   ├── Contact.tsx        # Contact form and links
│   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   └── index.ts           # Barrel exports
├── data/                  # Data and configuration
│   ├── projects.ts        # Projects array with metadata
│   ├── skills.ts          # Skills array by category
│   └── experience.ts      # Timeline events (work, education)
├── hooks/                 # Custom React hooks
│   └── useTheme.ts        # Theme management hook
└── utils/                 # Utility functions
    └── cn.ts              # Class name merger utility
```

## Customization Instructions

### 1. Update Personal Information

**In `src/components/Hero.tsx`:**
- Change name from "Your Name" to your actual name
- Update job title/role
- Modify tagline and CTA button text

**In `src/components/About.tsx`:**
- Update introduction paragraph
- Change statistics (projects completed, years experience, etc.)
- Modify interests/goals list

### 2. Add Your Projects

**Edit `src/data/projects.ts`:**
- Add project objects to the `projects` array
- Include real project URLs and images
- Update technologies used
- Set `featured: true` for 3-4 best projects

### 3. Update Skills

**Edit `src/data/skills.ts`:**
- Add skills with category (frontend, backend, tools, ai-ml)
- Set proficiency level (0-100)
- Add emoji icon for visual representation

### 4. Add Experience & Education

**Edit `src/data/experience.ts`:**
- Add jobs with company, title, and dates
- Include education entries
- Write meaningful descriptions
- Use icons that represent each entry type

### 5. Connect Social Links

**In `src/components/Contact.tsx`:**
- Update email address
- Add LinkedIn profile URL
- Add GitHub profile URL
- Update phone number if desired

### 6. Customize Theme Colors

**Edit `tailwind.config.ts`:**
- Change primary gradient colors
- Modify background shades
- Update accent colors
- Customize border-radius values

## Development Guidelines

- Use TypeScript for type safety
- Keep components under 300 lines for readability
- Use Framer Motion for all animations
- Apply Tailwind utilities for styling
- Maintain consistent spacing (4px grid)
- Test responsiveness on mobile/tablet/desktop
- Use semantic HTML elements

## Building & Deployment

### Local Development
```bash
npm run dev    # Start dev server on http://localhost:3000
```

### Production Build
```bash
npm run build  # Create optimized build
npm start      # Run production server
```

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click (recommended for Next.js)

## Performance Optimization

- Next.js images are auto-optimized
- Code splitting is automatic
- All CSS is purged during build
- TypeScript compilation for error prevention
- Turbopack for fast development builds

## SEO & Metadata

- Update `metadata` in `src/app/layout.tsx`
- Set title, description, and keywords
- Add Open Graph tags for social sharing
- Update favicon in `public/` folder

## Dark/Light Mode

- Automatically persists user preference to localStorage
- Respects system color scheme preference
- Smooth transitions between themes
- Update theme colors in `src/hooks/useTheme.ts`

## Mobile Responsiveness

- Mobile-first design approach
- Test on various screen sizes
- Touch-friendly button sizes (min 44x44px)
- Optimized navigation for small screens
- Flexible grid layouts

## Common Tasks

### Add New Project
1. Edit `src/data/projects.ts`
2. Add new project object to array
3. Include all required fields
4. Add project image URL

### Change Hero Background
Edit `src/components/Hero.tsx`, modify the animated background divs with different colors/sizes

### Update Navbar Links
Edit the `navLinks` array in `src/components/Navbar.tsx`

### Add New Section
1. Create component in `src/components/`
2. Import in `src/app/page.tsx`
3. Add to component tree
4. Add corresponding navigation link

## Best Practices

1. **Content First** - Update all placeholder text with real information
2. **Image Quality** - Use high-resolution, optimized images
3. **Regular Updates** - Keep projects and experience current
4. **Testing** - Test on multiple browsers and devices
5. **Performance** - Minimize bundle size, optimize images
6. **Accessibility** - Ensure proper contrast, use semantic HTML
7. **Security** - Never commit sensitive information

## Troubleshooting

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

### Styles Not Applying
- Ensure Tailwind is configured correctly
- Check class names match Tailwind syntax
- Rebuild after changing `tailwind.config.ts`

### Animations Not Working
- Verify Framer Motion is installed
- Check animation triggers are correct
- Ensure viewport configuration is set

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)

## Contact & Support

For questions about the portfolio template or Next.js development, refer to official documentation or community forums.

---

**Last Updated**: April 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
