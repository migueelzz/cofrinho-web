import { api } from "@/lib/axios"

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
  const response = await api.post<CreateWorkspaceResponse>("/workspaces", { name })

  return response.data
}