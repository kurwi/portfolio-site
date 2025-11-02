'use client'

import { Header } from '@/app/components/Header'
import Footer from '@/components/Footer'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] pt-20 md:pt-24">{children}</main>
      <Footer />
    </>
  )
}
