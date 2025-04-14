'use client'

import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { WorkspaceProvider } from './context/workspace-context'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </WorkspaceProvider>
  )
}