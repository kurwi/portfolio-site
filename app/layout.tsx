import './globals.css'
import type { Metadata } from 'next'
import clsx from 'clsx'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ClientLayout } from '@/app/components/ClientLayout'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Wojciech Staniszewski — Data & AI Engineer',
  description: 'Portfolio showcasing production-grade data and AI systems, engineering impact, and skills.',
  metadataBase: new URL('http://localhost:3000'), // TODO: replace with your domain
  openGraph: {
    title: 'Wojciech Staniszewski — Data & AI Engineer',
    description: 'Portfolio showcasing production-grade data and AI systems, engineering impact, and skills.',
    url: 'http://localhost:3000', // TODO: replace with your domain
    siteName: 'Wojciech Staniszewski — Portfolio',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wojciech Staniszewski — Data & AI Engineer',
    description: 'Portfolio showcasing production-grade data and AI systems, engineering impact, and skills.'
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Wojciech Staniszewski',
    jobTitle: 'Data & AI Engineer',
    url: 'http://localhost:3000',
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={clsx('min-h-screen bg-white text-slate-900 antialiased transition-colors')}>
        <NextIntlClientProvider messages={messages}>
          <LanguageProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
