'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] pt-20 md:pt-24">{children}</main>
      <Footer />
    </>
  )
}

