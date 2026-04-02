'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Link, Code2, Share2, Send } from 'lucide-react';
import { cn } from '@/utils/cn';

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
};

const socialLinks = [
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
  { icon: Link, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Code2, href: 'https://github.com', label: 'GitHub' },
  { icon: Share2, href: 'https://twitter.com', label: 'Twitter' },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section
      id="contact"
      className={cn(
        'py-20 px-4 sm:px-6 lg:px-8',
        'bg-gradient-to-b from-black to-gray-900'
      )}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center"
        >
          <h2 className={cn(
            'text-4xl sm:text-5xl font-bold mb-4',
            'text-white'
          )}>
            Let's <span className={cn(
              'bg-gradient-to-r from-blue-400 to-purple-500',
              'bg-clip-text text-transparent'
            )}>Connect</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={cn(
                    'w-full px-4 py-3 rounded-lg',
                    'bg-gray-800/50 border border-gray-700',
                    'text-white placeholder-gray-500',
                    'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50',
                    'transition-all duration-300'
                  )}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={cn(
                    'w-full px-4 py-3 rounded-lg',
                    'bg-gray-800/50 border border-gray-700',
                    'text-white placeholder-gray-500',
                    'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50',
                    'transition-all duration-300'
                  )}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg',
                    'bg-gray-800/50 border border-gray-700',
                    'text-white placeholder-gray-500',
                    'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50',
                    'transition-all duration-300 resize-none'
                  )}
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                className={cn(
                  'w-full px-6 py-3 rounded-lg font-semibold',
                  'bg-gradient-to-r from-blue-500 to-purple-600',
                  'text-white hover:shadow-lg hover:shadow-purple-500/50',
                  'transition-all duration-300',
                  'flex items-center justify-center gap-2'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Feel free to reach out to me for any project or just a friendly hello!
                I'm always open to discussing new ideas and opportunities.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <motion.a
                href="mailto:sumithkumar2626@gmail.com"
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg',
                  'bg-gray-800/50 border border-gray-700',
                  'hover:border-blue-500/50 hover:bg-gray-800',
                  'transition-all duration-300'
                )}
                whileHover={{ x: 5 }}
              >
                <Mail className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">sumithkumar2626@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+919999999999"
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg',
                  'bg-gray-800/50 border border-gray-700',
                  'hover:border-blue-500/50 hover:bg-gray-800',
                  'transition-all duration-300'
                )}
                whileHover={{ x: 5 }}
              >
                <Mail className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white font-medium">+91 9999999999</p>
                </div>
              </motion.a>
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, label }, idx) => (
                  <motion.a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      'p-3 rounded-lg',
                      'bg-gray-800/50 border border-gray-700',
                      'text-gray-400 hover:text-white',
                      'hover:border-blue-500 hover:bg-blue-500/10',
                      'transition-all duration-300'
                    )}
                    whileHover={{ y: -5, scale: 1.1 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400">
            © 2026 Sumith Kumar Singh. All rights reserved. Crafted with ❤️
          </p>
        </motion.div>
      </div>
    </section>
  );
}
