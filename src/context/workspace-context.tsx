'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface Workspace {
  id: string
  name: string
  slug: string
  avatarUrl?: string | null
}

interface WorkspaceContextType {
  currentWorkspace: Workspace | null
  setCurrentWorkspace: (workspace: Workspace) => void
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentWorkspace, setCurrentWorkspaceState] = useState<Workspace | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('current-workspace')
    if (stored) {
      try {
        setCurrentWorkspaceState(JSON.parse(stored))
      } catch {}
    }
  }, [])

  const setCurrentWorkspace = (workspace: Workspace) => {
    setCurrentWorkspaceState(workspace)
    localStorage.setItem('current-workspace', JSON.stringify(workspace))
  }

  return (
    <WorkspaceContext.Provider value={{ currentWorkspace, setCurrentWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext)
  if (!context) throw new Error('useWorkspace must be used within WorkspaceProvider')
  return context
}
