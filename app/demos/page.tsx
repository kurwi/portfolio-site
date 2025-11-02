'use client'

import { Suspense } from 'react'
import DemosContent from './DemosContent'

export default function DemosPage() {
  return (
    <Suspense fallback={<div className="container py-16">Loading...</div>}>
      <DemosContent />
    </Suspense>
  )
}
