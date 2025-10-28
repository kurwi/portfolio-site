'use client';

import { FadeIn } from '@/app/components/Animations';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 3000);
    setLoading(false);
  };

  const socialLinks = [
    { icon: 'github', url: 'https://github.com', label: 'GitHub' },
    { icon: 'email', url: 'mailto:contact@example.com', label: 'Email' },
  ];

  return (
    <section className="py-20 mb-20">
      <div className="container max-w-2xl">
        <FadeIn>
          <h2 className="section-title mb-6">Let&apos;s Work Together</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
            Have a project in mind? I&apos;d love to hear about it. Drop me a message or connect on social platforms.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          <FadeIn>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-brand-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-brand-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-brand-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-brand-700 to-brand-800 text-white font-semibold hover:shadow-lg hover:shadow-brand-700/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Sending...' : submitted ? '✓ Message sent!' : 'Send Message'}
              </button>
            </form>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Email:</span> contact@example.com
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Location:</span> Remote / Global
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Availability:</span> Open for opportunities
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Connect With Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.icon}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 bg-gradient-to-br from-brand-50 to-blue-50 dark:from-brand-900/30 dark:to-blue-900/30 text-brand-700 dark:text-brand-400 hover:text-white hover:shadow-xl hover:shadow-brand-600/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center border-2 border-brand-200 dark:border-brand-700 hover:bg-gradient-to-br hover:from-brand-600 hover:to-brand-700 hover:border-brand-600"
                      aria-label={link.label}
                      title={link.label}
                    >
                      {link.icon === 'github' && (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      )}
                      {link.icon === 'email' && (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-brand-500 p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Available now:</span> I&apos;m currently accepting new projects and collaborations.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
