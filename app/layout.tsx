import './globals.css'
import type { Metadata } from 'next'
import clsx from 'clsx'
import { LanguageContextProvider } from '@/contexts/LanguageCtx'
import { ClientLayout } from '@/app/components/ClientLayout'
import { SetHtmlLang } from '@/app/components/SetHtmlLang'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
  title: 'Wojciech Staniszewski — Data & AI Engineer',
  description: 'Portfolio showcasing production-grade data and AI systems, engineering impact, and skills.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en': SITE_URL,
      'es': `${SITE_URL}/?lang=es`,
      'fr': `${SITE_URL}/?lang=fr`,
      'de': `${SITE_URL}/?lang=de`,
      'pl': `${SITE_URL}/?lang=pl`,
    }
  },
  openGraph: {
    title: 'Wojciech Staniszewski — Data & AI Engineer',
    description: 'Portfolio showcasing production-grade data and AI systems, engineering impact, and skills.',
    url: SITE_URL,
    siteName: 'Wojciech Staniszewski — Portfolio',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wojciech Staniszewski — Data & AI Engineer',
    description: 'Portfolio showcasing production-grade data and AI systems, engineering impact, and skills.'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Wojciech Staniszewski',
    jobTitle: 'Data & AI Engineer',
    url: SITE_URL,
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={clsx('min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900 antialiased transition-colors')}>
        <LanguageContextProvider>
          <SetHtmlLang />
          <ClientLayout>
            {children}
          </ClientLayout>
        </LanguageContextProvider>
      </body>
    </html>
  )
}

