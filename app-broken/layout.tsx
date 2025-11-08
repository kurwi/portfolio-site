import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wojciech Staniszewski — Data & AI Engineer',
  description: 'Production-grade data and AI systems engineer.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
