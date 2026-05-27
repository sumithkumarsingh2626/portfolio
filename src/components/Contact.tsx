'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Code2, Link, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { profile } from '@/data/profile';
import { cn } from '@/utils/cn';

function Field({
  label,
  name,
  value,
  onChange,
  multiline,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  multiline?: boolean;
}) {
  const base = cn(
    'w-full rounded-2xl bg-white/5 border border-white/10',
    'px-4 pt-6 pb-3 text-white/90',
    'outline-none transition-colors',
    'focus:border-white/18 focus:bg-white/7'
  );

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder=" "
          rows={5}
          className={cn(base, 'resize-none')}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder=" "
          className={base}
        />
      )}
      <label className="pointer-events-none absolute left-4 top-3 text-xs tracking-[0.24em] text-white/45">
        {label.toUpperCase()}
      </label>
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  return (
    <section id="contact" className={cn('relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden')}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="text-xs tracking-[0.28em] text-white/45">CONTACT</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white/95">
            Let’s build something that feels expensive.
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed max-w-2xl">
            Tell me about your idea. If you prefer, use the command palette (Ctrl K) to copy details instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={cn('rounded-3xl glass-strong p-7 sm:p-8')}
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (sending) return;

                const name = form.name.trim();
                const email = form.email.trim();
                const message = form.message.trim();

                if (!name || !email || !message) {
                  toast.error('Please fill name, email, and message.');
                  return;
                }

                setSending(true);
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message }),
                  });

                  if (!res.ok) {
                    const data = (await res.json().catch(() => null)) as
                      | { error?: string }
                      | null;
                    throw new Error(data?.error || 'Could not send message.');
                  }

                  toast.success('Message sent. Thanks!');
                  setForm({ name: '', email: '', message: '' });
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : 'Could not send message.');
                } finally {
                  setSending(false);
                }
              }}
              className="space-y-4"
            >
              <Field
                label="Your name"
                name="name"
                value={form.name}
                onChange={(name, value) => setForm((p) => ({ ...p, [name]: value }))}
              />
              <Field
                label="Your email"
                name="email"
                value={form.email}
                onChange={(name, value) => setForm((p) => ({ ...p, [name]: value }))}
              />
              <Field
                label="Message"
                name="message"
                value={form.message}
                onChange={(name, value) => setForm((p) => ({ ...p, [name]: value }))}
                multiline
              />

              <motion.button
                type="submit"
                whileHover={{ y: -1 }}
                whileTap={{ y: 1, scale: 0.99 }}
                className={cn(
                  'w-full rounded-2xl px-5 py-3 font-medium',
                  'bg-white text-black',
                  'shadow-[0_20px_60px_rgba(0,0,0,0.55)]',
                  sending && 'opacity-70 cursor-not-allowed',
                  'focus-ring'
                )}
                disabled={sending}
              >
                {sending ? 'Sending…' : 'Send message'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.9, delay: 0.03, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className={cn('rounded-3xl glass p-7 sm:p-8')}>
              <div className="text-xs tracking-[0.28em] text-white/45">DIRECT</div>
              <div className="mt-5 space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className={cn(
                    'flex items-center gap-4 rounded-2xl px-4 py-4',
                    'bg-white/4 border border-white/10',
                    'hover:bg-white/6 hover:border-white/18 transition-colors focus-ring'
                  )}
                >
                  <Mail className="w-5 h-5 text-white/70" />
                  <div>
                    <div className="text-sm text-white/85">Email</div>
                    <div className="text-xs text-white/55">{profile.email}</div>
                  </div>
                </a>
              </div>
            </div>

            <div className={cn('rounded-3xl glass p-7 sm:p-8')}>
              <div className="text-xs tracking-[0.28em] text-white/45">SOCIAL</div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    'rounded-2xl px-4 py-4 bg-white/4 border border-white/10',
                    'hover:bg-white/6 hover:border-white/18 transition-colors focus-ring',
                    'flex items-center gap-3'
                  )}
                >
                  <Code2 className="w-5 h-5 text-white/70" />
                  <span className="text-sm text-white/80">GitHub</span>
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    'rounded-2xl px-4 py-4 bg-white/4 border border-white/10',
                    'hover:bg-white/6 hover:border-white/18 transition-colors focus-ring',
                    'flex items-center gap-3'
                  )}
                >
                  <Link className="w-5 h-5 text-white/70" />
                  <span className="text-sm text-white/80">LinkedIn</span>
                </a>
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    'rounded-2xl px-4 py-4 bg-white/4 border border-white/10',
                    'hover:bg-white/6 hover:border-white/18 transition-colors focus-ring',
                    'flex items-center gap-3'
                  )}
                >
                  <Camera className="w-5 h-5 text-white/70" />
                  <span className="text-sm text-white/80">Instagram</span>
                </a>
              </div>
            </div>

            {/* <div className="pt-3 text-xs text-white/40">
              Update contact links in <span className="text-white/55">src/data/profile.ts</span>.
            </div> */}
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-white/40">
          Designed for clarity. Engineered for reliability.
        </div>
      </div>
    </section>
  );
}
