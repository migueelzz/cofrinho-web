'use server'

import { api } from "@/lib/axios"
import { getToken } from "@/lib/auth"

export type Workspace = {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

type CreateWorkspaceBody = {
  name: string
}

type CreateWorkspaceResponse = {
  workspace: Workspace
}

export async function createWorkspace({ name }: CreateWorkspaceBody): Promise<CreateWorkspaceResponse> {
  const token = await getToken()

  const response = await api.post<CreateWorkspaceResponse>("/workspaces", { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}