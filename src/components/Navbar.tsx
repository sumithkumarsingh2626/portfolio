'use client';

import { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Timeline' },
  { href: '#contact', label: 'Contact' },
];

const resumeHref = '/Sumith_Kumar_Singh_Resume.docx';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-black/40 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className={cn(
                'text-lg sm:text-xl font-semibold tracking-wide',
                'text-white/95 hover:text-white transition-colors'
              )}
            >
              Sumith Kumar Singh
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-300',
                  'text-white/70 hover:text-white',
                  'relative after:absolute after:-bottom-2 after:left-0 after:h-px',
                  'after:w-0 after:bg-white/40 after:transition-all after:duration-300 hover:after:w-full'
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href={resumeHref}
              download="Sumith_Kumar_Singh26_Resume.docx"
              className={cn(
                'ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold',
                'text-black bg-white hover:bg-white/90',
                'transition-colors focus-ring'
              )}
            >
              <Download className="w-3.5 h-3.5" />
              Download Resume
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('app:openPalette'))}
              className={cn(
                'ml-2 px-3 py-2 rounded-lg text-xs font-medium',
                'text-white/70 hover:text-white',
                'bg-white/5 hover:bg-white/8 border border-white/10',
                'transition-colors focus-ring'
              )}
              aria-label="Open command palette"
            >
              Ctrl K
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors focus-ring"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white/90" />
              ) : (
                <Menu className="w-6 h-6 text-white/90" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={resumeHref}
              download="Sumith_Kumar_Singh_Resume.docx"
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                'text-black bg-white hover:bg-white/90'
              )}
              onClick={() => setIsOpen(false)}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent('app:openPalette'));
              }}
              className={cn(
                'w-full text-left px-4 py-2 rounded-lg transition-colors',
                'text-white/70 hover:text-white hover:bg-white/5'
              )}
            >
              Open commands (Ctrl K)
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
