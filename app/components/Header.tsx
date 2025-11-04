'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FadeIn } from './Animations';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('navigation');

  const navLinks = [
    { label: t('projects'), href: '/projects' },
    { label: t('skills'), href: '/skills' },
    { label: t('contact'), href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <FadeIn>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-600/20">WS</div>
          </Link>
        </FadeIn>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <FadeIn key={link.href} delay={100 + index * 50}>
              <Link
                href={link.href}
                className="text-slate-700 hover:text-brand-700 transition-colors font-medium"
              >
                {link.label}
              </Link>
            </FadeIn>
          ))}
          <FadeIn delay={250}>
            <LanguageSwitcher />
          </FadeIn>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-white p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-slate-700 hover:bg-brand-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-200">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
